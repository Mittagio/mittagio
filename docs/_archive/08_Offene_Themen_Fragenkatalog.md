# MITTAGIO – OFFENE THEMEN & FRAGENKATALOG
Stand: 2026-01-26
Basis: Aktueller Entwicklungsstand

## 📋 ÜBERSICHT

Dieses Dokument sammelt alle offenen Themen, unklaren Punkte und Entscheidungen, die noch getroffen werden müssen.

---

## 🔴 KRITISCHE OFFENE PUNKTE

### 1. ZAHLUNGSSYSTEM
**Status:** ❌ Nicht implementiert

**Fragen:**
- Welches Zahlungssystem soll integriert werden? (Stripe, PayPal, Mollie, etc.)
- Wie wird die Zahlungsabwicklung technisch umgesetzt?
- Werden Zahlungen sofort oder verzögert abgewickelt?
- Wie wird mit Zahlungsfehlern umgegangen?
- Gibt es eine Test-/Sandbox-Umgebung für Zahlungen?
- Wie werden Rückerstattungen gehandhabt?

**Konzept-Referenz:**
- Punkt 14: Monetarisierung
- "Online-Zahlung = Abholcode"
- "Keine Bestellung ohne Bezahlung"

---

### 2. BACKEND & DATENBANK
**Status:** ❌ Aktuell nur LocalStorage (Demo)

**Fragen:**
- Welches Backend wird verwendet? (Firebase, Supabase, Custom API?)
- Wie werden Daten synchronisiert?
- Wie wird mit Offline-Zuständen umgegangen?
- Wie werden Anbieter-Daten persistent gespeichert?
- Wie werden Bestellungen und Abholcodes gespeichert?
- Wie wird die Datenintegrität sichergestellt?

**Aktueller Stand:**
- Alle Daten in LocalStorage
- Keine Server-Synchronisation
- Keine Multi-User-Funktionalität

---

### 3. AUTHENTIFIZIERUNG & LOGIN
**Status:** ⚠️ Teilweise implementiert (Demo-Login)

**Fragen:**
- Welches Auth-System? (Firebase Auth, Auth0, Custom?)
- Wie funktioniert der "Unified Login" genau?
- Wie wird zwischen Kunde/Anbieter unterschieden?
- Wie funktioniert der "Anbieter-Modus" Switch?
- Gibt es Passwort-Reset-Funktionalität?
- Wie wird E-Mail-Verifizierung gehandhabt?
- Wie werden Rollen (Kunde/Anbieter/Admin) verwaltet?

**Aktueller Stand:**
- Demo-Login vorhanden
- Unified Login UI vorhanden
- Keine echte Authentifizierung

---

### 4. ADMIN-DASHBOARD
**Status:** ❌ Nicht implementiert

**Fragen:**
- Wie wird der Admin-Zugang realisiert? (Separate URL, Rolle im System?)
- Welche KPIs sollen genau angezeigt werden?
- Wie funktioniert die Anbieter-Status-Verwaltung?
- Wie werden interne Notizen gespeichert?
- Wie funktioniert die E-Mail-Kommunikation mit Anbietern?
- Welche Admin-Eingriffe sind erlaubt?

**Konzept-Referenz:**
- Punkt 11: Admin-Dashboard (FINAL)
- Status: Neu, Onboarded, Aktiv, Inaktiv, Deaktiviert

---

## 🟡 WICHTIGE OFFENE PUNKTE

### 5. ABRECHNUNG & AUSZAHLUNG
**Status:** ⚠️ UI vorhanden, Logik fehlt

**Fragen:**
- Wie wird der auszahlbare Betrag berechnet?
- Wie funktionieren Gebühren? (Fixpreis 4,99€ pro Inserat?)
- Wie werden Bankdaten gespeichert? (Verschlüsselt?)
- Wie funktioniert die automatische Auszahlung?
- Wie wird die manuelle Auszahlung ausgelöst?
- Wie werden Auszahlungen dokumentiert?
- Wie funktioniert der PDF-Download für Abrechnungen?

**Konzept-Referenz:**
- Punkt 8: Abrechnung (FINAL)
- Pflicht für Auszahlung: IBAN, Kontoinhaber

