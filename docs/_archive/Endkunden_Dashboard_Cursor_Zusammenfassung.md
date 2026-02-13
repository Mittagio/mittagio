# Endkunden-Dashboard – Cursor-Zusammenfassung (final)

## 📋 Geltungsbereich

- **Endkunden / Besucher**
- **Kein Anbieter-Account**
- **Keine Registrierung**

---

## ✅ Screen "Mein Mittagio"

### Nicht erlaubt:
- ❌ **Kein Profil anlegen**
- ❌ **Keine Bestellungen**
- ❌ **Keine Abholcodes**
- ❌ **Kein Login- oder Account-Gefühl**

### Inhalte erlaubt:
- ✅ **Willkommenstext** (neutral, ohne "Bestellen")
- ✅ **Angebote entdecken** (Button)
- ✅ **Kürzlich angesehene Anbieter/Angebote** (session-basiert)
- ✅ **Als Anbieter starten** → `/anbieter/dashboard`

### Nicht erlaubt (Begriffe):
- ❌ Profil anlegen
- ❌ Meine Bestellungen
- ❌ Warenkorb / Box / Checkout-Begriffe

---

## 📄 Datenschutz

- **Keine personenbezogenen Endkundendaten**
- **Keine Weitergabe an Anbieter**
- **Kein Marketing-Tracking**
- **DSGVO-konform** (MVP-Level)

**Session-basierte Daten:**
- "Kürzlich angesehen" wird nur in `sessionStorage` gespeichert
- Wird beim Schließen des Browsers gelöscht
- Keine personenbezogenen Daten
- Maximal 10 Einträge

---

## 🔧 Technische Details

**View-ID:** `v-profile`

**Funktion:** `updateProfileView()`

**Session-Tracking:**
- `trackRecentView(providerId, offerId)` wird aufgerufen, wenn ein Angebot geöffnet wird
- Gespeichert in `sessionStorage.getItem('mittagio_recent_views')`
- Format: `[{providerId, offerId, timestamp}, ...]`

**Navigation:**
- "Angebote entdecken" → `showDiscover()`
- "Als Anbieter starten" → `navigateTo('/anbieter/dashboard')`
- "Kürzlich angesehen" → `navigateToProvider(providerId)`

---

## 💡 Empfohlener Cursor-Prompt

> "Bitte refactore den Screen 'Mein Mittagio' strikt nach dieser Endkunden-Dashboard-Zusammenfassung und dem Endkunden-Datenschutz."

---

## ✅ Checkliste

- [x] Welcome Card: Neutraler Text (ohne "Bestellen")
- [x] "Angebote entdecken" Button
- [x] "Kürzlich angesehen" (session-basiert)
- [x] "Als Anbieter starten" Button
- [x] Alle Account/Bestellungs-Elemente entfernt
- [x] Session-Tracking implementiert
- [x] Keine personenbezogenen Daten

---

## 🔍 Test-Cases

1. **Welcome Card:**
   - Text ist neutral (kein "Bestellen")
   - "Angebote entdecken" Button funktioniert

2. **Kürzlich angesehen:**
   - Angebot öffnen → wird in Session gespeichert
   - "Mein Mittagio" öffnen → "Kürzlich angesehen" wird angezeigt
   - Browser schließen → Session wird gelöscht

3. **Als Anbieter starten:**
   - Button klicken → navigiert zu `/anbieter/dashboard`

4. **Keine Account-Funktionen:**
   - Kein "Profil anlegen"
   - Keine "Meine Bestellungen"
   - Keine "Warenkorb" / "Box" / "Checkout"
