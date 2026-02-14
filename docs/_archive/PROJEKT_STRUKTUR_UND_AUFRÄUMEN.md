# Mittagio – Projektstruktur & Aufräum-Vorschlag

**Stand:** Februar 2026  
**Ziel:** Klarheit, weniger Durcheinander, klare „Single Source of Truth“.

---

## Was aktuell „durcheinander“ wirkt

### 1. Zu viele Dateien im Projekt-Root
Im Root liegen **über 20 Markdown-/Spec-Dateien**. Unklar ist oft:
- Was ist **aktuell** vs. veraltet?
- Was ist **Referenz** (nur lesen) vs. **Arbeitsdokument**?
- Wo steht die **einzige Wahrheit** für UI-Texte, Regeln, Kontext?

| Kategorie        | Dateien im Root |
|------------------|-----------------|
| Cursor/Kontext   | `CURSOR_CONTEXT_MITTAGIO.md`, `CURSOR_CONTEXT_MITTAGIO_KURZ.md`, `CURSOR_UI_TEXTE.md`, `CURSOR_RULES_SWIPE_3SAEULEN.md`, `CURSOR_COMMANDS.md`, `PROMPTS.md` |
| Analysen        | `ANALYSE_LIVE_VERSION.md`, `ANALYSE_MOBILE_LAYOUTS.md`, `FEHLERANALYSE.md` |
| Specs            | `ALLERGENE_OVERLAY_SPEC.md`, `DETAILSEITE_GERICHT_SPEC.md`, `MITTAGIO_UI_FRAMEWORK.md` |
| Texte            | `TEXTE_MITTAGIO_FINAL_2026-01-24.md`, `TEXTE_MITTAGIO_KURZ_2026-01-24.md` |
| Sync/Checklisten | `SYNC_CHECKLIST.md`, `sync-to-github.bat`, `sync-to-github.sh`, `sync.bat` |

### 2. Doppelte / überlappende Infos
- **UI-Texte & Regeln:** Stehen in `.cursorrules`, in `CURSOR_UI_TEXTE.md` und teils in `CURSOR_CONTEXT_MITTAGIO.md` → Risiko, dass Versionen auseinanderlaufen.
- **Favoritenseite:** In `docs/` gibt es `FAVORITENSEITE_MASTER.md` und `MASTER_FAVORITENSEITE.md` → Redundanz.

### 3. docs/ ist gemischt strukturiert
- Nummerierte Ordner `01_` bis `08_` (Konzept, Vision, Flows, …) mit .docx und .md.
- Gleichzeitig viele .md **direkt** in `docs/` (z. B. FAVORITENSEITE, GERICHT_DETAILANSICHT, INSERATSFLOW, GESAMTZUSAMMENFASSUNG) → schwer zu priorisieren.

### 4. Arbeitsverzeichnis-Inkonsistenz
- In `.cursorrules` steht: *„Alle Änderungen ausschließlich in: C:\Projekte\mittagio-clean“*.
- Dein Projekt liegt unter: `Documents\GitHub\mittagio`.
- Entweder Regel anpassen oder klären, welches Repo „das eine“ ist.

---

## Empfohlene Struktur (Zielbild)

```
mittagio/
├── README.md                 # Einstieg: Was ist das, wie starten, wo steht was
├── .cursorrules              # Single Source of Truth für Regeln, UI-Texte, Routing (kurz & verweisend)
├── .cursor/rules/            # Nur technische/layout-spezifische Rules (z. B. layout-kunde-anbieter)
│
├── app/                      # Einziger App-Code (SPA)
│   ├── index.html
│   ├── manifest.json
│   ├── assets/
│   └── sw.js.disabled
│
├── docs/                     # Alles Konzept & Spezifikation
│   ├── 01_Einfuehrung_Vision/
│   ├── 02_Konzept_Produkt/
│   ├── … (bestehende 03–08)
│   ├── specs/                # NEU: Alle technischen Specs hier
│   │   ├── allergene-overlay.md
│   │   ├── detailseite-gericht.md
│   │   ├── ui-framework.md
│   │   └── swipe-3saeulen.md
│   ├── kontext/              # NEU: Cursor-Kontext (eine „lange“, eine „kurz“)
│   │   ├── mittagio-voll.md
│   │   └── mittagio-kurz.md
│   ├── texte/                # NEU: Verbindliche UI-Texte (eine Datei = Wahrheit)
│   │   └── ui-texte-mittagio.md
│   └── analysen/             # NEU: Analysen & Fehlerberichte (Archiv)
│       ├── live-version.md
│       ├── mobile-layouts.md
│       └── fehleranalyse.md
│
├── tickets/                  # Unverändert: A_, B_, C_, D_
├── scripts/                  # NEU: Sync-Skripte zusammen
│   ├── sync-to-github.bat
│   ├── sync-to-github.sh
│   └── sync.bat
│
├── PROMPTS.md                # Optional: Prompt-Library (im Root ok, nur eine Datei)
├── SYNC_CHECKLIST.md         # Im Root ok (wird oft gesucht)
├── netlify.toml / .github/   # Build & Deploy
└── SIMULATE_CUSTOMER_WORKFLOW.js   # Test-Skript (Root oder scripts/)
```

