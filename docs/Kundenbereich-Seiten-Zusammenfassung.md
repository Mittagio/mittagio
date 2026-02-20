# Kundenbereich – Seiten-Zusammenfassung

**Stand:** Februar 2026 · Alle Kundenseiten mit Schriften und Aufbau.

---

## Schnellreferenz: Schriften & Aufbau pro Seite

| Seite | Titel/Größe | Body/Meta | Layout-Kern |
|-------|-------------|-----------|-------------|
| Entdecken | Logo 20px/900, Listen 18px/800 | 14–15px | Fixed Header, Liste 100×100 Foto |
| Favoriten | 20px/900, Sektion 15px/800 | 15px | 2×2 Grid, padding-bottom 120px |
| Mittagsbox | 20px/900, Abholnummer 2.5rem/950 | 12–14px | Hero + Chips 48px |
| Checkout | 24px/900 | 15–16px | Panel radius 24px, max 600px |
| Bestell-Erfolg | Abholnummer clamp 2.5–3.5rem | 15–16px | max 420px zentriert |
| Meins | 20px/900, Sektion 16px/900 | 11–15px | padding 40px 16px 120px |
| Bestellungen | 20px/900, Untertitel 13px/600 | 14–16px | cust-chip-bar Filter |
| Plan Public | h1 20px, p 13px | 14px | max-width 500px |
| Anbieter Public | 20px/950 | wie Discover | Header 48×48 Buttons |
| Rechtliches | 24px/900 | 15px | #F7F6F0, padding 20px |
| Version | 24px/900 | 14–16px | wie FAQ |
| Gericht-Detail | 20px/900 | 15–16px | Sheet, 3 Säulen |

---

## 1. Haupt-Navigation (Bottom-Nav)

| Tab | data-go | View-ID | Kurzbeschreibung |
|-----|---------|---------|------------------|
| Entdecken | discover | v-discover | Einstiegsseite, Suche nach Mittagsangeboten |
| Favoriten | fav | v-fav | Gespeicherte Gerichte & Lieblings-Betriebe |
| Mittagsbox | cart | v-cart | Warenkorb, Abholnummer sichern |
| Meins | profile | v-profile | Profil, Bestellhistorie, Einstellungen |

---

## 2. Entdecken (v-discover)

**Zweck:** Suche nach Mittagsangeboten in der Nähe.

**Aufbau:**
- **Header (fixed):** Standort links (PLZ/Stadt), Logo MITTAGIO mittig, Kalender-Icon rechts
- **Filter:** Kategorie-Pills (Alle, Fleisch, Vegetarisch, Vegan) – volle Breite, sticky
- **Inhalt:** Kompakte Liste (Foto 100×100px links, Titel/Preis/3 Säulen rechts) oder Kartenansicht
- **Overlay:** Pin-Drawer (Karte) mit Bild, Preis, Säulen, Wegbeschreibung
- **Empty State:** „Hunger?“ + Standort ändern

**Besonderheiten:** Listen-/Karten-Switch, Leaflet-Karte, Kalender-Bottom-Sheet für Datumsauswahl.

**Schriften:** Standort 14px/700; Logo Montserrat 20px/900 #0f172a; Pills 13px/600 (inaktiv) / 13px + 2px Unterlinie (aktiv); Listen-Titel 18px/800 #0f172a; Preis 16px/900 --brand; Empty h2 22px/850; Body 15px #64748b.

**Aufbau-Layout:** Header fixed, padding-top env(safe-area-inset-top); Filter sticky, volle Breite; main padding-top ~130px + safe-area, padding 24px seitlich; Liste tgtg-list-item (Foto 100×100px, border-radius 16px); Bottom-Nav fixed.

---

## 3. Favoriten (v-fav)

**Zweck:** Gespeicherte Gerichte und Lieblings-Betriebe.

**Aufbau:**
- **Header:** „Deine Favoriten ⚡“, Teilen-Button rechts
- **Sektion 1:** „Gerichte in deiner Box“ – 2×2 Grid mit fav-card
- **Sektion 2:** „Deine Lieblings-Betriebe“ – Liste
- **Pull-to-Reveal:** „Morgen & Übermorgen“ nach unten ziehen
- **Empty State:** Herz-Icon, „Deine Favoriten sind leer“, CTA „Jetzt entdecken“

**Besonderheiten:** Fav-Grid wie Favoritenseiten-Spec, Summary-Bar „Gesamtwert heute“.

**Schriften:** Titel 20px/900 -0.03em; Sektion 15px/800 uppercase #64748b; Empty h2 22px/850; Body 15px #64748b; Summary-Label 14px/700, Value 18px/900 --brand.

**Aufbau-Layout:** Sticky-Header 12px 16px; padding-bottom 120px; 2×2 Grid (fav-grid), Karten radius 16px; Icon-Button 40×40px radius 12px.

