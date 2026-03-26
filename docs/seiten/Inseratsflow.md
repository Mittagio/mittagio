# Inseratsflow

**Sheet-ID:** `#wizard` (kind=listing) · Anbieterseite  
**Stand:** 18.03.2026

---

## Konzept

Universelle Eingabemaske: Gericht erstellen / bearbeiten. Single-Page, eine Maske.

## Aufbau

- Foto → Name → Beschreibung → Kategorie → Preis → Logistik (🍴🧾🔄🕒) → Allergene → Extras → Buttons
- Pricing-Weiche (Dashboard): 4,99 € / Gratis + Abholnummer
- Kochbuch/Wochenplan: nur „Speichern“

## Regeln

**Einzige verbindliche Quelle:** `.cursor/rules/inseratsflow-ist-high-end-universal.mdc`  
Umsetzung: `buildListingStep()` in `app/index.html`

---

## Layout-Referenz (Silicon-Valley-Glas)

Visuelle Zielvorgabe (nur Optik, Schritte und Inhalt unverändert):

- **Container:** `border-radius: 3rem`, `bg-white/70`, starker `backdrop-blur` (48px), `border-white/40`, tiefer Glas-Schatten
- **Hintergrund:** warmes Küchen-Ambiente (Backdrop mit warmem Farbverlauf oder verschwommenem Bild)
- **Farben:** Emerald #10b981 (aktiv), Gelb #FACC15 (4,99-€-Button)

---

## Mastercard Step2 (UI-Fix)

- **Cutoff-Fix:** Step-Slider nutzt feste 100%-Pane-Breiten (3x 100%) und Track-Transition `0% / -100% / -200%`, damit Step 2 auf Mobile nicht links abgeschnitten wird.
- **Tile-Höhe:** Auswahl-Kacheln in Step 2 sind größer (`min-height: 104px`) für bessere Daumen-Bedienung.
- **App-Style:** stärkere Card-Optik mit größerem Radius, tieferem Shadow und klarerer Active-Glow-Darstellung.
- **Viewport-Fix (SE/S8):** Step-2-Container scrollt vertikal (`overflow-y:auto`) und reserviert unten festen Platz für den fixen Footer (`padding-bottom` inkl. Safe-Area).
- **Footer-Stabilität:** Step-2-Footer wird bei aktivem Step immer angezeigt und bleibt am unteren Rand (`position: fixed`, `left/right/bottom: 0`, volle Breite).

## Mastercard Step1 (UI/Scroll-Fix)

- **Pills direkt unter Bild:** Kategorie-Pills folgen ohne zusätzlichen Weißabstand direkt auf das Foto.
- **Fotohöhe kompakter:** Hero in Step 1 ist auf `190px` gesetzt, damit keine große Leerfläche zwischen Bild und Inhalt entsteht.
- **Scroll-Jump behoben:** Kein erzwungenes `scrollIntoView(..., smooth)` mehr beim normalen Scrollen; Keyboard-Repositionierung greift nur bei tatsächlich geöffneter Tastatur.
- **Sichtbarkeits-Hotfix:** Step-Track nutzt `width: 100%` (nicht 300%), damit Step‑1‑Inhalt nicht seitlich außerhalb des Viewports gerendert wird.
- **Foto-Save-Feedback:** Beim Speichern im Foto-Editor läuft jetzt ein klarer Save-State (`Speichern...` mit Spinner), danach schließt das Overlay weich und das Hero-Bild in Step 1 bekommt einen kurzen Erfolgs-Glow.
- **Empty-State (Airbnb-Style):** Wenn noch kein Foto gesetzt ist, zeigt das Hero eine klare Launch-Card mit CTA „Foto aufnehmen oder auswählen“, kurzer Orientierung und Premium-Optik statt grauer Leerfläche.
- **Footer-Konsistenz:** `#mastercard-footer-step1` bleibt in Position/Spacing unverändert fix am unteren Rand; der Empty-State ändert nur die Foto-Fläche.
- **Footer 1:1 Sync (Bild 1 → Bild 2):** Step‑1-Buttons sind im leeren Zustand visuell identisch zum gefüllten Zustand (keine graue Sonderoptik mehr), bleiben aber funktional gesperrt bis zur Validierung.
- **Header-Aufbau identisch (Neu/Empty):** Der „Neues Gericht“-Modus nutzt jetzt denselben Hero-Aufbau wie die gefüllte InseratCard; die frühere Launch-Card im Bildbereich wurde entfernt und durch einen dezenten Minimal-Placeholder ersetzt.
- **Feinschliff Empty-Hero:** Placeholder wurde klarer sichtbar gemacht (größeres Icon, neutral hellgrauer Hero-Ton), ohne den Aufbau zu verändern.
- **Feinschliff Typo/Input:** Titel-Placeholder, Untertitel und Preisfeld wurden visuell veredelt (ruhigere Typo, bessere Lesbarkeit, hochwertigeres Preisfeld mit subtiler Fokuskontur), ohne Layout-Shift.

