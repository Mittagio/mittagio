# Inseratsflow – Bereinigung (Checkliste)

**Stand:** Februar 2026  
**Ziel:** Alles, was zum Inseratsflow gehört, vereinheitlichen, Dopplungen und veraltete Verweise entfernen. Eine klare Referenz für Code und Docs.

---

## 1. Dokumentation

| Aktion | Details |
|--------|--------|
| **Referenz festlegen** | **Aktuelle Spezifikation:** `HIGH_END_UNIVERSAL_FLOW_SPEC.md` + `HIGH_END_UNIVERSAL_FLOW_UMSETZUNGSPLAN.md`. Alle neuen Änderungen am Flow orientieren sich daran. |
| **Bestehende Docs** | `INSERATSFLOW_KONZEPT.md`, `INSERATSFLOW_SPEC_2026.md` behalten (Fixkosten 4,99 €, Verdienst, Live-Dashboard). Keine Löschung, nur ggf. am Anfang einen Verweis auf HIGH_END + UMSETZUNGSPLAN ergänzen: „Ergänzend: universelle Maske und Pricing-Weiche siehe …“. |
| **Doppelte/veraltete Docs** | `INSERATSFLOW_MASTER_V2.md`, `MASTER_PROMPT_INSERATSFLOW.md` prüfen: Wenn rein historisch oder von HIGH_END ersetzt → in `docs/archive/` verschieben oder am Kopf „Superseded by HIGH_END_UNIVERSAL_FLOW_SPEC.md“ vermerken. |

---

## 2. Code (index.html)

| Aktion | Details |
|--------|--------|
| **Terminologie** | Überall im Inseratsflow nur **„Abholnummer“** (nie „Ticket“, „Abholcode“, „Abhol-Nr.“). AGB-Zeile 6605 bleibt als explizite Vorgabe. UI-Strings durchsuchen und anpassen. |
| **Konstanten** | Prüfen: `TX_BASE_PRICE = 4.99`, `INSERT_FEE = 4.99` – ob eine zentrale Konstante (z. B. nur `TX_BASE_PRICE`) reicht und `INSERT_FEE` darauf verweist oder ersetzt wird, um Dopplung zu vermeiden. |
| **Kommentare im Wizard** | In `buildListingStep()` Kommentare vereinheitlichen (z. B. „Schritt 0: Universelle Maske“, „Schritt 1: Allergene & Service“, „Schritt 2: Vorschau“, „Schritt 3: Abholnummer“). Alte „Frage 4 A“-Style-Kommentare ggf. zu klaren Schritt-Beschreibungen machen. |
| **Kein toter Code** | Keine Löschung von genutzten Pfaden. Option B (0,00 €) überspringt Schritt 4 – Schritt 4 bleibt für Option A (4,99 €) erhalten. |

---

## 3. Cursor-Regeln

| Aktion | Details |
|--------|--------|
| **slim-flow-inseratsflow.mdc** | Behalten. Verweist auf Button-Hierarchie und Planer; HIGH_END beschreibt die Maske. Optional in der Regel einen Satz ergänzen: „Pricing-Weiche (4,99 € vs. 0,00 € + Abholnummer) siehe HIGH_END_UNIVERSAL_FLOW_SPEC.md.“ |

---

## 4. Umfang der Bereinigung

- **Nicht nötig:** Große Refactorings, neue Komponenten, Änderung der Schrittanzahl.
- **Sinnvoll:** Einheitliche Begriffe, eine klare Doc-Referenz, weniger doppelte Konstanten, aufgeräumte Kommentare.

---

*Nach Freigabe: Punkte nacheinander abarbeiten; bei „nur Docs“ oder „nur Code“ kann eingeschränkt werden.*
