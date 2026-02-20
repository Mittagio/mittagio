# Anbieterseiten – Zusammenfassung

**Stand:** Februar 2026 · Alle Anbieterseiten mit Schriften und Aufbau.

---

## Schnellreferenz: Schriften & Aufbau pro Seite

| Seite | Titel/Größe | Body/Meta | Layout-Kern |
|-------|-------------|-----------|-------------|
| Meine Küche | 20px/900 -0.03em | KPI-Label 8px/800, KPI-Wert 16px/900 | 4 Kästen, prov-card 24px radius |
| Abholungen | 20px/900 | 13–15px #64748b | prov-page-header, Grid/Liste |
| Wochenplan | 20px/900 | 14–17px/800 | KW-Carousel, 7-Tage-Grid |
| Kochbuch | 20px/900 | Pills 14px/700, Bar 10px/800 | Magazin-Karte, Pills scroll |
| Profil | provider-profile-title | --provider-text, --provider-text-muted | 7-Screen-Slider, Zahnrad |
| Billing | wie andere Provider | 15–18px | padding 20px, bottom 90px |
| Login | h3 Panel | .field 16px | Panel zentriert |
| Onboarding | 18–26px/900 | 15px #64748b | Mehrstufig, 20px padding |
| Rechtliches (Provider) | 24px/900 | 15px #334155 | padding 20px, bottom 90px |

---

## 1. Haupt-Navigation (Provider Bottom-Nav)

| Tab | data-pgo | View-ID | Kurzbeschreibung |
|-----|----------|---------|------------------|
| Küche | provider-home | v-provider-home | Dashboard, Meine Küche |
| Abholungen | provider-pickups | v-provider-pickups | Abholnummern, Küchenliste |
| Wochenplan | provider-week | v-provider-week | 7-Tage-Planung |
| Kochbuch | provider-cookbook | v-provider-cookbook | Gerichte-Bibliothek |
| Meins | provider-profile | v-provider-profile | Anbieter-Profil |

**Layout:** Floating Pill, bottom 24px, left/right 16px, border-radius 2.5rem, background #1a1a1a, max-width 500px.

---

## 2. Meine Küche / Dashboard (v-provider-home)

**Zweck:** Übersicht Tagesessen, Abholungen, Umsatz; Aktive Angebote; Wochenplan-Vorschau.

**Aufbau:**
- **Kasten 1:** Header – Icon + „Meine Küche“, Refresh-Button
- **Kasten 2:** KPIs – Tagesessen, Abholungen, Umsatz heute (3 Spalten)
- **Kasten 3:** Aktive Angebote heute – prov-card Liste oder Empty + FAB
- **Kasten 4:** Dein Wochenplan – Wochentage-Preview, „Zum Wochenplan“, Teilen

**Schriften:** Titel 20px/900 -0.03em #1a1a1a; KPI-Label 8px/800 #9ca3af uppercase; KPI-Wert 16px/900; provider-week-title; Card-Texte 15px/700, 13px #94a3b8; Empty h3 24px/950.

**Aufbau-Layout:** dashboard-floating-wrap; Header padding 12px 20px; Icon 44×44 radius 14px; Cards --card-radius-premium 24px, --card-padding 20px; FAB für „+“.

---

## 3. Abholungen (v-provider-pickups)

**Zweck:** Küchenliste – Abholnummern, PDF/Email-Export, Filter Offen/Abgeholt.

**Aufbau:**
- **Header:** Icon + „Abholungen“, PDF/Email-Buttons
- **Filter:** answers (Offen / Abgeholt)
- **Inhalt:** provPickupsGrid (2 Spalten) oder provPickupsList; Subheader Status
- **Empty State:** „Noch keine Abholungen“

**Schriften:** Titel 20px/900; Subheader 13px/700 #9ca3af uppercase; Empty h3 18px/800; Body 15px #64748b.

**Aufbau-Layout:** prov-page-header; Filter background #f1f3f5, radius 14px; padding 12px 20px 20px; max-width 500px zentriert.

---

## 4. Wochenplan (v-provider-week)

**Zweck:** 7-Tage-Planung, Gerichte einplanen, Lücke finden, Vorlagen, Zeitfenster.

**Aufbau:**
- **Header:** Icon + „Wochenplan“, Untertitel „Deine Woche · Gerichte planen“; Lücke finden, Vorlage, Drucken, Teilen
- **KW-Board:** KW-Carousel, Progress-Bar, Saison-Banner, Cookbook-Strip, Woche aktivieren
- **Grid:** 7 Tage (Mo–So), Karten mit Swipe-Gesten
- **Sheets:** Vorlagen, Quick-Add, Zeit-Overlay

**Schriften:** Titel 20px/900; Untertitel week-header-subtitle; Tag-Pills; Karten-Titel 15–17px/800; Buttons 15–17px/800; Saison-Banner 14px/700.

**Aufbau-Layout:** week-header-compact; KW-Carousel snap; Pills min-height 44px; Karten radius 16px; Buttons 44×44 radius 14px.

---

## 5. Kochbuch (v-provider-cookbook)

**Zweck:** Gerichte-Bibliothek, Magazin-Karte, Blitz-Inserat, Kategorien.

**Aufbau:**
- **Header:** Icon + „Mein Kochbuch“, Suchen, Sortierung
- **Pills:** Kategorie-Filter (scroll)
- **Inhalt:** Magazin-Karte (Flip) oder Liste; Blitz-Button
- **Empty State:** „Dein Erfolgstagebuch ist noch leer“
- **Sheets:** Live schalten (4,99 €), Wochenplan, Action-Sheet (Bearbeiten, Wochenplan, Speichern, Teilen, Drucken, JETZT INSERIEREN, Löschen)