## Mastercard Step2 (Umbau: Reihenfolge + Marketing)

- **Fixe Reihenfolge:** Oben `Standard-Inserat` (4,99 €), unten `Abholnummer-Paket ⚡` (Default aktiv).
- **Marketing-Text (Abholnummer):** „Kein Chaos in der Küche • Bezahlen schon durch • Kein Kassen-Stress“ + Hinweis „zzgl. 0,89 € bei Erfolg“.
- **Visual:** Zwei schwebende weiße Kacheln auf `#f9f9f9`; aktive Abholnummer-Kachel mit blauem Rahmen/Glow.
- **Interaktion:** Beide Kacheln mit `:active { transform: scale(0.98); }`.
- **Button-Logik:** Aktiv unten → „Jetzt für 0,00 € inserieren“, aktiv oben → „Jetzt für 4,99 € inserieren“.

## Mastercard Step2 (Final Finish: Haptic Heartbeat)

- **Kachel oben:** „Manuelle Abwicklung“ mit Subtext „Barzahlung & Wechselgeld vor Ort“ und Preisbadge „4,99 €“.
- **Kachel unten (Default aktiv):** „Stressfrei-Autopilot 🚀“ mit 4 Nutzen-Bullets, Smartphone-Thumbnail rechts und prominentem Badge „HEUTE 0,00 €“.
- **Aktiv-Visual:** Untere Kachel erhält blauen Rahmen/Glow plus „Bestseller“-Badge.
- **Button:** Bei aktiver 0,00-Option Text „Küche entlasten für 0,00 €“ + sanfte `heartbeat`-Animation.
- **S25 Footer:** Weiß, edge-to-edge, Bottom-Padding `calc(10px + env(safe-area-inset-bottom))`.

## Mastercard Step2 (Refined Publish Workflow)

- **Step2-Trigger:** CTA öffnet immer `showPublishFeeModal()`, wenn Pflichtfelder valide sind.
- **Blocking:** Bei fehlendem Name/Preis/Foto Toast „Ups! Dein Gericht braucht noch ein Bild/Namen.“; bei fehlender Adresse `openAddressModal()` / Address-Sheet.
- **Modal-Text:** Header „Fast geschafft! 🚀“, dynamischer Preis-/Subtext für Stressfrei (0,00 € + 0,89 € Erfolgsgebühr) vs. Manuell (4,99 € einmalig).
- **Success-Transition:** Nach erfolgreichem Publish sofort zu Step 3 (Live), inkl. Toast und zusätzlichem `confetti()`-Hook falls Library vorhanden.
- **Log-Check:** `hasPickupCode`, `pricingChoice`, `inseratFeeWaived` werden im Publish-Objekt mitgeführt und beim Publish geloggt.

## Mastercard Step3 (Success View + WhatsApp)

