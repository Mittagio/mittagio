# C: Dead Clicks & Navigation

## 🎯 Ziel
Alle Buttons müssen reagieren. Keine dead clicks mehr.

---

## ✅ Tickets

### TICKET 06 — Dead Click Fix: "Gericht hinzufügen / Neues Gericht aus Kochbuch"
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Button soll navigieren zu `/anbieter/kochbuch/neu`.

**Acceptance Criteria:**
- ✅ Klick führt immer zu "Neues Gericht" Screen
- ✅ Kein "nichts passiert" mehr

**Implementierung:**
- `btnCreateNewDish` Handler angepasst (Zeile ~5070)
- Navigiert zu `/anbieter/kochbuch/neu`

---

### TICKET 07 — Dead Click Fix: "Ins Rad für heute erstellen"
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Klick soll zu `/anbieter/inserate/neu?mode=heute` navigieren.
Wenn Feature noch nicht fertig: Toast statt nichts.

**Acceptance Criteria:**
- ✅ Klick erzeugt immer eine sichtbare Reaktion (Navigation oder Toast)
- ✅ Kein stilles Nichtstun

**Implementierung:**
- `btnProviderTodayAddDish` Handler angepasst (Zeile ~6901)
- Navigiert zu `/anbieter/inserate/neu?mode=heute`
- Router-Handler unterstützt `mode=heute` Parameter

---

### TICKET 08 — Dead Click Fix: Kochbuch "Gerichte hinzufügen"
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Klick navigiert zu `/anbieter/kochbuch/neu`.

**Acceptance Criteria:**
- ✅ Immer Navigation oder Feedback
- ✅ Kein stilles Nichtstun

**Implementierung:**
- `btnCookbookAdd` Handler angepasst (Zeile ~7645)
- Navigiert zu `/anbieter/kochbuch/neu`

---

### TICKET 13 — Profil-Menü: "Profilübersicht" funktioniert
**Status:** ⏳ Offen

**Beschreibung:**
Menüpunkt "Profilübersicht" navigiert zu `/anbieter/profil`.

**Acceptance Criteria:**
- ✅ Klick reagiert immer
- ✅ URL stimmt

**TODO:**
- Button-Handler finden
- Navigation zu `/anbieter/profil` implementieren

---

### TICKET 14 — Aktionen: "Angebot teilen" reagiert immer
**Status:** ⏳ Offen

**Beschreibung:**
Wenn Share noch nicht implementiert: Toast "Teilen kommt als nächstes."
Später: Share Sheet / Link kopieren.

**Acceptance Criteria:**
- ✅ Klick zeigt immer Feedback
- ✅ Kein dead click

**TODO:**
- Button-Handler finden
- Toast-Funktion implementieren
- "Teilen kommt als nächstes." anzeigen

---

### TICKET 15 — Hilfe: "FAQ" Link funktioniert
**Status:** ⏳ Offen

**Beschreibung:**
Menüpunkt "FAQ" navigiert zu `/anbieter/hilfe/faq`.

**Acceptance Criteria:**
- ✅ Klick öffnet FAQ Screen zuverlässig

**TODO:**
- Button-Handler finden
- Navigation zu `/anbieter/hilfe/faq` implementieren
- Router-Handler für FAQ prüfen

---

## 📋 Checkliste

- [x] "Gericht hinzufügen" funktioniert
- [x] "Inserat für heute" funktioniert
- [x] "Gerichte hinzufügen" (Kochbuch) funktioniert
- [ ] "Profilübersicht" funktioniert
- [ ] "Angebot teilen" reagiert
- [ ] "FAQ" Link funktioniert

---

## 🔍 Test-Cases

1. **Button-Test:**
   - Jeden Button klicken → muss reagieren (Navigation oder Toast)
   - Kein Button darf "nichts tun"

2. **Navigation-Test:**
   - Buttons navigieren zu korrekten URLs
   - URLs sind korrekt formatiert

3. **Feedback-Test:**
   - Wenn Feature nicht fertig → Toast anzeigen
   - Toast-Text ist hilfreich
