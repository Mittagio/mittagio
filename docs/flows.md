# Mittagio – Flows

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## 1. Inseratsflow

**Einzig verbindliche Quelle:** `.cursor/rules/inseratsflow-ist-high-end-universal.mdc`

Layout + Logik: `app/index.html` → `buildListingStep()` (Single-Page). Keine weiteren Flow-Docs.

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

## System-Prompt Referenz

- **Design:** Keine Schiefertafeln; Glassmorphism, Emerald, Gelb; 3 Icons 🍴 🔄 🧾. Wording: nur „Abholnummer“.
- **Inseratsflow:** Siehe `.cursor/rules/inseratsflow-ist-high-end-universal.mdc` – eine Quelle, keine Duplikate.
