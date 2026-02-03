# Master-Dokumentation: Favoritenseite

Anweisung für Cursor / Dokumentation für konsistentes Design und Logik der Favoritenseite (Kundenseite). Abholnummer 🧾 steht im Fokus.

---

## 1. Grundprinzip: Fokus auf HEUTE

- **Keine Datums-Navigation oben.** Die Seite startet direkt mit dem Angebot für den aktuellen Tag.
- **Überschrift:** „Deine Favoriten für heute:“ (linksbündig, fett, modern).
- **Share-Button:** Direkt rechts neben der Überschrift als dezentes Icon (Outline-Share-Symbol), spart vertikalen Platz.
- **Nächste Tage** sind standardmäßig ausgeblendet und erscheinen nur durch aktives **„Nach-unten-ziehen“ (Pull-to-Reveal)**.

---

## 2. Das Ausschlussspiel (2×2 Grid) – homogenes Kachel-Layout

- **Darstellung:** Die obersten vier Gericht-Favoriten stehen in einem **2×2 Grid** (Mobile First, 390px, **gap: 12px**).
- **Homogenität:** Alle Kacheln haben die **identische Höhe**; zu lange Texte werden mit **ellipsis** gekürzt.
- **Bild-Ratio:** Quadratisch **(1:1)**, direkt darunter die 3 Säulen.
- **Die 3 Säulen:** **🍴 Vor Ort**, **🧾 Abholnummer**, **🔄 Mehrweg** als gleich große Icons in **einer Reihe direkt unter dem Bild**; **Abholnummer 🧾** mit **Hintergrund #FFD700**.
- **Interaktion:** Die Kacheln **wackeln leicht (Jiggle-Effekt)**; **rotes „X“ oben rechts** zum Entfernen.
- **Keine Schiefertafeln:** Nur saubere, **abgerundete Karten (border-radius: 16px)** mit dezentem Schatten.
- **Button:** „In die Mittagsbox“ = **kompakter, gelber Button** am unteren Ende jeder Kachel.
- **Strikte Regel:** Siehe `docs/FAVORITEN_LAYOUT_REGEL.md`.

---

## 3. Anbieter-Favoriten & Psychologie

- **Variante 1 (Sachlich):** Wenn ein favorisierter Anbieter heute **kein Gericht** eingestellt hat, wird die Kachel **ausgegraut (Grayscale)** und mit der Nachricht versehen:  
  **„Aktuell kein Angebot für heute hinterlegt.“**
- **Ziel:** Der Nutzer sieht die „leere Küche“ des Anbieters – motivierend für aktive Nutzung des Systems.

---

## 4. Share-Logik (Web Share API) – Logik-Weiche

- **Button:** Dezentes Share-Icon direkt rechts neben dem Titel im Header (spart vertikalen Platz).
- **Web Share API:** Der Button nutzt die native Share-API des Geräts mit **dynamischem Text** (erstes Gericht der Favoriten für heute). **Link** = Link zum Gericht (z. B. `#offer=<id>`).

**Share-Text Logik-Weiche:**

- **IF** (User wählt „Team-Bestellung“): **Variante 2** – Direkt-Warenkorb-Link (zukünftig).
- **ELSE IF** (Abholnummer 🧾 vorhanden): **Variante 1** – Fokus Zeitersparnis / Skip-the-line.
- **ELSE** (Keine Abholnummer 🧾): **Variante 3** – Fokus Gericht & Treffen („Lockerer Lunch“).

**Variante 1 (Mit Abholnummer):**  
„Hey, ich hab mir das hier für heute rausgesucht: [Gericht] 🍴 Ich nehm die Abholnummer 🧾, dann können wir die Schlange einfach überspringen. Kommst du mit? [Link zum Gericht]“

**Variante 3 (Ohne Abholnummer – „Lockerer Lunch“):**  
„Hey, ich hab mir das hier für heute **bei [Anbietername]** rausgesucht: [Gericht] 🍴 Sieht **richtig** gut aus, oder? **Sollen wir heute zusammen dort Mittag machen?** [Link zum Gericht]“

- **Ehrlichkeit:** Ohne 🧾 wird keine Schnelligkeit versprochen; Fokus auf Qualität und gemeinsame Mittagspause.
- **Fallback:** Wenn `navigator.share` fehlschlägt oder nicht verfügbar: Text in Zwischenablage kopieren + Toast „In Zwischenablage kopiert“.

---

## 5. Design-Vorgaben (Clean & Modern)

- **Keine Schiefertafeln.**
- **Klare Kacheln** mit Fokus auf die Produktfotos.
- Die **3 Säulen-Icons** werden **immer direkt unter dem Bild** platziert.

---

*Stand: Master-Dokumentation verbindlich. Layout und Logik der Favoritenseite daran ausrichten.*
