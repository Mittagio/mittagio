# Typografie – Einheitliche Master-Referenz

**Stand:** Februar 2026 · Zweck: Alle Schriften und Größen an einer Stelle bündeln und vereinheitlichen.

---

## 1. Aktueller Zustand – Quellen

### 1.1 Design-Tokens in `:root` (style.css)

| Token | Wert | Nutzung |
|-------|------|---------|
| **Font-Stack (body)** | `'Inter', 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif` | Global |
| **--font-title** | 18px | Überschriften Ebene 2 |
| **--font-title-lg** | 20px | Große Überschriften |
| **--font-body** | 14px | Fließtext Standard |
| **--font-body-lg** | 16px | Fließtext größer |
| **--font-meta** | 12px | Meta, Labels, Badges |
| **--font-meta-sm** | 13px | Meta kleiner |
| **--font-weight-semibold** | 600 | Halbfett |
| **--font-weight-bold** | 700 | Fett |
| **--header-title-size** | 20px | Seitentitel |
| **--header-title-weight** | 900 | Seitentitel Gewicht |
| **--header-input-size** | 15px | Input-Felder |
| **--header-input-weight** | 500 | Input-Felder |
| **--pill-font-size** | 14px | Pills/Chips |
| **--pill-font-weight** | 700 | Pills/Chips |
| **--section-title-size** | 18px | Sektionsüberschriften |
| **--section-title-weight** | 900 | Sektionsüberschriften |
| **--body-text-size** | 15px | Body-Text |
| **--body-text-color** | #334155 | Standard-Textfarbe |

### 1.2 TGTG/Discover (style.css)

| Element | font-size | font-weight | Quelle |
|---------|-----------|-------------|--------|
| .tgtg-list-item-title | 18px | 800 | --tgtg-title-color #0f172a |
| .tgtg-list-item-meta | 14px | 600 | #64748b |
| .tgtg-list-item-price | 16px | 900 | var(--brand) |
| .tgtg-meta-chip | 12px | – | #64748b |
| .discover-header-pills .discover-category-chip | 13px | 600 | CSS |

### 1.3 In index.html (Inline-Styles)

Viele fest codierte Werte, z. B.:

| Kontext | font-size | font-weight |
|---------|-----------|-------------|
| Plan Public h1 | 20px | 900 |
| Plan Public p | 13px | 600 |
| „Wo suchst du?“ | 18px | 850 |
| discoverLocationInput | 16px | – |
| discoverLocationClose | 14px | 700 |
| Pin Drawer Titel | 20px | 800 |
| Pin Drawer Preis | 18px | 900 |
| Empty State h2 (Discover) | 22px | 850 |
| Empty State p | 15px | – |
| Billing Kontodaten | 15px | 700 |
| Admin h1 | 24px | 900 |
| Admin KPI-Werte | 28px | 900 |
| Admin KPI-Labels | 12px | 700 |
| Favoriten Empty h2 | 22px | 850 |
| Cart Abholnummer | 2.5rem | 950 |
| Checkout Titel | 24px | 900 |
| Checkout Labels | 15px | 700 |
| Bottom-Nav Labels | 11px | 700 |

### 1.4 Docs/Layout-Zusammenfassung

- **Logo MITTAGIO:** Montserrat 20px/900
- **Standort:** 14px/700
- **Pills:** 14px/700 (--pill-font-size)
- **Favoriten Titel:** 20px/950
- **Sektion:** 15px/800
- **Empty h2:** 22px/850
- **Body:** 15px #64748b

---

## 2. Inkonsistenzen

| Thema | Problem |
|-------|---------|
| **font-weight** | 800 vs 850 vs 900 vs 950 – unterschiedliche Stufen, uneinheitlich |
| **font-size Überschriften** | 18px, 20px, 22px, 24px, 28px – keine klare Stufung |
| **font-size Body** | 14px, 15px, 16px – drei Varianten ohne klare Regel |
| **font-size Meta** | 11px, 12px, 13px – teils zu klein (11px) für Barrierefreiheit |
| **Inline vs. Tokens** | index.html nutzt viele feste Werte statt CSS-Variablen |
| **Montserrat vs. Inter** | Montserrat nur für Logo; Rest Inter – uneinheitlich dokumentiert |
| **Legacy Kalam/Marker** | Alter Kalam-Font in archivierten Docs erwähnt – aktuell nicht aktiv |

---

## 3. Einheitliche Typografie-Skala (Ziel)

### 3.1 Font-Stack (verbindlich)

```
body: 'Inter', system-ui, -apple-system, sans-serif
Logo/Auszeichnung: 'Montserrat', 'Inter', sans-serif
```

### 3.2 Schriftgrößen (px)

| Stufe | Token | Wert | Verwendung |
|-------|-------|------|------------|
| **XS** | --font-xs | 11px | Nur Badges, Tabellen-Compact, wo unvermeidbar |
| **SM** | --font-meta | 12px | Meta, Labels, Badges |
| **SM+** | --font-meta-sm | 13px | Zwischenstufe, Kategorien |
| **Body** | --font-body | 14px | Fließtext Standard |
| **Body+** | --font-body-lg | 16px | Fließtext größer, Buttons |
| **M** | --font-m | 15px | Body-Alternative (Optional – konsolidieren auf 14/16) |
| **Title-S** | --font-title | 18px | Sektionen, Listen-Titel |
| **Title** | --font-title-lg | 20px | Seitentitel, Hero |
| **Title-L** | --font-title-xl | 22px | Empty-State, große Überschriften |
| **Display** | --font-display | 24px | Checkout, Modals |
| **Hero** | --font-hero | 28px+ | KPI, Abholnummer, Ausnahmen |

### 3.3 Font-Weights (vereinfacht)

| Token | Wert | Verwendung |
|-------|------|------------|
| --font-weight-medium | 500 | Inputs, Platzhalter |
| --font-weight-semibold | 600 | Labels, Meta |
| --font-weight-bold | 700 | Buttons, Pills, wichtige Labels |
| --font-weight-extrabold | 800 | Überschriften Ebene 2, Listen-Titel |
| --font-weight-black | 900 | Seitentitel, Hero, Preis |

**Entfernen:** 850, 950 – durch 800 bzw. 900 ersetzen.

---

## 4. Migrations-Checkliste

- [ ] In `:root` alle neuen/finalen Tokens definieren
- [ ] `style.css`: Hardcodierte font-size/font-weight durch Tokens ersetzen
- [ ] `index.html`: Inline-Styles wo möglich in Klassen auslagern; Klassen nutzen Tokens
- [ ] `Layout-Zusammenfassung.md` auf neue Skala aktualisieren
- [ ] `ui-kit.md` Typografie-Abschnitt ergänzen
- [ ] Prüfen: Keine Schriftgröße unter 12px für lesbaren Text (außer XS-Badges)

---

## 5. Referenzen

- **Implementierung:** `app/style.css` (:root), `app/index.html` (Inline)
- **Docs:** `docs/Layout-Zusammenfassung.md`, `docs/ui-kit.md`
- **Cursor-Rules:** S25 Native, High-End App – keine trostlosen Layouts
