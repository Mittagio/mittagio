# Inseratsflow – alle Quellen nach Datum sortiert

**Erstellt:** 14.02.2026  
**Zweck:** Zentrale Referenz aller Konzepte, Regeln und Code-Stellen zum Inseratsflow, chronologisch geordnet.

---

## Verbindliche Quelle (immer gültig)

| Priorität | Datei | Inhalt |
|-----------|--------|--------|
| **1** | `.cursor/rules/inseratsflow-ist-high-end-universal.mdc` | Einzige verbindliche Definition: Single-Page, Master-Reihenfolge 1–9, Pricing-Weiche 4,99 € / Gratis, Abholnummer, keine Schritte 1–4. |
| **2** | `app/index.html` → `buildListingStep()` | Umsetzung: eine Maske, Layout per `#wizard[data-flow="listing"]` (CSS), Foto → Name → … → Action-Buttons. |

---

## Nach Datum sortiert (älteste zuerst)

### 2026-01-18
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/_archive/07_Konzept_Zwischenstand/Mittagio_Konzept_Zwischenstand_2026-01-18.md` | Punkt 6: „INSERAT-FLOW (IMMOSCOUT-LOGIK)“ – frühes Konzept. |

### 2026-01-24
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/_archive/texte/ui-texte-mittagio.md` | Stand 24.01.2026 – UI-Texte; Inseratsflow-Texte über .cursor/rules. |
| `docs/_archive/kontext/mittagio-voll.md` | Stand 24.01.2026 – Gesamtzusammenfassung, Verweis auf verbindliche Quellen. |
| `docs/_archive/kontext/mittagio-kurz.md` | Stand 24.01.2026 – Kurzreferenz. |

### 2026-01-26
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/_archive/GESAMTZUSAMMENFASSUNG_ALLE_SEITEN.md` | Stand 26.01.2026 – Seitenübersicht, Anbieter/Flow-Kontext. |
| `docs/_archive/08_Offene_Themen_Fragenkatalog.md` | Stand 2026-01-26 – Offene Themen. |

### 2026-01-27
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/_archive/specs/detailseite-gericht.md` | Stand 27.01.2026 – 3 Säulen, Abholnummer; konsistent mit Flow. |
| `docs/_archive/specs/ui-framework.md` | Stand 27.01.2026 – Design-System (Glassmorphism, Emerald). |
| `docs/_archive/specs/allergene-overlay.md` | Stand 27.01.2026 – Allergene (im Flow: collapsible). |
| `docs/_archive/specs/swipe-3saeulen.md` | Stand 27.01.2026 – 3 Säulen 🍴🧾🔄. |
| `docs/_archive/MARKETING_TEXTE_ABHOLNUMMER.md` | Stand 27.01.2026 – Abholnummer-Wording. |

### 2026-01-30
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/_archive/AUFGABENSTAND.md` | Stand 30.01.2026 – „Inseratsflow v2: 5-Stufen-Wizard“ (überholt); Master-Specs: inseratsflow-ist-high-end-universal.mdc. |

### Februar 2026 (ohne Tag)
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/flows.md` | Stand Februar 2026 – Abschnitt 1: Inseratsflow, einzige Quelle .mdc, buildListingStep(). |
| `docs/decisions.md` | Stand Februar 2026 – Abschnitt 3: Inseratsflow, Design (Glassmorphism, Emerald, Gelb). |
| `docs/rules.md` | Stand Februar 2026 – Abschnitt 3: Inseratsflow, Umsetzung buildListingStep(). |
| `docs/content.md` | Stand Februar 2026 – Inseratsflow-Texte über .cursor/rules. |
| `docs/architecture.md` | Stand Februar 2026 – Cursor-Regeln, Inseratsflow. |
| `docs/ui-kit.md` | Stand Februar 2026 – Anbieter/Inseratsflow: Glassmorphism, Emerald, Gelb. |
| `docs/_archive/HIGH_END_UNIVERSAL_FLOW_SPEC.md` | Stand Februar 2026 – Spezifikation Glassmorphism, universelle Maske, Pricing-Weiche, Inseratsflow-Referenz. |
| `docs/_archive/PROJEKT_STRUKTUR_UND_AUFRÄUMEN.md` | Stand Februar 2026 – Erwähnung INSERATSFLOW in docs. |
| `docs/_archive/PROJEKT_UEBERPRUEFUNG_2026-02.md` | Stand Februar 2026 – Projekt-Check. |
| `docs/_archive/KONZEPT_ANBIETER_PORTAL_UND_UX_2026-02.md` | Stand Februar 2026 – Anbieter-Portal, View-Wechsel. |
| `docs/_archive/LIVE_CHECK_SEITEN_AUDIT.md` | Stand Februar 2026 – Live-Check. |

