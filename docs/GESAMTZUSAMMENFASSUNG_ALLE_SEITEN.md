# MITTAGIO - Gesamtzusammenfassung aller Seiten & Gespräche

**Stand:** 26. Januar 2026  
**Basis:** Vollständige Analyse der Live-Version und Code-Basis

---

## 📋 INHALTSVERZEICHNIS

1. [Übersicht aller Seiten/Views](#übersicht-aller-seitenviews)
2. [Kunden-Bereich (Customer Mode)](#kunden-bereich-customer-mode)
3. [Anbieter-Bereich (Provider Mode)](#anbieter-bereich-provider-mode)
4. [Rechtliche Seiten](#rechtliche-seiten)
5. [Zusammenfassung der Gespräche & Entwicklung](#zusammenfassung-der-gespräche--entwicklung)

---

## 📱 ÜBERSICHT ALLER SEITEN/VIEWS

### Kunden-Bereich
- `v-start` - Startseite (Legacy, wird durch v-discover ersetzt)
- `v-discover` - Entdecken-Seite (Hauptseite mit Polaroid-Design)
- `v-fav` - Favoriten-Seite
- `v-orders` - Aktive Abholnummern
- `v-cart` - Mittagsbox (Warenkorb)
- `v-checkout` - Checkout-Seite
- `v-pickup-code` - Abholnummer-Anzeige
- `v-profile` - Profil/Einstellungen ("Meins")

### Anbieter-Bereich
- `v-provider-login` - Anbieter-Login
- `v-provider-onboarding-entry` - Onboarding Einstieg
- `v-provider-onboarding-first-dish` - Erstes Gericht erstellen
- `v-provider-onboarding-signup` - Registrierung
- `v-provider-onboarding-business` - Betriebsdaten
- `v-provider-onboarding-preview` - Vorschau
- `v-provider-home` - Anbieter-Dashboard (Küchenmodus)
- `v-provider-pickups` - Abholungen
- `v-provider-week` - Wochenplan
- `v-provider-cookbook` - Kochbuch
- `v-provider-profile` - Anbieter-Profil
- `v-provider-billing` - Abrechnungen

### Rechtliche Seiten
- `v-legal-impressum` - Impressum (Kunden)
- `v-legal-impressum-provider` - Impressum (Anbieter)
- `v-legal-agb-kurz` - AGB (Kunden)
- `v-legal-agb-provider` - AGB (Anbieter)
- `v-legal-datenschutz` - Datenschutzerklärung
- `v-legal-faq` - FAQ (Kunden & Anbieter mit Tabs)
- `v-legal-faq-provider` - FAQ (Anbieter, Legacy)
- `v-legal-agb-onboarding` - AGB (Onboarding)
- `v-version` - Versionsseite (Link im Footer: v1.0.x, Route #/version)

---

## 🛍️ KUNDEN-BEREICH (CUSTOMER MODE)

### 1. **ENTDECKEN (`v-discover`)** - Polaroid-Discovery Design

**Design-Konzept:**
- **Hintergrund:** Heller, warmer Holz-Look (gebleichte Eiche) - `--bg-polaroid: #E8E0D6`
- **Karten-Struktur:** Weiße Polaroid-Rahmen mit Schlagschatten
- **Layout:** CSS Grid mit `repeat(auto-fill, minmax(280px, 1fr))`

**Header-Struktur (Sticky):**
- **Ebene 1:** Standort links | MITTAGIO-Logo zentriert | Suche/Grid rechts
- **Ebene 2:** Quick-Filters ("In der Nähe" + Datum-Scroll-Liste)
- **Ebene 3:** Kategorien (horizontal scrollbar mit Food-Icons)

**Restaurant Cards (Polaroid-Design):**
- **Bild:** Quadratisches Format mit Preis-Sticker (grün, rund, rechts unten)
- **Gerichtname:** Marker-Schrift (Kalam-Font) auf weißem Polaroid-Rand
- **3 Badge-Säulen (feste Plätze):**
  - **Slot 1:** Abholnummer (🧾) - "Abholnummer verfügbar"
  - **Slot 2:** Vor Ort (🍴) - "Essen vor Ort möglich"
  - **Slot 3:** Mehrweg (🔄) - "Nachhaltiges Pfandsystem"
- **Icons:** Groß, ohne Text, mit `title`-Attribut für Accessibility

**Swipe-Modus (Polaroid-Discovery):**
- **Keine Swipe-Gesten:** Nur Button-basierte Interaktion
- **Header:** Sticky Kategorien-Pills + Exit-Button (X)
- **Karten-Stack:** Polaroid-Karten mit:
  - Gerichtstitel oben
  - Bild mit Preis-Sticker
  - Anbieter-Name unter dem Bild
  - 3 Icon-Säulen (🍴, 🧾, 🔄) - nur Symbole, kein Text
- **Action-Buttons (unten):**
  - **Rot (✕):** "Keine Lust" → `rejectOffer()`
  - **Grau (🔄):** "Nächstes Gericht" → `showNextSwipeCard()`
  - **Grün (❤️🍴):** "Will ich" → `acceptOffer()`
- **End-of-Stack:** "Das war's für heute!" mit Reset-Option

**Funktionen:**
- `renderDiscover()` - Rendert die Angebots-Liste
- `renderSwipeCards()` - Rendert Swipe-Stack mit Kategorien
- `createSwipeCard()` - Erstellt Polaroid-Karte
- `rejectOffer()` - Speichert in sessionStorage (disliked)
- `acceptOffer()` - Speichert in localStorage (favorites)
- `switchDiscoverView()` - Wechselt zwischen Liste und Swipe-Modus

**Filter & Kategorien:**
- **Quick-Filter:** "In der Nähe" (Sortierung nach Distanz)
- **Datum:** Horizontale Scroll-Liste (Heute, Di, Mi, Do...)
- **Kategorien:** In der Nähe, Fleisch, Salat, Vegetarisch, etc.
- **Aktive Filter:** Visuelle Hervorhebung (Gelb)

---

### 2. **FAVORITEN (`v-fav`)** - High-End Design

**Design-Konzept:**
- **Header:** Modern, luftig mit "Favoriten" (fett) + Subline "Deine Highlights für die Woche"
- **Day-Switcher:** Horizontale "Pillen"-Navigation (Mo, Di, Mi...)
  - **Aktiver Tag:** Knallgelb (Mittagio-Farbe) gefüllt
  - **Inaktive Tage:** Feine graue Outline
- **Layout:** Grid-Layout für Anbieter (2-spaltig) + Gerichte (2-spaltig)

**Food Cards (High-End):**
- **Glassmorphism:** Leichter Schatten, semi-transparente Optik
- **Bild-Fokus:** Zoom-Effekt beim Hover
- **Preis-Overlay:** Elegante Kapsel direkt auf dem Bild (oben rechts)
- **Abholnummer-Quickview:** Monospace-Schriftart am unteren Rand (falls gebucht)
- **Logo-Branding:** Colored Ring in Provider's Brand-Color

**Funktionen:**
- `renderFavorites()` - Rendert Favoriten nach Tagen
- `createFavoriteCard()` - Erstellt High-End Food Card
- `activeFavDay` - Aktiver Tag-State
- Separate Listen: Anbieter-Favoriten + Gericht-Favoriten

**Empty State:**
- "Noch keine Favoriten"
- CTA: "Jetzt Gerichte entdecken"

---

### 3. **AKTIVE ABHOLNUMMERN (`v-orders`)**

**Inhalt:**
- Liste aller aktiven Abholnummern (Status: PAID, nicht PICKED_UP)
- Filter nach Status
- Klick auf Abholnummer → `showPickupCode()`

**Funktionen:**
- `renderOrders()` - Rendert Bestellungen
- Filter: Heute, Diese Woche, Alle

---

### 4. **MITTLAGSBOX (`v-cart`)**

**Design:**
- **Aktive Tickets:** Wallet-Look mit Abholnummern (wenn vorhanden)
- **Warenkorb:** "Meine Mittagsbox" mit Gerichten
- **Trust-Icons:** Sichere Zahlung | Ein Anbieter | Abholnummer sofort
- **CTA:** "Abholnummer jetzt sichern" (gelb, prominent)

**Funktionen:**
- `renderCart()` - Rendert Warenkorb
- `addToCart()` - Fügt Gericht hinzu
- `removeFromCart()` - Entfernt Gericht
- `btnCheckout` - Öffnet Checkout

---

### 5. **CHECKOUT (`v-checkout`)**

**Inhalt:**
- Bestellübersicht
- Abholzeit-Auswahl (15-Minuten-Takt oder "Andere Zeit")
- Kontaktdaten (Name, E-Mail optional)
- Zahlungsart (Apple Pay, Google Pay, Karte)
- CTA: "Abholnummer jetzt sichern"

**Funktionen:**
- `renderCheckout()` - Rendert Checkout
- `processCheckout()` - Verarbeitet Bestellung
- `assignPickupCode()` - Generiert Abholnummer

---

### 6. **ABHOLNUMMER (`v-pickup-code`)**

**Design:**
- **Hintergrund:** Dunkel (#1a1a1a)
- **Abholnummer:** Groß, prominent, Monospace-Schrift
- **Info:** Anbieter, Gericht, Abholzeit
- **Actions:** Abholnummer kopieren, Zurück

**Funktionen:**
- `showPickupCode(orderId)` - Zeigt Abholnummer
- `copyPickupCode()` - Kopiert in Zwischenablage

---

### 7. **PROFIL (`v-profile`)** - "Meins"

**Header-Card:**
- Avatar (falls vorhanden)
- Name
- Willkommensnachricht

**Aktive Abholnummern:**
- Heutige Abholnummern (PAID, nicht PICKED_UP)
- Klick → `showPickupCode()`

**Mein Geschmack (Präferenzen – zweite Reihe):**
- **Platzierung:** Unter Profil-Anmeldung / aktiven Abholnummern; kompakt in „zweiter Reihe“.
- **Ernährungs-Präferenzen:** Vegan, Vegetarisch, Glutenfrei, Laktosefrei (Toggle-Switches).
- **Mehrweg-Fokus (🔄):** Tiefer im Profil; Hinweistext unverändert: „Wir arbeiten stetig daran, weitere Partner für unser Mehrweg-System zu gewinnen …“

**Abholnummer-Logik:**
- Grüne Ansicht „Bitte direkt beim Personal vorzeigen“ nur temporär bei aktiven Bestellungen; blockiert Profil-Einstellungen nicht.

**Kein Slate-Board / keine Overlays:** Kein Schiefertafel-Icon, keine grafischen Overlays auf der Profilseite.

**Footer (strikte Struktur – siehe [KONZEPTE_PROFIL_UND_FOOTER.md](KONZEPTE_PROFIL_UND_FOOTER.md)):**
- **Kunden-Rechtliches (oben):** FAQ | Datenschutz | Impressum | AGB (nur Kunden-Links).
- **Anbieter-Bereich (Mitte, grau):** Text „Dein Mittagessen anbieten – einfach und digital.“ + Button „Jetzt als Anbieter einloggen“. **Keine** Links zu Anbieter-FAQ, Anbieter-Impressum, Anbieter-AGB im öffentlichen Footer.
- **Branding & System (unten):** Zentriert: „www.Mittagio.de made with Love by mittagio.de · Strategie & Besteck“. Rechtsbündig: „v1.0.x“ (Link zu #/version).
- **Impressum (Kunden):** Mike Quach, Langäcker 2, 73635 Rudersberg (v-legal-impressum).
- **Versionsseite:** v-version, Route #/version.

**Terminologie:** Überall ausschließlich **Abholnummer** (nicht „Ticket“, nicht „Code“) in FAQs und App-Texten.

**Funktionen:**
- `updateProfileView()` - Aktualisiert Profil-Ansicht
- `toggleDietaryPreference()` - Toggle Ernährungs-Präferenz
- `toggleReuseOption()` - Toggle Mehrweg-Option

---

## 🏪 ANBIETER-BEREICH (PROVIDER MODE)

### 1. **ANBIETER-LOGIN (`v-provider-login`)**

**Inhalt:**
- E-Mail-Input
- Passwort-Input
- "Einloggen" Button (grau)
- "Zurück" Button
- Demo-Hinweis: "Beliebige E-Mail/Passwort → du bist drin"

**Funktionen:**
- `showProviderLoginModal()` - Zeigt Login-Modal
- `closeProviderLoginModal()` - Schließt Modal
- `handleProviderLogin()` - Verarbeitet Login

---

### 2. **ONBOARDING (`v-provider-onboarding-*`)**

**Schritt 1: Betriebsname**
- "Wie heißt dein Betrieb?"
- Input-Feld
- "Weiter" Button

**Schritt 2: Adresse**
- "Adresse deines Betriebs"
- Auto-Vervollständigung
- "Weiter" Button

**Schritt 3: Essenszeit**
- "Wann können Gäste dein Essen genießen?"
- Startzeit/Endzeit Buttons
- "Weiter" Button

**Schritt 4: Logo**
- "Logo hochladen" (optional)
- "Weiter" oder "Überspringen"

**Schritt 5: Zusammenfassung**
- "Profil ist bereit! 🎉"
- Zusammenfassung der Angaben
- "Erstes Gericht erstellen" oder "Angaben bearbeiten"

---

### 3. **ANBIETER-DASHBOARD (`v-provider-home`)** - Küchenmodus

**Design:**
- **Hintergrund:** Dunkel (#1e1e1e)
- **Header:** "Küchenmodus" + Status ("Deine Küche ist LIVE")

**Kunden-Nachfrage:**
- Anzahl Kunden, die heute per Abholnummer bestellen wollten
- CTA: "Aktiviere jetzt Express, um diesen Umsatz zu sichern"

**NOT-AUS:**
- "ALLES AUSVERKAUFT" Button
- Schließt alle aktiven Gerichte für heute

**Stats:**
- Meine Speisekarte (Anzahl Gerichte)
- Abholungen (Anzahl)
- Kochbuch (Anzahl)

**Deine Bilanz:**
- Zeit an der Theke gewonnen
- Digitaler Kassierer (Anzahl Abholnummern, geschätzte Entlastung)

**Mein Tagesessen:**
- Aktives Gericht mit:
  - Bestellungen (Anzahl)
  - Abholnummern (Liste)
  - "Tagesessen teilen" Button

**Meine Speisekarte:**
- Alle Gerichte anzeigen
- Wochenvorschau

**FAB (Floating Action Button):**
- "+" Button (rechts unten)
- "Gericht hinzufügen"

**Bottom Navigation:**
- Home | Abholungen | Kochbuch | Meins

---

### 4. **ABHOLUNGEN (`v-provider-pickups`)**

**Design:**
- **Hintergrund:** Dunkel (#1e1e1e)
- **Header:** "Abholungen" + Subheader
- **PDF-Button:** Export der Abholnummer-Liste

**Theken-Grid:**
- Große Kacheln pro Gericht
- Abholnummern gruppiert nach Gericht
- Status: offen | abgeholt
- "Als abgeholt markieren" Button

**Funktionen:**
- `renderProviderPickups()` - Rendert Abholungen
- `markPickupAsPickedUp()` - Markiert als abgeholt
- `printPickupList()` - Druckt PDF

---

### 5. **WOCHENPLAN (`v-provider-week`)**

**Inhalt:**
- Wochenübersicht der geplanten Inserate
- "Inserat erstellen" Button
- "PDF-Wochenkarte" Button
- "Wochenplan teilen" Button

---

### 6. **KOCHBUCH (`v-provider-cookbook`)**

**Inhalt:**
- Liste aller gespeicherten Gerichte
- Sortierung
- "Gericht hinzufügen" Button
- Klick auf Gericht → Bearbeiten/Veröffentlichen

---

### 7. **ANBIETER-PROFIL (`v-provider-profile`)**

**Inhalt:**
- Dein Mittagio-Erfolg (Stats)
- Stammdaten & Branding
- Automatisierung (Küchen-Zeiten, E-Mail)
- Mehrweg-Konfiguration
- Abrechnung & Erfolg
- Support & Hilfe

---

### 8. **ABRECHNUNGEN (`v-provider-billing`)**

**Inhalt:**
- Auszahlbarer Betrag
- Letzte Auszahlung
- Filter (Monat)
- Liste der Abrechnungen

---

## ⚖️ RECHTLICHE SEITEN

### **IMPRESSUM (Kunden & Anbieter)**
- Separate Seiten für Kunden und Anbieter
- Kontaktdaten, Registereintrag
- Plattformhinweis

### **AGB (Kunden & Anbieter)**
- Separate Seiten
- Kosten, Service-Pauschale, Verantwortung

### **DATENSCHUTZERKLÄRUNG**
- Verantwortlicher
- Datenminimierung
- Sitzungssicherheit
- Anbieter-Daten
- Abholnummer
- Online-Zahlung
- Weitergabe
- Ihre Rechte

### **FAQ**
- **Kunden & Anbieter:** Tab-basierte Ansicht
- **Anbieter (Legacy):** Separate Seite
- Häufige Fragen zu Funktionen, Kosten, etc.

---

## 📚 ZUSAMMENFASSUNG DER GESPRÄCHE & ENTWICKLUNG

### **Phase 1: Swipe-Freeze Fix (Anfang)**
**Problem:** App freezte nach erstem Swipe  
**Lösung:**
- Index-Update nach jedem Swipe
- Reset State (isDragging, startX, currentTranslate)
- Z-Index Check für Event-Listener
- DOM-Cleanup (alte Bilder entfernen)

---

### **Phase 2: UI/UX Refactoring - Discovery & Favorites**

**Header & Standort-Logik:**
- Standort-Eingabefeld → Statisches Label + Pin-Icon
- Horizontale Scroll-Liste für Wochentage

**Kategorien & Filter:**
- Reihenfolge: "In der Nähe", "Fleisch", "Salat", "Vegetarisch"
- Aktive Filter: Visuelle Hervorhebung

**Restaurant Cards:**
- Einheitlicher, aufgeräumter Look
- Gerichtname fett, Preis gelb
- Metadaten kleiner (Restaurantname, Zeit, Distanz)

**System-Regeln:**
- Eine aktive Session
- Terminologie: Nur "Abholnummer" (kein "Ticket", kein "Abholcode")
- Zweit-Account pausiert

**Favoriten-Seite (Visual Upgrade):**
- Moderner Header mit Subline
- Day-Switcher (Pillen-Navigation, gelb aktiv)
- High-End Food Cards:
  - Glassmorphism
  - Zoom-Effekt auf Bildern
  - Preis-Overlay auf Bild
  - Logo-Branding mit colored ring

---

### **Phase 3: Swipe-Seite → Schiefertafel → Polaroid-Discovery**

**Initial: Schiefertafel-Konzept**
- Dunkler Hintergrund (Anthrazit/Schwarz)
- Weiße/Kreide-ähnliche Schrift
- Sticky Kategorien
- 3 Badge-Grundsäulen (Abholnummer, Vor Ort, Mehrweg)

**Final: Polaroid-Discovery**
- **Hintergrund:** Heller, warmer Holz-Look (gebleichte Eiche)
- **Karten:** Weiße Polaroid-Rahmen mit Schatten
- **Preis-Sticker:** Grün, rund, direkt auf Foto (rechts unten)
- **Gerichtname:** Marker-Schrift (Kalam-Font) auf weißem Rand
- **3 Icon-Säulen:** 🍴 (Vor Ort), 🧾 (Abholnummer), 🔄 (Mehrweg)
- **Keine Swipe-Gesten:** Nur Button-basierte Interaktion
- **Action-Buttons:** Rot (✕), Grau (🔄), Grün (❤️🍴)

**Entscheidungslogik:**
- **Grün:** Gericht → Favoriten
- **Rot:** Gericht → sessionStorage (disliked)
- **Mitte:** Nächstes Gericht / Reset

---

### **Phase 4: Gerichts-Detailseite (Vereinheitlicht)**

**Top Section:**
- Hero-Image (Schiefertafel-Look)
- Gerichtsname (fett) + Preis (prominent)

**Middle Section:**
- Essenszeit (🕒 von [Zeit] bis [Zeit] Uhr)
- Anbieter-Modul (Name + Adresse + Navi-Icon)
- 3 Säulen (Abholnummer, Vor Ort, Mehrweg)

**Allergene & Disclaimer:**
- Dezent unter Hauptinfos
- Click-to-Overlay für Details
- Rechtlicher Hinweis

**Bottom Button:**
- Aktiv: "In die Mittagspause legen" / "Jetzt bestellen"
- Deaktiviert: Wenn Deadline vorbei oder Anbieter geschlossen
- Infotext: Szenario A oder B

---

### **Phase 5: Profil-Seite & Footer Professionalisierung**

**Kundenseite (UI/UX):**
- Präferenzen in "zweite Reihe" (weniger prominent)
- Mehrweg in "zweite Ebene"
- Hinweistext: "Wir arbeiten stetig daran, weitere Partner für unser Mehrweg-System zu gewinnen..."

**Footer-Struktur:**
- **Zentrale Übersicht:** FAQs, Impressum, Versionierung
- **Branding:** hageo.de, made with helps, Besteck-Strategie
- **Rechtliche Trennung:**
  - Separate Impressen (Kunden & Anbieter)
  - Getrennte AGBs (Kunden & Anbieter)
  - Getrennte FAQs (Kunden & Anbieter)

**Anbietermodus (Login):**
- Button-Farbe: Schwarz → Grau (Gradient)
- CTA-Text: "Dein Mittagessen anbieten – einfach und digital."
- E-Mail-Adresse entfernt (aus Business-Card)

---

### **Phase 6: Bug-Fixes & Optimierungen**

**JavaScript-Fehler:**
- `SyntaxError: Illegal return statement` - Alte Swipe-Code-Blöcke entfernt
- `SyntaxError: Unexpected token 'else'` - Duplicate `handleSwipeLeft` entfernt
- `Cannot redeclare block-scoped variable` - Redundante `const`-Deklarationen entfernt
- `maps` variable scope issue - Maps-URL innerhalb Handler rekonstruiert
- Orphaned Code-Block - Fehlplatzierter Code entfernt

**Button-Handler:**
- Anbieter-Button repariert (innerHTML → querySelector)
- Event-Propagation verhindert
- Haptic Feedback hinzugefügt

**CSS:**
- Polaroid-Design CSS hinzugefügt
- Kalam-Font importiert
- Random Rotation für Polaroid-Karten

---

## 🎯 WICHTIGE DESIGN-PRINZIPIEN

### **Polaroid-Discovery:**
- Heller, warmer Holz-Look
- Weiße Karten mit Schatten
- Grüner Preis-Sticker
- Marker-Schrift für Gerichtname
- 3 Icon-Säulen (nur Symbole)

### **Terminologie:**
- ✅ **Abholnummer** (immer verwenden)
- ❌ **Ticket** (verboten)
- ❌ **Abholcode** (verboten)

### **Session-Management:**
- Eine aktive Session pro Account
- Neue Anmeldung trennt bestehende Verbindungen

### **Navigation:**
- Kein Browser-Back (`history.back()`)
- Immer explizite In-App-Navigation
- Fallback: Dashboard

---

## 📝 TECHNISCHE DETAILS

### **State Management:**
- `localStorage` für Persistenz (Favoriten, Bestellungen)
- `sessionStorage` für temporäre Daten (disliked dishes)
- Globale Variablen: `activeDay`, `activeDiscoverFilter`, `currentSwipeIndex`

### **Rendering-Funktionen:**
- `renderDiscover()` - Discovery-Liste
- `renderSwipeCards()` - Swipe-Stack
- `renderFavorites()` - Favoriten
- `offerCard()` - Restaurant Card
- `createSwipeCard()` - Polaroid-Karte
- `openOffer()` - Detailansicht

### **Event-Handler:**
- `rejectOffer()` - Gericht ablehnen
- `acceptOffer()` - Gericht favorisieren
- `showNextSwipeCard()` - Nächstes Gericht
- `switchDiscoverView()` - Liste ↔ Swipe

### **Icons:**
- `getMittagioMasterIcon(type)` - Master-Icons für Badges
- Lucide Icons für UI-Elemente

---

## ✅ AKTUELLER STATUS

**Implementiert:**
- ✅ Polaroid-Discovery Design
- ✅ Button-basierte Swipe-Interaktion
- ✅ Getrennte rechtliche Seiten (Kunden & Anbieter)
- ✅ Professionalisierter Footer
- ✅ Anbieter-Button repariert
- ✅ E-Mail-Adresse entfernt
- ✅ Mehrweg-Hinweistext
- ✅ Präferenzen in "zweite Reihe"

**Offen:**
- ⏳ GitHub Pages Deployment (Live-Version zeigt noch alte Version)
- ⏳ CSS `line-clamp` Warnings (non-critical)

---

**Erstellt:** 26. Januar 2026  
**Letzte Aktualisierung:** 26. Januar 2026
