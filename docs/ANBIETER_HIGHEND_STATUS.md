# Anbieter-Seiten: High-End Status

Übersicht, welche Anbieter-Views bereits dem High-End-Design (Glassmorphism, #F8F7F2 / #FFDE00, kartenbasiert, keine Tabellen) entsprechen und wo noch nachgezogen werden kann.

---

## Bereits High-End umgesetzt

| Seite | View-ID | Stand |
|-------|---------|--------|
| **Dashboard (Anbieterbereich Meine Küche)** | `v-provider-home` | Karten (dashboard-kasten), KPIs, Wochenplan-Teaser, einheitlicher BG #F8F7F2, Akzent #FFDE00. Unverändert beibehalten. |
| **Wochenplan** | `v-provider-week` | KW-Navigation, Tageskarten, Aktivieren-Buttons, Glass/rounded, #FFDE00. |
| **Kochbuch** | `v-provider-cookbook` | Abgleich React-Referenz: Untertitel „Deine Umsatz-Könige“, Bestseller-Strip (horizontal), 1-Spalte Karten 24px, Sticky Action-Bar, #F8F7F2. |
| **Inseratsflow (Step 0)** | Wizard | Liquid UI, Glass 2.5rem, 3 Säulen, Preis-Feld, Drei-Wege-Footer, Haptik, nur „Abholnummer“. |

---

## Noch verfeinerbar (optional)

| Seite | View-ID | Was fehlt / Idee |
|-------|---------|-------------------|
| **Abholungen** | `v-provider-pickups` | Grid ist bereits kartenbasiert (`pickup-card`). Fallback-Liste (`pickup-row`) ist Zeilen-Layout. Optional: einheitlichere Karten (z. B. rounded-24px, etwas Glass), Filter-Pills in #FFDE00, Abholnummer-Badge konsistent. |
| **Profil (Meine Daten & Einstellungen)** | `v-provider-profile` | Panels/Listen vorhanden. Optional: Header mit Backdrop-Blur wie andere Views, Kacheln für „Meine Daten“, „Präferenzen“, „Support“ noch stärker als Karten mit Schatten/Rundung. |
| **Finanzen & Abrechnung** | `v-provider-billing` | Die drei Blöcke (Kontodaten, Tagesumsatz, Meine Abrechnungen) sind bereits Karten. **Listen-Inhalt:** `billingTodayList` und `billingList` sind Zeilen mit `border-bottom`. High-End-Variante: jede Abrechnung / jeder Tages-Posten als **eigene kleine Karte** (rounded-16px, Schatten) statt Zeilenliste – dann 100 % kartenbasiert, keine Listenzeilen. |
| **Login (Anbieter)** | `v-provider-login` | Einfache Anmeldung. Optional: gleiche Glass-Optik und #FFDE00 für primären Button. |

---

## Kurz-Checkliste für „noch High-End“

1. **Abholungen:** Filter als Pills (#FFDE00 aktiv), Karten einheitlich rounded-24px.
2. **Profil:** Header glass, Einstiegs-Kacheln klar als Karten.
3. **Billing:** „Meine Abrechnungen“ und „Tagesumsatz heute“ als **Karten pro Eintrag** statt Zeilen mit Trennlinie.
4. **Login:** Primär-Button #FFDE00, optional leichter Glass-Container.

---

## Referenz

- Design-System: Hintergrund `#F8F7F2`, Container `white`, Akzent `#FFDE00`, Bottom-Bar `#1a1a1a`.
- Regel: Keine Tabellen, keine trostlosen Listen – alles kartenbasiert (`.cursor/rules/app-high-end-keine-tabellen.mdc`).
