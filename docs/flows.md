# Mittagio – Flows

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## 1. Inseratsflow (High-End Universal – „Salatsoße“)

**Verbindliche Definition:** `.cursor/rules/inseratsflow-ist-high-end-universal.mdc` – **DAS IST DER INSERATSFLOW.** Single-Page, eine Maske, keine Schritte 1–4.

Der Inseratsflow ist **eine** universelle Eingabemaske in allen Modi (Dashboard/Meine Küche, Kochbuch, Wochenplan). Es gibt keinen anderen Inseratsflow.

### Visuelles Fundament

- Schwebendes Haupt-Panel mit starkem Weichzeichner (`backdrop-blur`), weiße ~70 % Overlays, feine Lichtkanten.
- Akzente: Emerald #10b981 für aktive Zustände, **Gelb #FACC15** für „Jetzt für 4,99 € inserieren“.
- Terminologie: Nur **Abholnummer** – nie „Ticket“ oder „Code“.

### Master-Reihenfolge der Maske (Liquid UI, High-End Architect)

1. **Marketing-Headline:** „Dein Gericht – in unter 30 Sekunden live“ (dezent, App-Feel).
2. **Bild-Modul:** Ganz oben. Kamera / Galerie; Copy „Zeig deinen Gästen, was sie erwartet“. Nach Upload → Auto-Filter. Glassmorphism (bg-white/70, border-white/40, backdrop-blur).
3. **3 Säulen direkt unter dem Bild:** 🍴 Vor Ort, 🔄 Mehrweg, 🧾 Abholnummer (große Glas-Kacheln, Emerald wenn aktiv). 🕒 Abholzeiten klickbar.
4. **Gerichtsname:** Intelligente Autovervollständigung (triggert Kategorien/Allergene); Platzhalter z. B. „Was kochst du heute?“.
5. **Kategorie-Pills:** Große Chips (Mit Fleisch, Vegetarisch, Vegan, Salat), horizontal scrollbar.
6. **Beschreibung:** Optional.
7. **Allergene:** Collapsible (Pills); eingeklappt dezente Zeile „Allergene: A, G“.
8. **Preis:** Großes Feld, `inputmode="decimal"`; Platzhalter „Was nimmst du dafür? z.B. 8,50 €“. Enter → Tastatur zu, Scroll zu Verdienst/Weiche.
9. **Extras mit Aufpreis:** Optional, z. B. „Beilage +1,00 €“ (`w.data.extrasLabel`).
10. **Verdienst-Vorschau:** „Bei ~30 Abnahmen: ca. X €“ (30 × Preis), live bei Preiseingabe, Emerald-Box.
11. **Pricing-Weiche** (nur Modus „Jetzt Inserieren“):
    - **Option A (Gelb #FACC15):** „Jetzt für 4,99 € einmalig inserieren“ → direkt Publish-Fee-Modal.
    - **Option B (Glas, Emerald-Rahmen):** „Oder jetzt für 0,00 € inserieren (mit Abholnummer 0,89 €/Vorgang)“ → direkt Publish-Modal.
12. **Kochbuch/Wochenplan:** Nur Emerald „Speichern“ + „Stattdessen jetzt für 4,99 € inserieren“.

### Design (The High-End Look)

- Keine Schiefertafeln; Glassmorphism: `backdrop-filter:blur(24px)`, `background:rgba(255,255,255,0.72)`, `border:1px solid rgba(255,255,255,0.45)`, weiche Schatten.
- Farben: Emerald #10b981 (Erfolg/Aktiv), Signal-Gelb #FACC15 (Inserieren-CTA).
- Terminologie: ausschließlich **Abholnummer** (niemals Ticket oder Abholcode).

### Interaktions-Gesetze

- **Auto-Scroll:** Nach Preis-Enter sanft zu Verdienst-Vorschau / Pricing-Weiche.
- **Tastatur:** Nach Auswahl (Gericht, Kategorie) oder Enter sofort schließen (`blur`).
- **Haptik:** Jede Aktion kurze Vibration (`navigator.vibrate` / `haptic()`).

### Technik

- Eine Maske, **nur ein Schritt** in `buildListingStep()`. Option A und B führen direkt in `showPublishFeeModal(previewOfferFromWizard())`.
- Verdienst-Vorschau: `box.querySelector('.inserat-umsatz-vorschau')` wird bei `inputPrice.oninput` live aktualisiert (30 × Preis).

---

## 2. Gericht-Detailansicht (Kunde)

- **Layout:** Kleines Foto (Thumbnail) mittig, kein Schiefertafel-Look; Herz (Favorit) und Preis-Badge am Bild, Share oben rechts.
- **3 Säulen unter dem Bild:** 🍴 Vor Ort, 🔄 Mehrweg, 🧾 Abholnummer – farbig (aktiv) oder ausgegraut (inaktiv).
- **Infos:** Gerichtsname, Anbieter; 🚶 Zu Fuß / 🚗 Mit dem Auto (Distanz + Zeit); Essenszeit von–bis.
- **Allergene:** Klick „Allergene anzeigen (ⓘ)“ → Overlay mit Kürzeln A–R und Disclaimer (Anbieter verantwortlich).
- **CTA:** „In die Mittagsbox legen“ – speichert als Favorit und startet Übergang in Mittagsbox; optional Hinweis (z. B. „Dieser Anbieter nimmt nicht an der Abholnummer teil“).

---

## 3. Favoritenseite (Kunde)

- **Fokus:** Heute. Keine Datums-Tabs oben; Überschrift „Deine Favoriten für heute:“; Share-Icon rechts neben der Überschrift.
- **Layout:** 2×2 Grid (Mobile First, 390px, gap 12px). Alle Kacheln gleiche Höhe; Texte mit ellipsis kürzen. Bild 1:1, darunter die 3 Säulen (🍴 Vor Ort, 🧾 Abholnummer #FFD700, 🔄 Mehrweg). Keine Schiefertafeln; border-radius 16px, dezent Schatten.
- **Interaktion:** Kacheln wackeln (Jiggle), rotes „X“ zum Entfernen; „In die Mittagsbox“ = kompakter gelber Button pro Kachel.
- **Pull-to-Reveal:** Nächste Tage initial ausgeblendet, durch Ziehen am Ende sichtbar.
- **Share (Web Share API):** Dynamischer Text: mit Abholnummer → Fokus Zeitersparnis/Schlange überspringen; ohne Abholnummer → „Lockerer Lunch“. Fallback: `copyToClipboard` + Toast.
- **Anbieter ohne Angebot heute:** Kachel ausgegraut, Text „Aktuell kein Angebot für heute hinterlegt.“

---

## 4. Discover / Entdecken

- Filter-Chips (Kategorien, Tage); Karten-Layout (Polaroid/Kacheln). 3 Säulen in der Karten-Fußzeile: Slots fest 🍴 🧾 🔄; bei fehlendem Feature dezente Platzhalter-Box.

---

## 5. Abholungen (Anbieter)

- Liste der Abholungen/Bestellungen als Karten, nicht als Tabelle. Status-Pills (Offen/Abgeholt). Abholnummer-Codes sichtbar.

---

## 6. Checkout & Abholnummer

- Warenkorb → Checkout; Verzehrart (🍴 Vor Ort, 🔄 Mitnehmen); Abholzeit; Abholnummer-Option (0,89 €). Zahlung via Stripe oder Demo-Modus. Erfolgsansicht mit Abholnummer.

---

## 7. Wochenplan → Inseratsauswahl (Anbieter)

- **Plus-Button auf den Wochenplan-Kacheln:** Führt zur **Inseratsauswahl** (Sheet `#createFlowSheet`, Titel „Inseratsauswahl“). Das ist **nicht** die Kochbuch-Seite, sondern das Sheet mit „Neues Gericht erstellen“, „Aus dem Kochbuch hinzufügen“, „Beliebte Gerichte“.
- Ablauf: Klick auf „+“ im KW-Board → `weekPlanDay` und `createFlowPreselectedDate` werden auf den gewählten Tag gesetzt → Sheet Inseratsauswahl öffnet sich (`openCreateFlowSheet()`).
- Spezifikation: `docs/_archive/seiten/10_provider_wochenplan.md`.

---

## System-Prompt Referenz: „Mittagio High-End Architect“

Für Agenten (z. B. Custom Gem): Rolle = Chef-Architekt für Mittagio. Ziel = High-End-App-Feel (Liquid UI), im Gastro-Alltag intuitiv, Ästhetik (Glassmorphism), Geschwindigkeit, Haptik.

- **Design:** Keine Schiefertafeln; `backdrop-blur`, `bg-white/70`, `border-white/40`, weiche Schatten; Emerald #10b981, Gelb #FACC15; 3 Icons 🍴 🔄 🧾 immer direkt unter dem Bild.
- **Liquid Inserat-Flow:** &lt; 30 Sekunden; Bild → Gerichtsname (Autovervollständigung) → Kategorie-Pills → Allergene (collapsible) → Preis (Zahlentastatur) → Extras optional → Verdienst-Vorschau (30 × Preis) → Pricing-Weiche (4,99 € / 0,00 € + Abholnummer 0,89 €).
- **Wording:** Nur „Abholnummer“, nie „Ticket“ oder „Abholcode“.
- **Interaktion:** Auto-Scroll zum nächsten Feld; Tastatur nach Auswahl/Enter schließen; Haptik bei jeder Aktion.

*Umsetzung: `app/index.html` – u. a. `buildListingStep()`, `openOffer`, Favoriten-View `v-fav`, `#favDishes`, `.fav-grid-card`.*
