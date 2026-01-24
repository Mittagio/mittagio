# B: Dashboard & Profil UI

## 🎯 Ziel
Dashboard und Profil aufräumen: Keine überflüssigen Header, saubere Kontaktkarte, klare Struktur.

---

## ✅ Tickets

### TICKET 03 — Dashboard Header vereinfachen
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Entferne im Dashboard den oberen Block ("Adresse hinzufügen", "Anbieter", etc.). Oben sollen nur 3 Kennzahlen/Tabs stehen: Inserate, Abholung, Kochbuch.

**Acceptance Criteria:**
- ✅ Keine Texte "Adresse hinzufügen", "Anbieter"
- ✅ Keine Welcome-Box "Willkommen bei … starte …"
- ✅ Nur 3 Tabs/Stats sichtbar: Inserate/Abholung/Kochbuch

**Implementierung:**
- `providerIdentityCard` Block entfernt (Zeile ~1752)
- `renderProviderHome()` angepasst (Provider Identity Card Code entfernt)

---

### TICKET 04 — Welcome-Text entfernen (Dashboard)
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Entferne "Willkommen bei Mittagio…" und "starte mit einem ersten Gericht…".

**Acceptance Criteria:**
- ✅ Diese Texte kommen nirgends mehr im Dashboard vor
- ✅ Haupt-CTA bleibt: "Inserat erstellen"

**Implementierung:**
- `providerEmptyDashboard` Block entfernt (Zeile ~1808)
- JavaScript-Code für Empty-State entfernt (Zeile ~6981)

---

### TICKET 05 — Stepper/Tags über "Inserat erstellen" (grau, mit Pfeilen)
**Status:** ✅ Abgeschlossen

**Beschreibung:**
Über dem Button "Inserat erstellen" soll optional eine graue Tag-Leiste stehen (Stepper).

**Beispiel Tags:**
➜ Inserat erstellen ➜ Gericht wählen ➜ Abholcode (optional)

**Acceptance Criteria:**
- ✅ Tags sind dezent/grau und nicht dominant
- ✅ Kein zusätzlicher Onboarding-Text nötig

**Implementierung:**
- `providerStepperTags` Div hinzugefügt (Zeile ~1818)
- Grauer Hintergrund, dezent gestylt

---

### TICKET 09 — Anbieter Profil: Header aufräumen (freundliche Kontaktkarte)
**Status:** ⏳ Offen

**Beschreibung:**
Im Profil oben den "System-Header" entfernen (Anbieter/Ort fehlt/11:30/14:00/Profil bearbeiten). Stattdessen eine saubere Kontaktkarte, die nur Felder zeigt, wenn sie vorhanden sind (Name, Adresse, Abholzeiten, optional Telefon/E-Mail).

**Acceptance Criteria:**
- ✅ Oben kein "Ort fehlt", keine Uhrzeit-Zeile
- ✅ Keine "Profil bearbeiten" Aktion im Header
- ✅ Leere Felder werden nicht angezeigt (wenn Adresse fehlt → kein Platzhalter)

**TODO:**
- Profil-Header HTML anpassen
- `renderProviderProfile()` Funktion anpassen
- Kontaktkarte-Komponente erstellen

---

### TICKET 10 — "Profil bearbeiten" nach unten verschieben
**Status:** ⏳ Offen

**Beschreibung:**
Unter "Mein Profil" ein Button/List-Item "Profil bearbeiten" hinzufügen → `/anbieter/profil/bearbeiten`.

**Acceptance Criteria:**
- ✅ Bearbeiten ist nicht im Header
- ✅ Bearbeiten ist im Abschnitt "Mein Profil"
- ✅ Klick führt zuverlässig zum Edit-Screen

**TODO:**
- "Profil bearbeiten" Button aus Header entfernen
- Button in "Mein Profil" Abschnitt hinzufügen
- Navigation zu `/anbieter/profil/bearbeiten` implementieren

---

## 📋 Checkliste

- [x] Dashboard Header entfernt
- [x] Welcome-Text entfernt
- [x] Stepper/Tags hinzugefügt
- [ ] Profil-Header aufgeräumt
- [ ] Kontaktkarte implementiert
- [ ] "Profil bearbeiten" nach unten verschoben

---

## 🔍 Test-Cases

1. **Dashboard-Test:**
   - Dashboard öffnen → nur 3 KPI-Tabs sichtbar
   - Kein "Adresse hinzufügen" Block
   - Kein "Willkommen bei Mittagio" Text
   - Stepper/Tags über "Inserat erstellen" sichtbar

2. **Profil-Test:**
   - Profil öffnen → saubere Kontaktkarte oben
   - Nur vorhandene Felder werden angezeigt
   - "Profil bearbeiten" im Profil-Abschnitt (nicht im Header)
