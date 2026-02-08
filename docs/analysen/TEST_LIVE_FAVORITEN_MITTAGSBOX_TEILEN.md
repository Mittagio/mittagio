# Testbericht: Live-Seite vs. Konzept
## Favoriten · Mittagsbox · Teilen

**Datum:** 6. Februar 2026  
**Live-URL:** https://mittagio.github.io/mittagio/app/  
**Lokale Vorschau:** `npx serve app` → http://localhost:3000/app/

---

## 1. Konzept vs. Umsetzung – Übersicht

### Favoriten (Konzept: docs/seiten/03_favoriten.md)

| Konzept | Live-Implementierung | Status |
|---------|----------------------|--------|
| Überschrift „Dein Menü für heute“ | „Deine Favoriten ⚡“ | ⚠️ Abweichend (angepasst: Favoriten statt Mittagsbox) |
| 2×2 Grid mit Gericht-Favoriten | `fav-grid`, `createFavoriteGridCard()` | ✅ |
| 3 Säulen (🍴🧾🔄) unter Bild | `saeulen-mini` | ✅ |
| Abholnummer gelb (#FFD700) | `abholnummer-highlight` | ✅ |
| Rotes X zum Entfernen | `removeBtn` auf Kachel | ✅ |
| Pull-to-Reveal (Morgen/Übermorgen) | `favPullHint`, `favUpcomingPreview` | ✅ |
| Share-Button unter Grid | `btnFavShareHeader` im Header | ✅ |
| Lieblings-Anbieter | `sectionProvidersWrapper` | ✅ |

### Mittagsbox/Warenkorb (Konzept: docs/seiten/15_warenkorb.md)

| Konzept | Live-Implementierung | Status |
|---------|----------------------|--------|
| Header „Mittagsbox“ | „Mittagsbox heute ⚡“ | ✅ |
| Liste Gerichte (Foto, Name, Preis) | `v-cart`, `renderCart()` | ✅ |
| Summe, Abholnummer-Gebühr | Checkout-Sheet | ✅ |
| CTA „Zur Kasse“ | `flyThumbnailToMittagsbox`, Checkout | ✅ |
| Empty State | „Deine Box ist noch leer“ | ✅ |

### Teilen (Konzept: FAVORITENSEITE_MASTER.md, GERICHT_DETAILANSICHT_KONZEPT)

| Konzept | Live-Implementierung | Status |
|---------|----------------------|--------|
| Share auf Discover-Karten | `shareBtn` in `createModernOfferCard` | ✅ |
| Share auf Favoriten-Seite | `btnFavShareHeader` | ✅ |
| Share auf Gericht-Detail | Share-Icon in Offer-Sheet | ✅ |
| Web Share API / Clipboard-Fallback | `navigator.share` oder Clipboard | ✅ |

---

## 2. Manuelle Test-Checkliste

### A) Favoriten testen

1. **Öffne** https://mittagio.github.io/mittagio/app/
2. **Discovery:** Scrolle zu einer Gericht-Kachel (z. B. Kürbissuppe).
3. **Herz klicken:** Klicke auf das Herz-Icon (oben rechts auf der Kachel).
   - ✓ Toast: „Zu Favoriten hinzugefügt! ❤️“
   - ✓ Herz wird rot gefüllt
4. **Favoriten-Tab:** Klicke unten auf „Favoriten“ (Herz-Icon).
   - ✓ Favoriten-Seite öffnet sich
   - ✓ Das Gericht erscheint in „Gerichte in deiner Box“
5. **Entfernen:** Klicke auf das rote X auf einer Favoriten-Kachel.
   - ✓ Gericht verschwindet aus Favoriten

**Bekannte Voraussetzung:** localStorage darf nicht geleert sein und Offers müssen beim ersten Besuch geladen worden sein (Seeding nur bei `offers.length === 0`).

---

### B) In die Mittagsbox legen

1. **Discovery:** Wähle ein Gericht mit Abholnummer (🧾).
2. **CTA:** Klicke auf „In die Box 🥗“ (gelber Button).
   - ✓ Thumbnail-Animation zur Mittagsbox
   - ✓ Toast: „In der Box! 🥗“
3. **Mittagsbox-Tab:** Klicke unten auf „Mittagsbox“ (Warenkorb-Icon).
   - ✓ Gericht erscheint in der Mittagsbox
   - ✓ Summe wird angezeigt
4. **Alternativ:** Von der Gericht-Detailansicht (Klick auf Karte) → „In die Mittagsbox legen“.

**Hinweis:** Bei Gerichten ohne Abholnummer (nur Info) ist der CTA deaktiviert.

---

### C) Teilen testen

1. **Share auf Discovery-Karte:**
   - Klicke auf das Share-Icon (oben rechts, neben dem Herz).
   - ✓ Web Share Dialog oder Clipboard-Fallback
   - ✓ Text enthält Gericht, Anbieter, Link

2. **Share auf Favoriten-Seite:**
   - Öffne Favoriten (mind. 1 Gericht favorisiert).
   - Klicke auf Share-Icon im Header.
   - ✓ Share mit dynamischem Text (erstes Favorit-Gericht)

3. **Share auf Gericht-Detail:**
   - Klicke auf eine Gericht-Karte → Detail-Sheet öffnet sich.
   - Klicke auf Share-Icon.
   - ✓ Teilen-Funktion auslösbar

---

## 3. Erwartete Fehlerquellen (bereits behoben)

| Problem | Fix |
|---------|-----|
| Favoriten-Tab reagiert nicht | `e.target.closest('#customerNav button.navbtn')` |
| Herz speichert nicht in Favoriten | Swipe-Karten nutzen `toggleFavorite`/`dishFavs` |
| Favoriten leer nach Reload | Seeding nur bei `offers.length === 0` |
| Nur heute-Favoriten sichtbar | `dishList` zeigt alle favorisierten Gerichte |
| QuotaExceededError bei Orders | `saveOrders(newOrders)` ersetzt statt anhängt |

---

## 4. Schnelltest lokal

```bash
cd c:\Users\quach\Documents\GitHub\mittagio
npx serve app
```

Dann im Browser: http://localhost:3000/app/

---

## 5. Zusammenfassung

| Feature | Konzept | Erwartetes Verhalten | Zu prüfen |
|---------|---------|----------------------|-----------|
| Favoriten hinzufügen | Herz auf Karte | Toast, Herz rot, Gericht auf Favoriten-Seite | ✓ |
| Favoriten entfernen | X auf Kachel | Gericht verschwindet | ✓ |
| In Mittagsbox legen | Gelber CTA | Animation, Gericht in Mittagsbox | ✓ |
| Teilen (Discover) | Share-Icon | Web Share / Clipboard | ✓ |
| Teilen (Favoriten) | Share im Header | Web Share / Clipboard | ✓ |
| Teilen (Detail) | Share-Icon | Web Share / Clipboard | ✓ |
