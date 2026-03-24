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
