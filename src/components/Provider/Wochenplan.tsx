import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dish } from './Kochbuch';
import { DISHES } from './Kochbuch';

// Slot pro Tag: 0 = Hauptgericht, 1–2 = zweites/drittes Gericht
type SlotEntry = { dishId: string; dish: Dish } | null;
type DaySlots = [SlotEntry, SlotEntry, SlotEntry];
type WeekPlan = DaySlots[]; // 7 Tage

const TAGE = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

const createEmptyWeek = (): WeekPlan =>
  Array(7)
    .fill(null)
    .map(() => [null, null, null] as DaySlots);

interface WochenplanProps {
  /** Gerichte aus dem Kochbuch – falls nicht übergeben, wird DISHES verwendet */
  dishes?: Dish[];
}

export const Wochenplan: React.FC<WochenplanProps> = ({ dishes = DISHES }) => {
  const [aktiveKW, setAktiveKW] = useState(6);
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(createEmptyWeek);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<{ day: number; slot: number } | null>(null);

  const triggerHaptic = (pattern: number | number[] = 10) => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(pattern);
    }
  };

  const openSlotPicker = (day: number, slot: number) => {
    triggerHaptic();
    setPickerTarget({ day, slot });
    setPickerOpen(true);
  };

  const selectDishForSlot = (dish: Dish) => {
    triggerHaptic([10, 30, 10]);
    if (pickerTarget !== null) {
      setWeekPlan((prev) => {
        const next = prev.map((day) => [...day]) as WeekPlan;
        next[pickerTarget.day][pickerTarget.slot] = { dishId: dish.id, dish };
        return next;
      });
    }
    setPickerOpen(false);
    setPickerTarget(null);
  };

  const removeSlot = (day: number, slot: number) => {
    triggerHaptic();
    setWeekPlan((prev) => {
      const next = prev.map((d) => [...d]) as WeekPlan;
      next[day][slot] = null;
      return next;
    });
  };

  const formatPreis = (lastPrice: string) => lastPrice || '–';

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F7F2] font-sans text-[#1D1D1F]">
      {/* 1. KW-NAVIGATION (Header) – S25 ergonomisch */}
      <header className="pt-6 pb-4 px-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-black/5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">Wochenplan</h1>
          <div className="bg-[#FFDE00]/20 text-[#1a1a1a] px-3 py-1 rounded-full text-xs font-semibold">
            KW {aktiveKW} wird geplant
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {[5, 6, 7, 8, 9].map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                triggerHaptic();
                setAktiveKW(kw);
              }}
              className={`flex-shrink-0 px-6 py-2 rounded-2xl font-bold transition-all ${
                aktiveKW === kw
                  ? 'bg-[#FFDE00] text-[#1a1a1a] shadow-lg scale-105'
                  : 'bg-white text-[#86868B] border border-black/10'
              }`}
            >
              KW {kw}
            </button>
          ))}
        </div>
      </header>

      {/* 2. WOCHEN-GRID – Silent UI: keine Säulen-Badges in der Übersicht */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-36">
        {TAGE.map((tag, dayIndex) => (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            key={tag}
            className="space-y-3"
          >
            <h2 className="text-lg font-bold text-[#86868B] ml-2 uppercase tracking-widest text-sm">
              {tag}
            </h2>
            <div className="bg-white rounded-[24px] p-4 shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-4">
                {/* Slot 0: Hauptgericht mit Bild */}
                {weekPlan[dayIndex][0] ? (
                  <div className="flex gap-4 items-center">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-inner bg-[#f1f3f5] flex-shrink-0">
                      <img
                        src={weekPlan[dayIndex][0]!.dish.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold leading-tight truncate">
                        {weekPlan[dayIndex][0]!.dish.name}
                      </h3>
                      <p className="text-[#1a1a1a] font-bold mt-1">
                        {formatPreis(weekPlan[dayIndex][0]!.dish.lastPrice)}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#1a1a1a] bg-[#FFDE00]/20 px-2 py-0.5 rounded">
                        Online
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSlot(dayIndex, 0)}
                      className="text-[#86868B] hover:text-[#1a1a1a] p-1 rounded-lg"
                      aria-label="Entfernen"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => openSlotPicker(dayIndex, 0)}
                    className="flex gap-4 items-center w-full text-left p-3 rounded-2xl border-2 border-dashed border-black/15 bg-[#F8F7F2]/60 hover:bg-[#FFDE00]/10 hover:border-[#FFDE00]/40 transition-colors"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-[#f1f3f5] flex items-center justify-center text-[#86868B] flex-shrink-0">
                      🖼️
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-[#86868B]">+ Hauptgericht</span>
                    </div>
                  </button>
                )}

                {/* Slots 1 & 2: Kompakt */}
                <div className="grid grid-cols-2 gap-3 border-t border-black/5 pt-4">
                  {[1, 2].map((slot) =>
                    weekPlan[dayIndex][slot] ? (
                      <div
                        key={slot}
                        className="flex items-center gap-2 p-3 rounded-xl bg-[#f8f9fa] border border-black/5"
                      >
                        <img
                          src={weekPlan[dayIndex][slot]!.dish.image}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold truncate">
                            {weekPlan[dayIndex][slot]!.dish.name}
                          </p>
                          <p className="text-xs font-semibold text-[#86868B]">
                            {formatPreis(weekPlan[dayIndex][slot]!.dish.lastPrice)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSlot(dayIndex, slot)}
                          className="text-[#86868B] hover:text-[#1a1a1a] p-1"
                          aria-label="Entfernen"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => openSlotPicker(dayIndex, slot)}
                        className="text-sm font-medium text-[#86868B] bg-[#F8F7F2] p-3 rounded-xl border-2 border-dashed border-black/15 hover:bg-[#FFDE00]/10 hover:border-[#FFDE00]/40 transition-colors flex items-center justify-center gap-2"
                      >
                        <span className="text-[#86868B]">+</span> Gericht {slot === 1 ? '2' : '3'}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </main>

      {/* 3. FLOATING ACTION BAR – S25 Daumenbereich, Akzent #FFDE00 */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-2xl border border-white/50 p-2 flex items-center justify-between">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3 font-bold text-[#1D1D1F] hover:bg-black/5 rounded-full transition-colors"
          >
            <span>🖨️</span> Drucken
          </button>
          <div className="w-px h-8 bg-black/10" />
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 py-3 font-bold text-[#1D1D1F] hover:bg-black/5 rounded-full transition-colors"
          >
            <span>🔗</span> Teilen
          </button>
          <button
            type="button"
            onClick={() => {
              triggerHaptic();
              setPickerTarget(null);
              setPickerOpen(true);
            }}
            className="ml-2 w-14 h-14 bg-[#FFDE00] text-[#1a1a1a] rounded-full shadow-lg shadow-[#FFDE00]/30 flex items-center justify-center text-2xl font-bold hover:scale-105 active:scale-95 transition-transform"
            aria-label="Gericht hinzufügen"
          >
            +
          </button>
        </div>
      </footer>

      {/* Dish-Picker Sheet – Verknüpfung mit Kochbuch-Daten */}
      <AnimatePresence>
        {pickerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setPickerOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[28px] shadow-2xl max-h-[70vh] flex flex-col"
            >
              <div className="p-4 border-b border-black/5">
                <h3 className="text-lg font-bold text-[#1D1D1F]">
                  {pickerTarget
                    ? `Gericht wählen · ${TAGE[pickerTarget.day]} Slot ${pickerTarget.slot + 1}`
                    : 'Gericht aus dem Kochbuch'}
                </h3>
                <p className="text-sm text-[#86868B] mt-1">
                  Tipp: Leeren Slot in einer Tageskarte antippen, um hier zu landen.
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                {dishes.map((dish) => (
                  <motion.button
                    key={dish.id}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectDishForSlot(dish)}
                    className="w-full flex gap-4 items-center p-4 rounded-2xl bg-[#F8F7F2] border border-black/5 hover:bg-[#FFDE00]/15 hover:border-[#FFDE00]/30 transition-colors text-left"
                  >
                    <img
                      src={dish.image}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#1D1D1F] truncate">{dish.name}</p>
                      <p className="text-sm text-[#86868B]">{dish.lastPrice}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wochenplan;
