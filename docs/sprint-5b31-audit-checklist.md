# Sprint 5b.31 – Audit-Checkliste (UI-State Layer)

**Sprint-Definition (verbindlich):**  
*Codebase-Audit: Entferne alle Reststellen von style.display / style.transform und legacy s5-visibility-Klassen; ersetze sie durch ui-state-Helper (show/hide/setVisible) und CSS-Variablen; Ergebnis: 0 Treffer.*

**Treffer-Format:** Datei:Zeile | Kurzkontext (1 Zeile) | Kategorie | Aktion (migrieren / bewusst lassen + Kommentar)  
**Aktion Standard:** migrieren → show / hide / setVisible. **Ausnahmen:** img/thumb onerror = bewusst lassen (Fallback); reines Lesen von .style.display = durch Klassen-Check ersetzen.

---

## 1) style.display (A) Inline Display

| Datei | Zeile | Kontext | Kategorie | Aktion |
|-------|-------|---------|-----------|--------|
| app/js/app-logic.js | 111 | badge.style.display = 'flex' | Display | migrieren |
| app/js/app-logic.js | 113 | badge.style.display = 'none' | Display | migrieren |
| app/js/ui-navigation.js | 83 | view.style.display = 'flex' (v-pickup-code) | Display | migrieren |
| app/js/ui-navigation.js | 87 | view.style.display = 'block' | Display | migrieren |
| app/js/ui-navigation.js | 139 | toggleTopbar.style.display | Display | migrieren |
| app/js/ui-navigation.js | 143 | fabModeToggle.style.display = 'none' | Display | migrieren |
| app/js/ui-navigation.js | 149 | customerNavEl.style.display | Display | migrieren |
| app/js/ui-navigation.js | 150 | providerNavWrapEl.style.display | Display | migrieren |
| app/js/ui-navigation.js | 172 | customerNav.style.display | Display | migrieren |
| app/js/ui-navigation.js | 173 | providerNavWrap.style.display | Display | migrieren |
| app/js/ui-navigation.js | 174 | statusIndicator.style.display | Display | migrieren |
| app/js/ui-navigation.js | 290 | main.style.display === 'none' (Lesen) | Display | Klasse prüfen |
| app/js/ui-navigation.js | 298 | el.style.display !== 'none' | Display | Klasse prüfen |
| app/js/ui-navigation.js | 304–307 | kwBd/magicBd/weekAddBd.style.display | Display | Klasse prüfen |
| app/js/ui-navigation.js | 456 | fabModeToggle.style.display = 'flex' | Display | migrieren |
| app/js/ui-navigation.js | 458 | toggleTopbar.style.display = 'flex' | Display | migrieren |
| app/js/ui-navigation.js | 465 | toggleTopbar.style.display = 'none' | Display | migrieren |
| app/js/ui-navigation.js | 469 | upcomingPreview.style.display = 'none' | Display | migrieren |
| app/js/ui-navigation.js | 490 | pickupCodeView.style.display = 'none' | Display | migrieren |
| app/js/ui-navigation.js | 573–642 | providerNavBackRow, wb, ws, wu | Display | migrieren |
| app/script.js | 4750–4751 | sImg.style.display (onerror) | Display | bewusst lassen (img Fallback) |
| app/script.js | 5191 | fastWegEl.style.display = 'none' | Display | migrieren |
| app/script.js | 5383 | airbnbFooter.style.display='none' | Display | migrieren |
| app/script.js | 5385 | sf.style.display='none' | Display | migrieren |
| app/script.js | 6968 | btnApplePay.style.display = 'none' (MVP) | Display | migrieren |
| app/script.js | 6972 | btnGooglePay.style.display = 'none' (MVP) | Display | migrieren |
| app/script.js | 7470 | thumbEl.style.display = 'none' (onerror) | Display | bewusst lassen (img Fallback) |
| app/script.js | 7800–7801 | Toggle display (isHidden ? block : none) | Display | migrieren (→ show/hide) |
| app/script.js | 9386 | lastCallBanner.style.display | Display | migrieren |
| app/script.js | 9395 | providerPushPickup.style.display = 'none' | Display | migrieren |
| app/script.js | 9464 | dashAbholungenHint.style.display | Display | migrieren |
| app/script.js | 9468 | dashUmsatzHint.style.display | Display | migrieren |
| app/script.js | 9474–9476 | kpiLabel*.style.display | Display | migrieren |
| app/script.js | 9498–9504 | providerActiveListings* / providerActiveListingsSection | Display | migrieren |
| app/script.js | 9806 | providerActiveOffers.style.display = 'block' | Display | migrieren |
| app/script.js | 9864 | btnProviderShowAllOffers.style.display | Display | migrieren |
| app/script.js | 9871 | btnProviderShowAllOffers.style.display = 'none' | Display | migrieren |
| app/script.js | 9875 | providerActiveOffers.style.display = 'none' | Display | migrieren |
| app/script.js | 10000 | providerEmptyDashboard.style.display = 'block' | Display | migrieren |
| app/script.js | 10031 | providerEmptyDashboard.style.display | Display | migrieren |
| app/script.js | 10084–10085 | draftEl.style.display | Display | migrieren |
| app/script.js | 10415 | boardWrap.style.display !== 'none' (Lesen) | Display | Klasse prüfen |
| app/script.js | 10659–10660 | bd/sheet.style.display = 'none' | Display | migrieren |
| app/script.js | 10842 | view.style.display = 'block' | Display | migrieren |
| app/script.js | 10855 | view.style.display = 'none' | Display | migrieren |
| app/script.js | 10931 | wizardModal.style.display = 'none' (+ opacity) | Display | migrieren |
| app/script.js | 11058 | wrap.style.display = 'flex' | Display | migrieren |
| app/script.js | 11253 | emptyCta.style.display | Display | migrieren |
| app/script.js | 11259 | kebabDrop.style.display = 'none' | Display | migrieren |
| app/script.js | 11271 | kd.style.display = 'none' | Display | migrieren |
| app/script.js | 11277–11280 | weekKebabDropdown.style.display (onclick) | Display | migrieren |
| app/script.js | 11379 | bd/sheet.style.display (block/flex) | Display | migrieren |
| app/script.js | 11384 | bd/sheet.style.display = 'none' | Display | migrieren |
| app/script.js | 11415–11476 | kebabDrop.style.display (toggle) | Display | migrieren |
| app/script.js | 11492 | boardWrap.style.display = 'flex' | Display | migrieren |
| app/script.js | 11498 | boardWrap.style.display = 'none' | Display | migrieren |
| app/script.js | 11509–11562 | headerDoneBtn, dayWrap, ir.style.display | Display | migrieren |
| app/script.js | 11598 | weekIndicatorRow.style.display = 'flex' | Display | migrieren |
| app/script.js | 11664–11672 | actionsBar, activateBlock.style.display | Display | migrieren |
| app/script.js | 11791–11796 | masterBar.style.display | Display | migrieren |
| app/script.js | 12020, 12039 | boardWrap.style.display !== 'none' (Lesen) | Display | Klasse prüfen |
| app/script.js | 12114–12170 | bd/sheet.style.display (Wochenplan-Sheets) | Display | migrieren |
| app/script.js | 12192 | weekAddSheetSearch.style.display = 'block' | Display | migrieren |
| app/script.js | 12198 | list.style.display = 'grid' | Display | migrieren (Layout) |
| app/script.js | 12244 | boardWrap.style.display (Lesen) | Display | Klasse prüfen |
| app/script.js | 12316–12328 | chooserEl, listWrapEl.style.display | Display | migrieren |
| app/script.js | 12349–12406 | singleActivateWrap, bd, sheet.style.display | Display | migrieren |
| app/script.js | 12479–12486 | sheet.style.display | Display | migrieren |
| app/script.js | 12539 | boardWrap.style.display (Lesen) | Display | Klasse prüfen |
| app/script.js | 12544 | snack.style.display = 'flex' | Display | migrieren |
| app/script.js | 12568 | snack.style.display = 'none' | Display | migrieren |
| app/script.js | 12761 | wu.style.display = 'none' | Display | migrieren |
| app/script.js | 12800–12810 | empty/listEl.style.display (CreateFlow Renner) | Display | migrieren |

