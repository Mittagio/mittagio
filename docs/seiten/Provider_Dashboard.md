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