**Schriften:** Titel 20px/900; cookbook-cat-pill 14px/700 (--pill-font-size); cookbook-bar-btn 10px/800; Swipe-Hint 12px #94a3b8; Empty h2 24px/800; Live-Sheet Labels 11px/800 uppercase.

**Aufbau-Layout:** background linear-gradient (warmes Beige → #F5F5F7); Pills min-height 44px radius 22px; Blitz 48×48; Cards min-height 420px, Bild 240px; max-width 500px.

---

## 6. Profil (v-provider-profile)

**Zweck:** Anbieter-Profil, Business-Dashboard, Einstellungen (Zahnrad), 3 Säulen, Adresse, Zahlung.

**Aufbau:**
- **Header:** Logo, Zahnrad (Einstellungen), „Mein Profil“
- **Ebene 1:** Welcome, 7-Screen-Slider (Business, Service, Zahlung, …)
- **Ebene 2:** Zahnrad-Sheet – Einstellungen, Profildaten
- **Sektionen:** 3 Säulen (🍴🔄🧾), Adresse, Öffnungszeiten, Zahlungsmittel

**Schriften:** provider-profile-title; --provider-text #1a1a1a; --provider-text-muted #64748b; Labels 11px/700 #94a3b8 uppercase; Section-Titel.

**Aufbau-Layout:** background #F9FAFB; flex column min-height 0; Padding 20px; Panels --card-padding.

---

## 7. Billing / Finanzen (v-provider-billing)

**Zweck:** Kontodaten, Tagesumsatz, Abrechnungen, Zahlungsmittel.

**Aufbau:**
- **Header:** „Finanzen & Abrechnung“, Zurück
- **Karten:** Meine Kontodaten, Tagesumsatz, Abrechnungen
- **Buttons:** Zahlungsmittel ändern, CSV-Export

**Schriften:** Wie andere Provider-Views; Karten-Titel 15px/700; Werte 18px/700–950; Labels 12px/700.

**Aufbau-Layout:** min-height 100vh; padding 20px, bottom 90px; --provider-bg; Panels radius 16px.

---

## 8. Login (v-provider-login)

**Zweck:** Anmeldung als Gastronom.

**Aufbau:**
- **Panel:** h3 „Anbieter-Login“, Hint, Email/Passwort-Felder, Einloggen, Zurück
- **Demo-Hinweis:** details/summary „Hilfe? Demo-Zugang“

**Schriften:** h3 Panel-Standard; .field 16px; .hint; Button-Standard.

**Aufbau-Layout:** Flex column zentriert; padding top 16px + safe-area, 20px seitlich, 40px unten; Panel, Buttons 56px.

---

## 9. Onboarding (v-provider-onboarding, v-provider-onboarding-entry, …)

**Zweck:** Neuanbieter einrichten – Betrieb, Adresse, Essenszeit, Logo, Zusammenfassung.

**Sub-Views:**
- **onboarding-entry:** Speed-Einstieg „Sofort verkaufen. Ohne Abo & Vertrag.“
- **onboarding-first-dish:** Erstes Gericht
- **onboarding-signup:** Signup
- **onboarding-business:** Betriebsdaten
- **onboarding-preview:** Vorschau

**Schriften:** Entry h1 26px/950; Body 15px #64748b; Steps 18px/900; .field 16px; Buttons 15–16px/700–800.

**Aufbau-Layout:** background --provider-bg; padding 20px; Panel radius 28px; Buttons einheitlich 52–56px.

---

## 10. Rechtliche Seiten (Anbieter)

| View-ID | Titel | Inhalt |
|---------|-------|--------|
| v-legal-impressum-provider | Impressum | Betreiber, Anschrift, Kontakt |
| v-legal-agb-provider | AGB (Anbieter) | §1–§6 Accordion |
| v-legal-faq-provider | FAQ | Accordion Anbieter |
| v-legal-inserat-info-provider | Inserat-Info | Grid 5/2/1 Spalten |
| v-legal-datenschutz-provider | Datenschutz | Datenschutzerklärung |
| v-legal-agb-onboarding | AGB Onboarding | Im Onboarding-Kontext |

**Schriften:** h1 22–24px/800–900 #1a1a1a; Fließtext 15px #334155; Accordion summary 16px/600; Footer 14px/700.

**Aufbau-Layout:** min-height 100vh; padding 20px, bottom 90px; --provider-bg; Panel border, shadow, radius 16px.

---

## 11. Inseratsflow / Wizard (nicht eigener View)

**Zweck:** Inserat erstellen/bearbeiten – InseratCard im #wizard (buildListingStep).

**Aufbau:** Foto, Gerichtsname, Kategorie-Pills, Preis, 3 Säulen, Allergene, Extras, Action-Buttons (4,99 € / Gratis mit Abholnummer).

**Schriften:** Siehe inseratcard-architektur.mdc, inseratsflow-ist-high-end-universal.mdc.

---

## 12. Navigations-Matrix (Anbieter)

| Von | Nach | Auslöser |
|-----|------|----------|
| v-provider-home | v-provider-pickups | KPI „Abholungen“ |
| v-provider-home | v-provider-billing | KPI „Umsatz“ |
| v-provider-home | v-provider-week | „Zum Wochenplan“ |
| v-provider-home | #wizard (Inserat) | FAB „+“, Empty CTA |
| v-provider-week | #wizard | Gericht hinzufügen |
| v-provider-cookbook | #wizard | JETZT INSERIEREN, Blitz |
| v-provider-profile | v-legal-* (Provider) | Zahnrad / Links |
| Provider-Nav | v-provider-home, pickups, week, cookbook, profile | Tab-Klick |
