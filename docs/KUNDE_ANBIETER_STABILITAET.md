# Kunde / Anbieter: Trennung und Stabilität

Kurz-Checkliste, damit Kundenseite und Anbieterseite getrennt, ordentlich und stabil laufen.

## Bereits umgesetzt

- **Option 1 (Layout):** Layout-kritische CSS-Regeln sind nach `body.provider-mode` bzw. `body:not(.provider-mode)` gescoped (siehe `.cursor/rules/option1-layout-scope-kunde-anbieter.mdc`).
- **View-Switch:** Nur eine `.view` ist sichtbar (`#app .view:not(.active)` → `display:none !important`); inaktive Views werden per JS mit `setProperty('display','none','important')` ausgeblendet.
- **Modus-Sync:** Beim Wechsel in eine Kunden-View (Discover, Favoriten, Profil, …) wird `provider-mode` vom Body entfernt und `mode = 'customer'` gesetzt; beim Wechsel in eine Anbieter-View wird `provider-mode` gesetzt.
- **Init:** Nach `setMode()` wird `document.body.style.visibility = 'visible'` gesetzt (Init-Gate gegen Flackern).
- **Dashboard:** Anbieter-Dashboard nutzt eine klare Flex-Kette (main → #v-provider-home → .dashboard-floating-wrap) mit Scroll nur im Wrap.

## Checkliste bei Änderungen

| Bereich | Prüfen |
|--------|--------|
| **Neues CSS** (height, overflow, scroll, flex für #app/main) | Immer mit `body.provider-mode` oder `body:not(.provider-mode)` scopen. |
| **Neue Anbieter-View** | Layout nur unter `body.provider-mode` oder `#v-provider-*`; bei Scroll-Container Flex-Kette (flex:1, min-height:0) durchhalten. |
| **Neue Kunden-View** | Layout nur unter `body:not(.provider-mode)` oder `.customer-view` / konkrete View-IDs. |
| **showView(id)** | Bei Kunden-View-IDs (Discover, Favoriten, …) wird `provider-mode` entfernt und `mode = 'customer'` gesetzt; bei Anbieter-IDs wird `provider-mode` gesetzt. |
| **setMode('provider'/'customer')** | Setzt/entfernt `provider-mode` am Body; ruft ggf. showView für die passende Start-View. |
| **Routing / Hash** | Magic-Link `#/plan/…` nutzt eigene Logik und entfernt `provider-mode`; sonst setMode + showView. |

## Was vermeiden

- Keine **globalen** Regeln für `body`, `#app`, `main`, die Höhe oder Scroll für **beide** Modi setzen.
- Keine Änderung an der **Kunden-UI**, die Anbieter-Layout/JS voraussetzt (und umgekehrt).
- Kein **direktes** Setzen von `body.className` für Layout (nur `classList.add/remove('provider-mode')`).

## Referenzen

- **Layout-Scope (technisch):** `.cursor/rules/option1-layout-scope-kunde-anbieter.mdc`
- **Layout (konzeptionell):** `.cursor/rules/layout-kunde-anbieter.mdc`
- **Code-Referenz:** In `app/index.html` der Block **„OPTION 1: KUNDE / ANBIETER LAYOUT TRENNUNG“** im `<style>` mit Kurz-Checkliste.

## Kunden-View-IDs (customerViewIds in showView)

Diese IDs lösen beim Anzeigen das Entfernen von `provider-mode` und `mode = 'customer'` aus (und Topbar „Kunden-Kontext“). Abgleich mit dem Code:

| View-ID           | views.*      | Verwendung                    |
|-------------------|--------------|-------------------------------|
| v-discover        | start, discover | Start/Entdecken               |
| v-fav             | fav          | Favoriten                     |
| v-orders          | orders       | Bestellungen                  |
| v-cart            | cart         | Warenkorb                     |
| v-profile         | profile      | Profil (Kunde)                |
| v-order-success   | orderSuccess | Nach Bestellung/Abholnummer   |
| v-pickup-code     | pickupCode   | Abholnummer (Fullscreen)      |
| v-checkout        | checkout     | Checkout-Flow                 |

Neue Kunden-Views hier und in `customerViewIds` in `showView()` ergänzen (beide Stellen: Modus-Sync und Topbar-Liste).

---

## Release-Test-Checkliste (Kunde / Anbieter)

Vor Release oder nach größeren Layout-/Navigations-Änderungen manuell durchgehen:

### Kundenseite
- [ ] **Discover** öffnen → Inhalt sichtbar, Seite **scrollbar** (bis unten).
- [ ] **Favoriten / Profil / Warenkorb / Bestellungen** → jeweils Inhalt sichtbar, scrollbar.
- [ ] **Abholnummer** (z. B. nach „Will ich“) → Ansicht korrekt, kein Anbieter-Layout.
- [ ] **Bottom-Nav** (Kunde) sichtbar, aktiver Tab passt zur View.

### Anbieterseite
- [ ] **Dashboard (Meine Küche)** → Inhalt sichtbar (Header, KPIs, Angebote, Wochenplan), Bereich **scrollbar**.
- [ ] **Wochenplan / Kochbuch / Abholungen / Profil** → Inhalt sichtbar und scrollbar (wo vorgesehen).
- [ ] **FAB „+“** auf Meine Küche, Wochenplan, Kochbuch sichtbar; Klick öffnet Inseratsflow.
- [ ] **Bottom-Nav** (Anbieter) sichtbar, aktiver Tab passt.

### Wechsel Kunde ↔ Anbieter
- [ ] Von **Discover** in Anbieterbereich (z. B. Login → Dashboard) → kein leerer Screen, Dashboard-Inhalt sofort sichtbar.
- [ ] Von **Dashboard** zurück zu Discover (z. B. Logo/Link „Entdecken“) → Kunden-Layout, Discover scrollbar.
- [ ] **Magic-Link** `#/plan/[ID]` öffnen → öffentlicher Wochenplan (kein provider-mode); „Zurück“ → Discover mit Kunden-Layout.

### Sonstiges
- [ ] **Reload** auf Discover → wieder Discover, scrollbar.
- [ ] **Reload** auf Dashboard (eingeloggt) → wieder Dashboard, scrollbar, kein Flackern.

---

## Optional: Weitere Absicherungen

- **Neue Views:** Wenn eine neue View zur Kunden- oder Anbieter-Seite gehört, in `showView` die Liste `customerViewIds` (Kunden) bzw. die Logik `id.indexOf('v-provider-') === 0` (Anbieter) anpassen.
