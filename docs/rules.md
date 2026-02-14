# Mittagio – Regeln (Cursor & Implementierung)

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

**Layouts und Flows bleiben unverändert.** Keine strukturellen Layout-Änderungen an Kunden- oder Anbieter-Views; Inseratsflow = eine Maske (Master); Dashboard = Meine Küche. Nur Bugfixes und gezielte Anpassungen in bestehenden Selektoren.

---

## Source of Truth (verbindlich)

**Source of Truth:** 6 Dateien unter `docs/` + `docs/seiten/*.md` für Seiten. **Keine neuen MD für Seiten** (siehe `docs/seiten/README.md`).

- `docs/architecture.md`
- `docs/flows.md`
- `docs/ui-kit.md`
- `docs/content.md`
- `docs/rules.md`
- `docs/decisions.md`

- `docs/seiten/` – eine MD pro App-Seite (Übersicht: `docs/seiten/README.md`). **Keine neuen MD für Seiten.**

Cursor nutzt diese Dateien als Kontext. Archiv: `docs/_archive/`.

---

## 1. Layout: Kunde vs. Anbieter

- **Kundenseite** und **Anbieterbereich** haben getrennte Layouts; keine Vermischung, kein Angleichen. **Layouts bleiben wie sie sind.**
- Änderungen auf Kunden-UI betreffen **nur** Kunden-Views; Änderungen auf Anbieter-UI **nur** Anbieter-Views.
- Layout-kritische CSS-Regeln (height, overflow, scroll, flex für #app/main) **immer** scopen:
  - **Nur Anbieter:** `body.provider-mode`, `#v-provider-*`, `.prov-*`
  - **Nur Kunde:** `body:not(.provider-mode)`, `.customer-view`, konkrete View-IDs
- Bei Layout-Fehlern **nur im Anbieterbereich:** ausschließlich Anbieter-Wrapper und -Selektoren in `app/index.html` anpassen; globale Styles und Kunden-Views nicht ändern.

---

## 2. Silent Defaults (Wochenplan & Dashboard)

- **Dashboard** = Anbieterbereich **Meine Küche** (`v-provider-home`); Layout unverändert.
- Die drei Säulen 🍴 Vor Ort, 🧾 Abholnummer, 🔄 Mehrweg sind im **Anbieter-Profil** als Standard hinterlegt.
- Im **Wochenplan** und auf dem **Dashboard (Meine Küche)** Icons/Pillars **nur** anzeigen, wenn das **spezifische Gericht/Inserat** vom Profil-Standard **abweicht** (Override).
- Kein Override → keine Säulen-Icons auf der Karte. Fokus: Bild, Name, Preis, ggf. Status (🟢 Aktiv / 🟡 Entwurf).
- Profil-Standard: `normalizeProviderProfile(provider.profile)` → `dineInPossible`, `hasPickupCode`, `reuse.enabled`. Badges nur, wenn `entry.*` gesetzt und abweichend.

---

## 3. Inseratsflow

- **Einzige Quelle:** `.cursor/rules/inseratsflow-ist-high-end-universal.mdc`. Umsetzung: `buildListingStep()` in `app/index.html`.

---

## 4. High-End App – Keine Tabellen

- Keine reinen HTML-Tabellen für Listen/Übersichten.
- Keine flachen Listen ohne Karten, Schatten, Rundungen. Keine Behörden-Formulare-Optik.
- Erwünscht: Karten-basierte Layouts, Glassmorphism, klare Hierarchie, große Touch-Ziele, Listen als Karten-Reihen.

---

## 5. Pfad & Arbeitsverzeichnis

- Einziger gültiger Projektpfad: `C:\Users\quach\Documents\GitHub\mittagio`. Alle Befehle, Dateipfade und Git-Operationen nur dort ausführen.

---

*Technische Details: `.cursor/rules/*.mdc`. **Inseratsflow:** `inseratsflow-ist-high-end-universal.mdc`. **Seiten:** `seiten-keine-neuen-md.mdc` – keine neuen MD für Seiten. Weitere: option1-layout-scope, layout-kunde-anbieter, layout-fix-anbieter-nur-wrapper, silent-defaults, app-high-end-keine-tabellen.*