**Prinzip:**
- **Root:** Nur wenige, eindeutige Einstiegspunkte (README, .cursorrules, ggf. PROMPTS, SYNC_CHECKLIST).
- **Alle Specs/Kontext/Texte:** Unter `docs/` mit klaren Unterordnern (`specs/`, `kontext/`, `texte/`, `analysen/`).
- **Eine Wahrheit pro Thema:** z. B. eine Datei für UI-Texte, eine für Swipe-Spec, eine für Kontext „kurz“.

---

## Konkrete Schritte (priorisiert)

### Sofort (ohne Umzüge)
1. **`.cursorrules` anpassen**
   - Arbeitsverzeichnis auf deinen echten Pfad setzen: z. B. `Documents\GitHub\mittagio` (oder `C:\Projekte\mittagio-clean`, wenn du dort arbeitest).
   - Am Ende einen Block „Wo steht was?“ einbauen, z. B.:
     - Regeln & UI-Texte: diese Datei (.cursorrules) + Verweis auf `docs/texte/ui-texte-mittagio.md` falls du Texte auslagern willst.
     - Ausführlicher Kontext: `docs/kontext/mittagio-voll.md`.
     - Specs: `docs/specs/`.
2. **README.md erweitern**
   - Kurzer Abschnitt „Projektstruktur & wichtige Dateien“ mit Verweisen auf .cursorrules, docs/specs, docs/kontext, tickets/.

### Kurzfristig (Ordner anlegen, Dateien verschieben)
3. Unter `docs/` anlegen: `specs/`, `kontext/`, `texte/`, `analysen/`.
4. Root-Dateien verschieben (und in .cursorrules/README aktualisieren):
   - `ALLERGENE_OVERLAY_SPEC.md` → `docs/specs/allergene-overlay.md`
   - `DETAILSEITE_GERICHT_SPEC.md` → `docs/specs/detailseite-gericht.md`
   - `MITTAGIO_UI_FRAMEWORK.md` → `docs/specs/ui-framework.md`
   - `CURSOR_RULES_SWIPE_3SAEULEN.md` → `docs/specs/swipe-3saeulen.md`
   - `CURSOR_CONTEXT_MITTAGIO.md` → `docs/kontext/mittagio-voll.md`
   - `CURSOR_CONTEXT_MITTAGIO_KURZ.md` → `docs/kontext/mittagio-kurz.md`
   - `CURSOR_UI_TEXTE.md` → `docs/texte/ui-texte-mittagio.md`
   - `TEXTE_MITTAGIO_FINAL_2026-01-24.md` / `TEXTE_MITTAGIO_KURZ_*` → entweder in `docs/texte/` zusammenführen oder als Archiv nach `docs/texte/archiv/`
   - `ANALYSE_*.md`, `FEHLERANALYSE.md` → `docs/analysen/`
5. Doppelte Favoritenseite in `docs/` bereinigen: eine Datei behalten (z. B. `FAVORITENSEITE_MASTER.md`), andere löschen oder als „archiv“ verschieben.
6. Sync-Skripte nach `scripts/` verschieben und in README/SYNC_CHECKLIST die neuen Pfade nennen (z. B. `scripts/sync-to-github.bat`).

### Optional
7. **CURSOR_COMMANDS.md:** In README oder PROMPTS integrieren und Datei entfernen, damit nur eine Stelle für „wie arbeite ich mit Cursor“ existiert.
8. **PROMPTS.md:** Im Root lassen; in .cursorrules einmal verlinken.

---

## Was du „immer machen“ kannst, damit es nicht wieder durcheinander wird

- **Neue Specs / Kontext-Docs:** Direkt in `docs/specs/` oder `docs/kontext/` anlegen, nicht im Root.
- **Neue Analysen / Retros:** Nach `docs/analysen/` (oder ein Unterordner wie `docs/analysen/2026-02/`).
- **UI-Texte:** Nur in einer Datei pflegen (z. B. `docs/texte/ui-texte-mittagio.md`); .cursorrules verweist nur darauf.
- **Regeln:** In .cursorrules kurz halten; lange Erklärungen in `docs/specs/` oder `docs/kontext/` und von .cursorrules verlinken.

Wenn du willst, können wir als Nächstes z. B. nur die **.cursorrules + README** anpassen und die **Ordner docs/specs, docs/kontext, docs/texte, docs/analysen** anlegen und die ersten 2–3 Dateien verschieben. Sag einfach, mit welchem Schritt du starten willst.