---

## 2) style.transform und style.opacity (B)

| Datei | Zeile | Kontext | Kategorie | Aktion |
|-------|-------|---------|-----------|--------|
| app/script.js | 1334 | visibleSub.style.transform = 'translateX(100%)' | Transform | CSS-Var (Motion) |
| app/script.js | 1341 | visibleSub.style.transform = '' | Transform | CSS-Var (Motion) |
| app/script.js | 1349 | el.style.transform = '' (Provider-Sub) | Transform | CSS-Var / show/hide |
| app/script.js | 5443–5444 | point.style.opacity/transform (Swipe-Punkte) | Transform | CSS-Var |
| app/script.js | 7806 | chevron.style.transform (rotate) | Transform | Klasse (accordion) |
| app/script.js | 7832 | chevrons.forEach transform | Transform | Klasse |
| app/script.js | 8464–8471 | demoCode.style.transform (scale) | Transform | CSS-Var |
| app/script.js | 8862–8868 | popup.style.opacity | Transform | CSS-Var / .is-faded |
| app/script.js | 9618–9626 | swipeLayerEl.style.transform (Swipe) | Transform | CSS-Var (bereits --swipe-*) |
| app/script.js | 10445–10481 | slotEl.style.transform (KW-Slot) | Transform | CSS-Var |
| app/script.js | 10739–10740 | tensEl/onesEl.style.transform (Picker) | Transform | CSS-Var |
| app/script.js | 10843–10853 | view.style.transform (translateX) | Transform | CSS-Var |
| app/script.js | 10930–10931 | wizardModal.style.opacity (+ display) | Transform | migrieren (display + Var) |
| app/script.js | 11025–11048 | el/cbView.style.transform (translateX) | Transform | CSS-Var |
| app/script.js | 11929–11959 | cardEl/swipeEl (Swipe-Card) | Transform | CSS-Var |
| app/script.js | 14664 | flyImg.style.opacity = '0' | Transform | CSS-Var |
| app/script.js | 14836–14853 | overlay/flashEl.style.opacity | Transform | CSS-Var |
| app/script.js | 16241–16246 | c.style.opacity/transform (Stagger) | Transform | CSS-Var |
| app/script.js | 16781 | photo-lightbox: lb.style.opacity, img.style.transform | Transform | CSS-Var / Klasse |
| app/script.js | 17199–17216 | quickAdjustPanel.style.transform | Transform | CSS-Var |
| app/script.js | 17371–17481 | primaryBtn/linkSpeichern/btnWeiter/btnEinplanen.style.opacity | Transform | Klasse (.is-disabled) |
| app/script.js | 18605–18614 | bd/sheet.style (pointerEvents, opacity, transform) | Transform | migrieren (show/hide + Var) |
| app/script.js | 19055 | textarea.style.opacity = '0' | Transform | Klasse / CSS-Var |
| app/js/ui-navigation.js | 470 | upcomingPreview.style.opacity = '0' | Transform | CSS-Var |

