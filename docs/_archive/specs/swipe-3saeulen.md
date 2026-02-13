# Cursor-Regeln: Swipe-Modus & 3-Säulen-System (Kopierblock)

Die folgenden Zeilen kannst du in `.cursorrules` einfügen oder als Referenz nutzen.
Die Regeln sind bereits in `.cursorrules` und `MITTAGIO_UI_FRAMEWORK.md` integriert.

---

```markdown
## Swipe-Modus & 3-Säulen-System

### 1. Benennung & Begriffe
- Die Funktion heißt konsistent **„Swipe-Modus“**.
- ❌ **Niemals:** „Ticket“, „Abholcode“.
- ✅ **Nur:** **Abholnummer** (Nutzer-Identifikation).

### 2. Drei-Säulen-Regel (Emoji-Logik)
Jede Karte im Swipe-Modus hat **zwingend genau drei Symbole** in der Fußzeile – **ohne begleitenden Text**:

| Slot | Symbol | Bedeutung |
|------|--------|-----------|
| 1 | 🍴 | Vor Ort (Essen vor Ort möglich) |
| 2 | 🧾 | Abholnummer (wird bei Auswahl generiert) |
| 3 | 🔄 | Mehrweg (Nachhaltiges Pfandsystem) |

- Slots bleiben fest; bei fehlendem Feature: dezente Platzhalter-Box, kein Wegrücken.

### 3. UI & Interaktion
- **Stil:** Polaroid (Sofortbildkamera) für Gerichte; **reinweiß**, keine Schiefertafel.
- **Button-Leiste** (drei zentrale Aktions-Buttons am unteren Rand):
  - **Links (Rot):** ❌ Keine Lust
  - **Mitte (Grau/Blau):** 🔄 Nächstes Gericht
  - **Rechts (Grün):** ❤️🍴 Will ich / Favorit

### 4. System-Beschränkungen
- Es darf **nur eine aktive Sitzung pro Nutzer** geben.
- „Vor-Ort-Logik“ **nicht** in Nutzerkommunikation verwenden.
```

---

**Stand:** 27.01.2026
