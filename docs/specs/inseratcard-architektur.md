# Architektur-Definition: Die „InseratCard“ (Sammelkarte)

Die InseratCard ist das universelle Herzstück der App. Sie ist die **einzige** Komponente, in der Gerichte editiert, geplant oder inseriert werden. Sie wird im **#wizard** gerendert und folgt einer strikten vertikalen Hierarchie.

---

## 0. InseratCard Schritt 1 – Einstiege und Footer (Stand: 26.02.2026)

**Wer kommt hin:** Alle Einstiege landen zuerst in Schritt 1 (Bild 1). Kein direkter Sprung zu Schritt 2 außer bei Bulk-Aktivierung.

| Einstieg | Aufruf | entryPoint | Footer (Schritt 1) | Danach |
|----------|--------|------------|-------------------|--------|
| **Dashboard + Neues Gericht** | openCreateFlowSheet → „Neues Gericht" → openDishFlow | dashboard | Links: Speichern (→ Kochbuch) · Rechts: Weiter | Weiter → Schritt 2 Monetarisierung |
| **Dashboard + Renner bearbeiten** | Klick auf Karte → startListingFlow(editOfferId) | ACTIVE_LISTING | Nur: Speichern | Speichern → Wizard schließen, Dashboard |
| **Kochbuch-Karte Tap** | Tap auf Magazin-Karte → startListingFlow(dishId, cookbook, skipQuickPost) | cookbook | Links: Speichern · Rechts: Weiter | Weiter → Schritt 2 |
| **Kochbuch-Footer „Dieses Gericht jetzt inserieren"** | Footer-Button → startListingFlow(dishId, cookbook, skipQuickPost, fromCookbookFooter) | cookbook | Nur: Weiter | Weiter → Schritt 2 |
| **Kochbuch + Neues Gericht** | Plus-Button → openDishFlow(null, cookbook) | cookbook | Links: Speichern · Rechts: Weiter | Weiter → Schritt 2 |
| **Wochenplan + leerer Slot** | Tap auf leeren Tag → startListingFlow(week) | week | Nur: Speichern | Speichern → Wochenplan-Eintrag |
| **Wochenplan + belegte Karte** | Tap auf geplantes Gericht → startListingFlow(editOfferId, week) | WEEKLY_PLAN_EDIT | Nur: Speichern | Speichern → Wizard schließen |
| **Entwurf fortsetzen** | Draft-Overlay „Fortsetzen" | (aus Draft) | Links: Speichern als Entwurf · Rechts: Weiter | Speichern als Entwurf → Draft in localStorage, Wizard schließen |

**Validierung:** Beide Buttons (Speichern, Weiter) sind deaktiviert, bis Name (≥2 Zeichen), Preis (>0) und Foto (kein Platzhalter) gesetzt sind.

**Edit-Modus:** Bei editOfferId (Renner bearbeiten, WEEKLY_PLAN_EDIT) nur ein Button: „Änderungen speichern". Kein linker Speichern-Link.

---

## 1. Visueller Aufbau (Top-to-Bottom)

- **Header-Bild (190px):** Oben bündig. Enthält das „Foto ändern“-Modul und im Live-Zustand den pulsierenden Live-Badge („LIVE“ mit grünem Punkt).

- **Power-Bar (Icon-Leiste):** Direkt unter dem Bild. Icons sind 20 % kleiner. Hier sitzen die **3 Säulen** der Emoji-Regel:
  - **🍴 (Vor Ort):** Immer aktiv (0 € Logik).
  - **🎫1️⃣ (Abholnummer):** Zeigt an, ob der Prozess mit Abholnummer gebucht wird.
  - **🔄 (Mehrweg):** Toggle für Nachhaltigkeit.
  - Zusätzlich: **🕒** (Uhrzeit), **🌾** (Allergene) und das **ⓘ** Info-Icon am Ende der Zeile.

- **Content-Block:**
  - **Titel:** Midnight Blue, fett. Volle Breite.
  - **Beschreibung:** Dezent grau direkt darunter (z. B. „mit frischem Gemüse vom Feld“).
  - **Action-Row** (Ganz unten im Block):
    - Links: Vegetarisch-Pill (mit Icon).
    - Rechts: Der gelbe Preis-Button.

---

## 2. Die zwei Modi (mode prop)

Der **3-Schritt Mastercard-Flow** gilt für alle Einstiege:

| Schritt | Inhalt |
|---------|--------|
| **Step 1 (STEP_EDIT)** | Dateneingabe. Footer: Links „Speichern“ (Shortcut bei editOfferId/week/cookbook), Rechts „Weiter“ (Primary). |
| **Step 2 (STEP_MONEY)** | Monetarisierung: „mit Abholnummer“ (0,89 €) oder „Nur Inserat“ (4,99 €). |
| **Step 3 (STEP_LIVE)** | Bestätigung, Belohnung, Marketing. |

