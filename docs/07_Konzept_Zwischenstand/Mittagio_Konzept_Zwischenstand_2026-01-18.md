# MITTAGIO - KONZEPT ZWISCHENSTAND
Stand: 2026-01-18

REGEL:
Alle 5-10 Schritte wird ein Text-Zwischenstand erstellt.
Diese Datei ist die einzige Referenz fuer Code & Layout.

================================
1. GRUNDPRINZIPIEN
================================
- Kein Abo
- Keine Laufzeit
- Keine Vertraege
- Anbieter entscheidet alles selbst
- Button-gefuehrt, keine Formulare
- Entscheidungen immer erst am Ende eines Flows

================================
2. ANBIETER-DASHBOARD
================================
Navigation (Bottom):
- Home
- Abholungen
- Kochbuch
- Profil

Header:
- Logo links
- Zwei Buttons:
  - Neues Inserat
  - Aus Kochbuch

Header scrollt normal (nicht sticky).

================================
3. HOME / DASHBOARD-INHALT
================================
- Fokus auf "Heute"
- Wenn heute nichts aktiv:
  - Vorschau auf kommende Tage

Inserat-Kacheln:
- Bild (optional)
- Gerichtname
- Preis
- Abholzeit
- Status-Icons
- Zusatz (nur wenn zutreffend):
  "Online-Abholcode · Heute"

Klick auf Kachel:
- Oeffnet Vorschau (Gaesteansicht)
- Keine Werbetexte

Aktionen unter Vorschau:
- Bearbeiten
- Aktivieren / Deaktivieren
- Teilen
- Drucken

================================
4. TEILEN (FINAL)
================================
- Kein freier Text
- Vorgegebene Texte
- Icons: 🍽️ 💰 ⏰

WhatsApp:
{{Anbietername}}
Heute zu Mittag: {{Gerichtname}}
💰 {{Preis}} EUR
⏰ {{Abholzeit}}
Powered by Mittagio

Instagram / Website / Link kopieren analog.

Keine App-Werbung im Share.
App & Plattform nur auf Landingpage.

================================
5. ABHOLUNGEN / ABHOLSCREEN
================================
- Zeigt nur Online-bezahlte Abholungen
- Standard-Sortierung: Zeitlich (frueh -> spaet)
- Optional umschaltbar auf Code-Gruppen

Abgeholt:
- Bleibt sichtbar
- Grau / abgehakt

Undo:
- Snackbar (ca. 5 Sekunden)

Leerer Zustand:
- Text + Button "Mehr erfahren" (FAQ)

================================
6. INSERAT-FLOW (IMMOSCOUT-LOGIK)
================================
Button-gefuehrt, kein Formular.

Schritte:
1. Kategorie (Buttons)
2. Gericht aus Kochbuch oder neu
3. Preis (Preset-Buttons)
4. Abholzeit (aus Profil)
5. Extras & Mehrweg (optional)
6. Allergene (optional)
7. Foto (optional)

Abschluss:
- Inserat veroeffentlichen
- Im Kochbuch speichern
- Zum Wochenplan hinzufuegen

Erfolgsfeedback + "Weiteres Inserat erstellen"

================================
7. MEHRWEG & EXTRAS
================================
Mehrweg:
- Optional
- Keine Marken
- Pfand-Hinweis optional

Extras:
- Icons (vegetarisch, vegan, etc.)

================================
8. ALLERGENE
================================
- Optional
- Checkbox-/Chip-Auswahl
- EU-Standardliste
- Icons fuer Gaeste
- Hinweis: "Angaben ohne Gewaehr"

================================
ENDE DES ZWISCHENSTANDS
================================
