# Konzepte: Profil „Meins“ & Footer (Segment 2 & 3)

**Stand:** Dokumentation der umgesetzten Konzepte für Profilseite („Meins“) und Footer.

---

## 1. Profilseite „Meins“ (Segment 2)

### 1.1 Slate-Board / grafische Overlays entfernen
- **Kein** Schiefertafel-Icon, **keine** grafischen Overlays auf der Profilseite.
- Header-Card und alle Sektionen: clean, ohne Slate-Board-Optik.

### 1.2 Präferenzen (Mein Geschmack)
- Sektion **„Mein Geschmack“** erscheint **unter** der Profil-Anmeldung / unter den aktiven Abholnummern.
- Optionen in einer **kompakteren „zweiten Reihe“** (nicht oben dominant).
- Inhalt: Ernährungs-Präferenzen (Vegan, Vegetarisch, Glutenfrei, Laktosefrei) als Toggle-Switches; Hinweistext zum Entdecken-Feed.

### 1.3 Mehrweg-Fokus (🔄)
- Mehrweg-Option **tiefer im Profil** platzieren (nicht oben).
- **Hinweistext unverändert:** „Wir arbeiten stetig daran, weitere Partner für unser Mehrweg-System zu gewinnen. Aktuell führen noch nicht alle Anbieter Mehrweg-Optionen; es werden dir weiterhin alle verfügbaren Angebote angezeigt.“

### 1.4 Abholnummer-Logik
- Die **grüne Ansicht** „Bitte direkt beim Personal vorzeigen“ (Abholnummer-Fullscreen) ist ein **temporäres Element** bei aktiven Bestellungen.
- Sie **darf die Profil-Einstellungen nicht blockieren** und erscheint nur bei Bedarf (z. B. nach Klick auf eine Abholnummer in „Meine heutigen Abholnummern“).

### 1.5 Terminologie (FAQs & App)
- **Einheitlich:** Überall ausschließlich der Begriff **Abholnummer** verwenden.
- **Nicht verwenden:** „Ticket“ oder „Code“ (außer in technischem Kontext wie „Abholnummer anzeigen“).
- Alle FAQs und Texte in Rechtlichen-/Profil-Bereichen auf Abholnummer-Begriff prüfen und anpassen.

---

## 2. Footer (Segment 3)

### 2.1 Strikte Trennung Kunde vs. Anbieter
- **Kunden-Rechtliches** ist öffentlich (Profil-Footer).
- **Anbieter-Dokumente** (Anbieter-FAQ, Anbieter-Impressum, Anbieter-AGB) sind **nur im geschützten Anbieter-Bereich** nach Login zugänglich – **nicht** im öffentlichen Footer verlinkt.

### 2.2 Struktur des Footers (von oben nach unten)

#### A) Kunden-Rechtliches (Oben)
- **Eine Zeile Links:** FAQ | Datenschutz | Impressum | AGB
- Alle Links führen zu den Kunden-Views (v-legal-faq, v-legal-datenschutz, v-legal-impressum, v-legal-agb-kurz).

#### B) Anbieter-Bereich (Mitte – optisch abgesetzt)
- **Leicht grauer Hintergrund** (z. B. #e8e8e8).
- **Text:** „Dein Mittagessen anbieten – einfach und digital.“
- **Button:** „Jetzt als Anbieter einloggen“
- **Keine** weiteren Links (kein Anbieter-FAQ, kein Anbieter-Impressum, keine Anbieter-AGB) in diesem öffentlichen Bereich.

#### C) Branding & System (Ganz unten)
- **Zentriert:** „www.Mittagio.de made with Love by mittagio.de · Strategie & Besteck“
- **Rechtsbündig, klein:** „v1.0.x“ als Link zur Versionsseite (#/version).

### 2.3 Impressum (Kunden)
- **Inhalt fest:** Mike Quach, Langäcker 2, 73635 Rudersberg (und Kontakt/Hinweise wie in v-legal-impressum).

### 2.4 Versionsseite
- **View-ID:** v-version
- **Route:** #/version
- **Inhalt:** Aktuelle App-Version (z. B. v1.0.0), optional Changelog; Zurück-Button.

### 2.5 Cleanup
- **Entfernt / nicht mehr vorhanden:** Sektion „Support & Vertrauen“, gemischte Link-Listen, die nicht der neuen Struktur entsprechen.
- **Keine** Anbieter-FAQ-, Anbieter-Impressum- oder Anbieter-AGB-Links im öffentlichen Footer.

---

## 3. Referenzen

- **Profil (Kunde):** [docs/seiten/04_profil_kunde.md](seiten/04_profil_kunde.md)
- **Rechtliche Seiten & Footer:** [docs/seiten/18_rechtliches.md](seiten/18_rechtliches.md)
- **Gesamtübersicht:** [docs/GESAMTZUSAMMENFASSUNG_ALLE_SEITEN.md](GESAMTZUSAMMENFASSUNG_ALLE_SEITEN.md)