**Regel:** Animation/Dragging → CSS-Variablen (Motion-Standard). Statisch → Klasse oder CSS.

---

## 3) Legacy s5-* (C) visible/hidden

| Datei | Zeile | Kontext | Kategorie | Aktion |
|-------|-------|---------|-----------|--------|
| app/script.js | 2624, 2667, 2692 | s5-swipe-hidden (Swipe-Cards) | Legacy | belassen (opacity/pointer-events) |
| app/script.js | 3064–3198 | s5-swipe-hidden add/remove/check | Legacy | belassen |
| app/script.js | 5366 | s5-sheet-visible (providerLoginSheet) | Legacy | mappen → .is-visible* |
| app/script.js | 5549–5587 | s5-sheet-bd-visible, s5-sheet-visible, s5-sheet-visible-flex | Legacy | mappen → .is-* |
| app/script.js | 6742, 6763–6764 | s5-custom-time-visible | Legacy | mappen → .is-visible |
| app/script.js | 6817 | s5-btn-vorort-hidden | Legacy | mappen → .is-hidden |
| app/script.js | 6889 | s5-verpackung-visible | Legacy | mappen → .is-visible |
| app/script.js | 7443–7454 | s5-single-block-hidden, s5-multi-block-visible | Legacy | mappen → .is-* |
| app/script.js | 7630, 7632 | s5-pwa-tip-visible | Legacy | mappen → .is-visible |
| app/script.js | 7678–7697 | s5-abholnummer-section-visible, s5-no-abholnummer-* | Legacy | mappen → .is-* |
| app/script.js | 7815–7848 | s5-sheet-bd-visible, s5-sheet-visible, s5-prof-section-hidden | Legacy | mappen → .is-* |
| app/script.js | 7928–7937 | providerLogin s5-sheet-* | Legacy | mappen → .is-* |
| app/script.js | 8476 | s5-message-visible | Legacy | mappen → .is-visible |
| app/script.js | 9331 | s5-demand-visible | Legacy | mappen → .is-visible |
| app/script.js | 9359–9360 | s5-hero-start-hidden, s5-hero-active-visible | Legacy | mappen → .is-* |
| app/style.css | 6107 | .s5-html-print-hide (display:none) | Legacy | belassen (Print) |
| app/style.css | 6184–6214 | s5-* visibility (State) | Legacy | nach JS-Migration auf .is-* umstellen |
| app/style.css | 6228 | .swipe-card.s5-swipe-hidden | Legacy | belassen (opacity) |
| app/style.css | 6250–6272 | s5-cta-hidden, s5-route-hidden, s5-detail-*, … | Legacy | mappen → .is-* |
| app/style.css | 6861, 7023, 7267, 7322 | s5-faq-content-hidden, s5-step-hidden, s5-initially-hidden | Legacy | mappen / Default |

