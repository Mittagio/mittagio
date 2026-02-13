# Konzept: Anbieter-Portal, PWA-Tipp und Provider-UX (Februar 2026)

Stand der umgesetzten Änderungen und Regeln für die Kunden- und Anbieter-Ansicht.

---

## 1. Anbieter-Portal: Einstieg und Platzierung

### 1.1 Wo erscheint das Anbieter-Portal?
- **Nur in der Kundenansicht „Meins“ (Profil):**
  - **Header oben rechts:** Icon „Hochhaus“ (Building) neben dem Zahnrad (Einstellungen) und dem X (Schließen).
  - **Im Zahnrad-Menü:** Menüpunkt „Zum Anbieter-Portal“ (mit 🏢).

- **Nicht mehr:** Kein Anbieter-Portal-Icon im Discover-Header (wurde entfernt).

### 1.2 Verhalten beim Klick
- **Beide Einstiege** (Icon in Meins, Menüpunkt „Zum Anbieter-Portal“) öffnen das **Gastgeber-Login-Modal** (Sheet).
- Es wird **keine** Vollbild-Provider-Login-Seite mehr geöffnet; dadurch entfällt das unerwünschte „Runterscrollen“ des Bildschirms.
- Nach erfolgreichem Login: Wechsel in den Provider-Modus und Anzeige des Provider-Dashboards (bzw. Onboarding, falls nötig).

### 1.3 Technik
- **Funktion:** `showProviderLoginModal()` – zeigt Backdrop + Sheet `providerLoginSheet` / `providerLoginBd`.
- **Global verfügbar:** `window.showProviderLoginModal` und `window.closeProviderLoginModal` werden explizit gesetzt, damit Inline-`onclick` und Klicks auf das Icon zuverlässig funktionieren.
- **Icon:** Lucide „building“ (Hochhaus), gleiche Bedeutung wie 🏢 im Menü. Auf dem Icon: `pointer-events: none`, damit der Klick immer den Button trifft.
- **Zusätzlich:** `btnProfileProviderPortal` hat einen `click`-EventListener, der `showProviderLoginModal()` aufruft.

---

## 2. PWA / „Zum Startbildschirm hinzufügen“

### 2.1 Formulierung
- Überall wird **„Zum Startbildschirm hinzufügen“** verwendet (nicht „Home-Bildschirm“).

### 2.2 Verhalten
- **Profil → „App installieren (PWA)“** öffnet ein **Sheet** (kein Toast mehr):
  - **Titel:** „App auf dem Startbildschirm“
  - **Text:** „Im Browser **Teilen** (oder Menü) tippen → **„Zum Startbildschirm hinzufügen“** wählen. Dann startest du Mittagio wie eine App.“
  - **Button:** „Verstanden“ → schließt das Sheet.

### 2.3 Technik
- **IDs:** `pwaStartScreenBd`, `pwaStartScreenSheet`.
- **Funktionen:** `openProfilePwaTipSheet()`, `closePwaStartScreenSheet()`.

---

## 3. Kein leerer Bildschirm beim View-Wechsel

### 3.1 Problem (behoben)
- Beim Wechsel (z. B. ins Anbieter-Portal) wurde zuerst bei **allen** Views `active` entfernt, sodass kurz **keine** View sichtbar war.
- Die Einblend-Animation startete mit `opacity: 0`, der Inhalt war also anfangs unsichtbar.

### 3.2 Lösung: showView-Reihenfolge
- **Zuerst:** Neue View aktivieren und anzeigen (`classList.add('active')`, `style.display = 'block'` bzw. `'flex'` für Abholnummer).
- **Danach:** Bei allen **anderen** Views `active` entfernen und `display` zurücksetzen.
- Es gibt damit keinen Frame mehr, in dem keine View angezeigt wird.

### 3.3 Lösung: Animation
- **`.view.active`** hat sofort **`opacity: 1`** (kein Einblenden aus Unsichtbar).
- **Animation `viewIn`:** Nur noch leichte Verschiebung (`translateY(6px)` → `0`), Dauer 0,2 s.
- Kein Opacity-Animation mehr für den View-Wechsel.

---

## 4. Provider-Ansichten: Inhalt „oben“ (kein leerer Screen)

### 4.1 Main im Provider-Modus
- **`body.provider-mode main`:**  
  `padding: 0 !important`, `max-width: none !important`.  
  Kein Abstand um den Inhalt, Anbieter-Views füllen den sichtbaren Bereich.

### 4.2 Oberer Abstand aller Provider-Views
- **`body.provider-mode [id^="v-provider-"]`:**  
  `padding-top: calc(8px + env(safe-area-inset-top, 0px)) !important`, `margin-top: 0 !important`.

### 4.3 Dashboard (v-provider-home)
- **`.prov-header`:** Padding reduziert (z. B. 12px 20px 16px).
- **`#v-provider-home .prov-header > div:first-of-type`:** `margin-bottom` verringert (z. B. 14px), damit die KPI-Zeile näher am Titel sitzt.
- In Media Queries: `#v-provider-home` mit `padding-top: calc(8px + env(safe-area-inset-top, 0))` (bzw. auf kleinen Screens 6px + safe-area).

### 4.4 Weitere Provider-Seiten
- **`.prov-page-header`:** Weniger Padding oben (z. B. `calc(10px + env(safe-area-inset-top, 0))`).
- Headers von Abholungen, Kochbuch, Profil, Wochenplan: einheitlich reduziertes `padding-top` (z. B. 8px oder 10px + safe-area).

### 4.5 Provider-Login-Vollbild (falls direkt aufgerufen)
- **`#v-provider-login`:** Inhalt oben ausgerichtet, `padding-top: calc(16px + env(safe-area-inset-top, 0))`, Panel ohne großen oberen Abstand.
- Beim Anzeigen dieser View: `window.scrollTo(0, 0)` sofort und per `requestAnimationFrame` nochmals, damit der obere Bereich sichtbar ist.

---

## 5. Kurz-Checkliste (Implementierung)

| Thema | Erwartung |
|-------|-----------|
| Anbieter-Portal nur in „Meins“ | Icon (Hochhaus) oben rechts + Menüpunkt im Zahnrad-Menü |
| Klick auf Icon / „Zum Anbieter-Portal“ | Öffnet Gastgeber-Login-Modal (Sheet), kein Vollbild-Login |
| `showProviderLoginModal` | Global auf `window`, + click-Listener auf `btnProfileProviderPortal` |
| PWA-Tipp | Sheet „Zum Startbildschirm hinzufügen“, Text mit „Zum Startbildschirm hinzufügen“ |
| View-Wechsel | Zuerst neue View aktivieren, dann andere ausblenden; `.view.active` mit `opacity: 1`, Animation nur translateY |
| Provider: leerer Screen | `main` padding 0, Provider-Views mit geringem padding-top + safe-area, Header-Paddings reduziert |

---

## 6. Bekannter Fehler (behoben)

- **CSS:** Es gab einen verwaisten Block nach `body.provider-mode [id^="v-provider-"]` mit `transform:translateX(32px);` und `}`. Dieser Block wurde entfernt (kein gültiger Selektor).

---

*Dokument erstellt: Februar 2026. Bezug: app/index.html.*