### 2026-02-06
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/_archive/WOCHEPLANER_SPEC_2026.md` | Stand 6. Februar 2026 – Inserat-Slot „exakt wie im Inseratsflow“ (3 Säulen, Bild, Status). |
| `docs/_archive/analysen/TEST_LIVE_FAVORITEN_MITTAGSBOX_TEILEN.md` | Datum 6. Februar 2026. |

### 2026-02-14
| Datei | Bezug zum Inseratsflow |
|-------|------------------------|
| `docs/seiten/Inseratsflow.md` | Stand 14.02.2026 – Konzept, Aufbau, Regeln, Layout-Referenz (Silicon-Valley-Glas). |
| `docs/seiten/Inseratsauswahl.md` | Stand 14.02.2026 – Sheet vor dem Flow: „Neues Gericht erstellen“ → Inseratsflow. |
| `docs/seiten/Provider_Dashboard.md` | Stand 14.02.2026 – FAB → Inseratsflow. |
| `docs/seiten/Provider_Kochbuch.md` | Stand 14.02.2026 – „Neues Gericht“ startet Inseratsflow. |
| `docs/seiten/Provider_Wochenplan.md` | Stand 14.02.2026 – Plus → Inseratsauswahl (dann Inseratsflow). |
| `docs/seiten/README.md` | Stand 14.02.2026 – Verweis Inseratsflow → Inseratsflow.md. |

---

## Cursor-Regeln (ohne Datum im Dokument)

| Datei | Inhalt |
|-------|--------|
| `.cursor/rules/inseratsflow-ist-high-end-universal.mdc` | **Master-Regel** – DAS IST DER INSERATSFLOW (alwaysApply: true). |
| `.cursor/rules/inseratsauswahl-final.mdc` | Inseratsauswahl (createFlowSheet); „Neues Gericht erstellen“ → Inseratsflow. |
| `.cursor/rules/provider-bottom-nav-fest.mdc` | Inseratsflow öffnet sich nur über Aktionen, kein eigener Tab. |
| `.cursor/rules/layout-kunde-anbieter.mdc` | Inseratsflow/Wizard, Design-Vorgaben, Referenz .mdc. |
| `.cursor/rules/seiten-keine-neuen-md.mdc` | Seiten-Liste inkl. Inseratsflow. |
| `.cursor/rules/implementierung-md-zuerst-fragen.mdc` | Beispiel: docs/seiten/Inseratsflow.md. |
| `.cursor/rules/app-high-end-keine-tabellen.mdc` | Inseratsflow als High-End-Referenz. |

---

## Weitere Erwähnungen (Archiv / Tests / Code)

| Datei | Bezug |
|-------|--------|
| `docs/INTEGRATION_INSERAT_VANILLA.md` | Layout & Logik Vanilla, buildListingStep(), showPublishFeeModal. |
| `docs/ANBIETER_HIGHEND_STATUS.md` | Tabelle: Inseratsflow → buildListingStep(), .mdc. |
| `docs/KOCHBUCH_KONZEPT.md` | „JETZT ERSTES GERICHT INSERIEREN“ → Inseratsflow. |
| `docs/_archive/PRUEFBERICHT_LIVE_SEITE.md` | Abgleich mit inseratsflow-ist-high-end-universal.mdc. |
| `docs/_archive/TEST-ANBIETER.md` | Klick „Jetzt für 4,99 € inserieren“ → Flow. |
| `docs/_archive/TEST-ANBIETER-ZUSAMMENFASSUNG.md` | Inserat-Flow mit vorbelegtem Datum. |
| `docs/_archive/CURSOR-CHECKLISTE-TEXTE-HAPTIK.md` | Checkliste nach Code für Kochbuch/Inseratsflow. |
| `docs/_archive/seiten/08_provider_dashboard.md` | FAB → Inseratsflow. |
| `docs/_archive/seiten/10_provider_wochenplan.md` | Plus → Inseratsauswahl. |
| `docs/_archive/seiten/11_provider_kochbuch.md` | Neues Gericht / FAB → Inseratsflow. |
| `docs/_archive/WOCHEPLAN_VORSCHLAG.md` | Inserat hinzufügen (Sheet). |
| `docs/_archive/KUNDE_ANBIETER_STABILITAET.md` | FAB „+“ öffnet Inseratsflow. |
| `.cursorrules` | No-Limits Inseratsflow, Ausverkauft/Noch da. |
| `PROMPTS.md` | Abschnitt Inseratsflow – einzige Quelle .mdc. |
| `app/index.html` | Alle CSS/JS-Stellen: data-flow="listing", buildListingStep(), glass-express-step0, inserat-*. |
| `src/components/Provider/ProviderApp.tsx` | Inseratsflow starten (React-Kontext). |
| `src/components/Provider/Kochbuch.tsx` | Types für Wochenplan & Inseratsflow, AUSWÄHLEN → startListingFlow. |

---

## Kurzfassung

- **Ältestes Konzept:** 2026-01-18 (Konzept-Zwischenstand, INSERAT-FLOW).
- **Überführung zu Single-Page / High-End:** 30.01.2026 (AUFGABENSTAND), Februar 2026 (flows, decisions, HIGH_END_UNIVERSAL_FLOW_SPEC).
- **Aktuelle verbindliche Quelle:** `.cursor/rules/inseratsflow-ist-high-end-universal.mdc` + `buildListingStep()` in `app/index.html`.
- **Seiten-Docs mit Stand 14.02.2026:** Inseratsflow.md, Inseratsauswahl.md sowie weitere Provider-Seiten.
