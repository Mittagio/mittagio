# Provider Wochenplan

View-ID: `v-provider-week` · Anbieterseite

---

## Konzept

Wochenübersicht: Anbieter plant Gerichte pro Tag. Helles Layout, Tag-Pills, Inserate je Tag zuweisen.

---

## Aufbau

- **Header:** „Wochenplan“, Zurück-Button.
- **Tag-Pills:** Mo, Di, Mi, … (auswählbar).
- **Inhalt:** KW-Board mit Tages-Kacheln; pro Tag Slots (Gerichte) oder **Plus-Kachel** (+).
- **Plus-Button auf den Kacheln:** Führt zur **Inseratsauswahl** (Sheet `#createFlowSheet`, Titel „Inseratsauswahl“ – nicht Kochbuch). Dort: „Neues Gericht erstellen“, „Aus dem Kochbuch hinzufügen“, „Beliebte Gerichte“. Der gewählte Tag wird als `weekPlanDay` und `createFlowPreselectedDate` gesetzt.
- **Aktionen:** PDF, Teilen (optional).

---

## Regeln

- Helles Layout (#f4f4f4), weiße Karten.
- Layout Anbieterseite getrennt von Kundenseite.
