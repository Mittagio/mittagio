# Anbieterseite – Test & Zusammenfassung

## Kalender, Wochenplan, Inserat, Abrechnung – Status

### ✅ Mit Weiterleitung / funktionsfähig

| Bereich | Element | Aktion |
|--------|---------|--------|
| **Dashboard** | KPI Tagesessen | Scrollt zu „Aktive Angebote“ |
| **Dashboard** | KPI Abholungen | → `showProviderPickups()` |
| **Dashboard** | KPI Umsatz | → `showProviderBilling()` |
| **Dashboard** | „Gericht erstellen“ | → `openDishFlow()` |
| **Dashboard** | „Erstes Gericht für heute“ | → `openWeekAddSheet(selectedDay)` / Inserat-Flow |
| **Dashboard** | „Jetzt Woche planen“ / Empty „Jetzt Gericht erstellen“ | → `openWeekAddSheet(selectedDay)` |
| **Dashboard** | Refresh-Button | Lädt Daten, `renderProviderHome()` |
| **Dashboard** | Pills (Tage) | Wählen Tag, aktualisieren Vorschau (kein Sheet) |
| **Dashboard** | Gerichtskarte (Online) | → `startListingFlow({ editOfferId })` |
| **Dashboard** | Gerichtskarte (Geplant) | → `openWeekAddSheet(day, slot)` |
| **Dashboard** | „Weiteres Gericht planen“ | → `openWeekAddSheet(selectedDay)` |
| **Dashboard** | „Zum Wochenplan“ | → `showProviderWeek(selectedDay)` |
| **Dashboard** | Reaktivierungs-Tipp „JETZT“ | → `startListingFlow({ dishId, date })` oder `openWeekAddSheet(selectedDay)` |
| **Wochenplan** | Tab „Wochenplan“ | → `showProviderWeek()` |
| **Wochenplan** | „Gericht hinzufügen“ (Empty) | → `openWeekAddSheet()` |
| **Wochenplan** | Slots/Karten (Live) | → `startListingFlow({ editOfferId })` |
| **Wochenplan** | Slots (Geplant/Entwurf) | → `openWeekAddSheet(day, slot)` |
| **Wochenplan** | „Gericht auf mehrere Tage setzen“ | → `openWeekMultiSelectSheet()` |
| **Kochbuch** | „In Wochenplan“ (Action-Sheet) | → öffnet Wochenplan-Sheet mit Gericht |
| **Kochbuch** | „Jetzt für 4,99 € inserieren“ (Bar) | → Inserat-Flow |
| **Profil** | „Jetzt für 4,99 € inserieren“ (Kachel) | → `openDishFlow()` |
| **Profil** | „Zahlung & Abrechnung“ | → `showProviderBilling()` |
| **Profil** | Abrechnung-Kachel (Einstellungen) | → Abrechnung-View |
| **Abrechnung** | „Zurück“ (btnBillingBack) | → `showProviderProfile()` |
| **Abrechnung** | „Zahlungsmittel ändern“ | Toast (Demo) |
| **Abrechnung** | „Meine Abrechnungen“ / Archiv | → Abrechnung-View |
| **Navigation** | „Zurück“ (Provider-Nav) | → `showProviderHome()` |
| **Support-Tiles** | inserieren / zahlung / abholnummer / profil | → `selectSupportTopic(topic)` (FAQ/Support) |

### 🔧 Behoben

| Element | Problem | Fix |
|--------|---------|-----|
| **„Stripe Dashboard öffnen“** (btnProviderBillingPortal) | Kein `onclick` – toter Button | In `renderBilling()` Handler ergänzt: Toast „Stripe Dashboard (Demo – später Link zum Backend).“ |

### ⚠️ Demo / Platzhalter (keine echte Weiterleitung)

- **Zahlungsmittel ändern**: nur Toast, kein Stripe-Link.
- **Stripe Dashboard öffnen**: nur Toast, später echten Portal-Link eintragen.

---

## Kurz-Check: Keine toten Buttons mehr

- **Kalender/Pills**: Tag auswählen → Inhalt wechselt, Sheet öffnet sich nur über „Weiteres Gericht planen“ oder leeren Tag.
- **Wochenplan**: Slots und „Gericht hinzufügen“ führen in Bearbeitung bzw. Add-Sheet.
- **Inserat**: „Gericht erstellen“, „Jetzt für 4,99 € inserieren“ (Dashboard, Profil, Kochbuch) starten den Inserat-Flow.
- **Abrechnung**: Alle sichtbaren Buttons (Zurück, Zahlungsmittel, Archiv, **Stripe Dashboard**) haben nun eine Aktion (Navigation oder Toast).

---

## Empfohlener manueller Testablauf

1. **Login** → Dashboard (Meine Küche). Oben: Header + KPIs, darunter aktive Angebote und Wochenplan-Pills.
2. **Pill** auf einen leeren Tag (z. B. „Mo 16.“) → Reaktivierungs-Tipp mit „JETZT“ → Klick → Inserat-Flow mit vorbelegtem Datum.
3. **„Zum Wochenplan“** → Vollansicht Wochenplan. Tag wählen, Slot tippen → Bearbeiten/Planen.
4. **Tab Kochbuch** → Gericht wählen, „Jetzt für 4,99 € inserieren“ oder „In Wochenplan“ im Action-Sheet.
5. **Tab Profil** → „Zahlung & Abrechnung“ → Abrechnung. „Stripe Dashboard öffnen“ und „Zahlungsmittel ändern“ → mindestens Toast/Feedback.
6. **Zurück** aus Abrechnung → Profil; **Zurück** in der Nav-Leiste → Dashboard.

Wenn du willst, können wir als Nächstes den Stripe-Dashboard-Button mit einer echten URL oder einem Backend-Aufruf versehen.