- **Success-Header:** „Glückwunsch! Dein Inserat ist live! 🚀“ zentriert in Step 3.
- **Konfetti:** Beim Eintritt in Step 3 läuft `confetti()` (wenn verfügbar) über ca. 2 Sekunden.
- **Live-Preview:** Mini-Karte mit Bild, Name, Preis und Badge „● LIVE“ (grün, pulsierend).
- **WhatsApp-CTA:** Prominenter Button „Auf WhatsApp teilen 🟢“ öffnet WhatsApp mit vordefiniertem Viral-Text und Inserat-Link.
- **Actions:** Footer mit „Neues Inserat erstellen“ (Sekundär-Stil) + „Zur Übersicht“ (Text-Link), weiß und Safe-Area-konform.
- **No-Scroll:** Step 3 ist als strahlende One-Page ohne internes Scrollen umgesetzt.

## Publish-Gate (Step2 → Modal)

- **Strikt:** Der Step‑2‑CTA veröffentlicht nicht direkt, sondern öffnet immer erst `showPublishFeeModal()`.
- **Kein Auto-Fallback:** Es gibt keinen Timer-basierten Auto-Publish mehr außerhalb der Modal-Bestätigung.
- **Flow:** Step2-CTA → Modal „Jetzt online stellen“ → Publish → sofort Step 3.

## Mastercard Step1/2/3 (White Surface Sync)

- **Global White Layer:** `mastercard-container` und alle Step-Flächen (`#mastercard-step-1/2/3` bzw. `#mastercard-step-edit/money/live`) laufen auf absolutem Weiß.
- **Safe-Area Sync:** Oben/Unten werden `env(safe-area-inset-top)` und `env(safe-area-inset-bottom)` sauber berücksichtigt.
- **Step-Wechsel-Fix:** `showStep(stepNumber)` setzt beim Wechsel alle `.mastercard-step`-Container explizit auf Weiß, damit kein grauer Restzustand sichtbar bleibt.
- **Step-2 Ausnahme:** Nur die interaktiven `service-tile-card`-Kacheln haben eine dezente Airbnb-Abhebung (`#ebebeb` + softer Schatten).

## Photo Editor (Instagram Screen)

- **Overlay-Layout:** Der Foto-Editor nutzt ein Instagram-ähnliches Fullscreen-Layout mit Header (`Abbrechen`/`Weiter`), quadratischem Crop-Bereich, Tool-Bar und fixem Footer-CTA.
- **Tools:** `Anpassen` (Crop), `Lux` (Kontrast/Sättigung leicht erhöht), `Helligkeit` (Brightness-Boost).
- **Coaching:** Horizontale Tipp-Pills („Tageslicht nutzen“, „Linse putzen“, „Kein Zoom“) im mittleren Bereich.
- **Save-Flow:** `Weiter` und „Foto für Inserat verwenden“ übernehmen Objektposition + Filterpreset ins Inserat.
- **Save-UX (Mastercard Step1):** Speichern nutzt Haptik + Ladezustand (`Speichern...`) mit Spinner, simuliert kurze Verarbeitung (`~800ms`) und zeigt anschließend am Step‑1‑Preview-Bild eine kurze `pulse-highlight`-Animation.

## Photo Editor (Mastercard Step1 50/50 Split)

- **Split-Screen:** Foto-Editor ist jetzt exakt in 50/50 geteilt (`image-display-zone` oben, `editor-controls-sheet` unten).
- **Oben (50vh):** Nur Foto mit `object-fit: cover`; keine Top-Texte „Abbrechen/Foto bearbeiten/Fertig“ mehr.
- **Unten (50vh):** Glassmorphism-Steuerfläche mit `rgba(255,255,255,0.85)`, Blur und oberen 24px-Radien.
- **Stapel-Logik:** Kompakter Hinweis oben im Controls-Sheet, Tool-Reihe (`Ersetzen/Löschen`) reduziert und klar tappbar.
- **Key Action:** Zentraler Primary-Button `FOTO SPEICHERN` übernimmt den Save-Flow inklusive Haptik/Spinner/Success-State.

