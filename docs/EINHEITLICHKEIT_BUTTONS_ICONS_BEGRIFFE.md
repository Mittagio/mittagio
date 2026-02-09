# Mittagio – Einheitlichkeit: Buttons, Icons, Pills, Begriffe

**Zweck:** Gemeinsamer Durchgang für Wiedererkennungswert. Alle Vorkommen erfasst, offene Entscheidungen markiert.

---

## 1. BUTTON-TYPEN (CSS-Klassen)

| Klasse | Verwendung | Optik |
|--------|------------|--------|
| **.btn** | Basis: volle Breite, rund (999px), Gold, fetter Text | Primär-Kunde (z. B. Einloggen) |
| **.btn.secondary** | Weiß, Rahmen | Zurück, Abbrechen, sekundäre Aktion |
| **.btn.ghost** | Hellgrau (#f8f7f3), Rahmen | Zurück (Rechtliches), Abbrechen, dezent |
| **.btn-primary** | Gelb (#f2b705), 56–64px, CTA | „Weiter“, „Einloggen“ (Modal), „Für 4,99 € inserieren“ |
| **.btn-cust-primary** | Kunden-Primär (--brand Gold), einheitlich Kunde | „Gericht ansehen“, „Zur Mittagsbox“, „Abholnummer sichern“, „Jetzt entdecken“ |
| **.back-button** | Nur Icon (chevron-left), kein Rahmen | Checkout „Zurück“ |
| **.btn-back** | Text „Zurück“ + chevron-left | Abrechnung |
| **.verzehrmodus-checkout-btn** / **.verpackung-btn** | Inline-Styles (border-radius 14px, 12px) | Checkout: Vor Ort / Mitnehmen, Verpackung |
| **.cookbook-action-sheet-btn** | Sheet-Actions | Bearbeiten, In Wochenplan, Löschen |
| **.btn-icon** | Nur Icon (z. B. Herz, Teilen) | Auf Karten |

**Umgesetzt:** „Zurück“ einheitlich mit Chevron-Icon + Text „Zurück“ (kein „←“ mehr); Wizard wBack setzt innerHTML inkl. Icon.

---

## 2. PILLS / CHIPS (Filter, Tagesauswahl, Optionen)

| Name / Klasse | Wo | Optik / Zweck |
|---------------|-----|----------------|
| **.cust-chip** (+ .cust-chip-bar) | Discover (Tage, Kategorien), Warenkorb (Vor Ort/Mitnehmen), Cart Abholzeit | Einheitlicher Kunden-Chip: 14px radius, aktiv = dunkel |
| **.discover-category-chip** | Discover Kategorien (🍲 Eintopf etc.) | Eigene Klasse, .active |
| **.discover-quick-filter-pill** | Discover Quick-Filter | Eigene Klasse |
| **.day-pill** | (evtl. Discover Tage?) | Gradient „heute“, sonst neutral |
| **.week-day-pill** | Anbieter Wochenplan (Mo–So) | 14px radius, .active = Brand, .week-day-pill-today |
| **.ans** (+ .answers) | v-orders Filter (Offen/Abgeholt/Alle), Wizard/Sheets | Ältere Klasse, border + .on = grün |
| **.status-pill** | Bestellkarten (Bezahlt, Abgeholt ✅) | Klein, rund, .open (gelb) / .done (grün) |
| **.cart-time-chip** | Warenkorb Abholzeit | Auswahl Zeit |
| **.code-chip** | Abholnummer-Code (z. B. #1A) | Code-Anzeige |
| **.prov-pill** | Anbieter-Badge | Kleine Pille |
| **.pillar-badge** | Säulen 🍴🧾🔄 (Vor Ort, Abholnummer, Mehrweg) | Konzept-Icons |

**Umgesetzt:** v-orders Filter nutzt **.cust-chip** + **.active** und Container **.cust-chip-bar** (wie Discover/Cart).

---

## 3. ICONS (Lucide vs. Emoji)

### Lucide (data-lucide) – einheitlich genutzt für:
- **Navigation:** chevron-left, chevron-right, chevron-down
- **Aktionen:** share-2, heart, edit, trash-2, printer, copy, log-in, send
- **Kontext:** map-pin, navigation, clock, credit-card, receipt, user, search, compass, shopping-bag, shopping-basket
- **Fach:** utensils, store, calendar, book-open, file-text, mail, help-circle, info, shield-check, eye

### Emoji in Buttons/Labels (gemischt):
- **Checkout/Cart:** 🍴 Vor Ort, 🔄 Mitnehmen, 🧾 Abholnummer
- **Headers/Listen:** 🧾 Aktive Abholnummern, ⚡ in „Deine Favoriten ⚡“, „Mittagsbox heute ⚡“
- **Empty States:** ❤️ in „Markiere Gerichte mit ❤️“
- **Kategorien Discover:** 🍲 Eintopf, 🥩 Vesper, 🥗 Vegetarisch, 🥪 Snack (dynamisch)

**Umgesetzt:** Verzehrart einheitlich **„Vor Ort“** (nicht „Vor Ort essen“) in Checkout und Erfolgsanzeige wie im Cart; Emoji 🍴/🔄 beibehalten.

---

## 4. BEGRIFFE (Terminologie)

### Eindeutig festgelegt (empfohlen beizubehalten)
| Begriff | Verwendung |
|---------|------------|
| **Mittagsbox** | Tab „Mittagsbox“, Header „Mittagsbox heute ⚡“, „Zur Mittagsbox“, „Deine Box ist noch leer“ (Cart), Empty State Orders „Sichere dir dein Mittagessen in der Mittagsbox.“ |
| **Abholnummer** | Zahlungs- & Abholnachweis, „Abholnummer sichern“, „Aktive Abholnummern“, Abholnummer (0,89 €), Abholnummer wird sofort generiert |
| **Bestellung** | „Deine Bestellungen im Überblick“, „Alle Bestellungen anzeigen“, „Meine Bestellungen“ (Anbieter), AGB „Bestellung & Zahlung“ |
| **Favoriten** | Tab „Favoriten“, „Deine Favoriten ⚡“, „Deine Favoriten sind leer“, „bei deinen Favoriten“ |
| **Wochenplan** | Anbieter-Tab „Wochenplan“, „Dein Wochenplan“, „Mein Kochbuch“, öffentlich „Wochenplan“ / „Unser Wochenplan ist online!“ |
| **Meins** | Kunden-Tab + Anbieter-Tab (Profil) |
| **Küche** | Anbieter-Tab „Meine Küche“ |
| **Kochbuch** | Anbieter „Mein Kochbuch“, „Dein Kochbuch ist leer“ |
| **Abholungen** | Anbieter-Tab (Liste der Abholungen/Bestellungen) |

### Einzelne Abweichungen (bereits angepasst)
- **„Deine Box“** → überall **„Deine Mittagsbox“** umgesetzt (Cart-Empty-State, „Deine Mittagsbox hat Hunger“).
- **„Abholbox“** – nur noch in Alt-Text/legacy; bereits durch „Mittagsbox“ / „Bestellungen“ ersetzt.

---

## 5. BUTTON-LABELS (Texte)

### Zurück
- **„Zurück“** (btn secondary, btn ghost, back-button, btn-back)
- **„← Zurück“** (Onboarding, Provider-Nav-Zeile, manche Links)

**Vorschlag:** Überall einheitlich **„Zurück“** + Icon (chevron-left) wo Platz, sonst nur „Zurück“. „←“ nur optional als Fallback.

### Primär-Aktionen
- **„Weiter“** – Onboarding, Wizard
- **„Einloggen“** – Provider-Login (Seite + Modal)
- **„Abbrechen“** – Sheets, Modals, Standort-Picker
- **„Bearbeiten“** – Kochbuch Action-Sheet, Onboarding
- **„Teilen“** – Favoriten-Header, Gericht, Share-Sheet
- **„Drucken“** – Wochenplan, Angebot
- **„Abholnummer sichern“** – Cart CTA
- **„Zur Mittagsbox“** – Empty State Orders
- **„Jetzt entdecken“** – Empty State Favoriten
- **„Alle Bestellungen anzeigen“** – Profil

### Verzehrart / Verpackung (Checkout & Cart)
- **„🍴 Vor Ort essen“** (Checkout) vs. **„🍴 Vor Ort“** (Cart)  
  → **Vorschlag:** einheitlich **„Vor Ort“** oder **„Vor Ort essen“** (eine Form).
- **„🔄 Mitnehmen“** – einheitlich.
- **„Eigener Behälter“** / **„Mehrweg-System 🔄“** – einheitlich.

---

## 6. NAVIGATION (Tabs)

### Kunde (Bottom-Nav)
| Tab | Icon (Lucide) | Label |
|-----|----------------|--------|
| 1 | search | **Entdecken** |
| 2 | heart | **Favoriten** |
| 3 | shopping-basket | **Mittagsbox** |
| 4 | user | **Meins** |

### Anbieter (Bottom-Nav)
| Tab | Icon (data-icon) | Label |
|-----|------------------|--------|
| 1 | home | **Küche** |
| 2 | receipt | **Abholungen** |
| 3 | calendar | **Wochenplan** |
| 4 | bookOpen | **Kochbuch** |
| 5 | user | **Meins** |

**Hinweis:** Kunde nutzt Lucide (search, heart, shopping-basket, user), Anbieter nutzt `.ico` mit data-icon (home, receipt, calendar, bookOpen, user). Für Wiedererkennung: „Meins“ + user-Icon auf beiden Seiten konsistent.

---

## 7. ZUSAMMENFASSUNG: Was wir gemeinsam prüfen sollten

1. **Zurück:** ✅ Umgesetzt – einheitlich „Zurück“ + chevron-left (Icon).
2. **Pills im Kundenbereich:** ✅ Umgesetzt – v-orders Filter nutzt **.cust-chip** + **.cust-chip-bar**.
3. **Verzehrart:** ✅ Umgesetzt – einheitlich **„Vor Ort“** (Checkout, Erfolg, Cart); Emoji 🍴/🔄 beibehalten.
4. **„Deine Box“:** ✅ Umgesetzt – **„Deine Mittagsbox“** (Cart-Empty, „Deine Mittagsbox hat Hunger“).
5. **Button-Klassen:** ✅ Umgesetzt – alle „Zurück“-Buttons nutzen **.btn-back** (Icon + „Zurück“) einheitlich.

Wenn du dich für Optionen entschieden hast, können wir die konkreten Code-Anpassungen (HTML/CSS/JS) Schritt für Schritt vornehmen.
