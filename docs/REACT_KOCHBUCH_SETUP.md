# React Kochbuch & Wochenplan – Setup & Integration

Die Anbieter-Komponenten liegen unter **`src/components/Provider/`**:
- **Kochbuch.tsx** – Gerichteliste, Bestseller-Strip, Auswählen → Inseratsflow, Wochenplan-Sheet. Die Vanilla-App in `app/index.html` hat **Kategorie-Pills** oben (Alle, Vegetarisch, Vegan, Fisch, Mit Fleisch) statt Tabs.
- **Wochenplan.tsx** – KW-Navigation, 7 Tage × 3 Slots, Gerichte aus dem Kochbuch per Klick in leere Slots (Dashed Boxes) einfügbar; Floating Action Bar (Drucken, Teilen, +).
- **ProviderApp.tsx** – Einstieg mit Tab-Umschaltung Kochbuch | Wochenplan.

**main.tsx** rendert `<ProviderApp />`. Die aktuelle Mittagio-App ist eine Vanilla-SPA in `app/index.html`; diese React-Dateien dienen als Referenz oder für eine spätere Migration.

---

## Abhängigkeiten

```bash
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

In **tailwind.config.js** (oder `.ts`) den Pfad zu den React-Dateien angeben, z. B.:

```js
content: ['./src/**/*.{js,ts,jsx,tsx}'],
```

Optional – **Farbpalette** (Mittagio Provider vs. Apple-Style):

| Element          | Mittagio (Standard) | Apple-Style      |
|------------------|----------------------|------------------|
| Hintergrund     | `#F8F7F2`            | `#F5F5F7`        |
| Primary / Akzent | `#FFDE00`            | `#007AFF`        |
| Main Text        | `#1D1D1F`            | `#1D1D1F`        |
| Secondary Text   | `#86868B`            | `#86868B`        |
| Success          | `#FFDE00` (Haken)    | `#34C759`        |

Die Komponente nutzt aktuell die **Mittagio-Palette** (#F8F7F2, #FFDE00).

---

## Globales CSS

Die Klasse **`no-scrollbar`** und Basis-Styles liegen in **`src/styles/globals.css`**. In der React-App einmal global einbinden, z. B.:

- **Vite/React:** in `main.tsx` / `index.tsx`: `import './styles/globals.css';`
- **Next.js:** in `app/layout.tsx` oder `pages/_app.tsx`: `import '../styles/globals.css';`

Inhalt von `globals.css`: Body, `.no-scrollbar`, `.glass-effect` (siehe Datei).

---

## Integration: Button „Auswählen“ ↔ Inseratsflow

**Option A – React (Router/State):**  
Die Komponente akzeptiert die Prop **`onInserieren`**:

```tsx
<Kochbuch onInserieren={({ dishId, dish }) => {
  // Zum Inseratsflow navigieren oder State setzen
  navigate('/inserat', { state: { dishId, dish } });
  // oder: setInseratDraft({ dishId, ... });
}} />
```

**Option B – Vanilla-App (app/index.html):**  
Wenn die React-Komponente in die bestehende SPA eingebunden wird (z. B. über ein React-Root), kann sie die globale Funktion **`startListingFlow`** nutzen. Die Komponente ruft intern auf:

```ts
window.startListingFlow?.({ dishId: selectedDish.id });
```

Dafür muss `startListingFlow` im Vanilla-Code global verfügbar sein (z. B. `window.startListingFlow = startListingFlow`).

---

## Haptik & Animationen

- **Bottom-Bar:** Spring-Animation beim Ein-/Ausblenden (stiffness: 400, damping: 28).
- **Wochenplan-Sheet:** Gleiche Spring-Animation; Tage-Buttons erscheinen mit leichtem Hüpfen (y: 10 → 0).
- **Karten:** `whileTap={{ scale: 0.97 }}` mit kurzer Transition (0.1 s), Rückkehr ohne Verzögerung.
- **Vibration:** `navigator.vibrate(10)` bei Auswahl, `[10, 30, 10]` beim Speichern im Wochenplan.

Diese Anweisungen sind im Code umgesetzt.