## Photo Editor (Simplified Zoom + Crop)

- **Native Gesten:** 1 Finger ziehen = Bild verschieben, 2 Finger Pinch = rein/raus zoomen, Doppeltipp = Reset/Zentrieren.
- **Einfacheres UI:** Toolbar reduziert auf `Ersetzen` und `Löschen`; Zuschneiden erfolgt direkt über den sichtbaren Ausschnitt.
- **Echtes Zuschneiden beim Speichern:** `FOTO SPEICHERN` rendert den aktuellen Viewport-Ausschnitt als neues Bild (Canvas) und setzt dieses als `photoData`.
- **Konsistenz im Flow:** Nach dem Speichern wird das zugeschnittene Bild in Step 1 sofort übernommen (inkl. Filter-Preset und Save-Feedback).

## Step1 Empty-State (Premium Cleaner, warm)

- **Klarer Aufbau bleibt:** Keine Strukturänderung an der InseratCard; nur visuelles Tuning.
- **Warmer Hero-Ton:** Empty-Foto-Hintergrund auf warm-neutrale, helle Verlaufstöne abgestimmt.
- **Empty-Aktion vereinfacht:** Keine Bildvorschläge und kein Kamera-Icon mehr. Stattdessen nur ein zentrierter Primär-Button „Foto hinzufügen“.
- **Quelle wählen:** `Foto hinzufügen` öffnet die Auswahl `Kamera` oder `Foto auswählen`.
- **Direkt in den Editor:** Nach Auswahl eines Bildes öffnet sich unmittelbar der Photoeditor-Modus.
- **Typo/Inputs wärmer:** Placeholder- und Untertitel-Farben auf warme Grautöne umgestellt; Preisfeld mit warmem Off-White, subtiler Border/Shadow und warmem Fokus-Ring.
- **Single-Source-Karte:** „Neues Gericht“ und Edit-InseratCard teilen denselben Kartenaufbau; Empty-Sonderpfade (z. B. Extra-Suggestions im Hero) sind deaktiviert, damit spätere Edit-Änderungen automatisch auch im leeren Modus gelten.
- **Footer-Konsistenz Renner/Neu:** Der generische `Gespeichert`-Toast beim Listing-Exit wurde entfernt, damit unter dem Footer keine zusätzliche Badge/Toast-Fläche auftaucht und beide Modi identisch wirken.
- **Clean Empty-Hero:** Kein Schleier/Gradient/Glow im leeren Foto-Bereich; neutral weiße Fläche mit zentriertem `Foto hinzufügen`-Button.
- **Pixel-Feinschliff:** Empty-Button im Hero visuell exakt mittig justiert (leichter Vertical-Nudge).
- **No-Glow Footer Step1:** Für `Neues Gericht` und `Edit` wird im Step‑1‑Footer Shadow/Glow/Animation per Override deaktiviert, damit beide visuell identisch clean wirken.
- **No-Glow InseratCard global:** In Step 1/2 wurden verbleibende Pulse-/Glow-Effekte entfernt (Foto-Placeholder-Pulse, Adopt-Glow, Reset-/Save-Pulse im Fotoeditor sowie CTA-Heartbeat), damit die InseratCard durchgehend statisch-clean bleibt.
- **Step1 Footer Lock:** Für `Renner`, `Neues Gericht` und `Aktive Angebote (Edit)` ist der Step‑1‑Footer jetzt mit einem finalen Lock-Override vereinheitlicht (identische Position, Padding, Button-Höhe, Radius, Typo, Farben).
- **Pixel-Feinschliff Footer:** Zusätzlich sind Font-Stack, Letter-Spacing, Text-Ausrichtung und Disabled-State für `Speichern`/`Weiter` hart synchronisiert, damit der Footer in allen Einstiegen 1:1 gleich wirkt.
- **Device-Fix Footer-Anker (SE/S8/S20/iPhone14):** Footer wird nur dann angehoben, wenn im Wizard wirklich ein `input/textarea` fokussiert ist **und** die Tastaturhöhe erkennbar ist (`keyboardH > 72`). Ohne fokussiertes Feld bleibt `bottom: 0`, damit der Footer auf neueren Geräten nicht mehr zu hoch sitzt.
- **State-Cleanup Fix (Aktive Angebote):** Beim Schließen der InseratCard werden `inserat-step2-active` und `inserat-step3-active` am `#wizard` konsequent entfernt. Dadurch startet der nächste Edit-Aufruf wieder korrekt in Step 1 und der Step‑1‑Footer bleibt sichtbar.
- **Footer-Fix Neues Gericht:** Beim Aufbau der InseratCard wird der Wizard-Step-State sofort auf Step 1 zurückgesetzt und in `updateFooterVisibility()` strikt mit dem Slider synchronisiert (Fallback immer Step 1). Dadurch bleibt der Step‑1‑Footer auch im Modus „Neues Gericht“ zuverlässig unten sichtbar.
- **S25 PWA Keyboard-Stabilisierung:** Für die InseratCard gilt jetzt die gleiche Footer-Strategie wie im Photo-Editor (`bottom: 0` bleibt fix). Keyboard-Open wird nur noch bei echtem Fokus + höherer Schwelle erkannt (`keyboardH > 110`); `visualViewport`-Listener (`resize`/`scroll`) werden beim Schließen konsequent entfernt, damit der Scrollbereich nicht mehr einfriert.
- **Extras-Drawer auf Allergen-Stil vereinheitlicht:** Die Extras-Auswahl nutzt jetzt denselben Drawer-Rahmen wie Allergene (gleiche runde Kanten, gleiches Bottom-Sheet-Feeling, gleicher Backdrop). Der `Fertig`-Button bleibt am unteren Rand sichtbar (`sticky`) und der Inhalt wird nicht mehr unten abgeschnitten.
- **Provider-Footer Sichtbarkeit:** Anbieter-Footer wird außerhalb von Wizard/Create-Flow/Cookbook-Zuständen erzwungen sichtbar gehalten; Auto-Hide ist aktuell neutralisiert, damit der Footer nicht unsichtbar bleibt.
- **Provider-Footer Guard (Runtime):** Zusätzlicher JS-Guard stellt bei `pageshow`, `visibilitychange`, `resize` und Nav-Klicks sicher, dass `#providerNavWrap`/`#providerNav` im `provider-mode` wieder sichtbar sind, falls ein versteckter Restzustand hängen bleibt.
- **Stuck-State Fix (`cookbook-from-dashboard`):** Beim Rendern von `Meine Küche` wird der Body-State `cookbook-from-dashboard` aktiv entfernt. Zusätzlich versteckt die CSS-Regel den Anbieter-Footer nur noch, wenn **gleichzeitig** `provider-cookbook-active` gesetzt ist.
- **Footer-Only Rollback (Stand `70cd1c5`):** Anbieter-Bottom-Nav wurde auf „immer sichtbar“ zurückgestellt (kein Scroll-Autohide), inklusive alter System-Footer-Geometrie ohne schwebende Pill-Optik.
- **Kein Kunden-Footer-Blitz:** `#customerNav` ist im `provider-mode` hart ausgeblendet, damit beim Aktualisieren kein kurzes Aufblitzen der Kundennavigation sichtbar ist.

