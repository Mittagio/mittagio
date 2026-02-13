# Provider Onboarding

View-IDs: `v-provider-onboarding-entry`, `v-provider-onboarding-first-dish`, `v-provider-onboarding-signup`, `v-provider-onboarding-business`, `v-provider-onboarding-preview` · Anbieterseite

---

## Konzept

Erster Einstieg für neue Anbieter: Erstes Gericht anlegen (Name, Preis, Kategorie, Abholzeiten, Beschreibung, Foto) → Konto erstellen (E-Mail, Passwort) oder „Ich habe schon ein Konto“ → Betrieb (Name, Adresse) → Vorschau → Dashboard. Wenn bereits eingeloggt: Nach Schritt 1 direkt zur Vorschau (Konto/Betrieb überspringen).

---

## Aufbau

1. **Entry:** Einstieg („Erstes Gericht anlegen“).
2. **First Dish:** Gerichtname, Preis (€), Kategorie (Fleisch/Veggie/Vegan), Abholzeiten (Von–Bis), Beschreibung (optional), Foto (Kamera/Galerie). Auto-Save bei jeder Eingabe.
3. **Signup:** E-Mail, Passwort; Buttons „Konto erstellen“, „Ich habe schon ein Konto“.
4. **Business:** Betriebsname, Stadt/Adresse.
5. **Preview:** Vorschau des Gerichts; „Weiter zum Dashboard“ speichert ins Kochbuch und wechselt zum Dashboard.

---

## Regeln

- Keine Inventur/Mengenangaben.
- Eingeloggt: Nach Schritt 1 (Gericht) direkt zur Vorschau; Speichern beim Klick „Weiter zum Dashboard“.
- Helles Layout; genug Abstand unten, damit Buttons nicht verdeckt werden.
