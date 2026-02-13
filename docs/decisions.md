# Mittagio – Entscheidungen

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## 1. Monetarisierung & Preise

- **Inserat (Fixkosten):** Jedes Inserat kostet **4,99 €** einmalig (Option A im Flow „Jetzt Inserieren“).
- **Abholnummer:** **0,89 €** pro Vorgang (inkl. Gebühren); Option B „0,00 € inserieren mit Abholnummer (0,89 €/Vorgang)“.
- **Verdienst-Vorschau:** Anbieter sieht in Echtzeit den Betrag nach Abzug der Gebühren.
- **Zeitmodell:** Zeitbasiert (Start-/Endzeit), keine Bestandsführung/Inventur.

---

## 2. Terminologie

- **Abholnummer** ist der einzige zulässige Begriff für den Abholnachweis. **Verboten:** „Ticket“, „Abholcode“, „Code“.
- **Mittagsbox** für den Kunden-Bereich (nicht „Abholbox“, nicht „Deine Box“).
- Konsistente Verwendung in UI, Marketing und Anbieter-Kommunikation.

---

## 3. Inseratsflow

- **Eine** universelle Eingabemaske („Salatsoße“) für Dashboard, Kochbuch und Wochenplan.
- **Pricing-Weiche** nur im Modus „Jetzt Inserieren“: Option A (4,99 €) vs. Option B (0,00 € + Abholnummer 0,89 €/Vorgang). In Kochbuch/Wochenplan nur „Speichern“, keine Weiche.
- Reihenfolge: Gerichtsname → Kategorie → Beschreibung → Preis → Allergene → Foto → 4 Smart-Icons (🕒 🍴 🔄 🧾).

---

## 4. Design

- **Anbieter/Inseratsflow:** Glassmorphism, Emerald #10b981, Gelb #FACC15 für den 4,99-€-CTA; hell, aufgeräumt.
- **Kunde:** Clean, modern; 3 Säulen (🍴 Vor Ort, 🔄 Mehrweg, 🧾 Abholnummer); Favoriten 2×2 Grid, Abholnummer-Badge #FFD700; keine Schiefertafeln.
- **Listen:** Karten statt Tabellen; Premium-App-Charakter.

---

## 5. Projekt & Pfad

- **Source of Truth:** Nur die 6 Dateien unter `docs/` (architecture, flows, ui-kit, content, rules, decisions). Keine neuen MDs.
- **Arbeitspfad:** `C:\Users\quach\Documents\GitHub\mittagio` (GitHub); kein Desktop-Pfad verwenden.

---

## 6. Kunde / Anbieter

- Getrennte Layouts und Kontexte; keine globalen Layout-Regeln für beide Modi. Anbieter-Portal-Einstieg nur in „Meins“ (Icon + Menüpunkt). View-Wechsel: zuerst neue View aktivieren, dann andere ausblenden (kein leerer Frame).
