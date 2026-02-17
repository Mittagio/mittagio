# Layout-Zusammenfassung – Kunde & Anbieter

**Stand:** Februar 2026 · Quelle: `app/index.html` (Styles + View-Struktur).

Zweck: **Vergleich der einzelnen Seiten** (Layout, Schriftarten, Größen) zur Vereinheitlichung. Zwei Tabellen: Kundenseiten | Anbieterseiten.

---

## 1. Gemeinsame Design-Tokens (Referenz)

Aus `:root` in `app/index.html` – verbindlich für beide Bereiche:

| Kategorie | Token | Wert |
|------------|--------|------|
| **Font-Stack** | body | `'Inter', 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif` |
| **Header** | --header-bg | rgba(255,255,255,0.92) |
| | --header-blur | 16px |
| | --header-border | 1px solid rgba(0,0,0,0.06) |
| | --header-padding-x | 20px |
| | --header-padding-y | 12px |
| | --header-title-size | 20px |
| | --header-title-weight | 900 |
| | --header-title-spacing | -0.03em |
| | --header-title-color | #1a1a1a |
| | --header-subtitle-color | #64748b |
| | --header-input-size | 15px |
| | --header-input-weight | 500 |
| **Pills/Chips** | --pill-min-height | 44px |
| | --pill-font-size | 14px |
| | --pill-font-weight | 700 |
| | --pill-radius | 22px |
| **Typografie** | --section-title-size | 18px |
| | --section-title-weight | 900 |
| | --font-body | 14px |
| | --font-body-lg | 16px |
| | --font-meta | 12px |
| | --font-meta-sm | 13px |
| | --body-text-size | 15px |
| | --body-text-color | #334155 |
| **Größen** | --btn-height-min | 44px |
| | --btn-height-md | 48px |
| | --icon-inline | 16px |
| | --icon-header | 20px |
| | --icon-nav | 22px |
| | --r-sm / --r-md / --r-lg / --r-xl | 10px / 14px / 18px / 24px |
| | --card-padding | 20px |

**Anbieter-spezifisch (zusätzlich):** --provider-bg #F8F7F2, --provider-surface #ffffff, --prov-brand #FFDE00, --provider-text #1a1a1a, --provider-text-muted #64748b.

---

## 2. Kundenseiten – Vergleich (Schriften, Layout, Größen)

Jede Zeile = eine Seite. Spalten: **Seite**, **View-ID**, **Layout**, **Schriftarten**, **Größen**.

