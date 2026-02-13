# MITTAGIO - GESAMTPROJEKT ZUSAMMENFASSUNG
Stand: 19.-20.01.2026  
Basis: stabile Index vom 19.01. (Baseline)

## 1. ZIEL & USP
Mittagio ist eine app-artige Online-Plattform fuer alle, die Mittagessen anbieten.  
Kein Abo, keine Vertraege, keine Laufzeiten.  
Fokus: einfach einstellen, teilen, vorab bezahlen, strukturiert abholen.

USP:
- Abholcode (vorab bezahlt)
- Weniger Chaos, planbarer Mittag
- Anbieter koennen ihr Angebot teilen (WhatsApp, Instagram, Website)
- Gaeste sehen Angebot, zahlen vorab, holen zur gewaehlten Zeit ab
- Optional: vor Ort essen moeglich

Slogan (fix): "Dein Mittag! lokal - frisch - digital"

## 2. TECHNISCHE BASIS
- Repository: GitHub (Single Repo)
- Hosting: Netlify
- App unter /app/index.html
- netlify.toml mit Redirect /app/* -> /app/index.html
- Lokales Testen via: python -m http.server
- Baseline-Datei: Index vom 19.01. (funktional, klickbar)

## 3. ROLLENLOGIK (APP-LIKE)
- Kein Umschalter Kunde/Anbieter/Admin im UI
- Rolle wird ueber Login / Status bestimmt
- Kunde sieht Kundenmodus
- Anbieter sieht Anbieter-Dashboard
- Admin spaeter separat

## 4. ANBIETER - ONBOARDING
Ziel: Button-gefuehrt, keine Formulare, jederzeit aenderbar.

Schritte:
1. Wie heisst dein Betrieb?
2. Adresse deines Betriebs (Auto-Vervollstaendigung)
3. Wann koennen Gaeste dein Essen geniessen?
   - Standard aus Profil
   - optional "Essenszeit aendern" -> Start/Ende per Buttons
4. Logo hochladen (optional) oder spaeter
5. Abschluss:
   - Zusammenfassung (Logo, Adresse, Essenszeit)
   - Gefuehl: "Profil ist bereit"
   - CTA: "Erstes Gericht erstellen"

Regeln:
- Zurueck-Button immer sichtbar
- Fortschritt: "Schritt X von Y"
- Kein Online-Bezahlen im Onboarding

## 5. ANBIETER - DASHBOARD
Bottom Navigation:
- Home
- Abholungen
- Kochbuch
- Profil

Home:
- Neues Gericht erstellen
- Aktive Inserate (Kacheln)
- Wochenvorschau (Swipe, naechste Tage)
- Kleine Stats (Abholcodes heute)

Abholungen:
- Leerer Zustand:
  "Aktuell keine Abholungen geplant.
   Geplante Abholungen sorgen fuer weniger Chaos."
- Abholscreen: Codes gruppiert (A1-A5 etc.)
- Sortierung: Zeit / Code / Gruppe

## 6. ANBIETER - INSERAT ERSTELLEN (PUNKT 6 FINAL)
Kein "10 Schritte"-Stress, aber klarer Flow mit Live-Preview.

Flow:
1. Gerichtname (Autocomplete)
2. Preis pro Portion
   - Zahlen-Tastatur
   - Default 0,00
3. Essenszeit
   - Anzeige Standard aus Profil
   - optional aendern
4. Allergene
   - Ja / Nein
   - Bei Ja: 14 Allergene als Toggle + Kuerzel
5. Extras
   - Presets (Beilagensalat, Extrasosse, Sonstiges)
   - Preis per Zahlen-Tastatur
6. Mehrweg anbieten?
   - Ja / Nein
   - Presets 2EUR, 3EUR, 5EUR, anderer Betrag
7. Foto
   - Kamera / Galerie / ohne Foto
   - Auto-Zuschnitt & Filter spaeter
8. Bezahlung mit Abholcode?
   - Ja / Nein
   - Preview zeigt Badge + Abholcode-Beispiel
9. Vor Ort essen moeglich?
   - Ja / Nein
   - Preview zeigt Badge
10. Abschluss:
    - Inserat veroeffentlichen
    - In Kochbuch speichern
    - In Wochenplan uebernehmen
    - Zurueck

Live-Preview:
- In jedem Schritt sichtbar
- Anbieter sieht sein Gericht wie der Gast

## 7. ANBIETER - KOCHBUCH
"Dein digitales Kochbuch - dein Kopf in der App"

Inhalte:
- Zuletzt verwendet (Standard)
- Entwuerfe (bleiben fuer immer)
- Filter: alphabetisch, zuletzt verwendet
- Suche nach Gerichtsnamen

Pro Gericht:
- Veroeffentlichen
- Bearbeiten
- Fakten:
  - Zuletzt online
  - Verkaeufe ueber Mittagio

## 8. ANBIETER - WOCHENPLAN
- Swipebare Tage (naechste 5 Tage)
- Pro Tag mehrere Gerichte
- Aktionen wie bei Inseraten
- PDF-Wochenkarte:
  - Einheitliches Layout
  - Logo oben
  - Gericht, Preis, Essenszeit
  - Footer: "Powered by Mittagio"
  - QR-Code

## 9. ANBIETER - PROFIL (ROW-STRUKTUR)
Reihenfolge:
1. Mein Profil (Uebersicht)
2. Profil bearbeiten
   - Name
   - Adresse
   - Logo
   - E-Mail
   - Website
3. Abrechnungen
4. Aktionen
5. FAQs & Hilfe
6. Rechtliches
   - Impressum
   - Datenschutz
   - AGB

App-like Rows, kein Footer-Menue mehr.

## 10. KUNDENMODUS - ENTDECKEN
Home:
- Standort optional
- Kategorien als Chips:
  vegetarisch, vegan, mit Fleisch
- Naechste 5 Tage (Swipe)

Kacheln:
- Bild mit Badges (Abholcode / vor Ort)
- Gericht + Anbieter + Preis
- Aktionen:
  - Bestellen
  - Favorit (Anbieter)
  - Teilen

## 11. KUNDENMODUS - WARENKORB
Logik:
- Warenkorb nur moeglich, wenn Anbieter Abholcode anbietet
- Ohne Abholcode: nur ansehen

Flow:
1. Gericht im Warenkorb
2. Wann moechtest du ungefaehr da sein?
   - Innerhalb Essenszeit
3. Menge waehlen
4. Weiter -> Zahlung

## 12. KUNDENMODUS - BESTELLUNGEN
- Liste aller Bestellungen
- Abholnummer immer sichtbar rechts
- Tap auf Abholnummer -> Fullscreen Anzeige
- Status: offen / abgeholt

## 13. SHARING
Anbieter:
- Gericht teilen:
  - Website
  - WhatsApp
  - Instagram
- Vorgabetext:
  "Heute bei uns zu Mittag: {{Gericht}} - {{Preis}}
   powered by Mittagio"

Kunde:
- Gericht teilen aus Entdecken
- Fokus: "Zum Mittag"

## 14. MONETARISIERUNG
- Einnahmen ueber Vorab-Bezahlung
- Online-Zahlung = Abholcode
- Keine Bestellung ohne Bezahlung
- Anbieter sehen Badge, Gaeste auch
- Social Proof durch Badges

## 15. REGELN FUER WEITERARBEIT
- Baseline = Index vom 19.01.
- Aenderungen blockweise
- Kein Neuschreiben der gesamten Index
- Ein Thema = ein Commit
- Erst UX klaeren, dann Code
