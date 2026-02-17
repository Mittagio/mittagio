---
name: InseratCard Smart-Exit, Redirect & Card-Snap
overview: "Unified Save (handleSaveAction), entryPoint-basierte Rücksprung-Logik, Dirty-Check mit Save-Prompt (Speichern & Beenden / Verwerfen / Weiterbearbeiten), Toast-Feedback und physische Card-to-Dashboard-Animation beim Live-Stellen."
todos: []
isProject: false
cite: 2026-02-16, 2026-01-29, 2026-01-26
---

# InseratCard: Smart-Exit, Redirect & Card-Snap

Alle Änderungen in **[app/index.html](app/index.html)**. Betroffen: Wizard Listing-Flow (`buildListingStep`), `closeWizard`, `startListingFlow`/`w.ctx.entryPoint`, Exit-Save-Prompt, Action-Buttons (mit Abholnummer / Änderungen übernehmen), optional neue Hilfsfunktionen für Card-Snap.

---

## 1. Smart Redirect After Save

### 1.1 Unified Save Function: `handleSaveAction(context)`

- **MODE_AD** (Inserieren vom Dashboard / „Jetzt inserieren“):
  - Inserieren ausführen (Geld-Transaktion / Publish).
  - Zurück zum **Dashboard** navigieren (`showProviderHome` oder aktive View `v-provider-home`).
  - Toast: **"Inserat ist live! 🚀"**
- **MODE_PLAN** (Eintrag aus Kochbuch oder Wochenplan):
  - Daten im **Kochbuch** speichern (und ggf. in `scheduled_dishes` / Wochenplan).
  - Zurück zur **Ursprungsansicht** (`entryPoint`): `entryPoint === 'week'` → Wochenplan; `entryPoint === 'cookbook'` → Kochbuch.
  - Toast: **"Im Wochenplan gespeichert 📅"** bzw. **"Gericht im Kochbuch aktualisiert 📖"** (bei Archiv-Edit).

Referenz: bestehende Button-Handler in `buildListingStep()` (btnGratis, btn499, btnWeek, btnCook, btnSave) ca. 26134–26210; `closeWizard(true)`, `showPublishFeeModal`, `showSaveSuccessSheet`, `showProviderWeek`, `showProviderCookbook`.

### 1.2 Improvement Case (Dashboard Live-Edit)

- Wenn der Nutzer ein **bereits aktives Inserat** verbessert (Karte vom Dashboard geöffnet):
  - Der grüne Button zeigt **"Änderungen übernehmen"** statt „mit Abholnummer“.
  - Nach Klick: Nur Datensatz aktualisieren, **keine** erneute Gebühren-Modal.
  - InseratCard schließt sich mit **pop-away**-Animation zum Dashboard.
  - Toast optional: „Inserat aktualisiert“ oder „Inserat ist live! 🚀“.

Erkennung: z. B. `w.ctx.editOfferId` oder vorhandenes aktives Offer beim Öffnen aus Dashboard.

### 1.3 UI Feedback (Toasts)

- Nach jedem erfolgreichen Speichervorgang kurze Toast-Bestätigung **am unteren Rand**:
  - **AD / Live:** „Inserat ist live! 🚀“
  - **PLAN Week:** „Im Wochenplan gespeichert 📅“
  - **PLAN Cookbook / Archiv-Edit:** „Gericht im Kochbuch aktualisiert 📖“

Bestehende `showToast`-Aufrufe in den Save-Pfaden anpassen/vereinheitlichen.

---

## 2. Wo-komm-ich-her? Matrix (Back-Logic)

Nutzung von **`w.ctx.entryPoint`** für den Rücksprung beim Schließen (Universal-X oder nach Save).

| Startpunkt      | Aktion (X / Abbrechen) | Ziel nach Schließen        | Animation   |
|-----------------|-------------------------|----------------------------|------------|
| Dashboard       | Universal-X             | Dashboard (Aktive Angebote)| pop-away   |
| Wochenplan      | Universal-X             | Wochenplan (Kalender)      | pop-away   |
| Kochbuch        | Universal-X             | Kochbuch (Archiv-Liste)    | pop-away   |
| Inserat-Auswahl | Universal-X             | Dashboard                  | pop-away   |

- **Implementierung:** Zentrale Funktion **`handleWizardExit()`**:
  - Wird vom **Universal-X (closeX)** aufgerufen.
  - Liest `w.ctx.entryPoint` und ruft nach Schließen die passende View auf: `showProviderHome()`, `showProviderWeek()`, `showProviderCookbook()`.
  - Jedes Schließen nutzt die CSS-Animation **x-pop-away** (Scale 1→0, Opacity 1→0).

Referenz: `closeX.onclick` in `buildListingStep()` ca. 25885–25896; `closeWizard()` 25077–25083; View-Wechsel `setProviderNavActive`, `showProviderWeek`, `showProviderCookbook`.

---

## 3. Smart-Exit & Draft-Preservation

