# D: Recht & Hilfe

## 🎯 Ziel
Rechtstexte und Hilfe-Funktionen funktionieren zuverlässig. Text-Anpassungen für professionelleren Look.

---

## ✅ Tickets

### TICKET 12 — In-App Zurück statt Browser-Back (Impressum/Datenschutz/AGB/FAQ)
**Status:** ✅ Abgeschlossen

**Siehe:** `A_Anbieter_Routing_und_Shell.md`

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
- Router-Handler prüfen (bereits in `handleRoute()` vorhanden)

---

### TICKET 16 — Support kontaktieren: Text anpassen (ohne "öffnet E-Mail-Programm")
**Status:** ⏳ Offen

**Beschreibung:**
Button bleibt "Support kontaktieren". Kein Hinweistext "öffnet dein E-Mail-Programm". Klick darf mailto öffnen.

**mailto:** `support@mittagio.de` (Subject optional)

**Acceptance Criteria:**
- ✅ UI zeigt keinen "öffnet E-Mail-Programm" Hinweis
- ✅ Klick öffnet Support-Kontakt (mailto ok)

**TODO:**
- Button-Handler finden
- Hinweistext entfernen (falls vorhanden)
- Mailto-Link prüfen/anpassen

---

### TICKET 17 — "AGB-Kurzfassung" umbenennen zu "AGB"
**Status:** ⏳ Offen

**Beschreibung:**
Alle Labels "AGB-Kurzfassung" ersetzen durch "AGB" (professioneller Look).

**Acceptance Criteria:**
- ✅ Im Menü/Legal überall "AGB"
- ✅ Keine Stelle mit "AGB-Kurzfassung" mehr

**TODO:**
- Alle Vorkommen von "AGB-Kurzfassung" finden
- Durch "AGB" ersetzen
- `showLegalPage()` Funktion prüfen (verwendet 'agb-kurz' als Key, das ist ok)

---

## 📋 Checkliste

- [x] In-App Navigation statt Browser-Back
- [ ] FAQ Link funktioniert
- [ ] Support-Text angepasst
- [ ] "AGB-Kurzfassung" → "AGB" überall

---

## 🔍 Test-Cases

1. **Rechtstexte-Test:**
   - Impressum öffnen → URL ist `/anbieter/recht/impressum`
   - Datenschutz öffnen → URL ist `/anbieter/recht/datenschutz`
   - AGB öffnen → URL ist `/anbieter/recht/agb`
   - Zurück klicken → In-App Navigation (nicht Browser-Back)

2. **Hilfe-Test:**
   - FAQ öffnen → URL ist `/anbieter/hilfe/faq`
   - FAQ Screen wird angezeigt

3. **Text-Test:**
   - Überall "AGB" statt "AGB-Kurzfassung"
   - Support-Button ohne Hinweistext
   - Mailto-Link funktioniert
