# Profil (Kunde) – "Meins"

View-ID: `v-profile` · Kundenseite

---

## Konzept

Kunden-Profil: Einstellungen, Favoriten/Anbieter verwalten, Rechtliches, Anbieter-Einstieg. Klare Trennung zwischen Kunden-Informationen und Anbieter-Login. Clean, modern, **keine Schiefertafel-Optik**, keine grafischen Overlays.

---

## Aufbau (von oben nach unten)

### 1. Header-Card (Identität)
- Avatar/Name (optional), dynamisch befüllt.
- Kein Slate-Board, kein Schiefertafel-Icon, keine grafischen Overlays.

### 2. Quick-History (Aktive Abholnummern)
- **ID:** `profileTicketsSection` (nur sichtbar bei aktiven Bestellungen).
- Titel: „Meine heutigen Abholnummern“.
- Liste: `profileActiveTicketsList` (dynamisch).
- **Abholnummer-Logik:** Die grüne Ansicht „Bitte direkt beim Personal vorzeigen“ (Abholnummer-Fullscreen) ist ein **temporäres Element** bei aktiven Bestellungen. Sie darf die Profil-Einstellungen nicht blockieren und erscheint nur bei Bedarf (z. B. nach Klick auf eine Abholnummer).

### 3. Mein Geschmack (Präferenzen – zweite Reihe)
- **ID:** `profileTasteSection`.
- **Platzierung:** Unter der Profil-Anmeldung / unter den aktiven Abholnummern; kompakt in der „zweiten Reihe“.
- Inhalt:
  - Ernährungs-Präferenzen (Vegan, Vegetarisch, Glutenfrei, Laktosefrei) als Toggle-Switches.
  - Hinweis: „Diese Einstellungen filtern automatisch deinen ‚Entdecken‘-Feed …“
- **Dynamisch:** `profileDietSwitches`.

### 4. Mehrweg-Fokus (🔄)
- Mehrweg-Option (falls als eigene Sektion vorhanden) **tiefer im Profil** platzieren, nicht oben.
- **Hinweistext unbedingt erhalten:** „Wir arbeiten stetig daran, weitere Partner für unser Mehrweg-System zu gewinnen. Aktuell führen noch nicht alle Anbieter Mehrweg-Optionen; es werden dir weiterhin alle verfügbaren Angebote angezeigt.“

### 5. Footer (Rechtliches & Anbieter-Einstieg)
Siehe [18_rechtliches.md](18_rechtliches.md) und [KONZEPTE_PROFIL_UND_FOOTER.md](../KONZEPTE_PROFIL_UND_FOOTER.md).

- **Kunden-Rechtliches (oben):** FAQ | Datenschutz | Impressum | AGB (nur Kunden-Links).
- **Anbieter-Bereich (Mitte, grau):** Text „Dein Mittagessen anbieten – einfach und digital.“ + Button „Jetzt als Anbieter einloggen“. **Keine** Links zu Anbieter-FAQ, Anbieter-Impressum, Anbieter-AGB im öffentlichen Bereich.
- **Branding & System (unten):** „www.Mittagio.de made with Love by mittagio.de · Strategie & Besteck“ (zentriert); „v1.0.x“ (rechtsbündig, Link zur Versionsseite).

---

## Terminologie (FAQs & App)

- **Einheitlich:** Überall ausschließlich der Begriff **Abholnummer** verwenden.
- **Nicht verwenden:** „Ticket“, „Code“ (außer technisch, z. B. „Abholnummer anzeigen“).
- Alle FAQs und Hinweistexte auf der Profil- und Rechtliche-Seiten prüfen und ggf. anpassen.

---

## Regeln

- Layout: Kundenseite beibehalten; keine Vermischung mit Anbieter-UI.
- **Keine Schiefertafeln**, kein Slate-Board, keine grafischen Overlays auf der Profilseite.
- Präferenzen und Mehrweg in kompakter zweiter Reihe; Abholnummer-Ansicht nur temporär bei aktiven Bestellungen.
- Footer: strikte Trennung Kunden-Rechtliches vs. Anbieter-Einstieg; Anbieter-Dokumente nur im geschützten Anbieter-Bereich nach Login.
