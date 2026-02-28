# Strukturierte Übersicht: dc21201 → aktueller Stand (HEAD)

**Baseline:** `dc21201` – *History-Context & Back-Action: kontextbasierte Zurück-Navigation für S25*  
**Aktuell:** `4c6d100` – *fix: showProfile undefined - lazy callbacks in BACK_RULES + shim (load order)*  
**Zwischenstand:** 13 Commits

---

## 1) Geänderte Dateien mit Zeilenzahl

| Datei | dc21201 | Aktuell | Diff (+/-) | Kategorie |
|-------|---------|---------|------------|-----------|
| **app/index.html** | ~3.278 | 3.445 | +167 netto | Refactoring, Layout |
| **app/script.js** | ~19.646 | 19.760 | +114 netto | Refactoring, Features |
| **app/style.css** | ~9.388 | 11.432 | +2.044 netto | Layout, Refactoring |
| **app/js/app-logic.js** | – | – | 2/2 | Refactoring |
| **app/js/ui-navigation.js** | – | – | 46/46 | Refactoring |
| **app/js/ui-views.js** | – | – | 15/15 | Refactoring |
| **package.json** | – | – | 2/1 | Tooling |

### Neue Dateien (nicht in dc21201)

| Datei | Zeilen | Zweck |
|-------|--------|-------|
| `.cursor/rules/sprint-5b31-finalize-ui-state.mdc` | 44 | Regel: UI-State Layer, Anti-Rückfall |
| `docs/sprint-5b31-audit-checklist.md` | 183 | Audit-Checkliste für style.display/transform |
| `scripts/check-ui-state.js` | 81 | Guard-Script gegen Inline-Styles |

---

## 2) Kategorien der Änderungen

### A) Refactoring (Sprint 4, 5, 5b)

| Thema | Beschreibung |
|-------|--------------|
| **Sprint 4: Layout-Flags** | Ersetzung von `:has()` durch Layout-Flags auf `main` (`.is-provider-home`, `.is-provider-week` etc.) |
| **Sprint 5: Inline-Styles → Klassen** | `style="display:none"` etc. → `s5-html-*`, `s5-views-*`, `s5-html-tmp-*` Klassen |
| **Sprint 5b: script.js Klassen** | Inline-Styles in `renderPillarBars`, `renderPillarBarsDiscovery` → `s5-pillars-*` Klassen |
| **Sprint 5b.31: UI-State Layer** | `style.display` / `style.transform` → Helper `show()`, `hide()`, `setVisible()`, `.is-hidden`, `.is-visible`, `.is-visible-flex` |
| **Sprint 5b.32: Transform/Opacity** | `style.transform` → CSS-Variablen (`--x`, `--y`, `--slide-x`, `--slide-y`), `slideX()`, `slideY()` |
| **Store/Mode** | `getMode()`, `setMode()` zentralisiert; `navigate()` für History/`pushState` |
| **Lucide-Batching** | `queueLucide()` statt vieler `setTimeout` pro Render |

### B) Layout & CSS

| Thema | Beschreibung |
|-------|--------------|
| **State-Klassen** | `.is-hidden`, `.is-visible`, `.is-visible-flex`, `.is-visible-inline-flex`, `.is-visible-grid`, `.is-faded`, `.is-disabled`, `.is-active` |
| **Transform-Klassen** | `.v-transform`, `.v-slide-x`, `.v-slide-y`, `.swipe-layer`, `.quick-adjust`, `.slot-x`, `.card-x` |
| **Scrollbar** | Globale Webkit-Scrollbar (6px, abgerundet) |
| **Reduced Motion** | `@media (prefers-reduced-motion: reduce)` – Animationen deaktiviert |
| **Layer-Tokens** | `--layer-content`, `--layer-sticky-elements`, `--layer-navigation-header` etc. |
| **Body-Visibility** | Body initial `visibility: hidden`, später sichtbar (kein Flackern) |
| **Entfernt** | Flying-Dish, slot-land, shake, emerald-pulse, Footer-is-ready-Logik (teilweise in andere Strukturen überführt) |

### C) Neue Features & Fixes

| Thema | Beschreibung |
|-------|--------------|
| **Discover 4:3** | Aspect-Ratio 4:3 für Karten, `offersByProviderId` als globaler Index (5b.33b) |
| **Cart Baseline** | `setVisible(cartVerzehrart, 'flex')` in `renderCart()`, robuste `showDiscover`-Aufrufe |
| **Back-Rules** | Lazy Callbacks in `BACK_RULES`, `showProfile`-Shim (Load-Order) |
| **Visibility-Helper** | Vor `initDemoBadge` geladen, `forEach`-undefined behoben |
| **plan-public** | Escape von Quotes im `onerror`-String (SyntaxError-Fix) |
| **Bauleiter** | Z-Index/Layout, Card-Identität, Wording Abholnummer, Preis-Automatik, dynamischer Footer-Button |

