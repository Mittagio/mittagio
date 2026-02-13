# Mittagio – Regeln (Cursor & Implementierung)

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## Source of Truth (verbindlich)

**Nur diese 6 Dateien sind Source of Truth für die PWA-Dokumentation. Keine neuen MD-Dateien anlegen.**

- `docs/architecture.md`
- `docs/flows.md`
- `docs/ui-kit.md`
- `docs/content.md`
- `docs/rules.md`
- `docs/decisions.md`

Cursor soll künftig nur noch diese 6 Dateien als Kontext nutzen. Alle weiteren Markdown-Dokumente liegen in `docs/_archive/` und werden nicht referenziert.

---

## 1. Layout: Kunde vs. Anbieter

- **Kundenseite** und **Anbieterseite** haben getrennte Layouts; keine Vermischung, kein angleichen.
- Änderungen auf Kunden-UI betreffen **nur** Kunden-Views; Änderungen auf Anbieter-UI **nur** Anbieter-Views.
- Layout-kritische CSS-Regeln (height, overflow, scroll, flex für #app/main) **immer** scopen:
  - **Nur Anbieter:** `body.provider-mode`, `#v-provider-*`, `.prov-*`
  - **Nur Kunde:** `body:not(.provider-mode)`, `.customer-view`, konkrete View-IDs
- Bei Layout-Fehlern **nur im Anbieterbereich:** ausschließlich Anbieter-Wrapper und -Selektoren in `app/index.html` anpassen; globale Styles und Kunden-Views nicht ändern.

---

## 2. Silent Defaults (Wochenplan & Dashboard)

- Die drei Säulen 🍴 Vor Ort, 🧾 Abholnummer, 🔄 Mehrweg sind im **Anbieter-Profil** als Standard hinterlegt.
- Im **Wochenplan** und auf dem **Dashboard** Icons/Pillars **nur** anzeigen, wenn das **spezifische Gericht/Inserat** vom Profil-Standard **abweicht** (Override).
- Kein Override → keine Säulen-Icons auf der Karte. Fokus: Bild, Name, Preis, ggf. Status (🟢 Aktiv / 🟡 Entwurf).
- Profil-Standard: `normalizeProviderProfile(provider.profile)` → `dineInPossible`, `hasPickupCode`, `reuse.enabled`. Badges nur, wenn `entry.*` gesetzt und abweichend.

---

## 3. Inseratsflow

- Der Inseratsflow ist **ausschließlich** der High-End Universal-Flow („Salatsoße“). Eine universelle Maske in allen Modi; Pricing-Weiche nur bei „Jetzt Inserieren“ (Option A 4,99 € / Option B 0,00 € mit Abholnummer). Kochbuch/Wochenplan: nur „Speichern“. Terminologie: nur **Abholnummer**. Design: Glassmorphism, Emerald, Gelb #FACC15. Keine Rückkehr zu mehreren Flows oder alter Weiche-Logik.

---

## 4. High-End App – Keine Tabellen

- Keine reinen HTML-Tabellen für Listen/Übersichten.
- Keine flachen Listen ohne Karten, Schatten, Rundungen. Keine Behörden-Formulare-Optik.
- Erwünscht: Karten-basierte Layouts, Glassmorphism, klare Hierarchie, große Touch-Ziele, Listen als Karten-Reihen.

---

## 5. Pfad & Arbeitsverzeichnis

- Einziger gültiger Projektpfad: `C:\Users\quach\Documents\GitHub\mittagio`. Alle Befehle, Dateipfade und Git-Operationen nur dort ausführen.

---

*Technische Details: `.cursor/rules/*.mdc`. **Inseratsflow (einzige verbindliche Quelle):** `inseratsflow-ist-high-end-universal.mdc` – DAS IST DER INSERATSFLOW. Weitere: option1-layout-scope, layout-kunde-anbieter, layout-fix-anbieter-nur-wrapper, silent-defaults, app-high-end-keine-tabellen.*
