# 📌 Cursor-Gesamtzusammenfassung

## Mittagio – Stand **ab 24.01.2026**

---

## 1️⃣ Grundprinzip Mittagio

* Mittagio ist eine **Vermittlungs- & Entdeckungsplattform**
* **Kein Marktplatz**
* **Kein Checkout**
* **Kein Abo**
* **Keine Mindestlaufzeit**
* **Kein Vertrag mit Endkunden**

👉 Verträge entstehen **ausschließlich zwischen Anbieter und Endkunde vor Ort**

---

## 2️⃣ Klare Trennung der Bereiche

### 🔹 Endkundenbereich

* öffentlich
* ohne Login
* ohne Profil
* ohne Registrierung

### 🔹 Anbieterbereich

* eigener App-Bereich
* eigenes Dashboard
* eigene Navigation
* eigene Rechtstexte

❌ **Keine Vermischung von Endkunden- & Anbieter-Logik**

---

## 3️⃣ Endkunden – Datenschutz & UX (WICHTIG)

### Endkunden-Datenschutz

* Gilt für **Besucher & Endkunden**
* Route: `/datenschutz`
* Keine Registrierung erforderlich
* Keine Bestellungen
* Keine Zahlungen
* Kein Nutzerkonto
* Kein Marketing-Tracking
* Keine Werbung
* DSGVO-konform (MVP-Level)

### Erlaubte Endkunden-Daten

* Technisch notwendige Daten
* Standort max. **Stadt / Region**
* Session-basierte Anzeige (z. B. zuletzt angesehen)

### Nicht erlaubt

* Profil anlegen
* „Meine Bestellungen"
* Warenkorb / Box / Checkout
* Abholcodes für Endkunden
* Personalisierte Nutzerprofile

---

## 4️⃣ Endkunden-Screen „Mein Mittagio" (REFORMIERT)

### ❌ Entfernt

* „Profil anlegen"
* „Meine Bestellungen"
* „Zur Mittagsbox"
* Alles mit Bestell- oder Account-Logik

### ✅ Erlaubt

* Neutraler Willkommenstext
  → *„Finde frische Mittagsangebote in deiner Nähe."*
* „Angebote entdecken"
* „Kürzlich angesehene Anbieter / Angebote" (session-basiert)
* „Als Anbieter starten"

### Routing

* Angebote entdecken → `/entdecken`
* Als Anbieter starten → `/anbieter/dashboard`

---

## 5️⃣ Anbieterbereich – Routing & App-Feeling

### Basis

* Alle Anbieter-Seiten liegen unter `/anbieter/*`
* Eigene Layout-Shell (Header + Anbieter-BottomNav)
* `/anbieter` → Redirect auf `/anbieter/dashboard`

### Logo-Regel

* Klick auf Mittagio-Logo im Anbieterbereich
  → **immer `/anbieter/dashboard`**

### Back-Regel

* ❌ Kein Browser-Back (`history.back()`)
* ✅ Immer explizite In-App-Navigation
* Fallback immer: `/anbieter/dashboard`

---

## 6️⃣ Anbieter-Dashboard

### Dashboard ist **kein Onboarding**

❌ Kein:

* „Willkommen bei…"
* „Starte mit deinem ersten Gericht"
* „Adresse hinzufügen"

### ✅ Dashboard zeigt nur

* Inserate
* Abholung
* Kochbuch
* CTA: **Inserat erstellen**
* Optional: graue Stepper-Tags

---

## 7️⃣ Anbieter-Profil (intern)

### Header

* Nur freundliche Kontaktkarte
* Anzeigen **nur**, wenn Daten vorhanden:

  * Ladenname
  * Adresse
  * Abholzeiten
  * optional Telefon oder E-Mail

❌ Kein:

* „Ort fehlt"
* System-Uhrzeiten
* „Profil bearbeiten" im Header

### Profil bearbeiten

* Nur unter **„Mein Profil"**
* Route: `/anbieter/profil/bearbeiten`

---

## 8️⃣ Anbieter → Endkunden-Profilanzeige

Endkunden sehen **nur**:

* Freigegebene Kontaktdaten
* Adresse (falls angegeben)
* Abholzeiten

❌ Keine internen Daten
❌ Keine Anbieter-IDs
❌ Keine Bearbeitungsoptionen

---

## 9️⃣ Dead-Click-Regel (sehr wichtig)

👉 **Jeder klickbare Button MUSS reagieren**

Erlaubt:

* Navigation
* Toast / Hinweis („kommt als nächstes")

❌ Verboten:

* Klick ohne Reaktion

---

## 🔟 Rechtstexte – Struktur

### Anbieter-Recht

* `/anbieter/recht/agb`
* `/anbieter/recht/impressum`
* `/anbieter/recht/datenschutz`

Navigation:

* Zurück → `/anbieter/hilfe`
* Fallback → `/anbieter/dashboard`

### Endkunden-Recht

* Datenschutz → `/datenschutz`
* Impressum → `/impressum`
* AGB → `/agb`

❌ Kein Begriff „Kurzfassung"
✅ Einheitlich professioneller Ton

---

## 1️⃣1️⃣ AGB – Grundsätze

* Mittagio = Vermittlungsplattform
* Kein Verkäufer
* Kein wirtschaftlicher Erfolg geschuldet
* Kein Abo
* Keine Mindestlaufzeit
* Anbieter verantwortlich für:

  * Speisen
  * Preise
  * Abholung
  * Lebensmittelsicherheit

---

## 1️⃣2️⃣ Golden Rules (für Cursor)

> Wenn sich etwas **wie ein Shop oder Account** anfühlt → **falsch**
> Wenn ein Klick **nichts tut** → **nicht done**
> Wenn Endkunde & Anbieter vermischt sind → **Bug**

---

## 1️⃣3️⃣ Verbindliche UI-Texte (WICHTIG)

👉 **Diese Texte MÜSSEN exakt so verwendet werden. Keine eigenen Erfindungen!**

### Endkunden-Dashboard („Mein Mittagio")

**Titel:**
* Dein Mittag in der Nähe

**Willkommenskarte:**
* **Überschrift:** Willkommen bei Mittagio 👋
* **Text:** Finde frische Mittagsangebote in deiner Nähe.
* **Button:** Angebote entdecken

**Bereich: Kürzlich angesehen**
* **Titel:** Kürzlich angesehen
* **Button:** Angebote ansehen

**Anbieter-CTA:**
* **Titel:** Als Anbieter starten
* **Text:** Mittagtische einfach online anbieten
* **Button:** Zum Anbieterbereich

### ❌ Verbotene Begriffe (Endkunden)

* Profil anlegen
* Meine Bestellungen
* Zur Mittagsbox
* Bestellen
* Abholcodes (für Endkunden)

### Anbieter-Dashboard

**Erlaubte Texte:**
* Inserate
* Abholung
* Kochbuch
* **Button:** Inserat erstellen

**Optional (graue Stepper-Tags):**
* ➜ Inserat erstellen
* ➜ Gericht wählen
* ➜ Abholcode (optional)

**❌ Komplett entfernen:**
* „Willkommen bei Mittagio"
* „Starte mit deinem ersten Gericht"
* „Adresse hinzufügen"

### Profil-Texte

**Endkunden sehen:**
* Name / Ladenname
* Adresse (wenn vorhanden)
* Abholzeiten (wenn vorhanden)

**❌ Nie anzeigen:**
* „Profil bearbeiten" (für Endkunden)
* „Ort fehlt"
* Uhrzeiten als Systemtext

**Anbieter (intern):**
* **Button:** Profil bearbeiten
  * (unter „Mein Profil", nicht im Header)

### Rechtstexte – Bezeichnungen

**✅ Exakt so benennen:**
* AGB
* Impressum
* Datenschutz

**❌ Nie mehr:**
* AGB-Kurzfassung
* Hinweise wie „öffnet dein E-Mail-Programm"

---

## 📎 Empfohlener Cursor-Prompt (wichtig)

Diesen Satz **immer** davor schreiben:

> **„Bitte strikt nach der Cursor-Gesamtzusammenfassung Mittagio (Stand 24.01.2026) arbeiten und ausschließlich die verbindlichen UI-Texte verwenden."**

---

## ✅ Ergebnis

* Cursor hat **alle Regeln**
* Cursor hat **alle verbindlichen UI-Texte**
* Keine fehlenden Kontexte mehr
* Kein rechtliches Risiko
* Sauberes App-Feeling
* Klare Trennung Endkunde ↔ Anbieter
* Keine eigenen Texterfindungen mehr

---

## 📝 Technische Hinweise

### Repository-Struktur

* Hauptcode: `app/index.html` (Single-Page-Application)
* Deployment: GitHub Pages (`/mittagio/app/`)
* Base-Tag: `<base href="/mittagio/app/">`
* Service Worker: aktuell deaktiviert (`sw.js.disabled`)

### Wichtige Routen

**Endkunden:**
* `/` oder `/entdecken` - Entdecken-Seite
* `/datenschutz` - Datenschutz
* `/impressum` - Impressum
* `/agb` - AGB

**Anbieter:**
* `/anbieter` → Redirect zu `/anbieter/dashboard`
* `/anbieter/dashboard` - Dashboard
* `/anbieter/profil` - Profil
* `/anbieter/profil/bearbeiten` - Profil bearbeiten
* `/anbieter/recht/*` - Rechtstexte
* `/anbieter/hilfe` - Hilfe

### Code-Qualität

* Alle DOM-Zugriffe mit Null-Checks absichern
* Keine `history.back()` verwenden
* Immer explizite Navigation
* Jeder Button muss reagieren (Dead-Click-Regel)

---

*Letzte Aktualisierung: 24.01.2026*