---

### 6. ABHOLUNGEN-SCREEN (ANBIETER)
**Status:** ⚠️ Teilweise implementiert

**Fragen:**
- Wie funktioniert die Code-Gruppierung genau? (A1-A5, B1-B5?)
- Wie wird "Abgeholt" markiert? (QR-Scan, manuell?)
- Wie funktioniert der Undo-Mechanismus genau?
- Wie werden Abholungen mit der Zahlung verknüpft?
- Wie wird verhindert, dass Codes mehrfach verwendet werden?
- Wie funktioniert die Sortierung nach Zeit/Code/Gruppe?

**Konzept-Referenz:**
- Punkt 5: Abholungen / Abholscreen (USP)
- Snackbar für Undo (ca. 5 Sekunden)

---

### 7. WOCHENKARTE ALS PDF
**Status:** ❌ Nicht implementiert

**Fragen:**
- Welche PDF-Bibliothek wird verwendet?
- Wie wird der QR-Code generiert? (Wohin führt er?)
- Wie sieht das einheitliche Layout genau aus?
- Wie werden Logos in PDF eingebunden?
- Wie wird die Wochenkarte gedruckt/exportiert?

**Konzept-Referenz:**
- Punkt 8: Wochenkarte als PDF (AUSHANG)
- DIN A4 Hochformat
- QR-Code zur Anbieter-Wochenansicht

---

### 8. STANDORT & GEOLOCATION
**Status:** ⚠️ UI vorhanden, Logik fehlt

**Fragen:**
- Wie funktioniert die Standort-Suche genau?
- Wird eine Geolocation-API verwendet?
- Wie wird "In der Nähe" berechnet?
- Wie werden Entfernungen angezeigt?
- Gibt es eine Kartenansicht?
- Wie funktioniert die Adress-Auto-Vervollständigung?

**Aktueller Stand:**
- Standort-Eingabefeld vorhanden
- "In der Nähe"-Button vorhanden
- Keine echte Geolocation-Funktionalität

---

### 9. FAVORITEN-SYSTEM
**Status:** ⚠️ Teilweise implementiert

**Fragen:**
- Wie funktionieren Anbieter-Favoriten genau?
- Wie funktionieren Gericht-Favoriten?
- Werden Favoriten synchronisiert?
- Wie werden Favoriten angezeigt?
- Gibt es Benachrichtigungen für Favoriten?

**Aktueller Stand:**
- Favoriten-UI vorhanden
- LocalStorage-Speicherung
- Keine Synchronisation

---

### 10. TEILEN-FUNKTIONALITÄT
**Status:** ⚠️ Teilweise implementiert

**Fragen:**
- Wie funktioniert das Teilen auf WhatsApp genau?
- Wie funktioniert das Teilen auf Instagram?
- Wie werden Share-Links generiert?
- Wie funktioniert "Link kopieren"?
- Wie werden geteilte Links verfolgt?
- Wie sieht die Website-Ansicht für geteilte Links aus?

**Konzept-Referenz:**
- Punkt 4: Teilen (FINAL)
- Punkt 13: Sharing

---

## 🟢 DESIGN & UX OFFENE PUNKTE

### 11. RESPONSIVE DESIGN
**Status:** ⚠️ Teilweise implementiert

**Fragen:**
- Wie sieht die Desktop-Version aus?
- Wie funktioniert die Tablet-Ansicht?
- Gibt es spezielle Mobile-Optimierungen?
- Wie werden Touch-Gesten unterstützt?
- Wie funktioniert die Swipe-Funktionalität?

---

### 12. DARK MODE
**Status:** ❌ Nicht implementiert

**Fragen:**
- Soll Dark Mode unterstützt werden?
- Wie wird der Theme-Wechsel umgesetzt?
- Gibt es automatische Erkennung (System-Preference)?

---

### 13. PWA (PROGRESSIVE WEB APP)
**Status:** ⚠️ Teilweise vorhanden

**Fragen:**
- Wie funktioniert die Offline-Funktionalität?
- Wie werden Service Workers konfiguriert?
- Wie funktioniert die Installation als App?
- Welche Icons werden verwendet?
- Wie funktioniert Push-Notifications?

