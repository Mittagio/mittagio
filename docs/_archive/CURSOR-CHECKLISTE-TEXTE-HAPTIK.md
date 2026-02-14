# Cursor-Checkliste: Texte & Haptik (Review nach Code-Änderungen)

Kopiere diese Fragen in den Cursor-Chat, nachdem Code für Kochbuch/Inseratsflow generiert wurde. So prüfst du, ob die Vorgaben eingehalten wurden.

---

## 1. Text-Optimierung (Minimum)

- [ ] Steht überall **„Wochenplan“** statt „In den Wochenplan“? (Sheet-Titel, Tiles, Bar-Button; Icon 📅 reicht als Kontext.)
- [ ] Steht **„Auswählen“** statt „Jetzt live schalten“ / „Jetzt Live schalten“ für den Weg in den Inseratsflow?
- [ ] Steht **„Bearbeiten“** statt „Gericht bearbeiten“ / „BEARBEITEN“ (kurz, ein Wort)?

---

## 2. Haptik-Feinkurven

- [ ] **Klick auf Karte:** Wird ein **Heavy Tap** (kurz & knackig, z. B. 18 ms) ausgelöst? Kein weiches 6 ms.
- [ ] **Bottom-Bar Slide:** Wird beim **Stopp** der Bar ein **Light Impact** (z. B. 8 ms) nach ~320 ms ausgelöst?
- [ ] **Success-Check (Kochbuch/Wizard):** Wird ein **Double-Tap**-Muster (z. B. `[12, 55, 12]`) wie ein Herzschlag genutzt – nicht ein einzelner langer Vibrationsblock?

---

## 3. Bewegungskurven (keine linearen Standard-Transitions)

- [ ] **Karten-Tap:** Verwendet die Karte `cubic-bezier(0.2, 0.8, 0.2, 1)` für die Scale-Transition (Schnellstart, sanftes Ende)?
- [ ] **Bottom-Bar:** Verwendet die Bar eine **Spring-ähnliche** Kurve (z. B. Stiffness 400, Damping 28) – z. B. `cubic-bezier(0.33, 0.6, 0.2, 1)` mit ~0.32 s – **ohne** starkes Nachschwingen?
- [ ] **Success-Checkmark:** Hat die Check-Animation ein **leichtes Nachfedern** (Spring ~500/15), z. B. scale 0.8 → 1.05 → 1 mit `cubic-bezier(0.34, 1.4, 0.64, 1)`?

---

## 4. Schnell-Check im Code

- Suche nach: `"In den Wochenplan"` → sollte 0 Treffer sein (außer in dieser Checkliste/Doku).
- Suche nach: `haptic(6)` im Kochbuch-Karten-Kontext → sollte durch Heavy Tap (z. B. 18) ersetzt sein.
- Suche nach: `ease-out` / `ease-in` für Karten- und Bar-Transition → sollte durch die definierten Bezier-Kurven ersetzt sein.

---

*Referenz: Master-Spec „Mein Kochbuch“ (Texte, Haptik, Physik).*
