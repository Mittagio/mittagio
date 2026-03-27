# Provider Dashboard (Meine Küche)

**View-ID:** `v-provider-home` · Anbieterseite  
**Stand:** 14.02.2026

---

## Konzept

Zentrale Anbieter-Startseite: Tagesumsatz, Bestellungen, Tagesessen, Wochenvorschau. FAB „+“ für neues Gericht.

## Aufbau

- Header: Begrüßung
- Karte: Tagesumsatz, Bestellungen
- Tagesessen (aktive Inserate)
- Wochenvorschau / Teaser
- FAB „+“ → Inseratsauswahl

## Regeln

- Helles Layout (#F8F7F2)
- Silent Defaults: 3 Säulen nur bei Abweichung
- Footer-Systemfläche (global Anbieter): Bottom-Navigation, Wochenplan-Footer, Kochbuch-Footer und Wizard-Footer sind immer `position: fixed`, `left/right/bottom: 0`, ohne seitlichen Versatz.
- Safe-Area: Footer-Padding unten über `env(safe-area-inset-bottom)` / `--safe-area-bottom`, damit der Footer am Geräte-Rand klebt.
- Systemfarbe unten: Footer-Hintergrund folgt dem Geräteschema (`prefers-color-scheme`) – hell: weiß, dunkel: schwarz.

## Footer-Update (Airbnb-Look, Anbieter)

- Scope nur Anbieter: `body.provider-mode #providerNavWrap.provider-nav-wrap-pill` und `body.provider-mode #providerNavWrap #providerNav`.
- Inhalt bleibt unverändert (5 Tabs + Reihenfolge), nur Form/Farbe/Größe der Hülle.
- Footer-Hülle: transparenter Wrap, innen weiße Card (`#ffffff`) mit feinem Rand (`#ebebeb`), 24px Radius und weichem Shadow.
- Touch-Ziele bleiben app-tauglich (`.navbtn` min. 60px Höhe), aktive Tabs klarer hervorgehoben.
- Safe-Area bleibt aktiv über `var(--safe-area-bottom)`, damit der Footer auf S25 sauber sitzt.

## Footer-Hotfix (Homogenität)

- Die Anbieter-Bottom-Navigation bleibt strikt bei **5 Tabs** in fester Reihenfolge: `Dashboard` → `Abholnummern` → `Wochenplan` → `Kochbuch` → `Profil`.
- Der Dashboard-Footer nutzt damit dieselbe Navigationsstruktur wie die restlichen Anbieter-Views; keine 4-Tab-Sondervariante.

## Footer-Hotfix (Höhe)

- Provider-Footer wurde leicht angehoben: `--provider-footer-pad-y` von `12px` auf `14px`.
- Touch-Höhe im Footer-System auf `60px` gesetzt (`--provider-footer-btn-height`), damit die Navigation auf S25 konsistent und Daumen-sicher bleibt.
- FAB-Offset für Dashboard wurde entsprechend mit angehoben (`#fabProviderAddOffer`), damit Plus-Button und Footer visuell sauber getrennt bleiben.

## Footer-Hotfix (Zurück-Artefakt)

- `#providerNavBackRow` wird im Anbieter-Modus per CSS-Guard dauerhaft verborgen (`display: none !important`).
- Dadurch erscheint in `Abholnummern` kein abgeschnittener „Zurück“-Rest mehr über der Bottom-Navigation.

## Footer-Hotfix (Kochbuch-Button bleibt stehen)

- Der Footer `#cookbookFooterWrap` wird außerhalb des Kochbuch-Kontexts hart unterdrückt: `body.provider-mode:not(.provider-cookbook-active) #cookbookFooterWrap { display: none !important; }`.
- Ergebnis: Beim Verlassen von `Kochbuch` bleibt der Button unten nicht mehr in anderen Anbieter-Views hängen.

## Footer-Hotfix (Linie + Active-State)

- Im Anbieter-Footer wurde ein zusätzlicher Linienrest unten entfernt (`border-bottom: 0` auf `#providerNavWrap` und `#providerNav`).
- Active-State der Bottom-Nav wurde entschärft: `Dashboard` ist weiterhin aktiv erkennbar, aber nicht mehr überproportional stark (kein extra Icon-Block, nur subtile Farb-/Gewichts-Differenz).

## Footer-Feinschliff (Abholnummer + Active Glow)

- Der Tab `Abholnummern` nutzt jetzt denselben SVG-Icon-Pfad wie die anderen Provider-Tabs (`data-icon="receipt"` statt Emoji), damit die Icon-Linie homogen ist.
- Der aktive Tab im Provider-Footer ist visuell klarer: stärkere Typo (`900`), goldener Icon-Background mit leichtem Glow/Inner-Ring und dezenter Icon-Leuchtspur.
- Inaktive Tabs bleiben bewusst ruhiger (`opacity` leicht reduziert), damit der aktive Zustand schneller erkennbar ist.

## Bottom-Nav Variante: Material-soft

- Active-State nutzt jetzt einen dezenten Indicator als kleine Pill unter dem aktiven Tab (`.navbtn.active::after`), statt harter Flächenhervorhebung.
- Inaktive Tabs bleiben ruhig (neutrales Grau), aktiver Tab bleibt klar erkennbar über leichte Gewichtung + soft Indicator.

## Bottom-Nav Variante: Airbnb-clean

- Indicator-Pill unter dem aktiven Tab wurde entfernt, um den unteren Linien-Eindruck zu vermeiden.
- Farben auf Airbnb-artige Ruhe abgestimmt: inaktiv hellgrau, aktiv dunkel (`#111111`), ohne harte Flächenhinterlegung.
- Vertikale Ausrichtung der Tabs gestrafft (`padding`/`gap`), damit Schrift und Icon nicht „zu weit unten“ wirken.
- Inline-Layoutstyles an `#providerNavWrap` und `#providerNav` wurden entfernt; Footer-Geometrie kommt jetzt zentral aus `app/style.css` (einheitlich, konfliktarm).
- Separator ist jetzt exakt Airbnb-artig: genau **eine** feine Linie oberhalb des Footers (`#providerNavWrap::before`), keine zusätzlichen Innenlinien.

## Header Shrink (Provider)

- `Meine Küche` nutzt jetzt einen kompakten Scroll-State: Header startet groß und wechselt beim Runterscrollen in `is-compact`; beim Hochscrollen/nahe Top expandiert er wieder.
- Der Sticky-KPI-Bereich bleibt synchron: bei kompaktem Header wird der `top`-Offset reduziert, damit keine Lücke oder Überlappung entsteht.
- Umsetzung läuft klassenbasiert (`.is-compact`) über zentrale Scroll-Logik in `app/script.js` (keine neuen Inline-State-Styles).

## Footer Auto-Hide bei Scroll (Anbieter)

- Beim Runterscrollen in Anbieter-Listen/Views blendet sich die Bottom-Navigation temporär aus.
- Beim Hochscrollen oder nahe Seitenanfang blendet sich der Footer automatisch wieder ein.
- Umsetzung nur per Klassen (`.footer-autohide`, `.is-scroll-hidden`) und Transition in CSS, ohne Inline-`style.transform`.
- Aktiv nur im Anbieter-Kontext (`body.provider-mode`) und nicht in Wizard/Create-Flow-Zuständen.
- Unterstützte Scroll-Container: Dashboard (`.dashboard-floating-wrap`), Abholnummern, Wochenplan, Kochbuch, Profil.
- Feintuning (global Anbieter): Hide erst ab sinnvoller Scrolltiefe, Show schneller bei Gegenbewegung, plus Idle-Reveal nach kurzem Scroll-Stopp für ein ruhigeres Verhalten.

## Footer-Konsistenz (Wizard + Foto-Editor)

- Konsistenzziel: Die drei Footer-Varianten folgen demselben Maßsystem wie „Foto speichern“.
- Einheitliche Basiswerte über CSS-Variablen: horizontales Padding, vertikales Padding, Button-Höhe, Radius, Button-Inset.
- Gilt für `#mastercard-footer-step1`, `#mastercard-footer-step2`, Step-3-Footer sowie `#photo-edit-overlay .save-footer`.
- Primär-Buttons wurden auf identische Höhe/Radius/Padding harmonisiert; Step-2-Publish-CTA nutzt volle verfügbare Breite ohne Zusatzmargen.

## Footer-Robustheit (Dashboard Fallback)

- Beim Rendern von `v-provider-home` wird `#providerNavWrap` defensiv wieder auf sichtbar gesetzt (inkl. Entfernen von `is-scroll-hidden`).
- Alte Restzustände (`provider-cookbook-active`, `cookbook-active`, `wizard-inserat-open`, `create-flow-open`) werden im Dashboard-Kontext bereinigt, damit die Anbieter-Nav nicht fälschlich verborgen bleibt.

## Browser-Stabilität (Desktop + Mobile Browser)

- Query-Parameter aus Legacy/Back-Navigation werden normalisiert: `?/week=...` bzw. `?/day=...` werden auf saubere URLs (`?week=...&day=...`) umgeschrieben, damit Wochenplan/Dashboard konsistent rendern.
- `showProviderWeek()` akzeptiert sowohl `week/day` als auch legacy `/week`-Keys, damit alte History-Einträge keine unfertigen Layoutzustände triggern.
- In lokalen Browser-Umgebungen (`localhost`, `127.0.0.1`) wird kein Service Worker registriert; vorhandene Registrierungen werden deaktiviert, um Cache-Mischzustände zwischen PWA und Browser zu verhindern.

## Mobile Feinschliff (Meine Küche)

- Wochenvorschau im Dashboard wurde verdichtet: kompaktere Abstände, reduzierte Corner-Radien, ruhigere Schatten.
- Gerichtszeilen in `#providerWeekDayContent` sind auf mobile Lesbarkeit optimiert (kleinere Thumb-/Badge-Dimensionen, ausgewogenere Typografie, kontrollierter Textumbruch).
- Geplante/Online-Karten bleiben semantisch unterscheidbar, aber ohne überzeichnete Formfaktoren.
- FAB im Dashboard wurde tiefer und etwas kleiner positioniert, damit er Inhalte weniger überlagert.

## Header + Kachelbereinigung

- Anbieter-Header im Dashboard und im Profil laufen jetzt auf weißer Fläche (`#ffffff`/`rgba(255,255,255,0.96)`), damit die Topbar visuell mit dem Gerät verschmilzt.
- Rote Swipe-/Testflächen bei aktiven Angebotskacheln sind deaktiviert (keine farbigen Box-Ränder im Normalzustand).
- Anbieter-Header sind global vereinheitlicht (wie „Meine Küche“): identische Headerfarbe, identische Typografie (`Montserrat/Inter`, `20px`, `900`, `-0.03em`) und konsistente Top-Positionierung/Row-Ausrichtung über Dashboard, Abholnummern, Wochenplan, Kochbuch und Profil.
- Dashboard-spezifischer Header-Override wurde auf fixe `20px` angehoben (statt responsive `clamp(...)`), damit `Meine Küche` nicht kleiner als die übrigen Anbieter-Header rendert.

## Anbieter-Shell Lock (Airbnb-homogen)

- Finale, priorisierte Provider-Token sorgen für einheitliche Farbe und Abstände in Light/Dark: `--provider-header-bg`, `--provider-footer-bg`, `--provider-footer-border`, `--provider-footer-pad-x/y`, `--provider-footer-btn-height`.
- Header im Anbieterbereich ist jetzt opak und ohne Blur/Farbstich (kein „fremder“ Top-Farbton mehr), inkl. sauberem Safe-Area-Top-Padding.
- Alle Anbieter-Footer (Bottom-Nav, Wochenplan, Kochbuch, Wizard Step1/2/3) nutzen dieselbe fixed-Container-Geometrie (`left/right/bottom: 0`, identisches Padding, identische Border).
- Wizard-Buttons sind höhen- und radiusgleich zum restlichen Anbieter-Footer-System.
- Darkmode ist über `prefers-color-scheme: dark` auf dieselben Token gemappt, damit der Anbieter-Chrome auf allen Geräten konsistent bleibt.

## Footer-Konsistenz Final (26.03.2026)

- Konflikt behoben: Der Mobile-Override (`<=390px`) hat Step1/Step2 auf `46px` reduziert und damit eine sichtbare Abweichung erzeugt.
- Der Override nutzt jetzt durchgehend die globalen Listing-Tokens (`--listing-footer-btn-height`, `--listing-footer-shell-min-height`) statt Sonderwerte.
- `#photo-edit-overlay .save-photo-btn` ist im selben Mobile-Block eingebunden, damit Step1, Step2 und Foto-CTA auf kleinen Geräten identisch bleiben.
- Zusätzlich wurde ein finaler Prioritäts-Lock am Ende von `app/style.css` ergänzt, der Höhe, Padding, Radius und Typografie für alle drei CTA-Typen vereinheitlicht.

## Footer-Debug & Runtime-Lock (26.03.2026)

- Live-Debug aktiv: `window.debugFooterButtonMetrics()` zeigt für Step1/Step2/Foto-CTA die berechneten Werte (u. a. Höhe und Schrift) als Toast + `console.table`.
- Befund: `main-publish-btn` lief trotz CSS-Lock in einzelnen Zuständen mit größerer Höhe.
- Fix: Beim Erzeugen in `buildListingStep()` wurde ein JS-Runtime-Lock ergänzt (Step1-Buttons + `main-publish-btn`) mit identischen Kernwerten (`52px` Höhe, `15px/800`, `12px` Radius, `0 16px` Padding, `inline-flex`-Zentrierung, `white-space: nowrap`).
- Ziel: Selbst bei konkurrierenden CSS-Regeln bleibt die finale Geometrie in allen Wizard-Footern identisch.
- Nachschärfung: Step2 wählt im Debug explizit den sichtbaren Publish-Button; zusätzlich werden alte `#main-publish-btn`-Duplikate vor dem Rendern entfernt, damit keine Legacy-Instanz gemessen oder angezeigt wird.
- Finaler Step2-Angleich: Der Publish-CTA nutzt eine eigene Klasse (`.inserat-footer-btn--499` / `photo-save-clone-btn`) statt `.btn-primary-black`, damit keine Legacy-Button-Regeln mehr eingreifen.
- Ergebnisziel nach Spec: Step2-Footer orientiert sich 1:1 am „Foto speichern“-Footer (52px CTA-Höhe, unten bündig, identischer Radius/Typografie).
- Layout-Fix für „unten anliegend“: Step1- und Step2-Footer werden im Listing-Flow direkt an `document.body` angehängt (wie der fixe Header), nicht im Wizard-Container. Dadurch greifen keine Container-Clips durch `overflow:hidden`; der Footer sitzt stabil am unteren Viewport-Rand.
- Nachfix Sichtbarkeit/Leak: Step1-Footer-Z-Index wurde auf den Step2-Layer angehoben, damit er im Wizard nicht hinter dem Panel verschwindet. Zusätzlich entfernt `closeWizard()`/`closeMastercard()` nun die Body-Footer (`#mastercard-footer-step1`, `#mastercard-footer-step2`, `#main-publish-btn`) hart, damit im Dashboard kein CTA-Rest stehen bleibt.
- CTA-Typografie/Schreibweise finalisiert: Footer-Buttons bleiben im gleichen Schriftbild wie `Speichern`/`Weiter` (15px/800, kein Caps-Transform). Step2-Text läuft über ein zentrales Label-Helper-Pattern mit normaler Schreibweise; Auto-Debug-Toast ist standardmäßig deaktiviert (`window.__footerDebugAuto = false`).
- Foto-Editor Overlay-Fix: Beim Öffnen des Foto-Editors werden Listing-Footer (Step1/Step2/Step3) temporär ausgeblendet und beim Schließen abhängig vom aktuellen Wizard-Step wieder eingeblendet. Zusätzlich wurde der Overlay-Layer über den Footer-Layer gesetzt, damit der CTA `Foto speichern` immer sichtbar bleibt.

## Mobile-State-Hotfix (Provider, 27.03.2026)

- Defensiver UI-Reset beim Anbieter-Navigationsklick (`Dashboard`, `Abholnummern`, `Wochenplan`, `Kochbuch`, `Profil`) entfernt hängengebliebene Overlay-/Wizard-Zustände.
- Bereinigt werden u. a. Klassen wie `wizard-inserat-open`, `create-flow-open`, `provider-cookbook-active`, `cookbook-from-dashboard` sowie aktive Backdrops (`#wbd`, `#createFlowBd`, `#createFlowSheet`).
- Zusätzlich werden übrig gebliebene Wizard-/Drawer-Elemente im `body` entfernt (Step-Footer, Quick-Adjust, Bottom-Sheets, Sub-Drawer), damit keine dunklen Layer oder Ghost-UI in andere Provider-Views durchschlagen.
- Provider-Bottom-Nav wird nach Cleanup hart sichtbar gesetzt (`display/visibility/opacity`) und `is-scroll-hidden` entfernt.
