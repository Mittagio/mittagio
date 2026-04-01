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
- **Overlay-Layer über Footer:** Vor-Ort/Mehrweg/Abholnummer/Allergene/Extras öffnen jetzt auf einem höheren Layer als der Step-Footer. Dadurch bleibt `Fertig` in allen Overlays sichtbar.
- **Footer-Hide während Overlay:** Beim Öffnen eines Service-Overlays werden `Speichern/Weiter` temporär ausgeblendet und nach dem Schließen step-synchron wieder eingeblendet.
- **Extras Auto-Close Fix:** Ein race condition mit altem Close-Timer wurde entfernt (Timer-Cleanup + Skip-Restore-Pfad). Ergebnis: Extras bleibt offen, bis der Nutzer aktiv schließt.
- **Extras Open-Fix v2:** Beim Öffnen von Extras wird der eigene Close-Call in `closeAllPowerbarSheets` übersprungen (`source='extras'`), damit kein neuer Hide-Timer den Drawer direkt wieder schließt.
- **Allergene Bottom-Anker v2:** Drawer-Padding unten wurde auf Safe-Area-Basis reduziert; `Fertig` ist als sticky Bottom-CTA mit `margin-top:auto` verankert, damit der Button unten eng anliegt.
- **Icon-Konsistenz Service-Drawer:** Titel wurden vereinheitlicht: `🌿 Allergene` und `➕ Extras` (Icon vorne), damit die Wahrnehmung zum bereits ikonisierten `🔄 Mehrweg / Rebowl` konsistent ist.
- **Extras-Layout entspannt:** Extras-Optionen laufen jetzt als ruhige, einspaltige Kartenliste mit größeren Touch-Flächen; Name links, Preis rechts, klare vertikale Rhythmik.
- **Fertig-CTA vereinheitlicht:** Quick-Adjust-`Fertig` nutzt jetzt dieselbe Geometrie wie die anderen `Fertig`-Buttons (`52px` Höhe, `12px` Radius, `0 16px` Padding).
- **Fertig-CTA final angleichen:** Alle `Fertig`-Buttons in Service-Overlays (Vor Ort/Mehrweg/Abholnummer/Allergene/Extras) sind jetzt exakt auf die Footer-Button-Maße von `Speichern/Weiter` gesetzt (`52px`, Radius `12px`, Padding `0 16px`, Typo `15/800`, identischer Top-Abstand `12px`).
- **Extras Feinschliff (ungequetscht):** Extras laufen nun als ruhige einspaltige Liste mit 52px Touch-Zeilen (Name links, Preis rechts), statt dichter Chip-/Input-Kombination. Aktivierung bleibt per Tap erhalten, aber ohne visuelle Enge.
- **Extras Footer-Alignment:** Der Extras-`Fertig`-Button nutzt keinen sticky-Sonderpfad mehr und sitzt dadurch auf derselben vertikalen Höhe/Abstandsbasis wie die anderen Service-`Fertig`-Buttons.
- **Extras Footer-Alignment v2:** Der letzte Inline-Style-Override am Extras-`Fertig` wurde entfernt; der Button nutzt jetzt ausschließlich die gemeinsame Klasse `sub-menu-drawer-fertig` und ist damit pixelgleich zu den anderen `Fertig`-Buttons.
- **Extras Micro-Polish:** Extras bekommen einen leichten Innenabstand-Lock (`14px`), ruhigere Headline-Spationierung und eine cleanere Kartenoptik (helle Border, neutraler Hintergrund, dezenter Active-State in Emerald), damit der Drawer homogener mit den restlichen Service-Sheets wirkt.
- **No-Effects Lock (Step 1):** Für die InseratCard in `STEP_EDIT` sind visuelle Effekte jetzt hart neutralisiert (kein Glow, kein Blur, kein Pop/Scale, keine Schatten-Animationen auf Service-Kacheln/Preisbereich). Aktive Kacheln bleiben nur noch über klare Border/Farbe erkennbar; Preiszahlen laufen kontraststark ohne Soft-Effekt.
- **Umsatzvorschau entfernt:** Die untere Zeile `Dein Verdienst (ca. 30 Portionen)…` wird in der InseratCard (`STEP_EDIT`) vollständig ausgeblendet.
- **Anti-Trübung Lock:** Für `STEP_EDIT` läuft ein strikter Klarheits-Lock (Opacity 1, kein Filter, kein Backdrop-Blur, keine Text-Schatten), damit Titel, Kacheln und Preisbereich sichtbar crisp bleiben.
- **Mobile Scroll + Header/ Footer Hotfix (27.03.2026):** In Step 1 ist die Scroll-Kette stabilisiert (`wizard-scroll` + `wContent`), damit nach Eingaben im Feld „Zutaten oder Besonderheiten“ das Bild oben wieder erreichbar bleibt. Der Header bleibt sticky und schrumpft beim Scrollen ohne obere Trennlinie; Footer bleibt zentriert und ohne Glow-/Trüb-Effekt auf Buttons.
- **Mobile Follow-up Hotfix (27.03.2026):** Keyboard-Handling koppelt die Wizard-Höhe nicht mehr an `visualViewport`, damit der Scrollbereich bei Preis-/Text-Fokus nicht einfriert. Der Header wurde weiter komprimiert (kleinere Höhe + kompaktere Shrink-Kurve), der Step‑1‑Footer wird bei Fokus/Blur aktiv nach Step-State stabilisiert und das Preisfeld läuft jetzt ohne Glow/Fokus-Halo (`box-shadow: none`, neutrale Border), um den verbleibenden „trüb/blauen“ Eindruck zu entfernen.
- **Mobile Final Lock (27.03.2026b):** Für den Anbieter-Listing-Flow wurde ein finaler Lock gesetzt: `inserat-scroll-area` bleibt zwingend scrollbar (`overflow-y:auto`, `touch-action:pan-y`, `pointer-events:auto`), der Header ist nochmals kompakter, Glassmorphism-/Blur-/Shadow-Reste auf Panel und Preisbereich sind deaktiviert und die Footer-Navigation ist explizit zentriert (`align-items:center`, `justify-content:center`).
- **Step2-Cutoff nach Preisfokus (27.03.2026c):** Beim Wechsel von Step 1 auf Step 2 wird der Preisfokus vor dem Stepwechsel hart beendet (`input blur` + Keyboard dismiss + `hero-morph-active` reset), danach wird Step 2 erneut vermessen (`vvHandler`) und auf `scrollTop=0` gesetzt. Dadurch bleibt Step 2 nach Preis-Eingabe nicht mehr mittig hängen/abgeschnitten.
- **Mobile Stabilitätsfix Preis → Step2 (27.03.2026d):** Der Preisbereich löst keinen Hero-Morph-Layoutsprung mehr aus (kein „von unten nach oben“-Jump, keine weiße Restfläche). Für den offenen Anbieter-Wizard scrollt nur noch `inserat-scroll-area` (Wizard-Wrapper selbst nicht), Header-Shrink kann dadurch wieder konsistent greifen. Beim Stepwechsel wird die Viewport-Scrollposition auf `0` zurückgesetzt und Step 2 auf volle Höhe mit eigenem `overflow-y:auto` stabilisiert; Footer-Row bleibt mittig ausgerichtet.
- **Step-Split Scroll-Lock (27.03.2026e):** Verhalten ist nun strikt getrennt: **Step 1 ist scrollbar**, **Step 2 ist nicht scrollbar**. Beim Preisfokus wird kein aggressives Keyboard-Repositioning mehr ausgelöst (kein großer Gap-Sprung nach unten), und Step 2 wird beim Wechsel auf `overflow:hidden`/volle Höhe fixiert, damit die Ansicht nicht nach unten driftet.
- **Viewport-Hardening (27.03.2026f):** Im Wizard wird Outer-Scroll gesperrt (`body`/`#wizard` overflow hidden), Step‑1 erhält eine explizit berechnete Scroll-Höhe auf Basis `visualViewport` minus Header/Footer, und Step‑2 wird auf diese verfügbare Höhe fixiert (non-scroll). Zusätzlich ist die Step‑1-Footer-Row per Runtime-`important` auf mittige Ausrichtung gelockt.
- **One-Screen Compact Footer + Preisblock (31.03.2026):** Step‑1-Footer ist kompakter (seitliche Insets reduziert, Buttons 48px statt 52px) damit links/rechts nichts abgeschnitten wirkt. Der Preisblock sitzt direkt unter der Powerbar und zeigt darunter klein den Hinweis „Preis pro Gericht“, um den Screen ruhiger und platzsparender zu halten.
- **Step2 One-Screen + Header-Line Kill (31.03.2026):** Step 2 ist für Mobile als nicht-scrollbarer Einseiter gelockt (kompaktere Abstände/Kartenhöhen), damit die komplette Auswahl auf einem Screen bleibt. Zusätzlich ist die obere Header-Linie in Step 1/2 hart entfernt (`border-top/border-bottom/box-shadow: none` am Sticky-Header).
- **Step2 Back-Determinismus (31.03.2026):** Hardware-/Browser-Zurück in `STEP_MONEY` führt jetzt immer zuerst nach `STEP_EDIT` (Step 1), unabhängig von EntryPoint/State. Die Erkennung nutzt Wizard-Klasse, Slider-State und `w.inseratStep` als Fallback, damit keine direkte Wizard-Schließung aus Step 2 mehr passiert.
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
- **Step2 Mobile Touch-Fix:** Der untere Publish-CTA reagiert jetzt zusätzlich auf `pointerup` bei Touch-Geräten, damit Tap-Eingaben auch bei kritischen Overlay-/Viewport-Zuständen zuverlässig auslösen.
- **Step2 Kachelgröße nachjustiert:** Die untere Empfehlungs-Kachel ist wieder größer (`min-height` erhöht), die Standard-Kachel ebenfalls leicht angehoben, damit die Hierarchie auf Mobile klarer bleibt.
- **Step2 CTA Trigger-Hardening:** Der Publish-CTA nutzt jetzt einen deduplizierten `click`+`touchend`-Handler mit Guard (`300ms`), damit Tap-Eingaben auf mobilen Geräten zuverlässig auslösen und nicht durch Event-Kollisionen verloren gehen.
- **Step2 Adress-Guard Sync (31.03.2026):** Die Adressprüfung im `Küche entlasten`-Handler akzeptiert jetzt auch ein gefülltes kombiniertes Profilfeld `address` (nicht nur `street/zip/city`). Dadurch blockiert der CTA nicht mehr fälschlich, wenn die Adresse in „Meine Daten“ als ein Feld gepflegt wurde.
