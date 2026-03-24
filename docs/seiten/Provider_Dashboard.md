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
