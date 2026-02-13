# Gericht-Detailansicht

Kundenseite (Sheet/Modal beim Tipp auf eine Gerichtskarte)

---

## Konzept

Kundenansicht beim Tipp auf ein Gericht: alle Infos auf einen Blick, Favorit setzen, in die Mittagsbox legen. Clean Design, kein Schiefer-Hintergrund.

---

## Aufbau

1. **Bildbereich:** Kleines Thumbnail mittig; oben rechts am Bild: Herz (Favorit), Preis-Badge; außerhalb des Bildes: Share-Icon.
2. **3 Säulen:** Direkt unter dem Bild: 🍴 Vor Ort (immer), 🔄 Mehrweg (Toggle), 🧾 Abholnummer (nur wenn gebucht).
3. **Logistik:** Gerichtsname (dominant), Anbietername darunter; 🚶 Zu Fuß (Min) + 🚗 Mit dem Auto (Min); Essenszeit von–bis; Link „Allergene anzeigen (ⓘ)“ → Overlay A–R.
4. **Sticky Bottom:** CTA „In die Mittagsbox legen“; darunter Prozess-Hinweis (z. B. „Dieser Anbieter nimmt nicht an der Abholnummer teil“).

---

## Regeln

- Ein Klick auf „In die Mittagsbox legen“ speichert das Gericht als Favorit (Herz wird rot) und startet den Übergang in die Mittagsbox.
- Animation: Thumbnail verkleinert sich und „fliegt“ in das Mittagsbox-Icon.
- Icons farbig (aktiv) oder ausgegraut (inaktiv) gemäß Anbieter-Auswahl.
- Keine Schiefertafeln; klare Kacheln, Fokus auf Produktfotos.
