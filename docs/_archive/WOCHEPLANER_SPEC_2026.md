# Wochenplaner (The Planner) – Spezifikation 2026

**Stand:** 6. Februar 2026  
**Design-System:** Clean, modern, weißer Hintergrund (#FFFFFF). Keine Schiefertafel. Fokus auf Gerichte und intuitive Bedienung.

---

## 1. Layout-System (verbindlich)

- **Hintergrund:** Weiß (#FFFFFF)
- **Akzent:** App-Blau/Grün (bestehendes Design)
- **Keine Schiefertafel** – strikt beibehalten

---

## 2. Die Wochenplan-Komponente (The Planner)

### 2.1 Struktur
- **Vertikale Scrolling-Liste** der Wochentage (Smartphone-optimiert)

### 2.2 Tages-Karten (Day Cards)
Jeder Tag = weißer Container mit leicht abgerundeten Ecken.

| Element | Beschreibung |
|---------|--------------|
| **Header** | Links: Wochentag (z. B. „Montag, 09.02.“) |
| **Status-Badge** | Rechts: z. B. „3 Gerichte geplant“ |
| **Slots** | Innerhalb der Karte: Zeit-Slots (z. B. Mittagstisch) |

### 2.3 Inserat-Slot (Planned Insert)
Wenn ein Gericht eingeplant ist – **exakt wie im Inseratsflow**:

| Element | Regel |
|---------|-------|
| **Bild** | Zentriert oder leicht abgerundet |
| **3 Säulen** | Direkt unter dem Bild: 🍴 (Vor Ort), 🧾 (Abholnummer), 🔄 (Mehrweg) |
| **Details** | Gerichtsname, Preis, Allergen-Pills |
| **Status-Button** | Grau: „Gespeichert“ (noch nicht live) |
| | Grün: „Aktiviert für 4,99 €“ (bereit für Dashboard) |

**Icons:** 🍴 (Vor Ort), 🧾 (Abholnummer), 🔄 (Mehrweg) – immer unter dem Bild.  
**Wording:** Ausschließlich **Abholnummer** (kein Ticket/Code).

---

## 3. Add-from-Cookbook Flow

Ziel: **Unter 30 Sekunden** bleiben.

### 3.1 Trigger
- **Plus-Button** im Wochenplan → modales Overlay

### 3.2 Overlay-Inhalt
1. **Quick-Search:** Suchfeld oben. Beim Tippen erscheinen Karten aus dem Kochbuch.
2. **Standard-Zeiten:** Pills unter der Suche: `[11:00 - 13:30]` `[12:00 - 14:00]` `[17:00 - 20:00]`. Ein Tap legt die Zeit fest.
3. **Finaler Button:** „In Woche einplanen“.

---

## 4. Live-Daten-Brücke zum Dashboard

### 4.1 Logik-Regel
```
IF (CurrentTime >= SlotStartTime AND CurrentTime <= SlotEndTime AND Status == "Aktiviert")
  → Show auf Dashboard
```

### 4.2 Dashboard-Ansicht (Live)
- Gericht erscheint als **„Aktiv“**.
- Zusätzlich zu Bild und Icons: **Live-Counter** der verkauften Abholnummern.
- Prominenter Button: **„Ausverkauft / Stop“** – Inserat sofort vom Marktplatz nehmen.

---

## 5. Navigation

| Position | Tab |
|----------|-----|
| Ganz links | **Dashboard** (Live) |
| Mitte | **Wochenplan** |

---

## 6. Monetarisierung

- Button: **„Jetzt für 4,99 € aktivieren“**
- Status nach Aktivierung: **„Aktiviert für 4,99 €“**

---

## 7. Zusammenfassung für Umsetzung

| Element | Regel |
|---------|-------|
| Farben | Hintergrund: #FFFFFF, Akzent: App-Blau/Grün |
| Icons | 🍴, 🧾, 🔄 – immer unter dem Bild |
| Monetarisierung | „Jetzt für 4,99 € aktivieren“ |
| Wording | Ausschließlich Abholnummer (kein Ticket/Code) |
| Navigation | Dashboard links, Wochenplan Mitte |

---

## 8. Nächster Schritt: JSON-Struktur

Für die Synchronisation von Kochbuch und Wochenplan kann eine spezifische JSON-Struktur definiert werden, damit die Daten beim Laden der App sofort verfügbar sind.

---

*Änderungen nur in Absprache.*