## Mastercard Step2 (Thron + Hero-Kachel)

- **Thron-Karte oben:** Die Vorschau `Dein Gericht` ist nicht mehr grau/ausgewaschen, sondern als hochwertige Karte umgesetzt (heller Verlauf, dezenter Gold-Akzent, tieferer Shadow).
- **Thron-Badge sichtbar:** Die obere Karte trägt jetzt ein klares Label `DEIN INSERAT` (mit Krone), damit der „Thron“-Status sofort erkennbar ist.
- **Karten-Reihenfolge wie Wochenplan:** Bild links, Name mittig/oben, Preis deutlich rechts unten ausgerichtet.
- **Stressfrei als Hero:** `Stressfrei-Autopilot 🚀` ist visuell klar hervorgehoben (stärkerer Rahmen/Shadow, light shine).
- **Größenverhältnis fixiert:** Die Stressfrei-Kachel ist visuell ca. **30 % größer** als die Standard-Kachel (größere Höhe + Padding), damit die Hierarchie eindeutig ist.
- **Breiter-Wirkung (ohne Layout-Shift):** Seitlicher Aura-Glow + feine Inset-Lichtkante lassen die Hero-Kachel zusätzlich breiter und präsenter wirken, ohne die tatsächliche Kartenbreite zu ändern.
- **Subline aktualisiert:** Hero-Text ist jetzt exakt `Inklusive Abholnummer (0,89 € pro Vorgang)`.
- **Pills aktualisiert:** Hero-Pills heißen jetzt `Kontaktlose Bezahlung`, `Planbarkeit`, `Weniger Chaos`.
- **Standard bewusst ruhiger:** `Standard-Inserat` bleibt bewusst neutraler, damit die Hero-Kachel klar im Fokus steht.
- **Preis-Rollen getrennt:** In der oberen Karte ist der Wert jetzt als neutraler **Gerichtspreis** mit Label (`Gerichtspreis`) dargestellt; die monetären Entscheidungs-Preise bleiben visuell unten in den Optionen.
- **Grauschleier entfernt:** Die obere Karte nutzt eine klare weiße Fläche mit vollem Kontrast (kein ausgegrauter Eindruck mehr).
- **Section-Trenner ergänzt:** Zwischen oberer Gerichtskarte und den Auswahlkacheln steht jetzt das ruhige Label `Deine Optionen` als klare inhaltliche Trennung.
- **Customer-Card-Light für obere Karte:** Step-2-Preview nutzt nun bewusst den klaren Kundenkarten-Stil (volle Deckkraft, kein Grayscale/kein Dim, weißes Surface mit sauberem Radius und weichem Shadow).
- **Mikro-Feinschliff Bildwirkung:** Das Preview-Bild links in der oberen Karte erhält einen sehr dezenten Boost (`contrast/saturate`), damit es auf hellen Motiven lebendiger wirkt.
- **Preisinfos oben entfernt:** In der oberen Gerichtskarte werden `Gerichtspreis` und Betrag nicht mehr angezeigt; die Karte fokussiert nur auf Bild + Gerichtsname.
- **Obere Karte vergrößert:** Die Gerichtskarte in Step 2 wurde bewusst größer gemacht (mehr Höhe und größere Bild-/Titelwirkung).
- **Empfehlungskachel höher:** Die untere `Empfehlung`-Kachel ist um etwa zwei Textzeilen vergrößert, damit sie klarer als Hero wirkt.
- **Adresspflicht auch lokal:** In Step 2 gibt es keinen Localhost-Testmodus mehr. Ohne Profiladresse wird immer der Adress-Dialog geöffnet und die Veröffentlichung blockiert (gleiches Verhalten wie live).
- **Adress-Dialog Layer-Fix:** `addressRequired`-Backdrop und Sheet werden beim Öffnen auf Top-Layer gesetzt (über Wizard/Footer), damit der Dialog bei fehlender Adresse immer sichtbar und klickbar erscheint.
- **Step2 Publish Guard:** Klick auf den unteren Publish-Button ist jetzt mit Fehler-Guard abgesichert (`try/catch`) und zeigt bei Laufzeitfehlern einen klaren Toast statt stillem „nichts passiert“.
- **Step2 CTA Click-Through-Fix:** Die leere Fläche von `.sheet-body.wizard-sheet-body` blockiert keine Taps mehr; nur echte Inhalte bleiben klickbar. Dadurch ist der untere Publish-Button in Step 2 wieder zuverlässig anklickbar.