### D) Tooling & Guard

| Thema | Beschreibung |
|-------|--------------|
| **check-ui-state.js** | Script prüft auf `style.display`, `style.transform`, `style.opacity` in `app/` |
| **package.json** | `"check:ui-state": "node scripts/check-ui-state.js"` |
| **Pre-commit** | Regel für `.git/hooks/pre-commit` (noch nicht aktiv) |

---

## 3) Zurückgesetzt vs. neu

### Zurückgesetzt / entfernt (aus dc21201)

| Bereich | Was |
|---------|-----|
| **Inline-Styles** | Direkte `style="display:none"`, `style.transform`, `style.opacity` für UI-State |
| **:has() im CSS** | Layout-Steuerung über `:has()` → Layout-Flags auf `main` |
| **Einzelne Animationen** | Flying-Dish, slot-land, shake, emerald-pulse (teilweise in Token/Struktur überführt) |
| **Footer-is-ready** | Alte Inserat-Footer-Logik (in neue Struktur migriert) |

### Neu (seit dc21201)

| Bereich | Was |
|---------|-----|
| **UI-State-Helper** | `show()`, `hide()`, `setVisible()`, `clearVisibility()`, `resetVisibility()`, `isHidden()`, `isVisible()` |
| **Transform-Helper** | `slideX()`, `slideY()`, `resetSlideX()`, `resetSlideY()`, `resetTransform()` |
| **State-Klassen** | `.is-hidden`, `.is-visible`, `.is-visible-flex`, `.is-visible-inline-flex`, `.is-visible-grid`, `.is-faded` |
| **s5-* Klassen** | `s5-html-*`, `s5-views-*`, `s5-pillars-*` für HTML-Struktur und Pills |
| **navigate()** | Zentraler History-Handler mit `pushState`/`replaceState`, Layout-Flags |
| **Audit & Guard** | `sprint-5b31-audit-checklist.md`, `check-ui-state.js`, Regel `sprint-5b31-finalize-ui-state.mdc` |
| **Discover-Optimierung** | 4:3 Aspect-Ratio, `offersByProviderId` Index |

---

## 4) Commit-Chronologie (dc21201 → HEAD)

```
dc21201  History-Context & Back-Action
0970bcf  Bauleiter: Z-Index/Layout, Card-Identität, Wording Abholnummer, Preis-Automatik
693fe02  Rettung: Body sichtbar, updateOnlineStatus abgesichert
8dc701c  Fix Syntax Zeile 17942
eb80208  Sprint 4: has() durch Layout-Flags ersetzen
15104a1  Sprint 5: Inline styles durch s5-html-* / s5-views-* Klassen ersetzt
db03aa7  Sprint 5b: Inline-Styles in script.js durch s5-* Klassen
1559899  Cart: Baseline-State, setVisible, showDiscover robust
adb188e  chore: sprint 5b.31 audit scaffolding
f017ab7  chore: finalize ui-state layer (sprint 5b.31)
67f13ba  chore: finalize ui-state layer (sprint 5b.31)
77a22dd  chore: refactor transforms/opacities to css vars & classes (sprint 5b.32)
ba9018e  perf: Discover 4:3 aspect-ratio + offersByProviderId (5b.33b)
74ca16e  fix: escape quotes in plan-public onerror
1dcdd58  fix: move visibility helpers before initDemoBadge
4c6d100  fix: showProfile undefined - lazy callbacks in BACK_RULES
```

---

## 5) Layout-Wiederherstellung (26.02. → dc21201-Stand)

Nach dem Refactoring wurden folgende Bereiche gezielt auf den visuellen Stand von dc21201 zurückgesetzt:

| Bereich | Änderung |
|---------|----------|
| **Airbnb-Footer** | Weiß (#ffffff), `border-top: 1px solid #ebebeb`, `env(safe-area-inset-bottom)`, 0px margin |
| **Emoji-Säulen** | `renderPillarBars()`: Lucide-Icons → Emojis 🍴 🧾 🔄 direkt unter dem Bild |
| **Slate-Farben** | `#334155` → `#1a1a1a` (Deep Black statt Slate Grey) |
| **Kunden-Navigation** | `#customerNav` mit `display: flex !important` im Kundemodus |

---

## 6) Kurzfassung

| Aspekt | Ergebnis |
|--------|----------|
| **Größte Änderung** | `app/style.css` (+2.044 Zeilen) – State-Klassen, Transform-Vars, Reduced Motion |
| **Refactoring-Schwerpunkt** | Migration von Inline-Styles zu Klassen und Helper (Sprint 4, 5, 5b) |
| **Neue Infrastruktur** | UI-State-Layer, Audit-Checkliste, Guard-Script |
| **Layout-Wiederherstellung** | Footer, Emojis, Slate, customerNav auf dc21201-Stand |
| **Neue Features** | Discover 4:3, Cart-Baseline, Back-Rules-Fixes, plan-public-Escape |
