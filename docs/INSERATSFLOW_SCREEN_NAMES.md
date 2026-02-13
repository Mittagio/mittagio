# Inseratsflow – Bildschirm-Namen (verbindlich)

**Stand:** Februar 2026  
**Zweck:** Einheitliche Bezeichnungen für alle Screens im Inseratsflow (UX, Dokumentation, Code).

---

## Die zwei Flow-Typen

| Name | Wann | Beschreibung |
|------|------|--------------|
| **Inseratsflow Money** | Nutzer will **inserieren** (4,99 €) – von Inseratsauswahl, „Neues Gericht“, „Aus Kochbuch“ oder **Beliebte Gerichte**. | Screen mit Preisoption „Jetzt für 4,99 € einmalig inserieren“. Option „0,00 € mit Abholnummer“ ist erstmal gestrichen – kommt als Live-Seite, Bearbeitung später. |
| **Inseratsflow Save** | Nutzer will **nur etwas ändern** (Bearbeiten, Speichern ohne Inserat-Gebühr). | Keine Preisoption; z. B. „Im Kochbuch speichern“, „In Wochenplan speichern“, Angebot bearbeiten. |

---

## Inseratsauswahl (Einstieg)

- **Screen-Name:** **Inseratsauswahl**
- **Inhalt:**  
  - Neues Gericht erstellen → **Inseratsflow Money**  
  - Aus dem Kochbuch hinzufügen → Kochbuch-Auswahl → **Inseratsflow Money**  
  - **Beliebte Gerichte** (umbenannt von „Deine Renner“) – Auswahl führt ebenfalls in **Inseratsflow Money**
- **Wo:** `#createFlowSheet`, Titel „Inseratsauswahl“, `data-screen="inseratsauswahl"`

---

## Weitere Screen-Namen

| Name | Beschreibung | Wo im Code / UI |
|------|--------------|------------------|
| **Inseratsauswahl** | FAB → Sheet: Neues Gericht / Aus Kochbuch / Beliebte Gerichte | `#createFlowSheet` |
| **Kochbuch-Auswahl** | Kochbuch-View; Nutzer wählt Gericht (Pfad „Aus Kochbuch“) | `#v-provider-cookbook` |
| **Inseratsflow Money** | Wizard mit Preisoption 4,99 € (Einstieg: Dashboard, Beliebte Gerichte, Kochbuch → Inserieren) | Wizard `data-screen="inseratsflow-money"`, Weiche-Container gleicher Name |
| **Inseratsflow Save** | Wizard nur Bearbeitung/Speichern (Kochbuch, Wochenplan, Angebot bearbeiten) | Wizard `data-screen="inseratsflow-save"` |

---

## Abholnummer

- **Aktuell:** Option „0,00 € mit Abholnummer“ im Inseratsflow **erstmal gestrichen**.
- **Geplant:** Kommt als **Live-Seite**; Bearbeitung später.

---

## Kurzablauf

- **Inseratsauswahl** → „Neues Gericht“ oder „Aus Kochbuch“ oder **Beliebte Gerichte** tippen  
  → **Inseratsflow Money** (4,99 €) oder (bei Bearbeitung) **Inseratsflow Save**.

Diese Namen in Dokumentation und Code (`data-screen`, `aria-label`) verwenden.
