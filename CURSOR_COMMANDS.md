# 🎯 Mittagio - Cursor Commands & Prompts

**Stand:** 26.01.2026  
**Zweck:** Zentrale Sammlung aller wichtigen Cursor-Befehle und Prompts für das Mittagio-Projekt

---

## 📋 Inhaltsverzeichnis

1. [Technische Basis & System-Prompts](#i-technische-basis--system-prompts)
2. [Tinder-Swipe Logik (Entscheidungshilfe)](#ii-die-tinder-swipe-logik-entscheidungshilfe)
3. [Metzger-Dashboard (Anbieter-Seite)](#iii-das-metzger-dashboard-anbieter-seite)
4. [Foto-KI (Herzstück für Metzger)](#iv-die-foto-ki-das-herzstück-für-die-metzger)
5. [User Experience & "Meins"-Bereich](#v-user-experience--meins-bereich)
6. [Micro-Interactions & Design](#vi-micro-interactions--design)
7. [Business-Logik & Marketing](#vii-business-logik--marketing)
8. [Wartung & Netzwerk](#viii-wartung--netzwerk)
9. [Onboarding & First-Time-User](#ix-onboarding--first-time-user)
10. [Logo & Branding](#x-logo--branding)

---

## I. Technische Basis & System-Prompts

### Framework-Setup
```
Nutze Next.js 14, Tailwind CSS und Lucide-Icons für die gesamte App.
```
**Status:** ⚠️ **Hinweis:** Aktuell ist die App eine SPA in `app/index.html`. Migration zu Next.js wäre ein größeres Refactoring.

### Dark/Light Mode
```
Implementiere ein automatisches Switching, aber priorisiere den 'Light Mode' mit warmen Mittagio-Farben.
```

### Performance-Regel
```
Nutze für alle Bilder das Next.js Image-Tag zur Optimierung der Ladezeiten bei mobilem Netz.
```
**Alternative für SPA:** Nutze `<img loading="lazy">` und `srcset` für responsive Bilder.

---

## II. Die "Tinder-Swipe" Logik (Entscheidungshilfe)

### Karten-Stack
```
Baue eine SwipeCard-Komponente. Karten müssen nach links/rechts wischbar sein.
Links = "Bäh: kein Lust auf [Gericht] heute"
Rechts = "Gut: Das möchte ich!"
```

### Haptik
```
Füge bei jedem Swipe eine kurze Vibration (Haptic Feedback) hinzu.
```

### Quick-Action
```
Wenn eine Karte rechts landet, öffne direkt ein Overlay mit der Frage: 'Heute essen oder für später planen?'
```

### Auschlussverfahren (USP)
```
Implementiere ein Tinder-ähnliches Swipe-System für die Endkundenansicht:
- Links wischen = "Kein Lust auf [Gericht] heute" (Ausschluss)
- Rechts wischen = "Gut, das möchte ich!" (Interesse)
Dies ist ein USP für Mittagio - Auschlussverfahren statt endloser Liste.
```

---

## III. Das Metzger-Dashboard (Anbieter-Seite)

### Ein-Hand-Check-in (USP)
```
Implementiere den Ein-Hand-Check-in: Große Abholnummern-Kacheln im Dashboard, Tap-to-Complete ohne Scanner.
Der Metzger tippt einfach auf die Abholnummer (z.B. "A1") und markiert sie als abgeholt.
Kein QR-Scanner, kein Warten - das ist unser USP.
```

### Bestands-Sync
```
Wenn ein Gericht auf 'Ausverkauft' gesetzt wird, sende eine Realtime-Update (Supabase/Firebase) an alle Nutzer-Clients.
```

### Umsatz-Widget
```
Zeige ein kleines Diagramm der meistverkauften Gerichte der letzten 7 Tage.
```

---

## IV. Die Foto-KI (Das Herzstück für die Metzger)

### Vision-Prompt
```
Sende das Foto an GPT-4o mit dem Auftrag: 'Extrahiere Name, Preis, Hauptzutaten und schätze die Kalorien.'
```

### Auto-Tagging
```
Vergleiche die Zutaten automatisch mit der Liste der 14 Hauptallergene (A-N) und setze die entsprechenden Badges.
```

### Image-Enhancement
```
Bearbeite das hochgeladene Foto automatisch (Helligkeit/Kontrast), damit es appetitlicher aussieht.
```

### Food-Foto KI für Anbieter
```
Viele Anbieter können keine geilen Food-Fotos machen. 
Implementiere eine KI-Funktion, die aus normalen Fotos appetitliche Food-Fotos erstellt.
```

---

## V. User Experience & "Meins"-Bereich

### Routing-Fix
```
Verhindere das Neuladen beim Tab-Wechsel (Single Page Application Flow).
```

### Ticket-Generierung
```
Erstelle aus jeder Bestellung ein SVG-Ticket mit QR-Code und dem Text 'Dein Ticket für [Restaurant]'.
```

### Favoriten-Logik
```
Speichere markierte Restaurants lokal (LocalStorage), damit sie auch ohne Login sofort wieder da sind.
```

---

## VI. Micro-Interactions & Design

### Animations-Dauer
```
Alle Übergänge zwischen den Ansichten sollen exakt 200ms dauern (Easy-in-out).
```

### Skeleton-Screens
```
Zeige beim Laden der Liste graue Platzhalter an, damit das Layout nicht springt.
```

### Fettfinger-Prinzip
```
Abstände zwischen klickbaren Elementen mindestens 12px.
```

### App-Feeling
```
Mache die Startseite appliker - optimiere für mobile Nutzung, schnelle Ladezeiten und native App-Feeling.
```

---

## VII. Business-Logik & Marketing

### Mittagspausen-Timer
```
Berechne die Gehzeit vom aktuellen Standort zum Metzger und zeige: 'Noch 5 Min zu Fuß'.
```

### Social-Proof
```
Blende bei beliebten Gerichten ein: 'Heute schon 12x bestellt'.
```

### Invite-Feature
```
Generiere einen Link: 'Ich hole mir heute [Gericht] bei [Metzger] – kommst du mit?'
```

---

## VIII. Wartung & Netzwerk

### Offline-Storage
```
Speichere die heutige Speisekarte im Cache, damit sie auch bei Funklöchern sichtbar bleibt.
```

### Retry-Logik
```
Wenn der Upload fehlschlägt, versuche es automatisch alle 30 Sekunden erneut.
```

### Modell-Umschalter
```
Stelle bei langsamer Verbindung automatisch auf das Haiku-Modell um, um Token-Kosten und Zeit zu sparen.
```

### Netzwerkprobleme
```
Implementiere eine robuste Fehlerbehandlung für Netzwerkprobleme mit automatischen Retries und Offline-Modus.
```

---

## IX. Onboarding & First-Time-User

### "Instant-Aha" Onboarding
```
Maximiere den 'Aha-Effekt' im Onboarding (Visual Storytelling):

1. Hero-Video-Loop:
   Integriere auf dem ersten Onboarding-Screen einen lautlosen Video-Loop im Hintergrund, 
   der den Tap-Prozess (Kunde zeigt Nummer -> Metzger tippt auf Tablet) zeigt.

2. Die 3-Punkte-Erklärung:
   Nutze große, grafische Icons statt langer Texte:
   - Punkt 1: 'Tages-Angebot live schalten' (Icon: Leuchtreklame/Schild)
   - Punkt 2: 'Abholung per Fingertipp' (Icon: Hand tippt auf Nummer)
   - Punkt 3: 'Zeit gewinnen & Umsatz steigern' (Icon: Stoppuhr & Geldscheine)

3. Direkt-Start:
   Der Button am Ende des Onboardings muss lauten: 'Jetzt meine Küche eröffnen'.
   Führe den Anbieter danach sofort in das 'Kochbuch', damit er direkt sein erstes Gericht sehen kann.

4. Branding & Vertrauen:
   Zeige unter dem Registrierungs-Feld: 'Kein Abo. Keine Grundgebühr. In 2 Minuten online.'

5. UI-Animation:
   Wenn er das erste Mal im Dashboard landet, lass den 'Zeit-Spar-Tracker' kurz animieren 
   (auf 0 hochzählen), um die Funktion spielerisch einzuführen.
```

### Onboarding-Video
```
Erstelle ein KI-Video von der Szene: Deutscher Metzger an einer Ausgabe-Essenstheke, 
zeigt dem Kunden die Nummer auf dem Tablet, Kunde tippt darauf.
```

---

## X. Logo & Branding

### Logo-Anforderung
```
Erstelle ein richtiges geiles, modernes und einfaches Logo für Mittagio.
Das Logo sollte:
- Modern und zeitgemäß sein
- Einfach und klar erkennbar sein
- Die Mittagio-Brand-Identität widerspiegeln
- Gut auf mobilen Geräten funktionieren
```

---

## XI. Cursor-Einstellungen & Workflow

### Auto-Allow Edits
```
Konfiguriere Cursor so, dass alle Edits automatisch erlaubt werden ohne meine Freigabe.
```
**Hinweis:** Dies ist eine Cursor-Einstellung, die in den Settings geändert werden kann.

### Code-Installation
```
Wenn Cursor unten rechts "Install Code" anzeigt, bedeutet das, dass Code-Erweiterungen oder 
Abhängigkeiten installiert werden müssen. Erlaube dies automatisch.
```

### Befehle speichern
```
Nutze diese Datei (CURSOR_COMMANDS.md) als zentrale Referenz für alle wichtigen Befehle.
Verwende @CURSOR_COMMANDS.md in Cursor, um alle Befehle auf einmal zu laden.
```

---

## 📌 Wichtige Hinweise

### MVP vs. Zukünftige Features
- ⚠️ **Aktuell:** Die App ist eine SPA in `app/index.html`
- 🔮 **Zukunft:** Migration zu Next.js wäre möglich, aber größeres Refactoring
- ✅ **Sofort umsetzbar:** Alle UI/UX-Befehle, Swipe-Logik, Onboarding

### Priorisierung
1. **Hoch:** Tinder-Swipe für Endkunden (USP), Onboarding, Foto-KI
2. **Mittel:** QR-Scanner, Bestands-Sync, Offline-Storage
3. **Niedrig:** Next.js Migration, erweiterte Analytics

### Verwendung in Cursor
```
Nutze diese Datei mit: @CURSOR_COMMANDS.md
Oder spezifische Abschnitte: @CURSOR_COMMANDS.md#ii-die-tinder-swipe-logik
```

---

## 🔗 Verwandte Dateien

- `CURSOR_CONTEXT_MITTAGIO.md` - Vollständige Projektzusammenfassung
- `CURSOR_UI_TEXTE.md` - Verbindliche UI-Texte
- `.cursorrules` - Projekt-Regeln für Cursor
- `CURSOR_CONTEXT_MITTAGIO_KURZ.md` - Kurzfassung

---

**Letzte Aktualisierung:** 26.01.2026
