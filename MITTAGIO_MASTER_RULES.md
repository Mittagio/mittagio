# MITTAGIO MASTER RULES – Design-Bibel

**Einzige verbindliche Quelle für Design-Entscheidungen.** [cite: 2026-02-18]

Alle anderen .md-Dateien (insbesondere `docs/_archive/` und verstreute Konzept-Docs) sind für Design-Referenz **nicht** zu konsultieren. Bei Widerspruch gilt **immer** diese Datei.

---

## 1. Layout-Prinzipien

### Edge-to-Edge
- **Inhalt füllt den Bildschirm von links nach rechts.** Keine einrückenden Paddings oder Margins.
- Inserat-Cards, Listen, Dashboards: `padding: 0`, `margin: 0` für Container.
- Nur `env(safe-area-inset-*)` für Geräte mit Notch/Insel.

### 100×100 Card (Inserat-Bar)
- **Jede Card** (Feed, Kochbuch, Wochenplan): 100×100 px Bild **links**, Text **rechts**.
- Keine Schatten, keine Boxen, keine abgerundeten Karten-Container.
- Trennlinie: `border-bottom: 1px solid #e5e7eb`.
- Implementierung: `renderInseratCard()` in `app/js/ui-views.js`.

### Airbnb-Style
- Glassmorphism, Emerald #10b981, Gelb #FACC15 für 4,99-€-CTA.
- Klare Hierarchie: Überschriften fett, Untertitel grau (#64748b).
- Keine Schiefertafel-Ästhetik.

---

## 2. Inseratsflow

### Foto oben
- **Bild volle Breite**, bündig mit dem Rand. Kein weißer Rand oben.
- **Keine inneren Abstände** (Paddings) oberhalb oder seitlich des Fotos.
- Hero: randlos (Edge-to-Edge), 190px Höhe.

### Struktur
- Fixierter Header (Bild) → scrollbarer Mittelteil → fixierter Footer (Buttons).
- `.w-actions` und alte Zurück-Leiste ausgeblendet.
- Power-Bar: 🍴 Vor Ort, 🔄 Mehrweg (nur zwei Pills).

### Terminologie
- **Nur** „Abholnummer“. Verboten: „Code“, „Ticket“, „Abholcode“.

---

## 3. Priorität

- **Master-Regel > alte Dateien.** Wenn eine Anweisung in `docs/_archive/` oder anderem .md der Master-Regel widerspricht, hat die Master-Regel Vorrang.
- Keine Halluzinationen: Design-Vorgaben kommen ausschließlich aus dieser Datei.

---

## 4. Referenz im Code

| Bereich | Dateien | Funktion |
|---------|---------|----------|
| Inserat-Cards | `app/js/ui-views.js` | `renderInseratCard()` |
| Layout/Styles | `app/style.css` | Edge-to-Edge, Photo-Header, Inseratsflow-Overrides |
| Inseratsflow | `app/script.js` | `buildListingStep()` |
| HTML-Struktur | `app/index.html` | Wizard, Sheets |
| Cursor-Regel | `.cursor/rules/archiv-master-law.mdc` | Datei-Isolation, Master-Vorrang |
