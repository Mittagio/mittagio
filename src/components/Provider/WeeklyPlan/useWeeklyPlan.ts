import { useState, useCallback, useMemo } from 'react';
import type { Dish } from '../Kochbuch';

/** Slot pro Tag: 0 = Hauptgericht, 1–2 = zweites/drittes Gericht */
export type SlotEntry = {
  dishId: string;
  dish: Dish;
  /** Lazy-Billing: Inserat startet als DRAFT, Abrechnung (4,99 €) erst zum START_DATETIME */
  status?: 'draft' | 'live';
  startDatetime?: string;
} | null;
export type DaySlots = [SlotEntry, SlotEntry, SlotEntry];
export type WeekPlan = DaySlots[];

export const TAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
/** Mo–Fr für Elastic Canvas */
export const TAGE_MO_FR = TAGE.slice(0, 5);
/** Slot-Labels: Vegan | Vegetarisch | Fleisch */
export const SLOT_LABELS = ['🌱 Vegan', '🥬 Vegetarisch', '🥩 Fleisch'] as const;

export interface PickerTarget {
  day: number;
  slot: number;
}

/** Saison-Sets: vordefinierte Gericht-IDs pro Saison */
export type SeasonSet = 'winter' | 'sommer' | 'fruhling' | 'herbst';

/** Vordefinierte Saison-Sets (Dish-IDs). Kann später aus API/Config kommen. */
export const SAISON_SETS: Record<SeasonSet, string[]> = {
  winter: ['1', '2'], // Eintöpfe, warme Gerichte (z.B. Zwiebelrostbraten, Linseneintopf)
  sommer: ['2', '3'], // Leichtes (Linseneintopf kalt, Leberkäseweckle)
  fruhling: ['1', '2', '3'],
  herbst: ['1', '3'],
};

const createEmptyWeek = (): WeekPlan =>
  Array(7)
    .fill(null)
    .map(() => [null, null, null] as DaySlots);

/** Fisher-Yates Shuffle */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface UseWeeklyPlanOptions {
  dishes?: Dish[];
  /** IDs der Renner (Bestseller) – werden bei Lotto bevorzugt */
  rennerIds?: string[];
  /** Lazy-Billing aktiv: Inserate starten als DRAFT, 4,99 € erst zum START_DATETIME */
  lazyBillingEnabled?: boolean;
  /** Persistierter Aktivierungs-Zähler (z.B. aus localStorage) */
  initialActivationCount?: number;
}

const PRO_SILENT_PRICING_THRESHOLD = 6;
const STORAGE_KEY_ACTIVATION_COUNT = 'mittagio_weeklyplan_activation_count';

function loadActivationCount(initial: number): number {
  if (typeof window === 'undefined') return initial;
  try {
    const v = localStorage.getItem(STORAGE_KEY_ACTIVATION_COUNT);
    return v !== null ? Math.max(0, parseInt(v, 10) || 0) : initial;
  } catch {
    return initial;
  }
}

