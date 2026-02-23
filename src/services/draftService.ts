const ACTIVE_INSERAT_DRAFT_KEY = 'active_inserat_draft';

export interface InseratDraft {
  name: string;
  price: number;
  category: string;
  allergens: string[];
  image: string;
  lastStep: number;
}

export function getDraft(): InseratDraft | null {
  try {
    const raw = localStorage.getItem(ACTIVE_INSERAT_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as InseratDraft;
    return parsed.name?.trim() ? parsed : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: Partial<InseratDraft>): void {
  const existing = getDraft() || {
    name: '',
    price: 0,
    category: 'Fleisch',
    allergens: [],
    image: '',
    lastStep: 1,
  };
  const merged = { ...existing, ...draft };
  localStorage.setItem(ACTIVE_INSERAT_DRAFT_KEY, JSON.stringify(merged));
}

export function clearDraft(): void {
  localStorage.removeItem(ACTIVE_INSERAT_DRAFT_KEY);
}

export function hasDraft(): boolean {
  const d = getDraft();
  return !!d && !!d.name?.trim();
}
