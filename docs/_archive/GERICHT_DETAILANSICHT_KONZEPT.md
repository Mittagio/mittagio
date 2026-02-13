# Gericht-Detailansicht – Konzept (verbindlich)

Finale Zusammenfassung der Gericht-Detailansicht (Kundenansicht beim Tipp auf ein Gericht). Basiert auf den festgelegten Regeln.

---

## 1. Visuelles Layout (Clean Design)

- **Keine Schiefertafel:** Das Design ist modern und clean, ohne Schiefer-Hintergrund.
- **Kleines Foto:** Das Gerichtsbild wird als **kleines Thumbnail** (nicht im Fokus) **mittig** platziert.
- **Herz-Icon:** Ein rotes Herz mit Besteck-Symbol (Favorit) sitzt **oben rechts am Bildrand**.
- **Preis-Badge:** Der Preis wird als **dezentes Badge direkt am Bild** dargestellt.
- **Teilen-Funktion:** Ein **Share-Icon** befindet sich **oben rechts außerhalb** des Bildes.

---

## 2. Die 3 Säulen (Funktionale Badges)

Die drei Säulen werden **immer unter dem Bild** platziert:

| Icon | Bedeutung    | Logik                                      |
|------|--------------|--------------------------------------------|
| 🍴   | **Vor Ort**  | Immer aktiv/sichtbar                       |
| 🔄   | **Mehrweg**  | Toggle – farbig (aktiv) oder ausgegraut     |
| 🧾   | **Abholnummer** | Nur sichtbar, wenn vom Anbieter gebucht |

**Logik:** Icons sind farbig (aktiv) oder ausgegraut (inaktiv) gemäß der Anbieter-Auswahl.

---

## 3. Logistik & Informationen

- **Gerichtsname & Anbieter:** Dominanter Titel, Anbietername **direkt darunter**.
- **Doppelte Distanz:** Parallele Anzeige von **🚶 Zu Fuß (X Min)** und **🚗 Mit dem Auto (X Min)**.
- **Essenszeit:** Anzeige der Verfügbarkeit **von … bis … Uhr**.
- **Allergene:** Klickbarer Textlink **„Allergene anzeigen (ⓘ)“**, der ein **Overlay** mit den Übersetzungen (A–R) öffnet.

---

## 4. Interaktion (Sticky Bottom)

- **CTA-Button:** Markanter Button **„In die Mittagsbox legen“**.
- **Doppel-Logik:** Ein Klick speichert das Gericht automatisch als **Favorit** (Herz wird rot) und startet den Übergang in die **Mittagsbox**.
- **Prozess-Hinweis:** Text unter dem Button (z. B. „Dieser Anbieter nimmt nicht an der Abholnummer teil“).
- **Animation:** Das Thumbnail **verkleinert sich** und „fliegt“ beim Hinzufügen **in das Mittagsbox-Icon**.

---

*Stand: Konzept verbindlich. Änderungen nur in Absprache.*