---

## 4. Mittagsbox / Warenkorb (v-cart)

**Zweck:** Warenkorb vor dem Checkout, aktive Abholnummer-Session.

**Aufbau:**
- **Header:** Einkaufswagen-Icon + „Mittagsbox heute“
- **Abholnummer-Hero:** Aktive Session, #A12 groß (monospace)
- **Inhalt:** Gerichte-Liste, Verzehrart (🍴 Vor Ort / 🔄 Mitnehmen)
- **CTA:** „Abholnummer sichern“ → führt zu v-checkout
- **Leer:** „Deine Mittagsbox ist noch leer. Such dir was Leckeres aus.“

**Besonderheiten:** Trust-Icons „Deine Abholnummer wird sofort generiert“.

**Schriften:** Titel 20px/900 -0.03em; Abholnummer 2.5rem/950 monospace; Label „Aktive Session“ 12px/800; Chips 14px; btn-cust-primary 16px/800.

**Aufbau-Layout:** padding 16px, bottom 120px; Hero padding 24px 20px, radius 20px; Verzehrart Grid 2 Spalten, Chips height 48px radius 14px.

---

## 5. Checkout (v-checkout)

**Zweck:** One-Page-Checkout – Zahlung, Abholzeit, Kontaktdaten.

**Aufbau:**
- **Header:** Zurück, „Dein Mittagstisch“
- **Summary:** Bestellübersicht
- **Formular:** Verzehrart (Vor Ort / Mitnehmen), Verpackung (bei Mitnehmen), Abholzeit-Slots, Name, E-Mail optional
- **Zahlung:** Apple Pay / Google Pay (falls verfügbar), Standard „JETZT BEZAHLEN“
- **Hinweis:** Abholnummer sofort, kein Account nötig

**Besonderheiten:** Zeit-Slots 11:00–14:30, Custom-Time-Input, Gast-Checkout.

**Schriften:** Zurück 16px/700; Titel 24px/900 #2D3436; Labels 15px/700; Inputs 16px; Zahlungsbuttons 16px/700–800.

**Aufbau-Layout:** Kein Sticky-Header; Panel padding 20px, radius 24px, max-width 600px; Buttons 44–56px; padding-bottom 90px + safe-area.

---

## 6. Bestell-Erfolg (v-order-success)

**Zweck:** Bestätigung nach Zahlung, Abholnummer im Fokus.

