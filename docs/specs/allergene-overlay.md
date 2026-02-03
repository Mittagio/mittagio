# Allergene & Zusatzstoffe (Overlay-Seite)

**Stand:** 27.01.2026  
**Kontext:** Overlay öffnet sich, wenn der Nutzer auf der **Detailseite Gericht** auf „Allergene anzeigen“ klickt. Der Anbieter wählt beim Inserieren aus dieser standardisierten Liste; das System gleicht ab und zeigt nur die zutreffenden Einträge.

---

## 1. Kopfzeile & Disclaimer

- **Titel:** **Allergene & Informationen**
- **Wichtiger Hinweis (Sticky):**  
  > „Für die Richtigkeit und Aktualität der Angaben ist ausschließlich der Anbieter verantwortlich. Bei schweren Allergien halten Sie bitte Rücksprache mit dem Personal vor Ort.“

---

## 2. Übersetzungs-Liste (Standard)

Das System gleicht die **vom Anbieter gewählten Kürzel** mit dieser Liste ab und zeigt **nur die zutreffenden** an.

| Kürzel | Bezeichnung |
|--------|-------------|
| **A** | Glutenhaltiges Getreide (Weizen, Roggen, Gerste etc.) |
| **B** | Krebstiere und daraus gewonnene Erzeugnisse |
| **C** | Eier und daraus gewonnene Erzeugnisse |
| **D** | Fische und daraus gewonnene Erzeugnisse |
| **E** | Erdnüsse und daraus gewonnene Erzeugnisse |
| **F** | Sojabohnen und daraus gewonnene Erzeugnisse |
| **G** | Milch und Milchprodukte (einschließlich Laktose) |
| **H** | Schalenfrüchte (Mandeln, Haselnüsse, Walnüsse etc.) |
| **L** | Sellerie und daraus gewonnene Erzeugnisse |
| **M** | Senf und daraus gewonnene Erzeugnisse |
| **N** | Sesamsamen und daraus gewonnene Erzeugnisse |
| **O** | Schwefeldioxid und Sulfite |
| **P** | Lupinen und daraus gewonnene Erzeugnisse |
| **R** | Weichtiere und daraus gewonnene Erzeugnisse |

---

## 3. Referenzen

- **Detailseite:** `DETAILSEITE_GERICHT_SPEC.md` („Allergene anzeigen“ → dieses Overlay)
- **Implementierung:** `app/index.html` – Allergene-Overlay, `showAllergensOverlay`, Anbieter-Allergen-Daten
