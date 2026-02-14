# Provider Kochbuch *(archiviert)*

> **Veraltet.** Aktuelles Konzept: [docs/KOCHBUCH_KONZEPT.md](../../KOCHBUCH_KONZEPT.md).  
> View-ID: `v-provider-cookbook` · Anbieterseite.

---

## Konzept (damaliger Stand)

Anbieter verwaltet alle Gerichte in einer Liste. **Oben: Kategorie-Pills** zum Filtern (Alle, Vegetarisch, Vegan, Fisch, Mit Fleisch). Bestseller-Strip (Top 3 nach Umsatz), darunter 1-Spalte Karten. Tap = Auswahl → Bottom-Bar: Bearbeiten, Wochenplan, Auswählen (4,99 € inserieren). Helles Layout (#F8F7F2).

---

## Aufbau

- **Header:** „Mein Kochbuch“, Untertitel „Deine Umsatz-Könige“, Suchfeld, Sortierung (🕒/AZ/€↑/€↓).
- **Kategorie-Pills:** Horizontal scrollbar (Alle, 🌿 Vegetarisch, 🌱 Vegan, 🐟 Fisch, 🥩 Mit Fleisch).
- **Bestseller-Strip:** Optionale horizontale Zeile mit Top-3-Gerichten nach Umsatz.
- **Inhalt:** 1-Spalte Karten (Bild, Name, letzte Nutzung · Preis · Umsatz); Tap → Auswahl.
- **Sticky Bottom-Bar:** Standard: Suche, Neues Gericht, Sortieren. Bei Auswahl: Bearbeiten, 📅 Wochenplan, Auswählen (öffnet 4,99‑€-Sheet).

---

## Regeln

- Helles Layout (#F8F7F2, var(--provider-bg)).
- Keine Tabs „Meine Gerichte“ / „Entwürfe“ mehr; Filter nur über Kategorie-Pills.
- „Neues Gericht“ / FAB startet Inseratsflow (Wizard).
- Layout Anbieterseite getrennt von Kundenseite.
