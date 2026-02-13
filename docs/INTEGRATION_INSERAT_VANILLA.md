# Integration: Cursor-Anweisungen → Vanilla-Code (app/index.html)

Die App ist **kein React-Projekt**. Der Inseratsflow lebt in **`app/index.html`** (HTML/CSS/JS). Hier die Zuordnung der Cursor-Anweisungen zum bestehenden Code.

---

## 1. „Ersetze den gesamten Inhalt meiner Inserat-Komponente durch diesen Code.“

**Kontext:** Es gibt keine React-Inserat-Komponente. Die „Komponente“ ist der **Wizard/Inseratsflow** in `app/index.html`.

- **Wo:** `buildListingStep(w, step)` – Step **0** = universelle Eingabemaske (Gerichtsname, Kategorie, Beschreibung, Preis, Allergene, Foto, 3 Säulen, Pricing-Weiche).
- **Referenz-Spec:** `docs/INSERATSFLOW_HIGHEND_UNIVERSAL.md`
- **Wenn Cursor „ersetzen“ soll:** Anweisung präzisieren, z. B.:  
  *"Passe den Inhalt von `buildListingStep` Step 0 in `app/index.html` an die Struktur und Reihenfolge der Referenz-Komponente in `docs/REFERENZ_REACT_UNIVERSAL_FLOW.md` an (Photo-Header, 3 Säulen, Felder, Drei-Wege-Abschluss). Ersetze keine React-Syntax – der Code bleibt Vanilla JS/HTML."*

---

## 2. „Nutze meine bestehende onSubmit-Logik, um die Daten an die Datenbank zu senden, wenn man auf 'Inserieren' oder 'Speichern' klickt.“

**Bestehende Logik:**

| Aktion | Funktion / Stelle |
|--------|--------------------|
| **„Jetzt für 4,99 € inserieren“** / **„Für 0,00 € mit Abholnummer“** | Nach Auswahl wird der Wizard weiter durchlaufen (z. B. Abholnummer-Step); Abschluss: **`publishOffer(o)`** (ca. Zeile 23002). Dort wird das Angebot gespeichert/veröffentlicht. |
| **„Im Kochbuch speichern“ / „Im Wochenplan speichern“** | Step 0 mit `entryPoint: 'cookbook'` oder `'week'`: Kein Pricing-Step; Abschluss über **Speichern-Button** → gleiche Datenstruktur `w.data` wird z. B. in Kochbuch/Wochenplan persistiert (localStorage/API). |

- **Wizard-Daten:** `w.data` (z. B. `dish`, `price`, `category`, `photoData`, `dineInPossible`, `hasPickupCode`, `reuse`, `allergens`).
- **Speichern/Veröffentlichen:** `publishOffer(offer)` aufrufen mit dem Objekt, das aus dem Wizard gebaut wird (z. B. `previewOfferFromWizard()` oder äquivalent).
- **Cursor-Anweisung:** *"Stelle sicher, dass die Buttons 'Jetzt für 4,99 € inserieren', 'Für 0,00 € inserieren mit Abholnummer', 'Im Kochbuch speichern' und 'Im Wochenplan speichern' in `buildListingStep` Step 0 die bestehende Logik nutzen: Veröffentlichung über `publishOffer`, Kochbuch/Wochenplan über die bestehenden Speicher-Funktionen. Die Daten kommen aus dem Wizard-State `w.data`."*

---

## 3. „Verbinde meine Cloudinary/S3-Upload-Logik mit dem Photo-Header, sodass das Vorschaubild dort angezeigt wird.“

**Bestehende Logik:**

- **Foto aufnehmen/Auswählen:** `pickImage()`, `toDataUrl()`, optional `applyAppetizerFilter()`, dann **`openPhotoEditor(dataUrl, opts)`** (ca. Zeile 23797).
- **Ergebnis im Wizard:** `w.data.photoData = dataUrl` (oder URL nach Cloudinary/S3-Upload). Nach Upload: URL in `w.data.photoData` oder `w.data.imageUrl` speichern.
- **Photo-Header im Step 0:** Ein Bereich (z. B. Kachel/`<div>`) zeigt aktuell Platzhalter „Foto hinzufügen“. Wenn `w.data.photoData` oder `w.data.imageUrl` gesetzt ist, soll dort `<img src="...">` angezeigt werden.

**Cursor-Anweisung:**  
*"Im Inseratsflow Step 0 in `app/index.html`: Der Photo-Header soll beim Öffnen und nach dem Foto-Upload das Bild aus `w.data.photoData` oder `w.data.imageUrl` anzeigen. Die bestehende Logik nutzen: Klick auf den Bereich ruft (wie bisher) Kamera/Galerie auf, dann `openPhotoEditor`; nach Akzeptieren das Ergebnis in `w.data.photoData` schreiben und den Wizard-Inhalt neu aufbauen (`rebuildWizard()`), damit das Vorschaubild im Header erscheint. Falls du Cloudinary/S3 einbindest: Nach Upload die URL in `w.data.photoData` oder `w.data.imageUrl` setzen und denselben Header aktualisieren."*

---

## 4. „Nutze meine bestehende Gericht-Liste für das Autocomplete im Gerichtsnamen-Feld.“

**Bestehende Daten:**

- **Kochbuch:** `cookbook` (Array, z. B. aus `load(LS.cookbook, [])`). Einträge haben u. a. `dish`, `category`, `photoData`/`imageUrl`.
- **Gerichtsnamen:** `c.dish` für Anzeige und Vorschläge.

**Wo einbauen:** Im Step-0-Markup das **Gerichtsnamen-Input** um ein Autocomplete ergänzen: Vorschläge aus `cookbook.filter(c => c.providerId === providerId())` (oder der aktuell genutzten Liste), angezeigt beim Fokus/Tippen; Auswahl füllt das Feld und kann optional weitere Felder (Kategorie, Bild) vorbelegen.

**Cursor-Anweisung:**  
*"Im Inseratsflow Step 0 in `app/index.html`: Für das Gerichtsnamen-Feld ein Autocomplete einbauen. Die Vorschlagsliste soll aus der bestehenden Kochbuch-Liste (`cookbook`) kommen, gefiltert nach aktuellem Anbieter. Bei Auswahl eines Vorschlags den Gerichtsnamen setzen und optional Kategorie/Bild aus dem Kochbuch-Eintrag übernehmen."*

---

## Kurz-Referenz: Wichtige Funktionen

| Was | Wo (app/index.html) |
|-----|----------------------|
| Wizard Step 0 (Universal-Maske) | `buildListingStep(w, 0)` |
| Wizard-State | `w.data` |
| Foto: Öffnen Editor | `openPhotoEditor(dataUrl, opts)` |
| Foto im State | `w.data.photoData`, `w.data.imageUrl` |
| Veröffentlichen | `publishOffer(o)` |
| Angebot aus Wizard bauen | `previewOfferFromWizard()` o. ä. |
| Kochbuch-Array | `cookbook` (z. B. aus `load(LS.cookbook, [])`) |
| Wizard neu rendern | `rebuildWizard()` |

Diese Datei kann Cursor als Checkliste nutzen, um die vier Anweisungen im Vanilla-Code umzusetzen.
