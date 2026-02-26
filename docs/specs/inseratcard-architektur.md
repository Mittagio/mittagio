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

Die Karte muss strikt zwischen diesen Zuständen unterscheiden:

| Modus | Bedeutung | Buttons | Preisübersicht ⓘ |
|-------|-----------|---------|------------------|
| **MODE_AD** (Verkauf) | Inserat erstellen/veröffentlichen | Grüner Button („mit Abholnummer“ – 0,89 € Gebühr für Kunden) und gelber Button („Nur Inserat“ – 4,99 € Fixpreis). | Sichtbar |
| **MODE_PLAN** (Organisation/Kochbuch) | Gericht nur planen/speichern | „Gericht speichern“ (Grün) und „Datum für Wochenplan wählen“ (Blau). | Ausgeblendet |

- **MODE_AD:** Preisübersicht und Gebühren-Infos sind sichtbar.
- **MODE_PLAN:** Preisübersicht und Gebühren-Infos sind ausgeblendet.

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

- **Erlaubt:** Abholnummer, InseratCard, MODE_AD, MODE_PLAN.
- **Vermeiden:** Ticket, Code, Abholcode (für Endkunden-Kommunikation).

---

## Checkliste für Implementierung

- [ ] InseratCard wird im **#wizard** gerendert (buildListingStep).
- [ ] **3 Säulen** (🍴, 🎫1️⃣, 🔄) sind in der Power-Bar vorhanden.
- [ ] Saubere Trennung zwischen **MODE_AD** und **MODE_PLAN** (Buttons + Sichtbarkeit Preisübersicht).
- [ ] Preisübersicht ⓘ im Plan-Modus **ausgeblendet**.
- [ ] Begriffe: **Abholnummer** verwenden, **Ticket**/ **Code** vermeiden.
