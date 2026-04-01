# Provider Profil (Meins)

**View-ID:** `v-provider-profile` · Anbieterseite  
**Stand:** 14.02.2026

---

## Konzept

Anbieter-Profil: Betriebsdaten, Einstellungen, Rechtliches, Support, Abmelden.

## Aufbau

- Meine Daten
- Standard-Zeitfenster, Abholnummer, Mehrweg
- Impressum, AGB, Datenschutz, FAQ
- Support, Abmelden

## Regeln

- Anbieterseite

## Bugfix: Mein Betrieb + Geld-Overlay

- **Mein Betrieb klickbar:** Die Header-Kachel `#providerProfileMasterKachel` öffnet wieder zuverlässig den Subbereich „business“.
- **Overlay-Reset:** Das Overlay „Mein Geld“ wird beim Profil-Setup aktiv geschlossen, damit kein hängen gebliebener Zustand die obere UI blockiert.
- **Overlay-Hitbox-Schutz:** `account-regeln-sheet` reagiert nur im Zustand `.active` auf Pointer-Events; inaktiv ist es unsichtbar und nicht klickbar.

## Update: Floating Photo Editor (Instagram-Style)

- **Full-Bleed Hintergrund:** Das Bild im Editor läuft jetzt über den gesamten Screen (`#photo-edit-overlay`) statt als weißes Panel.
- **Top-Navigation:** „Abbrechen“ (links) und „Fertig“ (rechts) sind als weiße Text-Actions mit Shadow direkt über dem Foto.
- **Schwebende Bottom-Tools:** Die Tool-Reihe ist als Floating-Bar umgesetzt (`Ersetzen`, `Zuschneiden`, `Löschen`) mit transparentem Look und Safe-Area-Abstand.
- **Photo-Coach als Glass-Pill:** Tipps liegen als halbtransparente, geblurte Overlay-Pill oberhalb der Tool-Bar.
- **S25-Abstand unten:** Die Floating-Elemente berücksichtigen `env(safe-area-inset-bottom)`, damit nichts auf der Home-Bar klebt.

## Smooth Finish (Betriebsdaten-Form)

- **Auto-Keyboard-Dismiss:** Im letzten Feld der Betriebsdaten-Form wird bei gültiger Eingabe (`Blur`/`Enter`) die Tastatur per `document.activeElement.blur()` geschlossen.
- **Autofill-Ende erkannt:** Wenn Browser-Autofill endet und der Fokus nicht mehr in den Betriebsdaten-Feldern liegt, wird derselbe Finish-Flow ausgelöst.
- **Look-Down-Hint:** Nach dem Einklappen der Tastatur scrollt die Sub-View weich zum primären Button `Daten speichern`.
- **Action-Fokus:** Der primäre Button erhält kurz die Animation `button-attention-hint` (Bounce + Akzentfarbe), damit der nächste Schritt eindeutig ist.
- **Haptik:** Beim Finish wird ein kurzes Pattern `navigator.vibrate([10, 50, 10])` ausgelöst (nur bei User-Interaktion).

## Update: Glamour Dashboard (Profil)

- **2x2 Fokus-Grid:** Unter „Mein Betrieb“ zeigt das Profil jetzt nur vier Airbnb-ähnliche Kacheln: `Meine Regeln` (✨), `Abrechnungen` (💶), `Support` (💬), `FAQ` (💡).
- **Tile-Design:** Reines Weiß, `24px` Radius, weicher Schatten und zentrierte Typo mit kurzem Subtext für klare Orientierung.
- **Abrechnungs-Highlight:** Bei neuem Monat pulsiert die Abrechnungs-Kachel mit Golden-Glow und Hinweis „Neue Abrechnung verfügbar“, bis sie geöffnet wird.
- **Support-Shortcut:** Support-Kachel öffnet direkt WhatsApp (`wa.me`) statt Zwischenmodal.
- **FAQ Fullscreen:** FAQ-Kachel öffnet ein modernes Fullscreen-Overlay mit Accordion, inklusive Haptik und Close-Button.

## KPI-Cockpit über dem Grid

- **Top-Down-Hierarchie:** Unter dem Header liegt jetzt zuerst die KPI-Leiste (`margin-top: 20px`), darunter mit `margin-top: 30px` das 2x2-Action-Grid.
- **KPI-Set:** `Umsatz`, `Live-Inserate`, `Aufrufe` als schlanke, horizontale Cockpit-Leiste ohne eigene Kachelflächen (leichter Off-White-Look).
- **Typografie:** KPI-Werte groß/fett (`20px`), Labels klein/dezent (`10px`), Zahlen mit `font-variant-numeric: tabular-nums` gegen Ziffern-Zappeln.
- **Interaktionen:** Tap auf `Umsatz` scrollt smooth zur Abrechnungs-Kachel; Tap auf `Live-Inserate` öffnet direkt das Kochbuch.