export function useWeeklyPlan(options: UseWeeklyPlanOptions = {}) {
  const {
    dishes = [],
    rennerIds = [],
    lazyBillingEnabled = true,
    initialActivationCount = 0,
  } = options;

  const [aktiveKW, setAktiveKW] = useState(6);
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(createEmptyWeek);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
  const [activationCount, setActivationCount] = useState(() =>
    loadActivationCount(initialActivationCount)
  );

  const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(pattern);
    }
  }, []);

  const openSlotPicker = useCallback((day: number, slot: number) => {
    setPickerTarget({ day, slot });
    setPickerOpen(true);
  }, []);

  const openGlobalPicker = useCallback(() => {
    setPickerTarget(null);
    setPickerOpen(true);
  }, []);

  const closePicker = useCallback(() => {
    setPickerOpen(false);
    setPickerTarget(null);
  }, []);

  const selectDishForSlot = useCallback(
    (dish: Dish, startDatetime?: string) => {
      if (pickerTarget !== null) {
        setWeekPlan((prev) => {
          const next = prev.map((day) => [...day]) as WeekPlan;
          const entry: NonNullable<SlotEntry> = {
            dishId: dish.id,
            dish,
            ...(lazyBillingEnabled && {
              status: 'draft',
              startDatetime: startDatetime ?? undefined,
            }),
          };
          next[pickerTarget.day][pickerTarget.slot] = entry;
          return next;
        });
      }
      setPickerOpen(false);
      setPickerTarget(null);
    },
    [pickerTarget, lazyBillingEnabled]
  );

  const removeSlot = useCallback((day: number, slot: number) => {
    setWeekPlan((prev) => {
      const next = prev.map((d) => [...d]) as WeekPlan;
      next[day][slot] = null;
      return next;
    });
  }, []);

  const formatPreis = useCallback((lastPrice: string) => lastPrice || '–', []);

  // --- Lotto-Funktion: 15 zufällige Gerichte (3/Tag Mo–Fr), Renner bevorzugen ---
  const fillLotto = useCallback(() => {
    if (dishes.length === 0) return;
    const renner = dishes.filter((d) => rennerIds.includes(d.id));
    const others = dishes.filter((d) => !rennerIds.includes(d.id));
    const pool = [...shuffle(renner), ...shuffle(others)];
    const getDish = (): Dish => pool[Math.floor(Math.random() * pool.length)];

    const next = createEmptyWeek();
    for (let day = 0; day < 5; day++) {
      for (let slot = 0; slot < 3; slot++) {
        const dish = getDish();
        next[day][slot] = {
          dishId: dish.id,
          dish,
          ...(lazyBillingEnabled && { status: 'draft', startDatetime: undefined }),
        };
      }
    }
    setWeekPlan(next);
    triggerHaptic([10, 20, 10]);
  }, [dishes, rennerIds, lazyBillingEnabled, triggerHaptic]);

  // --- Saison-Sets: vordefinierte Sets laden ---
  const loadSaisonSet = useCallback(
    (set: SeasonSet) => {
      const ids = SAISON_SETS[set];
      const dishMap = new Map(dishes.map((d) => [d.id, d]));
      const next = createEmptyWeek();
      let idx = 0;
      for (let day = 0; day < 7 && idx < ids.length; day++) {
        for (let slot = 0; slot < 3 && idx < ids.length; slot++) {
          const dish = dishMap.get(ids[idx % ids.length]);
          if (dish) {
            next[day][slot] = {
              dishId: dish.id,
              dish,
              ...(lazyBillingEnabled && { status: 'draft', startDatetime: undefined }),
            };
          }
          idx++;
        }
      }
      setWeekPlan(next);
      triggerHaptic([10, 20, 10]);
    },
    [dishes, lazyBillingEnabled, triggerHaptic]
  );

  // --- Pro-Counter: ab 6 Aktivierungen = Silent-Pricing (keine Preise auf Buttons) ---
  const incrementActivation = useCallback(() => {
    setActivationCount((c) => {
      const next = c + 1;
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY_ACTIVATION_COUNT, String(next));
        }
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const isSilentPricing = useMemo(
    () => activationCount >= PRO_SILENT_PRICING_THRESHOLD,
    [activationCount]
  );

  return {
    aktiveKW,
    setAktiveKW,
    weekPlan,
    setWeekPlan,
    pickerOpen,
    pickerTarget,
    openSlotPicker,
    openGlobalPicker,
    closePicker,
    selectDishForSlot,
    removeSlot,
    formatPreis,
    triggerHaptic,
    dishes,
    // Lotto
    fillLotto,
    // Saison-Sets
    loadSaisonSet,
    SAISON_SETS,
    // Lazy-Billing
    lazyBillingEnabled,
    // Pro-Counter & Silent-Pricing
    activationCount,
    incrementActivation,
    isSilentPricing,
    PRO_SILENT_PRICING_THRESHOLD,
  };
}