| Seite | View-ID | Layout | Schriftarten | Größen |
|-------|---------|--------|--------------|--------|
| **Entdecken** | v-discover | Sticky-Header (Standort links, Logo Mitte, dunkle Top-Zeile #121826); Kategorie-Pills + Radius + Tage-Leiste sticky; Listen-/Karten-/Swipe-Ansicht; main padding 16px, padding-bottom mit Safe-Area. | Standort 14px/700; Logo „MITTAGIO“ Montserrat 20px/900; Pills 14px/700 (--pill-font-size); Input 16px; Sektion „Wo suchst du?“ 18px/850. | Header padding 12px 16px; Pills min-height 44px, radius 22px; Buttons 44px; Icons 20px; Karten 95% (CSS). |
| **Favoriten / Mittagsbox** | v-fav | Sticky-Header (Titel links „Deine Favoriten ⚡“, Teilen rechts); Inhalt padding-bottom 120px; 95%-Karten, Slim-Pills, Summary-Bar „Gesamtwert heute“; Sektionen „Gerichte in deiner Box“, „Lieblings-Betriebe“. | Titel 20px/950, letter-spacing -0.03em; Sektion 15px/800 uppercase #64748b; Empty h2 22px/850; Body 15px #64748b; Summary-Label 14px/700, Value 18px/900 --brand. | Header 12px 16px; Icon-Button 40×40px, radius 12px; Karten 95%, radius 16px; Pills 44px; Buttons min-height 44px, font 14px; Preis-Badge 14px/800. |
| **Warenkorb** | v-cart | Sticky-Header (Icon + „Mittagsbox heute“); padding 16px, bottom 120px; Abholnummer-Hero (Session), Karten-Liste; cust-card 20px padding; Verzehrart Chips 2 Spalten. | Titel 20px/950 -0.03em #1a1a1a; Abholnummer 2.5rem/950 monospace; Label „Aktive Session“ 12px/800; Hint 14px; Chips 14px; btn-cust-primary. | Header 12px 16px; Icon 24px; Hero padding 24px 20px, radius 20px; Chips height 48px, radius 14px; Buttons 44px. |
| **Bestellungen** | v-orders | Sticky-Header (Titel + Untertitel); cust-chip-bar Filter; padding 16px, bottom 120px; Empty State oder ordersList. | Titel 20px/950; Untertitel 13px/600 #64748b; Empty 16px/700, 14px #64748b; Chips aus cust-chip-bar. | Header 12px 16px; Empty Icon 80×80, radius 24px; Buttons max-width 260px. |
| **Profil (Meins)** | v-profile | Sticky-Header („Meins“ + 3 Icon-Buttons); padding 40px 16px 120px; cust-card Blöcke; Abholnummer-Sektion, Bestellhistorie. | Titel 20px/950 -0.03em; Sektion „Meine Bestellungen“ 16px/900; Label 11px/700 #94a3b8 uppercase; Hint 15px/700, 13px #94a3b8; Buttons 14px/700. | Header 12px 16px; Icon-Buttons 40×40, radius 12px; Cards padding 20px; Button height 44px. |
| **Checkout** | v-checkout | Kein Sticky-Header; Back-Button + „Dein Mittagstisch“; Panel padding 20px, radius 24px; max-width 600px zentriert; padding-bottom mit Safe-Area. | Zurück 16px/700; Titel 24px/900 #2D3436; Summary/Form aus panel; body 16px. | Padding 16px; Panel radius 24px; Buttons 44–56px; Icons 22–24px. |
| **Bestell-Erfolg** | v-order-success | customer-view; padding 24px 16px, bottom 90px+Safe-Area; Hintergrund #f8fafc. | Aus Erfolg-Panel (üblich Titel groß, Body 15–16px). | Standard customer-view Abstände. |
| **Plan Public** | v-plan-public | Sticky-Header (Logo + Name + Back); max-width 500px Liste; padding 20px 16px 24px. | h1 20px, p 13px #64748b; Back 14px/700 --brand. | Header 16px 20px; Card-Struktur. |
| **Impressum** | v-legal-impressum | Kunde: Hintergrund/panel je nach globalem Stil. | Panel-Titel und Fließtext (typ. 18px Titel, 14–15px Body). | Panel padding, radius. |
| **AGB (Kurz)** | v-legal-agb-kurz | Wie Rechtliches. | Wie Impressum. | – |
| **FAQ** | v-legal-faq | background #F7F6F0; min-height 100vh; padding 20px, bottom 90px. | Accordion-Titel, Inhalt (typ. 16px/700, 14px Body). | Standard-Padding. |
| **Support** | v-support | Wie FAQ (#F7F6F0, padding 20px, bottom 90px). | Wie FAQ. | – |
| **Datenschutz** | v-legal-datenschutz | Kunden-Layout. | Wie Impressum. | – |
| **Version** | v-version | Wie FAQ (#F7F6F0, padding 20px, bottom 90px). | Versionsnummer, Links. | – |

**Hinweis:** Gericht-Detail wird als Sheet/Modal geöffnet (kein eigenes section mit View-ID); nutzt gleiche Tokens (Titel, Body, 3 Säulen, Preis, Buttons).

---

## 3. Anbieterseiten – Vergleich (Schriften, Layout, Größen)

Jede Zeile = eine Seite. Spalten: **Seite**, **View-ID**, **Layout**, **Schriftarten**, **Größen**.

| Seite | View-ID | Layout | Schriftarten | Größen |
|-------|---------|--------|--------------|--------|
| **Meine Küche / Dashboard** | v-provider-home | prov-header (sticky) + prov-page-header; Icon 44px + Titel „Meine Küche“; KPIs 3 Spalten; prov-card für Aktive Angebote; FAB; main padding 16px. | prov-page-header-title 20px/900 -0.03em #1a1a1a; KPI-Label 8px/800 #9ca3af uppercase; KPI-Wert 16px/900; provider-week-title; Card-Texte 15px/700, 13px #94a3b8. | Header padding 12px 20px, 16px unten; Icon 44×44, radius 14px; Action-Button 44×44, radius 14px; Cards --card-radius-premium 24px, --card-padding 20px. |
| **Abholungen** | v-provider-pickups | prov-page-header (sticky); Icon + Titel „Abholungen“; Listen-Karten; main padding. | Wie Dashboard: Titel 20px/900; Body 14–16px; Muted #64748b. | Header calc(8px + safe-area) 20px 12px 20px; Icon 44×44; Buttons 44px. |
| **Wochenplan** | v-provider-week | prov-page-header; Datums-Carousel (Snap); Karten mit Gesten (Swipe Löschen/Kopieren); Hintergrund Verlauf (warmes Beige → #F5F5F7). | Titel 20px/900; Tag-Pills; Karten-Titel; Buttons 15–17px/800. | Header wie Abholungen; Pills min-height 44px; Karten radius 16px; Buttons min-height 44–56px. |
| **Kochbuch** | v-provider-cookbook | prov-page-header; Kategorie-Pills (scroll); Magazine-Cards; Blitz-Button; Hintergrund Verlauf wie Wochenplan. | Titel 20px/900; cookbook-cat-pill 14px/700; cookbook-bar-btn 10px/800; Swipe-Hint 12px #94a3b8. | Pills min-height 44px, radius 22px, padding 10px 18px; Blitz 44×44; Cards min-height 420px, Bild 240px. |
| **Profil (Anbieter)** | v-provider-profile | prov-page-header oder ähnlich; Sektionen; background #F9FAFB; flex column, min-height 0. | --provider-text, --provider-text-muted; Section-Titel; Labels. | Padding 20px; Panels --card-padding. |
| **Billing** | v-provider-billing | min-height 100vh; padding 20px, bottom 90px; --provider-bg. | Wie andere Anbieter-Views. | Standard Provider-Padding. |
| **Login** | v-provider-login | Flex column, zentriert; padding top 16px+safe-area, 20px seitlich, 40px unten. | „Als Gastronom anmelden“; Panel-Texte. | Panel, Buttons 56px. |
| **Onboarding Einstieg** | v-provider-onboarding | Mehrstufiger Flow. | Je Schritt Titel, Body. | Padding 20px; Buttons einheitlich. |
| **Onboarding Entry** | v-provider-onboarding-entry | Zentriert, flex; background --provider-bg; padding 20px. | Einstiegs-Texte. | – |
| **Onboarding Erstes Gericht** | v-provider-onboarding-first-dish | onboarding-view. | Wie Flow. | – |
| **Onboarding Signup** | v-provider-onboarding-signup | Wie oben. | – | – |
| **Onboarding Betrieb** | v-provider-onboarding-business | Wie oben. | – | – |
| **Onboarding Vorschau** | v-provider-onboarding-preview | Wie oben. | – | – |
| **Anbieter Detail Public** | v-provider-detail-public | Öffentliche Anbieter-Ansicht; Header, Favoriten-Button. | Wie Kunden-Detail; 48px Favoriten-Button. | – |
| **Impressum (Anbieter)** | v-legal-impressum-provider | min-height 100vh; padding 20px, bottom 90px; --provider-bg. | Panel h1/h2 #1a1a1a; Fließtext #334155. | Panel border, shadow. |
| **AGB (Anbieter)** | v-legal-agb-provider | Wie Impressum Provider. | Wie oben. | – |
| **FAQ (Anbieter)** | v-legal-faq-provider | Wie Impressum Provider. | Accordion. | – |
| **Inserat-Info (Anbieter)** | v-legal-inserat-info-provider | Wie Impressum Provider. | Grid 5 Spalten Desktop, 2/1 Mobile. | – |
| **Datenschutz (Anbieter)** | v-legal-datenschutz-provider | Wie Impressum Provider. | Wie oben. | – |
| **AGB Onboarding** | v-legal-agb-onboarding | Onboarding-Kontext. | – | – |

---

## 4. Checkliste zur Vereinheitlichung

- **Scope:** Änderung nur in Kunden- oder nur in Anbieter-Selektoren (body.provider-mode / .customer-view, #v-*).
- **Schriftarten:** Titel → --header-title-size (20px), weight 900; Body → --font-body / --font-body-lg; Meta → --header-subtitle-color, --font-meta.
- **Größen:** Header-Padding → --header-padding-x/y; Pills → --pill-min-height (44px), --pill-radius (22px); Buttons → min. --btn-height-min (44px); Icons → --icon-header (20px) / --icon-nav (22px).
- **Layout:** Keine neuen globalen Regeln für height/overflow/scroll ohne Kunde-/Anbieter-Scope.

---

## 5. Referenzen

- **Implementierung:** [app/index.html](app/index.html) (Styles in `<style>`, Views in `<section id="v-*">`).
- **Regeln:** [docs/rules.md](docs/rules.md) (Layout Kunde vs. Anbieter), [docs/ui-kit.md](docs/ui-kit.md) (Farben, Buttons, Pills).
- **Architektur:** [docs/architecture.md](docs/architecture.md) (OPTION 1 Block).
- **Cursor-Rules:** `.cursor/rules/option1-layout-scope-kunde-anbieter.mdc`, `layout-kunde-anbieter.mdc`.
