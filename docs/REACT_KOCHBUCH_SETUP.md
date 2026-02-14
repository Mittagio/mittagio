# React Kochbuch – Setup & Referenz

**Verbindliches Konzept (Vanilla + React):** [KOCHBUCH_KONZEPT.md](KOCHBUCH_KONZEPT.md)

Die Anbieter-Komponenten liegen unter **`src/components/Provider/`**:
- **MagazinKochbuch.tsx** – Referenz für das finale Kochbuch: Magazin (eine Karte), Kategorie-Pills (Alle, Fleisch, Eintopf, Snack, Vegetarisch), Bottom-Bar BEARBEITEN | WOCHENPLAN | AUSWÄHLEN, Empty State „Dein Erfolgstagebuch ist noch leer.“
- **Kochbuch.tsx** – ältere Referenz (Liste/Bestseller); Konzept ersetzt durch MagazinKochbuch.
- **Wochenplan.tsx** – KW-Navigation, Gerichte aus dem Kochbuch.
- **ProviderApp.tsx** – Tab-Umschaltung Kochbuch | Magazin | Wochenplan.

Die Vanilla-App in **`app/index.html`** implementiert das [KOCHBUCH_KONZEPT](KOCHBUCH_KONZEPT.md): `#v-provider-cookbook`, `renderCookbook()`, Magazin-Karte, Pills, eine Action-Bar.

---

## Abhängigkeiten

```bash
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

In **tailwind.config.js**: `content: ['./src/**/*.{js,ts,jsx,tsx}'],`

---

## Farbpalette (Konzept)

| Element       | Kochbuch (Konzept) |
|---------------|---------------------|
| Hintergrund   | `#F5F5F7`           |
| Primary/Aktiv | `#007AFF`           |
| Text          | `#1D1D1F` / `#86868B` |

---

## Integration

- **Auswählen:** Vanilla nutzt `openCookbookLiveSheet()` → 4,99‑€-Sheet; React kann `startListingFlow`/`onInserieren` anbinden.
- **Haptik:** `navigator.vibrate(10)` bei Aktionen; Konzept siehe [KOCHBUCH_KONZEPT.md](KOCHBUCH_KONZEPT.md).
