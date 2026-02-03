# Rechtliche Seiten

View-IDs: `v-legal-impressum`, `v-legal-agb-kurz`, `v-legal-faq`, `v-legal-datenschutz`, `v-version` (jeweils Kunde + Provider-Varianten für Impressum/AGB/Datenschutz/FAQ)

---

## Konzept

Impressum, AGB (kurz), FAQ, Datenschutz – rechtlich erforderlich und für Vertrauen. **Strikte Trennung:** Kunden-Rechtliches ist öffentlich (Profil-Footer); Anbieter-Dokumente (Anbieter-FAQ, Anbieter-Impressum, Anbieter-AGB) sind **ausschließlich im geschützten Anbieter-Bereich** nach Login zugänglich. **App-like:** lesbar, scrollbar, klare Typografie.

---

## Impressum (Kunden)

- **View-ID:** `v-legal-impressum`
- **Inhalt (fest):**
  - **Mike Quach**
  - **Langäcker 2**
  - **73635 Rudersberg**
  - Kunden-Hilfe: info@mittagio.de | Business: support@mittagio.de
  - Plattformhinweis (Vermittlung, Vertragspartner Anbieter)

---

## Footer auf der Profilseite (Kunde)

Der Footer auf „Meins“ (v-profile) ist in **drei Bereiche** gegliedert:

### 1. Kunden-Rechtliches (oben)
- **Eine Zeile Links:** FAQ | Datenschutz | Impressum | AGB
- Nur Kunden-Views (`v-legal-faq`, `v-legal-datenschutz`, `v-legal-impressum`, `v-legal-agb-kurz`).
- **Keine** Links zu Anbieter-FAQ, Anbieter-Impressum, Anbieter-AGB im öffentlichen Footer.

### 2. Anbieter-Bereich (Mitte – optisch abgesetzt)
- Leicht grauer Hintergrund (z. B. #e8e8e8).
- **Text:** „Dein Mittagessen anbieten – einfach und digital.“
- **Button:** „Jetzt als Anbieter einloggen“ → Wechsel in Anbieter-Modus / Login.
- **WICHTIG:** Keine Links zu Anbieter-FAQ, Anbieter-Impressum, Anbieter-AGB in diesem Bereich. Diese Dokumente sind nur im geschützten Anbieter-Dashboard/Profil erreichbar.

### 3. Branding & System (ganz unten)
- **Zentriert:** „www.Mittagio.de made with Love by mittagio.de · Strategie & Besteck“
- **Rechtsbündig, klein:** „v1.0.x“ als Link zur Versionsseite (#/version).

---

## Versionsseite

- **View-ID:** `v-version`
- **Route:** #/version (z. B. aus Footer-Link „v1.0.x“).
- **Inhalt:** Aktuelle App-Version (z. B. v1.0.0), optional Changelog/Hinweis; Zurück-Button (history.back() oder zurück zu Meins).

---

## Aufbau (pro rechtliche Seite)

1. **Header:** Titel (z. B. „Impressum“, „AGB“, „Häufige Fragen“, „Datenschutz“).
2. **Inhalt:** Scrollbarer Text, Absätze, ggf. Links. Kein Gedränge.
3. **Zurück:** Button (z. B. `goBackFromLegalPage()` oder „Zurück“).

**Varianten:**

- **Kunde:** Hell oder Standard-Hintergrund (z. B. #F7F6F0 für FAQ).
- **Anbieter:** Dunkel (#323232) für Anbieter-Impressum/AGB/Datenschutz/FAQ; nur nach Login erreichbar, nicht vom öffentlichen Footer verlinkt.

---

## Cleanup (keine Überreste)

- **Nicht** im öffentlichen Profil-Footer: Sektion „Support & Vertrauen“, gemischte Link-Listen, Anbieter-FAQ-, Anbieter-Impressum- oder Anbieter-AGB-Links.
- Alle verbleibenden Rechtlichen-/Footer-Elemente entsprechen der beschriebenen Struktur (Kunden-Links oben → Anbieter-Bereich Mitte → Branding & Version unten).

---

## Regeln

- Lesbarkeit: Ausreichend Kontrast, Schriftgröße mind. 14px für Fließtext.
- Layout: Keine Schiefertafeln; Kundenseite/Anbieterseite getrennt.
- Rechtstexte aus einer Quelle (z. B. docs/Rechtstexte) einbindbar halten.
- **Trennung Kunde/Anbieter:** Kunden-Rechtliches öffentlich; Anbieter-Dokumente nur im geschützten Anbieter-Bereich.