### 3.1 Universal-X → `handleWizardExit()`

- Das **Universal-X (closeX)** triggert **`handleWizardExit()`**.
- Darin: Prüfung **Dirty** (siehe 3.2). Wenn nicht dirty → direkt `closeWithPopAway(entryPoint)`. Wenn dirty → **`showWizardExitSavePrompt()`** mit drei Optionen.

### 3.2 Dirty-Handling

- **Dirty-State-Check:** Vergleiche **aktuelle** `w.data` mit den **ursprünglichen Daten beim Öffnen** (Snapshot bei `startListingFlow` / beim ersten Aufbau der Karte).
  - Relevante Felder: `dish`, `description`, `category`, `price`, `photoData`, `allergens`, `extras`, Zeitfenster, etc.
- **Wenn Änderungen vorliegen:** Overlay anzeigen: **„Änderungen speichern?“**
  - **„Speichern & Beenden“** (Grün): Speichert aktuellen Stand (Draft oder Update), schließt Karte, navigiert gemäß `entryPoint`.
  - **„Verwerfen“** (Rot/Grau): Verwirft Änderungen, schließt Karte, navigiert gemäß `entryPoint`.
  - **„Weiterbearbeiten“** (Dezent): Schließt nur das Overlay, Karte bleibt offen.

Aktuell: `showWizardExitSavePrompt(onSave, onDiscard)` mit nur zwei Aktionen; Button „In Kochbuch speichern“. Erweiterung: dritte Option „Weiterbearbeiten“, Copy „Speichern & Beenden“, Save-Logik abhängig von `entryPoint` (Kochbuch vs. Wochenplan vs. nur Draft).

### 3.3 Animation-Exit

- Jedes Schließen der Karte: **x-pop-away** (bereits vorhanden, z. B. `panel.classList.add('x-pop-away'); setTimeout(..., 280)`).

### 3.4 Terminology

- Im gesamten Flow nur **„Abholnummer“**. Keine Begriffe „Ticket“ oder „Abholcode“.

Referenz: `showWizardExitSavePrompt`, `closeWizardExitSavePrompt`, HTML `#wizardExitSaveSheet`, `#wizardExitSaveToCookbook`, `#wizardExitDiscard`; ggf. neuen Button `#wizardExitContinueEdit` für „Weiterbearbeiten“.

---

## 4. Physical Card-Snap Animation (Optional / „Für später“)

Beim Klick auf **„mit Abholnummer“** oder **„Änderungen übernehmen“** (nur wenn Ziel = Dashboard):

### 4.1 Target Acquisition

- Ziel-Koordinaten berechnen: **`getBoundingClientRect()`** des entsprechenden **Slots/Kachel** im Dashboard (der neuen oder aktualisierten Inserat-Kachel).

### 4.2 Animation Flow

1. **Clone** der InseratCard an aktueller Position erzeugen.
2. Wizard-Modal **sofort ausblenden** (ohne Blur-Delay).
3. **Clone** animieren mit `transform: translate(...) scale(...)`:
   - Dauer: **450 ms**
   - Easing: **cubic-bezier(0.34, 1.56, 0.64, 1)** (elastischer Bounce am Ende).

### 4.3 Post-Animation

- Wenn Animation das Ziel erreicht: **`navigator.vibrate([10, 30, 10])`**.
- Echte Dashboard-Kachel einblenden, Clone entfernen.
- Pulsierenden **Live-Badge** auf der Kachel starten.

### 4.4 Safety Fallback

- Wenn Ziel-Element nicht im Viewport (z. B. weiter unten): Statt Flug-Animation **pop-away** zur Mitte des Dashboards.

---

## 5. Reihenfolge der Umsetzung (Empfehlung)

1. **handleWizardExit() + entryPoint-Navigation:** closeX ruft handleWizardExit auf; nach closeWizard View je entryPoint anzeigen.
2. **Dirty-Check + Save-Prompt:** Snapshot bei Öffnen, Vergleich bei X-Klick, showWizardExitSavePrompt mit „Speichern & Beenden“, „Verwerfen“, „Weiterbearbeiten“; Save-Logik im Prompt je entryPoint.
3. **handleSaveAction / Toasts:** Buttons auf einheitliche Logik (oder zentrale handleSaveAction) umlenken; Toasts wie in 1.3.
4. **Improvement Case:** „Änderungen übernehmen“-Label und Update-only-Pfad bei Edit eines aktiven Inserats.
5. **Card-Snap:** Optional als letzter Schritt (Target Acquisition, Clone, Animation, Fallback).

---

## 6. Abgrenzung

- **Nur Wizard Listing-Flow** (InseratCard in `buildListingStep`); Psheet kann eigene Logik behalten.
- Bestehende Funktionen **closeWizard**, **saveToCookbookFromWizard**, **showPublishFeeModal**, **showSaveSuccessSheet** wiederverwenden und nur erweitern/anbinden.
- Terminologie: durchgängig **Abholnummer** (bereits in .cursorrules).
