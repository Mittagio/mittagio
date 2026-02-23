/**
 * Inserat-Draft: Zwischenspeicher für unvollständige Inserate.
 * Key: active_inserat_draft
 */
export interface InseratDraft {
  name: string;
  price: number;
  category: string;
  allergens: string[];
  image: string; // base64 oder url
  lastStep: number;
}

/** Quick-Edit: Nur Preis/Name anpassbar auf der Renner-Karte */
export interface InseratQuickEdit {
  dishId: string;
  name: string;
  price: number;
}