**Aktueller Stand:**
- Service Worker vorhanden (sw.js)
- Keine vollständige PWA-Funktionalität

---

### 14. LOADING STATES & FEEDBACK
**Status:** ⚠️ Teilweise vorhanden

**Fragen:**
- Wie werden Ladezustände angezeigt?
- Wie funktioniert Error-Handling?
- Wie werden Erfolgs-Meldungen angezeigt?
- Gibt es Toast-Notifications?
- Wie werden Netzwerk-Fehler behandelt?

---

## 🔵 BUSINESS-LOGIK OFFENE PUNKTE

### 15. PREISMODELL
**Status:** ⚠️ Im Konzept definiert, nicht implementiert

**Fragen:**
- Wie wird der Fixpreis (4,99€ pro Inserat) abgerechnet?
- Wann wird abgerechnet? (Bei Veröffentlichung? Bei Verkauf?)
- Gibt es Rabatte für mehrere Inserate?
- Wie werden Gebühren dem Anbieter angezeigt?
- Gibt es eine Testphase ohne Gebühren?

**Konzept-Referenz:**
- "Fixpreis pro Inserat (aktuell 4,99 EUR)"
- "Keine Mindestlaufzeit"

---

### 16. BESTELLUNGEN & ABHOLCODES
**Status:** ⚠️ Teilweise implementiert

**Fragen:**
- Wie werden Abholcodes generiert? (Format, Eindeutigkeit?)
- Wie lange sind Abholcodes gültig?
- Wie wird verhindert, dass Codes mehrfach verwendet werden?
- Wie funktioniert die Validierung beim Abholen?
- Gibt es eine Ablaufzeit für Abholcodes?
- Wie werden stornierte Bestellungen gehandhabt?

**Aktueller Stand:**
- Abholcode-Generierung vorhanden
- Quick-Ticket UI vorhanden
- Keine Validierung/Verifikation

---

### 17. ALLERGENE & DIETÄTISCHE INFORMATIONEN
**Status:** ⚠️ UI vorhanden, Logik unklar

**Fragen:**
- Wie werden Allergene angezeigt?
- Gibt es eine Filterung nach Allergenen?
- Wie werden diätätische Informationen gespeichert?
- Gibt es eine Validierung der Allergen-Angaben?
- Wie werden Allergene in der Suche berücksichtigt?

**Aktueller Stand:**
- 14 Allergene als Toggle vorhanden
- Keine Filterung/Suche nach Allergenen

---

### 18. EXTRAS & MEHRWEG
**Status:** ⚠️ UI vorhanden, Logik unklar

**Fragen:**
- Wie werden Extras im Warenkorb angezeigt?
- Wie werden Extras abgerechnet?
- Wie funktioniert das Mehrweg-System genau?
- Wie wird das Pfand zurückgegeben?
- Gibt es eine Tracking-Funktion für Mehrweg-Behälter?

---

## 🟣 TECHNISCHE OFFENE PUNKTE

### 19. BILDUPLOAD & SPEICHERUNG
**Status:** ⚠️ UI vorhanden, Backend fehlt

**Fragen:**
- Wo werden Bilder gespeichert? (Cloud Storage?)
- Wie werden Bilder optimiert?
- Gibt es eine Größenbeschränkung?
- Wie werden Bilder komprimiert?
- Wie funktioniert der Auto-Zuschnitt?
- Gibt es Bild-Filter?

**Aktueller Stand:**
- Bild-Upload UI vorhanden
- Bilder als DataURL in LocalStorage
- Keine Cloud-Speicherung

---

### 20. SUCHFUNKTIONALITÄT
**Status:** ⚠️ Teilweise implementiert

**Fragen:**
- Wie funktioniert die Gericht-Suche genau?
- Gibt es eine Volltext-Suche?
- Wie werden Suchergebnisse sortiert?
- Gibt es Suchvorschläge?
- Wie funktioniert die Standort-Suche?

**Aktueller Stand:**
- Standort-Suche vorhanden
- Kategorie-Filter vorhanden
- Keine Volltext-Suche

