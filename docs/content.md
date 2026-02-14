# Mittagio – Content & Texte

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## 1. Verbindliche Begriffe (Terminologie)

| Begriff       | Verwendung |
|---------------|------------|
| **Abholnummer** | Immer für Zahlungs- und Abholnachweis. Nie „Ticket“, „Abholcode“, „Express-Abholung“. |
| **Mittagsbox** | Tab, Header „Mittagsbox heute“, „Zur Mittagsbox“, „Deine Mittagsbox“, Empty State „Deine Mittagsbox hat Hunger“. |
| **Favoriten**  | Tab „Favoriten“, „Deine Favoriten für heute:“, „Deine Favoriten sind leer“. |
| **Bestellung** | „Deine Bestellungen“, „Meine Bestellungen“ (Anbieter), AGB „Bestellung & Zahlung“. |
| **Wochenplan** | Anbieter-Tab „Wochenplan“, „Dein Wochenplan“, „Unser Wochenplan ist online!“. |
| **Kochbuch**   | Anbieter „Mein Kochbuch“, Kategorie-Pills (Alle, Fleisch, Eintopf, Snack, Vegetarisch), Magazin-Karte, Bar BEARBEITEN \| WOCHENPLAN \| AUSWÄHLEN, Empty „Dein Erfolgstagebuch ist noch leer.“ → [KOCHBUCH_KONZEPT.md](KOCHBUCH_KONZEPT.md). |
| **Abholungen** | Anbieter-Tab (Liste der Abholungen). |
| **Vor Ort**    | Einheitlich „Vor Ort“ (nicht „Vor Ort essen“ variabel); Emoji 🍴. |
| **Mitnehmen**  | Einheitlich; Emoji 🔄. |

---

## 2. UI-Texte (Auswahl, verbindlich)

- **Zurück:** Immer „Zurück“ + Chevron-Icon.
- **Favoriten-Header:** „Deine Favoriten für heute:“; Share rechts daneben.
- **Gericht-Detail CTA:** „In die Mittagsbox legen“.
- **Cart/Checkout:** „Abholnummer sichern“, „Zur Mittagsbox“, „Deine Mittagsbox ist noch leer“.
- **Inseratsflow:** Siehe `.cursor/rules/inseratsflow-ist-high-end-universal.mdc` – Texte dort.
- **Recht:** Bezeichnungen exakt **AGB**, **Impressum**, **Datenschutz** – keine „Kurzfassung“, professioneller Ton.
- **PWA-Tipp:** „Zum Startbildschirm hinzufügen“; Sheet „App auf dem Startbildschirm“ mit Anleitung (Teilen → Zum Startbildschirm hinzufügen).

---

## 3. Marketing & Share (Abholnummer)

- **Kernbotschaft:** Abholnummer = reserviertes Ticket zum schnellen Essen; „Schlange überspringen“, „einfach Nummer nennen“.
- **Teilen-Funktion (Anbieter):** Einheitlich; Marketing-Texte mit Emojis (🚀, 🍴, 📍, 👉), aktivierend; immer Link + Hinweis Abholnummer. Fallback: `copyToClipboard` + Toast.
- **Share Favoriten (Kunde):** Mit Abholnummer → Zeitersparnis/Skip-the-line; ohne Abholnummer → „Lockerer Lunch“, gemeinsames Mittagessen. Web Share API, Fallback Kopie + Toast.

---

## 4. Verboten in der UI

- „Ticket“, „Abholcode“, „Express-Abholung“.
- „Deine Box“ → stattdessen „Deine Mittagsbox“.
- AGB-Kurzfassung, Hinweise wie „öffnet dein E-Mail-Programm“.

---

## 5. Allergene

- Link: „Allergene anzeigen (ⓘ)“.
- Overlay-Titel: „Allergene & Informationen“.
- Disclaimer (sticky): „Für die Richtigkeit und Aktualität der Angaben ist ausschließlich der Anbieter verantwortlich. Bei schweren Allergien halten Sie bitte Rücksprache mit dem Personal vor Ort.“

---

*Weitere Marketing-Vorlagen können bei Bedarf im Projektarchiv gesucht werden.*
