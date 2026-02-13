# Wochenplaner & Dashboard – Cursor-Regeln

**Für Cursor:** Diese Code-Bausteine und Logik strikt einhalten. Vanilla HTML/JS (kein React).

---

## 1. Die 3-Säulen-Komponente (The UI Base)

**Regel:** Icons **immer direkt unter dem Bild** platzieren.

```html
<!-- Cursor Rule: Immer unter dem Bild platzieren -->
<div class="three-pillars" style="display:flex; justify-content:space-around; padding:8px 0; border-bottom:1px solid rgba(0,0,0,0.06);">
  <span title="Vor Ort">🍴</span>
  <span title="Abholnummer" class="pillar-abholnummer">🧾</span>
  <span title="Mehrweg" class="pillar-mehrweg">🔄</span>
</div>
```

**Icons:** 🍴 (Vor Ort, Standard) · 🧾 (Abholnummer) · 🔄 (Mehrweg)  
**Wording:** Ausschließlich **Abholnummer** (kein Ticket/Code).

---

## 2. Wochenplan-Logik

### Prompt für Cursor:
> Erstelle die Wochenplan-Ansicht. Jeder Tag ist eine Card. Wenn ein Slot angeklickt wird, öffne die Suche im Kochbuch. Bei Auswahl eines Gerichts:
> - Kopiere: `bild_url`, `name`, `preis`, `allergene`, `kategorien`
> - Setze die 3 Säulen: 🍴 ist Standard, 🧾 und 🔄 nach Auswahl
> - Berechne Verdienst: `Preis - 4,99€ (Inserat) - 0,89€ (Abholnummer-Gebühr)`
> - Der Button „Jetzt für 4,99 € aktivieren“ schaltet den Status auf `isLive: true`

### Wochenplan-Struktur:
- **Seite:** Liste von Tagen → Zeit-Slots → Eingeplante Gerichte
- **Status-Farben:** Gelb = Entwurf (gespeichert) · Grün = Live (aktiviert)

---

## 3. Dashboard-Automatik (Live-Sync)

```javascript
// Cursor Rule: Dashboard Live-Filter
function getLiveGerichte(wochenplan) {
  const now = new Date();
  return wochenplan.filter(item => {
    return item.isLive === true &&
           now >= new Date(item.startZeit) &&
           now <= new Date(item.endZeit);
  });
}
```

**Dashboard-Seite:** Zeigt nur `liveGerichte`. Inklusive großem Counter für die verkauften Abholnummern.

---

## 4. Layout-Zusammenfassung

| Seite | Inhalt |
|-------|--------|
| **Wochenplan** | Liste von Tagen → Zeit-Slots → Eingeplante Gerichte (Gelb=Entwurf / Grün=Live) |
| **Dashboard** | Zeigt nur live Gerichte (innerhalb Start/End-Zeit). Abholnummern-Counter prominent. |

### Style:
- Weißer Hintergrund (#FFFFFF)
- Schatten nur dezent für Cards
- Keine Schiefertafel-Grafiken

---

*Verbindlich für alle Änderungen am Wochenplaner und Dashboard.*
