# Rechtstexte – Anbieterbereich (Cursor-Zusammenfassung)

## 📋 Übersicht

**Routen:**
- `/anbieter/recht/agb` → AGB (Allgemeine Geschäftsbedingungen)
- `/anbieter/recht/impressum` → Impressum
- `/anbieter/recht/datenschutz` → Datenschutzerklärung
- `/anbieter/hilfe/faq` → FAQ (Anbieter)

---

## ✅ Allgemein

- **Normale, professionelle Rechtstexte** (kein "Kurzfassung"-Stil)
- **Kein Begriff "AGB-Kurzfassung"** → überall nur "AGB"
- **Einheitlicher, seriöser Ton** (plattformtauglich, nicht vereinsmäßig)
- **Mittagio = Vermittlungsplattform**, kein Verkäufer
- **Vertrag kommt nur zwischen Anbieter und Endkunde** zustande

---

## 🧭 Navigation

**Zurück-Button:**
- **Primär:** `/anbieter/hilfe` (wenn vom Profil aus)
- **Fallback:** `/anbieter/dashboard`
- **❌ Kein Browser-Back** (`history.back()` ist verboten)
- **✅ Immer In-App Navigation** (`navigateTo()`)

**Button-Handler:**
- `btnLegalImpressumBack` → `goBackFromLegalPage()`
- `btnLegalAgbBack` → `goBackFromLegalPage()`
- `btnLegalDatenschutzBack` → `goBackFromLegalPage()`
- `btnLegalFaqBack` → `goBackFromLegalPage()`

---

## 📄 Impressum

**Inhalt:**
- Angaben gemäß § 5 TMG
- Mittagio, Inhaber: Mike Quach
- Langäcker 2, 73635 Rudersberg
- support@mittagio.de
- Einzelunternehmen
- Keine USt-ID (Kleinunternehmer, §19 UStG)
- Haftung für Inhalte & Links

**View-ID:** `v-legal-impressum`

---

## 📄 AGB

**Inhalt:**
- §1 Geltungsbereich
- §2 Vertragsverhältnis (Anbieter ↔ Endkunde, Mittagio = Plattform)
- §3 Leistungen von Mittagio
- §4 Pflichten des Anbieters
- §5 Preise & Abrechnung (kein Abo, keine Mindestlaufzeit)
- §6 Haftung
- §7 Verfügbarkeit der Plattform
- §8 Kündigung
- §9 Änderungen der AGB
- §10 Schlussbestimmungen

**Wichtig:**
- Kein Begriff "AGB-Kurzfassung"
- Professionell, rechtssicher, schlank
- MVP-tauglich

**View-ID:** `v-legal-agb-kurz` (Key bleibt 'agb-kurz', aber Label ist "AGB")

---

## 📄 Datenschutzerklärung

**Inhalt:**
1. Verantwortlicher (Mike Quach, Langäcker 2, 73635 Rudersberg)
2. Erhebung und Verarbeitung personenbezogener Daten
3. Zweck der Datenverarbeitung
4. Weitergabe von Daten (nur gesetzlich erforderlich oder technisch notwendig)
5. Speicherdauer
6. Rechte der betroffenen Personen (Auskunft, Berichtigung, Löschung, Einschränkung)
7. Datensicherheit
8. Änderungen

**Wichtig:**
- DSGVO-konform (MVP-Level)
- Nur notwendige Datenverarbeitung
- Keine Werbung, kein Verkauf von Daten

**View-ID:** `v-legal-datenschutz`

---

## 📄 FAQ

**Inhalt:**
- Was ist Mittagio?
- Wie verdiene ich damit Zeit?
- Muss Online-Zahlung aktiv sein?
- Wie kann ich mein Angebot teilen?
- Kein Abo / keine Provision?
- Wie funktionieren Abholungen?
- Warum Abholcode?
- Was kostet Abholcode?
- Wie spare ich Zeit?

**View-ID:** `v-legal-faq`

---

## 💡 Cursor-Prompt

**Empfohlener Prompt:**

> "Bitte implementiere die Rechtstexte nach dieser Zusammenfassung und nach `DoD_Anbieterbereich.md`."

**Oder spezifisch:**

> "Bitte AGB-Seite nach dieser Zusammenfassung und nach `DoD_Anbieterbereich.md` implementieren."

---

## ✅ Checkliste

- [x] AGB in normaler, professioneller Form
- [x] Impressum aktualisiert
- [x] Datenschutzerklärung aktualisiert
- [x] FAQ-View erstellt
- [x] "AGB-Kurzfassung" → "AGB" überall
- [x] Zurück-Buttons nutzen In-App Navigation
- [x] Kein `history.back()` mehr
- [x] Router-Handler für alle Rechtstexte vorhanden

---

## 🔍 Test-Cases

1. **Rechtstexte öffnen:**
   - Impressum → URL ist `/anbieter/recht/impressum`
   - AGB → URL ist `/anbieter/recht/agb`
   - Datenschutz → URL ist `/anbieter/recht/datenschutz`
   - FAQ → URL ist `/anbieter/hilfe/faq`

2. **Zurück-Button:**
   - Klick → navigiert zu `/anbieter/hilfe` oder `/anbieter/dashboard`
   - Kein Browser-Back-Verhalten

3. **Labels:**
   - Überall "AGB" statt "AGB-Kurzfassung"
   - Professioneller Look
