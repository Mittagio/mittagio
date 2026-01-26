# Cursor Prompt Library für Mittagio

Diese Datei enthält wiederverwendbare Master-Prompts für die Entwicklung von Mittagio.

---

## 🎨 Premium Card-Design Prompt

```
Passe das Design der Restaurant-Karten in der renderDiscover-Funktion (oder dort, wo die Liste generiert wird) an. Ich möchte ein horizontales Layout.

Anforderungen:

Nutze die neue CSS-Klasse .dish-card für den Container.

Links: Ein quadratisches Bild des Gerichts (.dish-image-box).

Rechts: Oben der Name des Gerichts (links) und der Preis (rechts).

Darunter: Der Name des Anbieters (Restaurant).

Ganz unten: Links die Entfernung als Label, rechts daneben die Buttons für 'Teilen' und 'Favorit' (Herz).

Nutze Lucide-Icons für Entfernung, Teilen und Herz.

Implementiere das beigefügte CSS in den Stylesheet-Bereich.
```

---

## 📱 Tinder-Swipe Funktionalität

```
Implementiere eine Tinder-Swipe-Funktionalität für die Discover-Seite:

1. View-Toggle: Liste / Swipe (Buttons oben)
2. Swipe-Stack mit gestapelten Cards (z-index, scale, translateY)
3. Touch-Gesten: touchstart, touchmove, touchend
4. Desktop-Unterstützung: mousedown, mousemove, mouseup
5. Haptic Feedback: navigator.vibrate(50) bei Swipe
6. Overlays: "Bäh" (links) und "Gut" (rechts) während Swipe
7. Match Modal: Bei Rechts-Swipe "Heute essen oder für später planen?"
8. showNextSwipeCard(): Nächste Karte anzeigen, z-index aktualisieren
```

---

## ⏱️ Mittagspausen-Timer

```
Implementiere einen Mittagspausen-Timer:

1. Gehzeit-Berechnung: calculateWalkingTime(distanceKm) - 5 km/h Durchschnitt
2. Format: formatWalkingTime(minutes) - "Noch X Min zu Fuß"
3. Integration in normalizeOffer(): walkingTimeText hinzufügen
4. Anzeige in Cards: Gelbes Badge mit navigation-Icon
5. Priorität: Gehzeit vor Distanz anzeigen
```

---

## 👥 Social-Proof

```
Implementiere Social-Proof für Gerichte:

1. getTodayOrderCount(offerId): Zählt Bestellungen heute (status: 'PAID')
2. Integration in normalizeOffer(): todayOrderCount hinzufügen
3. Anzeige: "Heute schon Xx bestellt" Badge (gelb, users-Icon)
4. Nur anzeigen wenn todayOrderCount > 0
```

---

## 🎁 Invite-Feature

```
Implementiere ein Invite-Feature:

1. generateInviteLink(offer): Erstellt Text "Ich hole mir heute [Gericht] bei [Metzger] – kommst du mit?"
2. shareInviteLink(offer): Nutzt navigator.share() oder Clipboard-API
3. Button in Cards: user-plus Icon
4. Integration in Share-Button: Option "Als Einladung teilen?"
```

---

## 💀 Skeleton-Screens

```
Implementiere Skeleton-Screens für besseres Loading-Erlebnis:

1. CSS: .skeleton-card mit pulse-Animation
2. Skeleton-Struktur: Image + Content (title, provider, price)
3. In renderDiscover(): Zeige 3 Skeleton-Cards beim ersten Laden
4. In renderSwipeCards(): Zeige 2 Skeleton-Cards
5. Nach 300ms: Echte Cards rendern
```

---

## 📸 Foto-KI Integration

```
Implementiere Foto-KI für Anbieter:

1. analyzeFoodPhoto(imageDataUrl): Mock GPT-4o Vision API
   - Simuliert API-Call mit 2s Delay
   - Gibt zurück: name, price, ingredients, calories
2. tagAllergensFromIngredients(ingredients): Rule-based Allergen-Detection
   - Keywords → Allergen-Codes (A-N)
3. openPhotoEditor(): 
   - Startet AI-Analyse im Hintergrund
   - Bei "Akzeptieren": Auto-fill dish, price, allergens
   - Toast mit AI-Zusammenfassung
```

---

## 🏪 Anbieter Dashboard Features

```
Implementiere für das Metzger-Dashboard:

1. QR-Scanner: html5-qrcode Library integrieren
2. Bestands-Sync: Realtime-Updates (Supabase/Firebase)
3. Umsatz-Widget: Diagramm der meistverkauften Gerichte
4. Zeit-Spar-Tracker: Animiert von 0h 0min auf tatsächlichen Wert
```

---

## 🎯 Onboarding Optimierung

```
Optimiere das Anbieter-Onboarding:

1. Hero-Video: Echtes Video statt Platzhalter (Metzger an Theke)
2. 3-Punkt-Erklärung: Icons für "Schnell", "Einfach", "Sicher"
3. Direkter Start: btnOnboardingEntryStart → showOnboardingFirstDish(false)
4. Nach Preview: btnOnboardingPreviewDashboard → showProviderCookbook()
5. Zeit-Tracker Animation: animateTimeTracker() beim ersten Laden
```

---

## 🔧 Code-Qualität Standards

```
Bei allen Änderungen beachten:

1. Immer in C:\Projekte\mittagio arbeiten (NICHT OneDrive)
2. Lucide Icons verwenden: <i data-lucide="icon-name"></i>
3. Nach Rendering: lucide.createIcons() aufrufen
4. Toast statt Alert: showToast('Nachricht')
5. Event-Handler: event.stopPropagation() bei Buttons
6. CSS: var(--brand) für Gelb, var(--border) für Rahmen
7. Responsive: Mobile-first, min-height: 44px für Buttons
```

---

## 📝 Commit-Messages

```
Verwende diese Commit-Message-Struktur:

Feat: [Feature-Name] - [Kurze Beschreibung]
Fix: [Problem] - [Lösung]
Refactor: [Bereich] - [Verbesserung]

Beispiele:
- Feat: Premium horizontales Card-Design implementiert - App-Store-Qualität
- Fix: Swipe-Ansicht und Button-Styling korrigiert
- Feat: Mittagspausen-Timer, Social-Proof, Invite-Feature und Skeleton-Screens
```

---

## 🚀 Quick-Commands

```
Häufig verwendete Befehle:

1. "committen" → Git add + commit mit sinnvoller Message
2. "gepusht" → Bestätigung, dass gepusht wurde
3. "checken [Feature]" → Prüfe ob Feature korrekt implementiert ist
4. "alles" → Implementiere alle offenen Features/Tickets
```

---

**Hinweis:** Diese Prompts können direkt in den Cursor Composer kopiert werden (Strg + I).
