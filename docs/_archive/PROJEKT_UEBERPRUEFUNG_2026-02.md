# Projekt-Überprüfung Mittagio (Februar 2026)

Systematische Prüfung des Gesamtprojekts: Struktur, Konfiguration, Code-Konsistenz und bekannte Schwachstellen.

---

## 1. Projektstruktur

| Bereich | Status | Anmerkung |
|--------|--------|-----------|
| **app/** | OK | index.html, manifest.json, assets/, .nojekyll |
| **netlify/functions/** | OK | create-checkout-session.js (Stripe) |
| **docs/** | OK | Konzepte, Specs, Seiten-Beschreibungen |
| **.cursor/rules/** | OK | Cursor-Regeln für Flows/Layout |
| **.github/workflows/** | OK | pages.yml für Deployment |
| **Service Worker** | Deaktiviert | sw.js.disabled – PWA ohne SW (bewusst) |

---

## 2. Konfiguration

### 2.1 Netlify (netlify.toml)
- **publish:** `app` → Root der veröffentlichten Site ist der Inhalt von `app/`.
- **functions:** `netlify/functions`
- **command:** `npm install`
- **redirects:** SPA-Fallback `/*` → `/index.html` (Status 200)

### 2.2 package.json
- **dependencies:** `stripe` ^14.0.0 (für Netlify Function).
- Kein Build-Step für das Frontend (statisches HTML/JS).

### 2.3 PWA / manifest.json
- **name/short_name:** Mittagio
- **start_url:** `./`
- **display:** standalone
- **icons:** assets/icons/icon-192.png, icon-512.png
- **theme_color / background_color** gesetzt.

### 2.4 Base-Href (index.html)
- **Aktuell:** `<base href="/mittagio/app/">`
- **Hinweis:** Passt zu Deployment unter Pfad `/mittagio/app/` (z. B. GitHub Pages).  
  Bei Deployment **im Root** (z. B. Netlify mit Domain-Root) müsste base auf `./` oder `/` angepasst werden, sonst schlagen relative Ressourcen (manifest, Icons, Links) fehl.

---

## 3. Code-Konsistenz (index.html)

### 3.1 Bereits behoben
- **CSS:** Verwaister Block nach `body.provider-mode [id^="v-provider-"]` (transform + schließende Klammer) wurde entfernt.

### 3.2 Fehlende DOM-Elemente (ohne Absturz)
Der Code fragt nach Elementen, die **nicht im HTML existieren**. Es wird überall mit `if (el)` abgefangen, daher **kein Laufzeitfehler**, aber die zugehörigen Features sind unsichtbar:

| ID | Verwendung im Code | Im HTML |
|----|---------------------|--------|
| **fabModeToggle** | FAB „Lust auf Inspiration?“ / Modus-Wechsel (Discover) | Nicht vorhanden |
| **toggleDiscoverViewTopbar** | Toggle für Listen-/Kartenansicht in der Topbar | Nicht vorhanden |
| **toggleDiscoverViewIcon** | Icon innerhalb von toggleDiscoverViewTopbar (querySelector) | Nicht vorhanden |
| **modePill** | Anzeige Provider-Modus (Kommentar: „modePill removed“) | Nicht vorhanden |

**Empfehlung:**  
- Entweder die gewünschten Elemente (z. B. FAB, Topbar-Toggle) im Markup ergänzen, **oder**  
- die zugehörigen Code-Blöcke ausdünnen/entfernen, um toten Code zu vermeiden.

### 3.3 Referenzierte Funktionen (onclick / global)
- **showProviderLoginModal / closeProviderLoginModal:** Global auf `window` gesetzt, Aufruf in Meins und im Zahnrad-Menü.
- **openProfilePwaTipSheet / closePwaStartScreenSheet:** Werden aufgerufen, Sheet „Zum Startbildschirm hinzufügen“ ist vorhanden.
- **closeDiscoverPinDrawer, openDiscoverLocationSearch, showLegalPage, goBackFromLegalPage, …:** Werden an vielen Stellen verwendet; Definitionen sind im gleichen Skript vorhanden.

### 3.4 View-Wechsel (showView)
- Zuerst neue View aktivieren, dann andere ausblenden → kein leerer Bildschirm.
- `.view.active` mit `opacity: 1`, Animation nur `translateY` → sofort sichtbar.

### 3.5 Provider-Layout
- `body.provider-mode main { padding: 0; max-width: none; }`
- Provider-Views mit geringem `padding-top` + safe-area, Header kompakt → Inhalt „oben“, kein leerer Screen.

---

## 4. Netlify Function (Stripe)

- **Datei:** `netlify/functions/create-checkout-session.js`
- **Methode:** POST
- **Umgebung:** `STRIPE_SECRET_KEY` muss in Netlify gesetzt sein.
- **Body:** orderId, total, currency (optional), successUrl, cancelUrl, lineItems (optional).
- **Validierung:** orderId und total (mind. 0,50) erforderlich; bei fehlendem Body/JSON saubere Fehlerantworten (400/405/500).
- **Struktur:** Keine offensichtlichen Fehler.

---

## 5. Assets & externe Abhängigkeiten

- **Lucide Icons:** CDN (unpkg.com, lucide 0.460.0), onload init.
- **Schriften:** Google Fonts (Inter, Montserrat, Kalam, …) per @import.
- **Icons/ Bilder:** assets/icons/, assets/*.png – Pfade relativ; mit aktuellem `<base>` unter `/mittagio/app/` korrekt.

---

## 6. Dokumentation & Konzept

- **KONZEPT_ANBIETER_PORTAL_UND_UX_2026-02.md:** Erfasst Anbieter-Portal, PWA-Tipp, View-Wechsel, Provider-Layout; mit Code abgeglichen.
- **docs/seiten/:** Beschreibungen für Discover, Profil, Provider-Login, Dashboard usw. vorhanden.
- **tickets/:** Themen wie Anbieter-Routing, Dashboard, Dead Clicks, Recht/Hilfe.

---

## 7. Kurz-Checkliste (Deployment / Wartung)

| Thema | Prüfen |
|-------|--------|
| Deployment-Pfad | base href zu Deployment-URL passend? (z. B. `/` bei Netlify-Root) |
| Stripe | STRIPE_SECRET_KEY in Netlify gesetzt? |
| PWA | manifest.json + Icons unter korrektem Pfad erreichbar? |
| Fehlende UI-Elemente | fabModeToggle, toggleDiscoverViewTopbar gewollt ausgelassen oder nachtragen? |
| Linter | index.html: aktuell keine gemeldeten Fehler |

---

## 8. Zusammenfassung

- **Struktur und Konfiguration** sind schlüssig; Netlify, Manifest und Stripe-Function sind konsistent.
- **Ein CSS-Fehler** (verwaister Block) wurde behoben.
- **Fehlende Element-IDs** (fabModeToggle, toggleDiscoverViewTopbar, modePill) führen zu keinen Abstürzen, aber zu nicht sichtbaren Features; Klärung/Anpassung empfohlen.
- **Base-Href** muss zum tatsächlichen Deployment-Pfad passen (insbesondere bei Root-Deployment).

Bei Bedarf können die fehlenden IDs im HTML ergänzt oder die zugehörigen Code-Stellen als „optional“ dokumentiert bzw. entfernt werden.

---

*Stand: Februar 2026. Bezug: app/index.html, netlify.toml, package.json, manifest.json, docs.*
