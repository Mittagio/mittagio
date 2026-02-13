# Mittagio – Flows

**Stand:** Februar 2026 · Quelle: konsolidierte Projekt-Dokumentation.

---

## 1. Inseratsflow (High-End Universal – „Salatsoße“)

Der Inseratsflow ist **eine** universelle Eingabemaske in allen Modi (Dashboard, Kochbuch, Wochenplan). Es gibt keinen anderen Inseratsflow.

### Visuelles Fundament

- Schwebendes Haupt-Panel mit starkem Weichzeichner (`backdrop-blur`), weiße ~70 % Overlays, feine Lichtkanten.
- Akzente: Emerald #10b981 für aktive Zustände, **Gelb #FACC15** für „Jetzt für 4,99 € inserieren“.
- Terminologie: Nur **Abholnummer** – nie „Ticket“ oder „Code“.

### Master-Reihenfolge der Maske

1. **Header:** Foto-Kachel (Kamera | Galerie) ganz oben; nach Upload → Auto-Filter, optional Zuschneiden.
2. **3 Säulen unter Foto:** 🍴 Vor Ort, 🔄 Mehrweg, 🧾 Abholnummer (große Glas-Kacheln, Klick toggelt Emerald). Abholzeiten 🕒 optional darunter.
3. **Liquid Input:** Gerichtsname (Autovervollständigung) → Kategorie-Pills (horizontal scrollbar) → Beschreibung (optional) → Allergene (collapsible) → Preis (`inputmode="decimal"`).
4. **Pricing-Weiche** (nur Modus „Jetzt Inserieren“):
   - **Option A (Gelb):** „Jetzt für 4,99 € einmalig inserieren“ → Abholnummer-Upsell-Schritt, dann Publish.
   - **Option B (Glas, Emerald-Rahmen):** „Oder jetzt für 0,00 € inserieren (mit Abholnummer 0,89 €/Vorgang)“ → direkt Publish-Modal.
5. **Wochenplan/Kochbuch:** Keine Weiche, nur Emerald „Speichern“ (+ optional „Stattdessen jetzt für 4,99 € inserieren“).

### Technik

- Eine universelle Maske (Step 0 in `buildListingStep()`). Option B: `hasPickupCode = true`, `inseratFeeWaived = true` / `pricingOption = 'abholnummer'`, dann Publish-Modal.
- Auto-Advance, Tastatur nach Wahl schließen, Haptik optional.

---

## 2. Gericht-Detailansicht (Kunde)

- **Layout:** Kleines Foto (Thumbnail) mittig, kein Schiefertafel-Look; Herz (Favorit) und Preis-Badge am Bild, Share oben rechts.
- **3 Säulen unter dem Bild:** 🍴 Vor Ort, 🔄 Mehrweg, 🧾 Abholnummer – farbig (aktiv) oder ausgegraut (inaktiv).
- **Infos:** Gerichtsname, Anbieter; 🚶 Zu Fuß / 🚗 Mit dem Auto (Distanz + Zeit); Essenszeit von–bis.
- **Allergene:** Klick „Allergene anzeigen (ⓘ)“ → Overlay mit Kürzeln A–R und Disclaimer (Anbieter verantwortlich).
- **CTA:** „In die Mittagsbox legen“ – speichert als Favorit und startet Übergang in Mittagsbox; optional Hinweis (z. B. „Dieser Anbieter nimmt nicht an der Abholnummer teil“).

---

## 3. Favoritenseite (Kunde)

- **Fokus:** Heute. Keine Datums-Tabs oben; Überschrift „Deine Favoriten für heute:“; Share-Icon rechts neben der Überschrift.
- **Layout:** 2×2 Grid (Mobile First, 390px, gap 12px). Alle Kacheln gleiche Höhe; Texte mit ellipsis kürzen. Bild 1:1, darunter die 3 Säulen (🍴 Vor Ort, 🧾 Abholnummer #FFD700, 🔄 Mehrweg). Keine Schiefertafeln; border-radius 16px, dezent Schatten.
- **Interaktion:** Kacheln wackeln (Jiggle), rotes „X“ zum Entfernen; „In die Mittagsbox“ = kompakter gelber Button pro Kachel.
- **Pull-to-Reveal:** Nächste Tage initial ausgeblendet, durch Ziehen am Ende sichtbar.
- **Share (Web Share API):** Dynamischer Text: mit Abholnummer → Fokus Zeitersparnis/Schlange überspringen; ohne Abholnummer → „Lockerer Lunch“. Fallback: `copyToClipboard` + Toast.
- **Anbieter ohne Angebot heute:** Kachel ausgegraut, Text „Aktuell kein Angebot für heute hinterlegt.“

---

## 4. Discover / Entdecken

- Filter-Chips (Kategorien, Tage); Karten-Layout (Polaroid/Kacheln). 3 Säulen in der Karten-Fußzeile: Slots fest 🍴 🧾 🔄; bei fehlendem Feature dezente Platzhalter-Box.

---

## 5. Abholungen (Anbieter)

- Liste der Abholungen/Bestellungen als Karten, nicht als Tabelle. Status-Pills (Offen/Abgeholt). Abholnummer-Codes sichtbar.

---

## 6. Checkout & Abholnummer

- Warenkorb → Checkout; Verzehrart (🍴 Vor Ort, 🔄 Mitnehmen); Abholzeit; Abholnummer-Option (0,89 €). Zahlung via Stripe oder Demo-Modus. Erfolgsansicht mit Abholnummer.

---

*Umsetzung: `app/index.html` – u. a. `buildListingStep()`, `openOffer`, Favoriten-View `v-fav`, `#favDishes`, `.fav-grid-card`.*