---

### 21. BENACHRICHTIGUNGEN
**Status:** ❌ Nicht implementiert

**Fragen:**
- Welche Benachrichtigungen gibt es?
- Wie werden Push-Notifications umgesetzt?
- Wie werden E-Mail-Benachrichtigungen versendet?
- Gibt es In-App-Benachrichtigungen?
- Wie werden Benachrichtigungen konfiguriert?

---

### 22. ANALYTICS & TRACKING
**Status:** ❌ Nicht implementiert

**Fragen:**
- Welches Analytics-Tool wird verwendet?
- Welche Events werden getrackt?
- Wie wird Datenschutz gewährleistet?
- Gibt es eine Conversion-Tracking?
- Wie werden Fehler getrackt?

---

## 🟠 CONTENT & TEXTE OFFENE PUNKTE

### 23. RECHTSTEXTE
**Status:** ⚠️ Platzhalter vorhanden

**Fragen:**
- Wie sehen die finalen Impressum-Texte aus?
- Wie sehen die AGB aus?
- Wie sieht die Datenschutzerklärung aus?
- Werden die Texte automatisch personalisiert?
- Wie werden rechtliche Änderungen verwaltet?

**Aktueller Stand:**
- Impressum, AGB, Datenschutz als Platzhalter
- Keine finalen Texte

---

### 24. FAQ-INHALTE
**Status:** ⚠️ Teilweise vorhanden

**Fragen:**
- Sind alle FAQ-Fragen final?
- Gibt es weitere FAQ-Bereiche?
- Wie werden FAQ aktualisiert?
- Gibt es eine Suche in FAQs?

**Aktueller Stand:**
- FAQ für Kunden vorhanden
- FAQ für Anbieter vorhanden
- Inhalte teilweise final

---

### 25. MICROCOPY & FEHLERMELDUNGEN
**Status:** ⚠️ Teilweise vorhanden

**Fragen:**
- Sind alle Texte final?
- Gibt es ein Text-Styleguide?
- Wie werden Fehlermeldungen formuliert?
- Gibt es eine Übersetzung (i18n)?

---

## 🔴 PRIORITÄTEN & NÄCHSTE SCHRITTE

### HOCH (MVP-Kritisch)
1. ✅ Zahlungssystem integrieren
2. ✅ Backend & Datenbank aufsetzen
3. ✅ Authentifizierung implementieren
4. ✅ Abholcode-Validierung
5. ✅ Bestellungs-Flow komplett

### MITTEL (Wichtig für Launch)
6. ⚠️ Abrechnung & Auszahlung
7. ⚠️ Admin-Dashboard
8. ⚠️ Wochenkarte PDF
9. ⚠️ Standort & Geolocation
10. ⚠️ Rechtstexte finalisieren

### NIEDRIG (Nice-to-Have)
11. ⚠️ Dark Mode
12. ⚠️ Analytics
13. ⚠️ Push-Notifications
14. ⚠️ Erweiterte Suche
15. ⚠️ Mehrweg-Tracking

---

## 📝 NOTIZEN & ENTSCHEIDUNGEN

### Bereits getroffene Entscheidungen:
- ✅ Single-Page-App (SPA) in index.html
- ✅ LocalStorage für Demo
- ✅ Button-geführter Flow (keine Formulare)
- ✅ Unsplash-Bilder für Demo (urheberrechtsfrei)
- ✅ Lucide Icons
- ✅ Glassmorphism für Navigation

### Noch zu treffende Entscheidungen:
- ❓ Backend-Technologie
- ❓ Zahlungssystem
- ❓ Hosting (Netlify bestätigt?)
- ❓ Domain & Branding
- ❓ Go-Live Datum

---

## 🔄 VERSIONSHISTORIE

- **2026-01-26**: Erste Version des Fragenkatalogs erstellt
- Basierend auf Konzept-Dokumenten und aktuellem Code-Stand

---

**Nächste Schritte:**
1. Prioritäten klären
2. Entscheidungen zu kritischen Punkten treffen
3. Technologie-Stack finalisieren
4. MVP-Scope definieren
