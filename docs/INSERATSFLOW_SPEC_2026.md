# Inseratsflow – Spezifikation 2026 (verbindlich)

**Stand:** 6. Februar 2026  
**Design:** Clean, modern, App-like. Handy-first.

---

## 1. Gerichtsname & Preis

- **Gerichtsname:** Autovervollständigung (wie gehabt).
- **Intelligentes Titelfeld:** Autovervollständigung setzt automatisch passende **Kategorie-Pills** und **Allergene**.
- **Preiseingaben:** Immer **Handy-first** mit **app-like Zahlentastatur** (`inputmode="decimal"` / `type="number"`).

---

## 2. Bild-Modul

Drei Optionen zur Auswahl:

1. **Kamera** – Direktaufnahme
2. **Upload** – Galerie/Bibliothek
3. **3 KI-Vorschläge** – Basierend auf dem Gerichtsnamen

---

## 3. Vor dem Absenden (Die Motivation)

Bevor der Anbieter auf „Jetzt für 4,99 € inserieren“ klickt, sieht er eine **kleine Kalkulation**:

| Element | Beispiel |
|---------|----------|
| **Umsatz-Potential** | „Bei ca. 25 Portionen à 8,50 € erzielst du **212,50 €** Umsatz.“ |
| **Deine Kosten heute** | „Nur **4,99 €** (ca. 2% vom Umsatz).“ |

**Ziel:** Die Gebühr psychologisch rechtfertigen, indem der potenzielle Mehrwert sichtbar ist.

---

## 4. Nach dem Absenden (Das Live-Dashboard)

Sobald das Inserat live ist, wechselt die Ansicht in ein **Echtzeit-Dashboard**. Keine Bestandsführung – Fokus auf **Interaktion** und **verkaufte Abholnummern**.

### 4.1 Live-Umsatz
- **Groß angezeigt:** Umsatz aus bereits verkauften Abholnummern (🧾).
- **Beispiel:** „**102,00 €**“ (bei 12 verkauften Portionen à 8,50 €).

### 4.2 Abholnummern-Counter
- Zeigt, wie viele Kunden bereits online vorbestellt haben.
- **Beispiel:** „**12 Personen** kommen heute sicher zu dir.“

### 4.3 Kosten-Check (Transparenz)

| Posten | Beispiel |
|--------|----------|
| Inserat | 4,99 € |
| Servicegebühr Abholnummern | 12 × 0,89 € = 10,68 € |
| **Vorläufiger Auszahlungsbetrag** | **86,33 €** (nach Abzug aller Gebühren) |

### 4.4 Warum das wichtig ist

1. **Transparenz:** Kein Vertrag, kein Abo – der Anbieter sieht sofort: „Ich zahle nur, wenn ich Kunden über die App bekomme.“
2. **Bestätigung:** Die 0,89 € pro Abholnummer werden als **Stressfrei-Service** wahrgenommen, weil die Kunden bereits bezahlt haben und schnell abgefertigt werden können.
3. **Monetarisierung:** Echter Mehrwert (Zeitersparnis durch Abholnummer) statt Abo-Druck.

---

## 5. Technische Umsetzung

| Anforderung | Umsetzung |
|-------------|-----------|
| Preiseingaben Handy-first | `inputmode="decimal"` oder `inputmode="numeric"` |
| Verdienst-Vorschau | Live-Berechnung vor Absenden anzeigen |
| Live-Dashboard | Echtzeit-Aktualisierung aus Orders/Abholnummern |
| Kategorie/Allergene | Autocomplete triggert Pills bei Eingabe |

---

## 6. Strikt zu vermeiden

- Schiefertafeln / rustikales Design
- Begriffe „Ticket“ oder „Abholcode“ – nur **Abholnummer**
- Abo-Druck oder versteckte Kosten

---

*Änderungen nur in Absprache.*