## KPI Count-Up Magic

- **Count-Up Engine:** `animateValue(id, start, end, duration)` nutzt `requestAnimationFrame` für flüssiges Hochzählen.
- **Ziele & Dauer:** Umsatz `0 → 1.250 €` (`1.5s`), Live-Inserate `0 → 4` (`0.8s`), Aufrufe `0 → 380` (`1.2s`).
- **Trigger:** Start auf `DOMContentLoaded`; zusätzlicher Guard in der Profil-Render-Logik sorgt für zuverlässiges Abspielen bei erstem Profilaufruf.
- **Session-Guard:** Animation läuft nur einmal pro Session (`sessionStorage`), um Wiederholungen zu vermeiden.
- **Finish-Feedback:** Nach Abschluss je KPI kurzer Glow (`provider-kpi-value-finished`).

## Umsatz-Trendpfeil

- **UI-Erweiterung:** Neben dem Umsatzwert sitzt ein Trend-Indikator (`↗` / `↘` / `—`) im selben KPI-Block.
- **Trend-Logik:** `calculateRevenueTrend(yesterdayRevenue, todayRevenue)` vergleicht Netto-Umsatz heute vs. gestern.
- **Farbcodierung:** `↗` in Grün (`#008a00`), `↘` in Rot, Gleichstand als grauer Strich.
- **S25-Haptik im Blick:** Der Pfeil wird nach Abschluss des Umsatz-Count-Ups mit einer kurzen Pulse-Animation hervorgehoben.
- **Tooltip:** Der Trendpfeil zeigt zusätzlich den Prozentvergleich als Hinweis (`+X% / -X% / 0% vs gestern`), inklusive robustem Fallback bei `0 €` am Vortag.

## Live-Basis: Anbieterverzeichnis importiert

- **Direkte Datenbasis:** Die übergebene reale Anbieterliste ist jetzt als persistentes Verzeichnis in `localStorage` hinterlegt (`LS.providerDirectory`).
- **Source & Version:** Initialisierung aus statischem CSV-Bundle in `app/script.js` mit Versionsschlüssel `REAL_PROVIDER_DIRECTORY_VERSION`.
- **Bereinigung beim Import:** Doppelte Header-/Fehlerzeilen werden entfernt, unvollständige Einträge verworfen, Dubletten über `name + street + zip + city` dedupliziert.
- **Persistenz/Upsert:** Bestehende Verzeichniseinträge bleiben erhalten; neue Datensätze werden idempotent ergänzt (kein blindes Überschreiben).
- **Runtime-Zugriff:** Für Folgeschritte steht die Basis über `window.providerDirectory` und `window.getProviderDirectory()` bereit.

## Live-Operations im Profil

- **Provider-Übersicht direkt im Profil:** Neue Karte „Anbieter-Datenbasis“ zeigt Gesamtanzahl, Top-Städte und eine Vorschau der ersten Einträge.
- **Go-Live Schnelltest:** Neue Testkarte mit Button „Test jetzt ausführen“ validiert live die Basisdaten.
- **Prüfregeln im Schnelltest:** Anzahl > 0, Name vollständig, Adresse nutzbar (`address` oder `street/zip/city`), keine Dubletten im Schlüssel `name+street+zip+city`.
- **Statusanzeige:** Ergebnis wird als Badge `Launch-ready` oder `Bitte prüfen` dargestellt und in einer Ergebnisliste aufgeschlüsselt.
- **Nutzung für Launch-Tag:** Ein Tap auf den Test reicht, um die Datenbasis vor Live-Schaltung schnell technisch zu verifizieren.

## Pre-Created Anbieter im Profil

- **Adresse nicht mehr frei editierbar:** Bei verknüpften, vorangelegten Anbietern werden Straße/PLZ/Ort im Bereich „Meine Daten“ ausgeblendet.
- **Zentrale Führung:** Adressdaten kommen aus der Anbieterbasis (`provider-directory`) und werden beim Login ins Profil gespiegelt.
- **Login-E-Mail geschützt:** Für verknüpfte Anbieter ist die Login-E-Mail im Profil read-only, damit die Admin-Verknüpfung stabil bleibt.
- **Auto-Fill ohne API:** Für nicht verknüpfte Fälle schlägt das Feld `Betriebsname` lokale Anbieter aus der Basis vor und übernimmt Adresse (und ggf. Login-E-Mail) automatisch.
- **Mobile Suggestion-Liste:** Unter `Betriebsname` erscheint eine tapbare Vorschlagsliste (Name, Ort/Adresse, optional Login), Auswahl übernimmt die Daten sofort.
- **UI-Polish:** Betriebsdaten-Inputs wurden visuell auf ein moderneres App-Card-Layout mit klarer Typo und ruhiger Hierarchie umgestellt.