**Aufbau:**
- **Status:** „Zahlung erfolgreich“ (grüner Badge)
- **Hero:** Abholnummer sehr groß (#101), gelber Container
- **Details-Karte:** Thumbnail, Gerichte, Abholzeit, Adresse
- **CTAs:** Teilen, Zur Mittagsbox, Zum Entdecken

**Besonderheiten:** Wird nach „JETZT BEZAHLEN“ angezeigt, nur bei erfolgreicher Zahlung.

---

## 7. Meins / Profil (v-profile)

**Zweck:** Kundenprofil, Bestellhistorie, Einstellungen, rechtliche Links.

**Aufbau:**
- **Header:** „Meins“, Buttons: Anbieter-Portal, Einstellungen, Schließen
- **Profil-Card:** Avatar, Name (wenn eingeloggt)
- **Abholnummer-Sektion:** Aktive Abholnummern oder Hinweis „Heute keine Abholnummer“
- **Meine Bestellungen:** Historie-Liste, „Alle Bestellungen anzeigen“
- **Zahnrad-Sheet:** Meine Daten, Food-Profil, Lieblinge, FAQ & Support, Impressum, AGB, Datenschutz, App herunterladen, Zum Anbieter-Portal, Abmelden

**Besonderheiten:** Einstellungen als Bottom-Sheet, nicht als eigene Seite.

**Schriften:** Titel 20px/900 -0.03em; Sektion „Meine Bestellungen“ 16px/900; Label 11px/700 #94a3b8 uppercase; Zahnrad-Menü 15px/700.

**Aufbau-Layout:** padding 40px 16px 120px; Icon-Buttons 40×40 radius 12px; Cards padding 20px; Zahnrad-Sheet max-height 85vh.

---

## 8. Bestellungen (v-orders)

**Zweck:** Übersicht über aktive und vergangene Bestellungen.

**Aufbau:**
- **Header:** „Aktive Abholnummern“, Untertitel „Deine Bestellungen im Überblick“
- **Filter:** cust-chip-bar (Offen / Abgeholt o. ä.)
- **Empty State:** „Noch keine Bestellungen“, CTA „Zur Mittagsbox“
- **Liste:** Bestellkarten dynamisch

**Besonderheiten:** Kein eigener Tab in der Bottom-Nav; Zugang über Profil oder nach Bestellung.

**Schriften:** Titel 20px/900; Untertitel 13px/600 #64748b; Empty 16px/700, 14px #64748b.

**Aufbau-Layout:** padding 16px, bottom 120px; Empty Icon 80×80 radius 24px; cust-chip-bar Filter.

---

## 9. Plan Public (v-plan-public)

**Zweck:** Öffentlicher Wochenplan eines Anbieters (Magic Link #/plan/[ID]).

**Aufbau:**
- **Header:** Anbieter-Logo, „Wochenplan“, „Unser Wochenplan ist online!“
- **Link:** „← Zur App“
- **Inhalt:** Liste der Gerichte pro Tag, max-width 500px

**Besonderheiten:** Read-Only, keine Bestellung, nur Ansicht.

**Schriften:** h1 20px/900; p 13px/600 #64748b; Back 14px/700 --brand.

**Aufbau-Layout:** Sticky-Header 16px 20px; max-width 500px Liste; padding 20px 16px 24px.

---

## 10. Anbieter Detail Public (v-provider-detail-public)

**Zweck:** Öffentliche Ansicht eines Anbieters (Gerichte, 3 Säulen, Favoriten).

**Aufbau:**
- **Header:** Zurück, Anbieter-Name, Favoriten-Button
- **Inhalt:** Gerichte des Anbieters, Karten-Layout

**Besonderheiten:** Von Discover aus erreichbar (Klick auf Anbieter/Gericht).

**Schriften:** Anbieter-Name 20px/950; Karten wie Discover.

**Aufbau-Layout:** Header 14px 16px; Zurück/Favoriten 48×48 radius 14px; cust-card-Struktur.

---

## 11. Rechtliche Seiten (Kunde)

| View-ID | Titel | Inhalt |
|---------|-------|--------|
| v-legal-impressum | Impressum | Betreiber, Adresse, Kontakt, Plattformhinweis |
| v-legal-agb-kurz | AGB (Kunden) | Plattform, Bestellung, Abholnummer, Stornierung, Support |
| v-legal-faq | FAQ | Reiter Kunden/Anbieter, Accordion |
| v-support | Support & Hilfe | Erweiterte FAQs, Kontaktformular |
| v-legal-datenschutz | Datenschutz | Datenschutzerklärung |

**Zugang:** Über Profil → Zahnrad-Menü → Impressum / AGB / FAQ / Support / Datenschutz.

**Schriften (rechtliche Seiten):**
| Seite | Titel | Body | Footer |
|-------|-------|------|--------|
| Impressum | 24px/900 | 15px | 13px #94a3b8 |
| AGB | 24px/900 | 15px | 13px #94a3b8 |
| FAQ | 24px/900 | Accordion 15px/700 | 14px #666 |
| Support | 24px/900 | 14px/600 | – |
| Datenschutz | 24px/900 | 15px | 13px #94a3b8 |

**Aufbau-Layout:** background #F7F6F0 (FAQ, Support, Version); padding 20px, bottom 90px; Panel mit radius, overflow hidden.

---

## 12. Version (v-version)

**Zweck:** App-Version, Changelog-Hinweis, Kontakt.

**Aufbau:** Titel „Version“, v1.0.0, Link zu info@mittagio.de, Zurück-Button.

**Zugang:** Über Footer-Links in Rechtlichen oder Profil.

**Schriften:** Titel 24px/900; Version 16px; Body 14px #666.

**Aufbau-Layout:** Wie FAQ (#F7F6F0, padding 20px, bottom 90px); max-width 480px.

---

## 13. Gericht-Detail (Sheet/Modal)

**Kein eigener View** – wird als Sheet/Modal über der aktuellen View geöffnet.

**Inhalt:** Bild, Gerichtsname, Beschreibung, 3 Säulen (🍴🔄🧾), Preis, Allergene, Extras, CTA „In die Mittagsbox“ / „Abholnummer sichern“.

**Schriften:** Titel --header-title-size (20px)/900; Body 15–16px; Säulen-Labels 10px/800; Preis --brand; CTA 16px/800.

**Aufbau-Layout:** Sheet von unten, border-radius 24px oben; Scroll-Bereich; fixierte Action-Buttons unten.

---

## 14. Navigations-Matrix

| Von | Nach | Auslöser |
|-----|------|----------|
| v-discover | v-provider-detail-public | Klick auf Anbieter/Gericht |
| v-discover | Sheet (Gericht-Detail) | Klick auf Gericht |
| v-fav | v-discover | Empty-State „Jetzt entdecken“ |
| v-cart | v-checkout | „Abholnummer sichern“ |
| v-checkout | v-order-success | Nach erfolgreicher Zahlung |
| v-profile | v-legal-* | Zahnrad-Menü |
| v-profile | v-support | Zahnrad → FAQ → Weitere Fragen |
| Bottom-Nav | v-discover, v-fav, v-cart, v-profile | Tab-Klick |