**Regel:** Löschen oder auf .is-hidden / .is-visible / .is-visible-flex mappen.

---

## 4) CSS (D) display-Sonderfälle

| Datei | Zeile | Kontext | Kategorie | Aktion |
|-------|-------|---------|-----------|--------|
| app/style.css | 271–279 | #app .view:not(.active) display:none; .view.active | CSS | beibehalten (Default Layout) |
| app/style.css | 280 | .backdrop:not(.active) display:none | CSS | ggf. .is-hidden |
| app/style.css | 6188–6190 | #cartActiveSessionWrap, #cartMainCard, #cartVerzehrart | CSS | beibehalten (show/hide Default) |
| app/style.css | 5865–5879 | .s5-backdrop-kitchen, .s5-add-dish-* display + .is-open | CSS | prüfen (State → .is-*) |
| app/style.css | 1105–1108 | #weekActivationSuccessBd:not(.active), … | CSS | Default Layout / State prüfen |

**Regel:** Nur behalten, wenn wirklich „Default Layout“. State → .is-*.

---

## Abarbeitung

- **Display:** Immer migrieren → show / hide / setVisible (oder setVisible(..., 'flex')). Ausnahme: img/thumb onerror-Fallback bewusst lassen.
- **Transform/Opacity:** Animation/Drag → CSS-Variablen; statisch → Klasse/CSS.
- **Legacy s5-*visible/hidden:** Löschen oder auf .is-* mappen (s5-swipe-hidden als opacity/pointer-events kann bleiben).
- **CSS display:** Nur behalten, wenn Default-Layout; sonst State über .is-*.

Nach Abschluss: **npm run check:ui-state** → 0 Treffer (style.display / style.transform / style.opacity in app/).

## Guard (Schutz gegen Rückfälle)

- **Pre-commit:** `.git/hooks/pre-commit` führt `node scripts/check-ui-state.js` aus; bei Treffern Exit 1.
- **Manuell:** `npm run check:ui-state` vor Push/PR.

## Smoke-Test nach Migration

Start → Discover → Cart → Checkout → Success; Provider: Login → CreateFlow → Dashboard → ProfileSubs. Keine flackernden States, keine doppelten sichtbaren Blöcke.
