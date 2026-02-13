# Strikte Layout-Regel für Favoriten

**System-Vorgabe für Cursor:** Dieser Block beendet dauerhaft das "Wirrwarr" auf der Favoritenseite. Bei jeder Änderung an `v-fav` oder an Favoriten-Kacheln diese Regeln einhalten.

---

## 1. Mobile First (S25/iPhone Niveau)

- Nutze ein **exaktes 2-Spalten-Grid** mit **gap: 12px**.
- Das Layout muss auf schmalen Displays **(390px Breite)** perfekt aufgehen.

---

## 2. Homogenität

- **Alle Kacheln** im Grid müssen die **identische Höhe (height)** besitzen.
- Texte, die zu lang sind, werden mit **ellipsis** gekürzt.

---

## 3. Header-Struktur

- **Titel:** "Deine Favoriten für heute:" (linksbündig, fett, modern).
- **Share-Button:** Direkt rechts neben der Überschrift als dezentes Icon (Outline-Share-Symbol).
- Titel und Share-Button müssen in **einer flex-Row** ganz oben stehen (spart vertikalen Platz).

---

## 4. Die 3 Säulen

- **🍴 Vor Ort**, **🧾 Abholnummer**, **🔄 Mehrweg** müssen als **gleich große Icons** in **einer Reihe** direkt unter dem Bild stehen.
- Die **Abholnummer 🧾** erhält zwingend den **Hintergrund #FFD700**.

---

## 5. Keine Schiefertafeln

- Nutze **ausschließlich** saubere, **abgerundete Karten** (**border-radius: 16px**) mit **dezentem Schatten**.
- Bild-Ratio: **quadratisch (1:1)**, um Platz für die Steuerung darunter zu lassen.

---

## 6. Buttons

- **"In die Mittagsbox"** ist ein **kompakter, gelber Button** am unteren Ende jeder Kachel.

---

## 7. Header & Fokus Heute

- **Keine Datums-Tabs:** Die Buttons für „Heute“, „Donnerstag“, „Freitag“ werden nicht angezeigt – Fokus zu 100 % auf den aktuellen Tag.
- **Pull-to-Reveal:** Die nächsten Tage sind initial ausgeblendet und werden erst durch aktives Hochziehen am Ende der Seite sichtbar.

---

## 8. 3 Säulen (Abholnummer)

- **🍴 Vor Ort:** Immer aktiv/angezeigt.
- **🧾 Abholnummer:** Zentrales Monetarisierungs-Element. **Aktiv:** gelber Hintergrund (#FFD700). **Inaktiv:** Icon ausgegraut (**opacity: 0.2**) ohne gelben Hintergrund.
- **🔄 Mehrweg:** Toggle-gesteuert.

---

## 9. Share (Web Share API)

- Dynamischer Text je nach erstem Gericht und Abholnummer (siehe `docs/FAVORITENSEITE_MASTER.md`).

---

*Referenz: Favoriten-View `v-fav`, Grid-Container `#favDishes`, Karten-Klasse `.fav-grid-card`. Siehe auch `docs/FAVORITENSEITE_MASTER.md`.*
