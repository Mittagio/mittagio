# Endkunden-Datenschutz – Cursor-Zusammenfassung

## 📋 Übersicht

**Route:**
- `/datenschutz` → Datenschutzerklärung für Endkunden/Besucher

**Zielgruppe:**
- Besucher & Endkunden (ohne Anbieter-Account)
- Keine Registrierung erforderlich
- Keine Bestellungen über Mittagio
- Keine Zahlungen über Mittagio

---

## ✅ Wichtige Punkte

- **Gilt für Besucher & Endkunden** (ohne Anbieter-Account)
- **Route:** `/datenschutz` (nicht `/anbieter/recht/datenschutz`)
- **Keine Registrierung erforderlich** für die Nutzung der Plattform
- **Keine Bestellungen, keine Zahlungen über Mittagio**
- **Vertrag kommt nur zwischen Endkunde & Anbieter** zustande
- **Keine Weitergabe von Endkundendaten an Anbieter**
- **Keine Werbung, kein Marketing-Tracking**
- **DSGVO-konform** (MVP-Level)

---

## 🧭 Navigation

**Zurück-Button:**
- **Endkunden-Mode:** `/` (Discover/Home)
- **Fallback:** Profil anzeigen
- **❌ Kein Browser-Back** (`history.back()` ist verboten)
- **✅ Immer In-App Navigation** (`navigateTo()`)

**Button-Handler:**
- `btnLegalDatenschutzCustomerBack` → Navigiert zu `/` oder Profil

---

## 📄 Inhalt

**1. Verantwortlicher**
- Mittagio, Inhaber: Mike Quach
- Langäcker 2, 73635 Rudersberg
- support@mittagio.de

**2. Erhebung und Verarbeitung personenbezogener Daten**
- Technische Daten (IP-Adresse, Browser-Typ, Geräteinformationen)
- Kommunikationsdaten (Support-Anfragen)
- **Wichtig:** Keine Registrierung, keine Bestellungen, keine Zahlungen über Mittagio
- Vertrag nur zwischen Endkunde & Anbieter

**3. Zweck der Datenverarbeitung**
- Bereitstellung der Plattformfunktionen
- Sicherstellung eines ordnungsgemäßen Betriebs
- Kommunikation mit Endkunden

**4. Weitergabe von Daten**
- **Keine Weitergabe von Endkundendaten an Anbieter**
- Nur gesetzlich erforderlich oder technisch notwendig (Hosting)
- **Keine Werbung, kein Marketing-Tracking**

**5. Speicherdauer**
- Nur so lange wie erforderlich oder gesetzlich vorgeschrieben

**6. Rechte der betroffenen Personen**
- Auskunft, Berichtigung, Löschung, Einschränkung
- Kontakt: support@mittagio.de

**7. Datensicherheit**
- Technische und organisatorische Maßnahmen

**8. Änderungen**
- Kann bei Bedarf angepasst werden

---

## 🔧 Technische Details

**View-ID:** `v-legal-datenschutz-customer`

**Routing:**
- `/datenschutz` → `showLegalPage('datenschutz-customer')`
- Setzt `mode = 'customer'`
- Zeigt Endkunden-Datenschutz-View

**Unterschied zu Anbieter-Datenschutz:**
- Anbieter: `/anbieter/recht/datenschutz` → `v-legal-datenschutz`
- Endkunden: `/datenschutz` → `v-legal-datenschutz-customer`
- Unterschiedliche Inhalte (Endkunden: keine Registrierung, keine Bestellungen, keine Weitergabe an Anbieter)

---

## 💡 Cursor-Prompt

**Empfohlener Prompt:**

> "Bitte implementiere die Endkunden-Datenschutzerklärung nach dieser Zusammenfassung. Route: `/datenschutz`, View-ID: `v-legal-datenschutz-customer`. Wichtig: Keine Registrierung, keine Bestellungen, keine Zahlungen über Mittagio, keine Weitergabe von Endkundendaten an Anbieter."

---

## ✅ Checkliste

- [x] Endkunden-Datenschutz-View erstellt
- [x] Route `/datenschutz` implementiert
- [x] Zurück-Button nutzt In-App Navigation
- [x] Kein `history.back()` mehr
- [x] Klare Unterscheidung: Endkunden vs. Anbieter
- [x] DSGVO-konform (MVP-Level)

---

## 🔍 Test-Cases

1. **Endkunden-Datenschutz öffnen:**
   - `/datenschutz` aufrufen → View wird angezeigt
   - URL ist `/datenschutz`
   - Mode ist 'customer'

2. **Zurück-Button:**
   - Klick → navigiert zu `/` (Discover/Home)
   - Kein Browser-Back-Verhalten

3. **Unterscheidung:**
   - Endkunden: `/datenschutz` → `v-legal-datenschutz-customer`
   - Anbieter: `/anbieter/recht/datenschutz` → `v-legal-datenschutz`
   - Unterschiedliche Inhalte
