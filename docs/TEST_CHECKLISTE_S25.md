# Test-Checkliste: Inseratsflow S25 (Content-Navigation)

Nach dem Umbau: **Navigation nur im Content**, kein unterer Button-Balken.

---

## Vor dem Test

1. App starten (z. B. `npx serve app -p 3333` oder Netlify/Live-Server).
2. Im Browser öffnen: `http://localhost:3333` bzw. deine App-URL.
3. **Als Anbieter einloggen** (oder Demo-Anbieter nutzen), damit Provider-Wizard und Inseratsflow erreichbar sind.

---

## 1. Provider-Wizard (Betrieb anlegen)

**Starten:** Anbieter-Bereich → „Profil“ / „Betrieb anlegen“ oder ersten Login → Wizard startet.

| Schritt | Prüfen |
|--------|--------|
| **Schritt 0** (Wie heißt dein Betrieb?) | Siehst du **nur im Content** die Buttons „Abbrechen“ und „Weiter“? Kein fester Balken unten. |
| Klick „Weiter“ | Geht zu Schritt 1 (Adresse)? Leichte Vibration (falls Gerät unterstützt)? |
| **Schritt 1** (Adresse) | Buttons „Abbrechen“, „Zurück“, „Weiter“ **im Content**? |
| „Zurück“ | Zurück zu Schritt 0? |
| „Weiter“ bis **Schritt 4** (Profil ist bereit) | Buttons „Zurück“ und „Erstes Gericht erstellen“ im Content? |
| „Erstes Gericht erstellen“ | Wizard schließt und Listing-Wizard (Inserat) öffnet? |

**Fazit:** Kein Footer mit Zurück/Weiter; alles in der weißen Content-Box.

---

## 2. Listing-Wizard (Inserat / Gericht erstellen)

**Starten:** Aus Provider-Dashboard „Gericht erstellen“ / „Inserat“ oder nach „Erstes Gericht erstellen“.

| Prüfen |
|--------|
| Oben rechts im **Foto-Bereich** ein **X** (Frosted-Glass)? Das ist der einzige Schließen-Button (neben Klick auf Backdrop). |
| **Kein** fester Balken unten mit „Zurück“ oder „Weiter“. |
| Unter dem Foto eine **eine** Leiste mit Pills: 🍴 Vor Ort, 🔄 Mehrweg, 🕒 Zeit, 🌾 Allergene, ➕ Extras? |
| Beim Tippen in „Was kochst du heute?“ erscheinen nach kurzer Verzögerung (ca. 300 ms) passende **Bildvorschläge** (bis zu 3)? |
| Bei der **Umsatzprognose** (unter dem Preis): ⓘ anklickbar → Tooltip mit „Abholnummer: 0,89 € …“ und „4,99 € ohne Abholnummer“? |
| **X** klicken → Wizard schließt ohne Fehler? |

**Fazit:** Schließen nur über X oder Backdrop; keine Footer-Buttons.

---

## 3. Cookbook-Wizard (Gericht ins Kochbuch)

**Starten:** Anbieter → Kochbuch → „Gericht hinzufügen“ (oder ähnlich).

| Schritt | Prüfen |
|--------|--------|
| **Schritt 0** (Kategorie) | „Abbrechen“ und „Weiter“ **im Content**? |
| Durchklicken bis **Schritt 7** (Speichern?) | In jedem Schritt „Abbrechen“, „Zurück“, „Weiter“ (bzw. „Im Kochbuch speichern“) **nur im Content**? |
| „Im Kochbuch speichern“ | Wizard schließt, Cookbook-Ansicht erscheint, ggf. „Gespeichert“-Hinweis? |

**Fazit:** Kein unterer Navigationsbalken.

---

## 4. Week-Wizard (Zum Wochenplan hinzufügen)

**Starten:** Aus Kochbuch „Zum Wochenplan“ oder aus Wochenplan „Gericht hinzufügen“ → Tag wählen.

| Prüfen |
|--------|
| Eine Seite mit Tag-Auswahl (Heute, Morgen, …)? |
| Buttons **„Abbrechen“** und **„Zum Wochenplan hinzufügen“** **im Content**? |
| Kein fester Balken unten. |
| „Zum Wochenplan hinzufügen“ → Wizard schließt, Wochenplan/Home wird angezeigt? |

---

## Kurz-Check (alle Flows)

- [ ] **Nirgends** ein fester Button-Balken unten im Wizard (keine .w-actions sichtbar).
- [ ] **Überall** Abbrechen / Zurück / Weiter / Fertig **in der scrollbaren Content-Fläche**.
- [ ] **Listing:** Schließen nur über **X** oben rechts im Foto oder Klick auf den dunklen Backdrop.
- [ ] **Haptik:** Bei Klicks auf die Nav-Buttons ggf. kurze Vibration (abhängig vom Gerät).

Wenn alle Punkte passen, ist der S25-Umbau im Verhalten bestätigt.
