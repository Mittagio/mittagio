# Anbieter-Seiten: High-End Stand

## Bereits High-End umgesetzt

| Seite | View | Stand |
|-------|------|--------|
| **Dashboard (Mein Betrieb)** | `v-provider-home` | Karten, KPIs, Wochenplan-Kasten, #F8F7F2 / #FFDE00, einheitliches Layout |
| **Wochenplan** | `v-provider-week` | KW-Navigation, Tageskarten, Aktivieren-Buttons, Glass/Abholnummer-Logik |
| **Kochbuch** | `v-provider-cookbook` | Bestseller-Strip, Karten-Grid, Action-Bar, Auswählen → Inseratsflow |
| **Inseratsflow (Step 0)** | Wizard | Liquid UI, Glassmorphism 2.5rem, 3 Säulen, Preis-Feld, Drei-Wege-Footer, Haptik |

---

## Noch nicht vollständig High-End (optional nachziehen)

| Seite | View | Was fehlt / Tipp |
|-------|------|-------------------|
| **Abholungen** | `v-provider-pickups` | Bereits Karten-Grid (`pickup-card`). Optional: stärkere Abrundung (z. B. `rounded-[24px]`), einheitlicher Glas-Schatten, Akzent #FFDE00 für Filter/Buttons |
| **Profil (Einstellungen)** | `v-provider-profile` | Panels vorhanden. Optional: einheitliche Karten-Optik wie Dashboard, Sub-Views (Meine Daten, Präferenzen, FAQ) mit gleichem Card-Style |
| **Finanzen & Abrechnung** | `v-provider-billing` | Bereits 3 Karten (Kontodaten, Tagesumsatz, Abrechnungen). Listen sind Zeilen mit `border-bottom` – optional jede Zeile als kleine Karte mit Rundung/Schatten |
| **Login** | `v-provider-login` | Einfache Maske; nur bei Bedarf an Design-System anpassen |

---

## Kurzfassung

- **Erledigt:** Dashboard, Wochenplan, Kochbuch, Inseratsflow (Step 0).
- **Optional:** Abholungen (Feinschliff), Profil (Karten einheitlich), Billing (Abrechnungszeilen als Karten), Login (falls gewünscht).

Die **kritischen** Anbieter-Seiten (Küche, Planung, Inserat) sind High-End; Abholungen, Profil und Billing sind funktional und bereits kartenbasiert, könnten aber optisch noch stärker vereinheitlicht werden.
