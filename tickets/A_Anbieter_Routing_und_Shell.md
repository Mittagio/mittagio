# A: Anbieter Routing & Shell

## 🎯 Ziel
Der Anbieterbereich bekommt eine eigene App-Shell mit echten URL-Routen. Klare Trennung vom Customer-Bereich.

---

## ✅ Tickets

### TICKET 01 — Anbieterbereich bekommt eigene App-Shell + echte Routes
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Erstelle einen separaten Anbieter-Bereich unter `/anbieter/*` mit eigener Layout-Shell (Header + Anbieter-BottomNav). `/anbieter` soll automatisch auf `/anbieter/dashboard` weiterleiten.

**Acceptance Criteria:**
- ✅ Aufruf `/anbieter` → landet immer auf `/anbieter/dashboard`
- ✅ Im Anbieterbereich sind Header + BottomNav konsistent
- ✅ Discover/Customer-Bereich nutzt nicht dieselbe Shell wie Anbieter

**Implementierung:**
- Routing-System in `index.html` (Zeile ~9684)
- `navigateTo()` Funktion für URL-basierte Navigation
- `handleRoute()` für Route-Handling
- Provider-Mode setzt automatisch Provider-Navigation

---

### TICKET 02 — "Zum Anbieterbereich" wechselt nicht nur BottomNav, sondern View
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Der Button "Zum Anbieterbereich" (von Discover/Profil) muss per Navigation auf `/anbieter/dashboard` gehen, statt nur die BottomNav zu ändern.

**Acceptance Criteria:**
- ✅ Klick → Dashboard-Seite wird sichtbar (nicht Discover-Maske)
- ✅ URL ist `/anbieter/dashboard`
- ✅ BottomNav zeigt Anbieter-Tabs

**Implementierung:**
- Alle `setMode('provider')` Aufrufe durch `navigateTo('/anbieter/dashboard')` ersetzt
- Button-Handler aktualisiert

---

### TICKET 11 — Logo-Klick im Anbieterbereich immer Dashboard
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Klick auf das Mittagio-Logo im Anbieterbereich navigiert immer zu `/anbieter/dashboard`.

**Acceptance Criteria:**
- ✅ Egal auf welcher Anbieter-Seite: Logo → Dashboard
- ✅ Keine History-Abhängigkeit

**Implementierung:**
- Logo-Element mit `id="appLogo"` versehen
- Click-Handler prüft Mode und navigiert entsprechend

---

### TICKET 12 — In-App Zurück statt Browser-Back (Impressum/Datenschutz/AGB/FAQ)
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Der Zurück-Button auf Rechtstexten/FAQ darf nicht `history.back()` nutzen. Stattdessen explizit in der App navigieren.

**Routing:**
- FAQ: `/anbieter/hilfe/faq`
- Impressum: `/anbieter/recht/impressum`
- Datenschutz: `/anbieter/recht/datenschutz`
- AGB: `/anbieter/recht/agb`

**Zurück-Ziel:**
- Standard: `/anbieter/hilfe`
- Fallback: `/anbieter/dashboard`

**Acceptance Criteria:**
- ✅ Zurück führt nie aus der App raus
- ✅ Kein "Browser-Zurück" Verhalten

**Implementierung:**
- `goBackFromLegalPage()` nutzt `navigateTo()` statt `history.back()`
- `showLegalPage()` aktualisiert URL im Provider-Mode

---

## 📋 Checkliste

- [x] Routing-System implementiert
- [x] `/anbieter` → `/anbieter/dashboard` Redirect
- [x] Alle Provider-Routen definiert
- [x] Logo-Klick funktioniert
- [x] In-App Navigation statt Browser-Back
- [x] BottomNav zeigt korrekte Tabs

---

## 🔍 Test-Cases

1. **Routing-Test:**
   - `/anbieter` aufrufen → sollte zu `/anbieter/dashboard` weiterleiten
   - `/anbieter/dashboard` aufrufen → Dashboard wird angezeigt
   - Refresh auf `/anbieter/dashboard` → bleibt auf Dashboard

2. **Navigation-Test:**
   - Logo klicken → navigiert zu Dashboard
   - "Zum Anbieterbereich" klicken → navigiert zu Dashboard
   - BottomNav-Tabs klicken → URL ändert sich korrekt

3. **Zurück-Button-Test:**
   - Rechtstext öffnen → URL ist `/anbieter/recht/...`
   - Zurück klicken → navigiert zu `/anbieter/hilfe` oder Dashboard
   - Kein Browser-Back-Verhalten