---

## 3. Interaktions-Physik (S25 Standard)

- **Hero-Morph:** Beim Klick auf den gelben Preis-Button (rechts unten) expandiert dieser in die Mitte zu einem 4rem großen Zahlenfeld (Midnight Blue).
- **Harmonic-Bounce:** Beim Tippen im Titel-Feld führen die Vegetarisch-Pill und der Preis-Button synchrone, elastische Hüpf-Bewegungen aus.
- **Universal-X:** Das X oben rechts schließt die Karte mit einer „Pop-Away“-Animation (Implosion).
- **Header-Morph:** Klick auf 🕒 oder 🌾 lässt das Header-Bild verschwimmen (blur) und zeigt die Auswahl zentriert im Bildbereich.

---

## 4. Logische Identität

- Die InseratCard ist **keine** kleine Kachel. Sie ist das **große Detail-Blatt**.
- Wenn ein **Renner** (kleine Kachel) angeklickt wird, schließt sich die Auswahl und die InseratCard öffnet sich vorbefüllt.
- Jeder Inserat-Flow (Neu, Kochbuch, Renner, Blitz) endet **zwingend** in dieser Karte.

---

## 5. Terminologie

- **Erlaubt:** Abholnummer, InseratCard, 3-Schritt Mastercard-Flow.
- **Vermeiden:** Ticket, Code, Abholcode (für Endkunden-Kommunikation).

---

## Checkliste für Implementierung

- [ ] InseratCard wird im **#wizard** gerendert (buildListingStep).
- [ ] **3 Säulen** (🍴, 🎫1️⃣, 🔄) sind in der Power-Bar vorhanden.
- [ ] **3-Schritt Mastercard** (Edit → Money → Live) mit einheitlichem Footer.
- [ ] Begriffe: **Abholnummer** verwenden, **Ticket**/ **Code** vermeiden.

---

## Layout-Fix 13.03.2026 (Mobile Stabilität)

- **Header sichtbar:** Der Sticky-Header im Listing-Flow ist standardmäßig sichtbar und nicht mehr nur über Scroll-Fade erreichbar.
- **Scroll-Kette stabil:** Step-Panes und Scroll-Area haben eine durchgehende Flex-Kette (`min-height: 0`, `flex: 1`), damit der Inhalt auf mobilen Geräten zuverlässig vertikal scrollt.
- **Footer im Kartenrahmen:** Die Footer von Step 1/2/3 sind panel-intern als `sticky` am unteren Rand verankert (statt viewport-weitem `fixed`), damit sie im Wizard-Rahmen bleiben.

---

## Mastercard 1 – Strict Footer Alignment (13.03.2026)

- **Footer-Container:** Reinweiß (`#ffffff`), oben `1px solid #ebebeb`, kein Radius (`0px`), global am unteren Rand fixiert.
- **Safe-Area-Padding:** `padding: 12px 20px calc(12px + env(safe-area-inset-bottom)) 20px`.
- **Primär-Button:** Schwarz (`#222222`), weiße Schrift, Radius `8px`, volle verfügbare Breite in der Footer-Zeile.
- **Sekundär-Button:** Schwarzer Text, fett, unterstrichen, ohne Hintergrund und ohne Rahmen.
- **Scroll-Abstand:** Content-Container hat Bottom-Reserve, damit der letzte Inhalt nicht unter dem fixen Footer verschwindet.

### Ergänzung (Mastercard Step 1)

- **Powerbar:** Exakt 5 Icons im Step-1-Cockpit (`Vor Ort`, `Mehrweg`, `Abholzeit`, `Allergene`, `Extras`), zentriert und gleichmäßig im Rahmen verteilt.
- **Footer-Farbsicherheit:** Keine gelben/grünen Footer-Hintergründe; Footer bleibt reinweiß mit schwarzem Primär-Button.
- **Legacy-Bereinigung:** Alte Step0-Button-Farbregeln (Emerald/Gelb) sind entfernt, damit nur der Airbnb-Footer-Block die Buttons stylt.
- **Geräte-Stabilität:** Listing nutzt eine stabile `100dvh`-Kette und dynamische Footer-Reserve (`--listing-footer-offset`), damit Footer/Content auf iPhone, iPad und Samsung nicht abgeschnitten werden.
- **Edge-to-Edge-Konsistenz:** Header/Footer sind strikt links/rechts auf `0` fixiert; Offsets werden per Live-Messung (`offsetHeight`) gesetzt, damit die vertikale Darstellung auf iPhone/iPad/Samsung gleich bleibt.
