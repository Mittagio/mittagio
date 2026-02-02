# Master-Dokumentation: Favoritenseite (Kundenseite)

Anweisung für konsistentes Design und Logik. Abholnummer 🧾 steht im Fokus.

---

## 1. Grundprinzip: Fokus auf HEUTE

- **Keine Datums-Navigation oben.** Die Seite startet direkt mit dem Angebot für den aktuellen Tag.
- **Überschrift:** „Dein Menü für heute“.
- Nächste Tage sind **standardmäßig ausgeblendet** und erscheinen nur durch aktives **„Nach-unten-ziehen“ (Pull-to-Reveal)**.

---

## 2. Das Ausschlussspiel (2x2 Grid)

- **Darstellung:** Die obersten vier Gericht-Favoriten stehen in einem **2x2 Grid**.
- **Interaktion:** Die Kacheln **wackeln leicht (Jiggle-Effekt)**, um zur Entscheidung aufzufordern. Über ein **rotes „X“ oben rechts** werden Gerichte entfernt, bis die Wahl feststeht.
- **Die 3 Säulen:** Unter jedem Bild stehen fest die Icons: **🍴 (Vor Ort)**, **🧾 (Abholnummer)** und **🔄 (Mehrweg)**.
- **Monetarisierung:** Die **Abholnummer 🧾** ist das wichtigste Element und wird durch einen **gelben Hintergrund (#FFD700)** visuell hervorgehoben.

---

## 3. Anbieter-Favoriten & Psychologie

- **Variante (sachlich):** Wenn ein favorisierter Anbieter heute **kein Gericht** eingestellt hat, wird die Kachel **ausgegraut (Grayscale)** und mit der Nachricht versehen: **„Aktuell kein Angebot für heute hinterlegt.“**
- **Ziel:** Der Anbieter sieht seine „leere Küche“, was ihn motiviert, das System aktiv zu nutzen.

---

## 4. Viralität: „Share my Lunch“

- Ein **dezenter Button** unter dem Grid erlaubt es, die Auswahl zu teilen.
- **Inhalt beim Teilen:** Ein strukturierter Text, der die Bequemlichkeit betont: *„Schau mal, was ich heute esse! 🍴 Kein Warten dank Abholnummer 🧾.“*

---

## 5. Design-Vorgaben (Clean & Modern)

- **Keine Schiefertafeln.**
- Klare Kacheln mit Fokus auf die **Produktfotos**.
- Die **3 Säulen-Icons** werden immer **direkt unter dem Bild** platziert.

---

*Referenz für Cursor-Regel und Implementierung.*
