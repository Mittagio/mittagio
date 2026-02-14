# Mittagio – UI-Kit

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## 1. Grundprinzip

- **Premium-Gastronomie-App:** Karten-basiert, Glassmorphism wo passend, klare Hierarchie. **Keine** reinen Tabellen, keine trostlosen Listen oder Behörden-Formulare.
- **Kunde:** Clean, modern; keine Schiefertafeln (außer ggf. eine Ausnahme Detailseite nach alter Spec – aktuell clean).
- **Anbieter:** Helles, aufgeräumtes Layout; Inseratsflow: `.cursor/rules/inseratsflow-ist-high-end-universal.mdc`.

---

## 2. Farben (Hex)

| Token / Verwendung     | Hex      | Verwendung                          |
|------------------------|----------|-------------------------------------|
| --brand / Primär Kunde | #FFD700  | Mittagio-Gelb, CTAs, Abholnummer-Badge |
| Emerald                | #10b981  | Anbieter aktiv, Speichern, Option B |
| Gelb CTA Inserat       | #FACC15  | „Jetzt für 4,99 € inserieren“      |
| --sticker-green        | #27AE60  | Preis-Sticker, Mehrweg              |
| --bg-polaroid          | #E8E0D6  | Hintergrund (gebleichte Eiche)      |

---

## 3. Drei Säulen (Slots)

Reihenfolge fest: **🍴 Vor Ort** | **🧾 Abholnummer** | **🔄 Mehrweg**.

- **Kunde (Listen/Detail):** Icons farbig (aktiv) oder ausgegraut (inaktiv). Abholnummer-Badge auf Favoriten: Hintergrund #FFD700.
- **Swipe/Discover:** Nur Symbole, kein Text in der Fußzeile; bei fehlendem Feature dezente Platzhalter-Box, Slots rücken nicht nach.
- **Anbieter (Wochenplan / Dashboard Meine Küche):** Silent Defaults – Pillars nur anzeigen, wenn das Gericht vom Profil-Standard abweicht (siehe `docs/rules.md`).

---

## 4. Buttons

| Klasse / Typ           | Verwendung |
|------------------------|------------|
| .btn / .btn-primary    | Primär (z. B. Gelb, 56–64px): „Weiter“, „Einloggen“, „Für 4,99 € inserieren“ |
| .btn.secondary         | Weiß, Rahmen: Zurück, Abbrechen |
| .btn.ghost             | Hellgrau #f8f7f3: Zurück (Rechtliches) |
| .btn-cust-primary      | Kunden-Primär (--brand): „Gericht ansehen“, „Zur Mittagsbox“, „Abholnummer sichern“, „Jetzt entdecken“ |
| .btn-back              | „Zurück“ + chevron-left (einheitlich) |
| .btn-icon              | Nur Icon (Herz, Teilen) auf Karten |

Zurück überall einheitlich: „Zurück“ + Chevron-Icon.

---

## 5. Pills / Chips

| Name              | Verwendung |
|-------------------|------------|
| .cust-chip / .cust-chip-bar | Discover (Tage, Kategorien), Warenkorb, Filter; aktiv = dunkel |
| .discover-category-chip     | Discover Kategorien |
| .week-day-pill              | Anbieter Wochenplan (Mo–So), .active = Brand |
| .status-pill                | Bestellkarten (Offen/Abgeholt) |
| .code-chip                  | Abholnummer-Code (#1A) |
| .pillar-badge               | Säulen 🍴 🧾 🔄 |

---

## 6. Icons

- **Lucide (data-lucide):** chevron-left/right/down, share-2, heart, edit, trash-2, map-pin, clock, user, search, shopping-basket, utensils, calendar, building, etc.
- **Emoji in UI:** 🍴 Vor Ort, 🔄 Mehrweg/Mitnehmen, 🧾 Abholnummer; Kategorien Discover (🍲, 🥩, 🥗, …).

---

## 7. Karten & Layout

- **Restaurant-Karte (Kunde):** Weißer Rahmen, quadratisches Bild; Gerichtname (z. B. Marker-Schrift), Anbietername darunter; Herz, Preis-Sticker, Teilen.
- **Favoriten-Grid:** 2×2, gap 12px, homogene Höhe, border-radius 16px, Bild 1:1.
- **Anbieter:** .prov-card, .prov-stats-grid; Inseratsflow: Glassmorphism, Emerald, Gelb (siehe Regel).
- **Listen:** Immer als Karten-Reihen mit Bild, Titel, Preis, Badges – nie als HTML-Tabellen.

---

## 8. Allergene-Overlay

- Titel: „Allergene & Informationen“.
- Sticky-Hinweis: „Für die Richtigkeit und Aktualität der Angaben ist ausschließlich der Anbieter verantwortlich. Bei schweren Allergien halten Sie bitte Rücksprache mit dem Personal vor Ort.“
- Standard-Kürzel A–R (Gluten, Krebstiere, Eier, Fisch, Erdnüsse, Soja, Milch, Schalenfrüchte, Sellerie, Senf, Sesam, Sulfite, Lupinen, Weichtiere).

---

## 9. Navigation

- **Kunde (Bottom-Nav):** search Entdecken | heart Favoriten | shopping-basket Mittagsbox | user Meins.
- **Anbieter (Bottom-Nav):** home Küche | receipt Abholungen | calendar Wochenplan | bookOpen Kochbuch | user Meins.

---

*Implementierung: `app/index.html` (HTML/CSS/JS).*
