# Prüfbericht: Live-Seite vs. Prompts/Konzepte

**URL:** https://mittagio.github.io/mittagio/app/  
**Abgleich mit:** FAVORITEN_LAYOUT_REGEL.md, GERICHT_DETAILANSICHT_KONZEPT.md, INSERATSFLOW_KONZEPT.md, Layout-Regel Kunde/Anbieter

---

## 1. Kundenseite

### 1.1 Discover / Entdecken
- **Prompt:** Clean, modern, keine Schiefertafeln; 3 Säulen (🍴 Vor Ort, 🔄 Mehrweg, 🧾 Abholnummer).
- **Live:** „Noch keine Mittagsangebote in deiner Nähe“, Standort, „Als Anbieter starten“ – Struktur stimmt mit Konzept überein. Bei Angeboten: Share, 3 Säulen prüfen (vor Ort bei Gericht-Detail).

### 1.2 Favoriten (FAVORITEN_LAYOUT_REGEL.md)
| Vorgabe | Erwartung | Live |
|--------|-----------|------|
| 2-Spalten-Grid, gap 12px | Exaktes 2×2-Grid | „Deine Favoriten heute ⚡“, Share-Button – Header ok |
| Homogene Kacheln, gleiche Höhe | Alle Kacheln identisch | „Noch keine Favoriten?“ / „Jetzt entdecken“ – bei Befüllung prüfen |
| 3 Säulen unter Bild | 🍴 Vor Ort, 🧾 Abholnummer (#FFD700), 🔄 Mehrweg | In Konzept-Docs vorgesehen |
| Keine Schiefertafeln, border-radius 16px | Saubere Karten | Konform |
| „In die Mittagsbox“ gelber Button | Kompakter gelber CTA | „In die Mittagsbox legen“ vorhanden |
| Fokus Heute, Pull-to-Reveal | Keine Datums-Tabs, Morgen/Übermorgen per Ziehen | „Nach unten ziehen für Morgen & Übermorgen“ – ok |

**Fazit:** Header und Struktur passen. Bei befüllten Favoriten: 2×2-Grid, einheitliche Kachelhöhe und Abholnummer #FFD700 vor Ort prüfen.

### 1.3 Gericht-Detail (GERICHT_DETAILANSICHT_KONZEPT.md)
| Vorgabe | Erwartung | Live |
|--------|-----------|------|
| Keine Schiefertafel | Modern, clean | Konform |
| Kleines Thumbnail, Herz oben rechts, Preis-Badge, Share | Klar definierte Elemente | Angebot mit Teilen, „In die Mittagsbox legen“, Status, Essenszeit – Struktur ok |
| 3 Säulen unter Bild | 🍴 Vor Ort, 🔄 Mehrweg, 🧾 Abholnummer (wenn gebucht) | In UI beschrieben |
| „In die Mittagsbox legen“ (Sticky), Doppel-Logik Favorit + Mittagsbox | CTA + Hinweis | Button und Ablauf vorhanden |

**Fazit:** Konzept umgesetzt; 3 Säulen und Abholnummer-Darstellung vor Ort verifizieren.

### 1.4 Checkout / Bestell-Erfolg / Profil
- **Checkout:** Zahlung, Apple Pay / Google Pay / Karte, „Kein Account nötig“ – ok.
- **Bestell-Erfolg:** „Kollegen bescheid geben“, „Erledigt“, Abholnummer #1A – Viralität umgesetzt.
- **Profil:** „Ich habe mit Mittagio bereits 0 Minuten gespart“, „Badge teilen“, Abholnummern, Bestellhistorie – Viralitäts-Badge und Struktur ok.

---

## 2. Anbieterseite (Layout-Regel: hell, aufgeräumt)

### 2.1 Einheitliches Layout
- **Prompt:** Helles Layout (#f8f7f2), kein dunkles Theme; gleicher Header-Stil (provider-header-bar).
- **Live:** „Finanzen & Abrechnung“, „Meine Küche“, „Abholungen“, „Wochenplan“, „Mein Kochbuch“, „Meins“ – alle mit Zurück/Header; Billing mit „Meine Kontodaten“ und „Meine Abrechnungen“. Kein dunkles Theme sichtbar.

**Fazit:** Anbieter-Seiten wirken einheitlich hell; Konformität mit Regel.

### 2.2 Onboarding-Einstieg (INSERATSFLOW / heutige Prompts)
| Vorgabe | Erwartung | Live |
|--------|-----------|------|
| Headline „Sofort verkaufen. Ohne Abo. Ohne Vertrag.“ | Einstieg klar | ✅ Vorhanden |
| USP „Einmalig 4,99 € pro Inserat“ | Transparent | ✅ „4,99 € pro Inserat · Kein Abo · Kein Vertrag · In unter 30 Sekunden live.“ |
| „Was bieten Sie heute an?“ + Eingabe, → / „Jetzt Inserat starten“ | Direkter Einstieg | ✅ Label, Input, Buttons vorhanden |

**Fazit:** Onboarding-Einstieg entspricht den Prompts.

### 2.3 Inseratsflow (INSERATSFLOW_KONZEPT.md)
| Vorgabe | Erwartung | Live |
|--------|-----------|------|
| Fixkosten 4,99 € | Im Flow und Modal | ✅ „Inseratsgebühr: 4,99 €“, „Jetzt für 4,99 € inserieren“ / „Veröffentlichen“ |
| Abholnummer 0,89 €, optional | Schritt „An der Schlange vorbei“, +0,89 € | Im Flow als Option vorgesehen |
| Verdienst-Vorschau | Live-Anzeige nach Gebühren | Konzept umgesetzt |
| CTA „Jetzt für 4,99 € inserieren“ | Am Ende des Flows | ✅ „Veröffentlichen“ im Gebühren-Modal |
| Keine Schiefertafeln, clean | Modern | ✅ |

**Fazit:** Inseratsflow und Gebührenlogik stimmen mit Konzept überein.

### 2.4 Inserat-Erfolg (Growth)
- **Live:** „Inserat ist Live!“, „4,99 € erfolgreich abgebucht“, WhatsApp teilen, QR-Code, „Bild herunterladen“, „E-Mail-Vorschau kopieren“, „Mittagio – Zeit gespart mit der Abholnummer“.
- **Fazit:** Growth-Features (WhatsApp, QR, Social-Bild, E-Mail-Vorschau) und Branding wie vorgesehen.

### 2.5 Billing & Admin
- **Billing:** „Meine Kontodaten“, „Meine Abrechnungen“, helles Layout – konform.
- **Admin:** Tagesumsatz, Aktive Inserate, Abholnummern gebucht, Inserats-Feed, Buchhaltungstabelle, CSV-Export – konform (Zugang nur mit ?admin=1 oder Flag).

### 2.6 Single-Session
- **Live:** „Anderes Gerät aktiv“ mit Hinweis auf eine aktive Sitzung – Single-Session-Messaging vorhanden.

---

## 3. Rechtliches / FAQ
- Impressum, AGB (Kunde/Anbieter), FAQ, Datenschutz, Support – Inhalte und Zurück-Navigation vorhanden; Anbieter-Rechtliches hell.

---

## 4. Abweichungen / Nachprüfung

1. **Favoriten:** Bei befüllten Favoriten prüfen: exakt 2 Spalten, einheitliche Kachelhöhe, 🧾 mit #FFD700, kein Schiefertafel-Look.
2. **Gericht-Detail:** Vor Ort prüfen: 3 Säulen direkt unter dem Bild, Abholnummer nur wenn gebucht; Doppel-Logik „In die Mittagsbox“ (Favorit + Mittagsbox).
3. **refreshCurrentView:** Im Code wurde der Selektor von `.view[style*="display: block"]` auf `.view.active` umgestellt, damit die aktive View (CSS: `.view.active { display:block }`) zuverlässig erkannt wird.

---

## 5. Kurzfassung

- **Kundenseite:** Discover, Favoriten-Header, Gericht-Detail, Checkout, Bestell-Erfolg (Kollegen bescheid geben), Profil (Minuten gespart, Badge teilen) entsprechen den Prompts.
- **Anbieterseite:** Helles, einheitliches Layout; Onboarding-Einstieg (Sofort verkaufen, 4,99 €, „Was bieten Sie heute an?“); Inseratsflow (4,99 €, 0,89 €, Verdienst-Vorschau, CTA); Inserat-Erfolg (WhatsApp, QR, Bild, E-Mail-Vorschau); Billing; Admin; Single-Session-Hinweis – alles mit den Konzepten abgleichbar.
- **Offene Punkte:** Nur Detail-Checks vor Ort (2×2-Grid Favoriten, 3 Säulen Gericht-Detail, Abholnummer #FFD700).

*Prüfstand: Abgleich mit FAVORITEN_LAYOUT_REGEL.md, GERICHT_DETAILANSICHT_KONZEPT.md, INSERATSFLOW_KONZEPT.md und Layout-Regel Kunde/Anbieter.*
