# Account verwalten (Ebene 2) – Masterplan „mit allem“

Zusammenfassung aller Vorgaben aus der Konversation: Mobile-Layout, Header, Sticky-Button, FOLGE UNS (SVG-Icons + Hype-Subtitles), optionale Performance-Themen.

---

## 1. Mobile-Layout-Fix (Account verwalten)

**Problem:** Auf dem Handy wirkt die Seite „komisch“ – Elemente ragen über den Rand oder brechen ungünstig um.

**Umsetzung:**

- **Breiten:** Keine festen Pixel-Breiten (`width: ...px`) bei Menü-Elementen. Stattdessen `width: 100%` oder `flex: 1`.
- **Container:** Haupt-Container seitliches Padding 16px oder 20px, damit die Liste nicht am Glasrand klebt.
- **Box-Sizing:** Global ist `box-sizing: border-box` bereits gesetzt (in `app/index.html`); bei neuen Elementen beibehalten.
- **Listen-Struktur:** Menüpunkte untereinander, volle verfügbare Breite. Keine `float` oder feste `position`, die das verhindern.
- **TGTG-Style:** `display: flex; justify-content: space-between; align-items: center;` – Icon links, Text mittig, Chevron (>) rechts, alles in einer Zeile.
- **Media Query (max-width: 600px):**  
  `.profile-container` bzw. relevante Wrapper: `width: 100% !important; padding: 0 20px; box-sizing: border-box;`
- **No Overflow:** `overflow-x: hidden` wo nötig; nichts darf horizontal über den Rand ragen.
- **Icons:** Auf dem Handy feste Größe beibehalten, Text daneben flexibel.

**Referenz:** `#v-provider-profile`, `.tgtg-list-wrap`, `.tgtg-row`, `#providerProfileSubSettings` in [app/index.html](app/index.html).

---

## 2. Header-Zentrierung (Mobile)

- **„Account verwalten“** (Ebene 2): Auf Mobile den Titel im Header zentrieren.
- **„Mein Profil“ (Ebene 1):** Logo/Überschrift in der mobilen Ansicht zentrieren.

**CSS-Vorschlag:**

```css
@media (max-width: 600px) {
  #v-provider-profile .provider-sub-header h1,
  .header-title {
    text-align: center;
    width: 100%;
  }
}
```

Back-Button bleibt links (absolute Position), Titel zentriert in der verfügbaren Breite.

---

## 3. Sticky-Bottom: Abmelden / Profil löschen

- **Position:** Button am unteren Bildschirmrand fixieren (`position: sticky; bottom: 0` oder `fixed`).
- **Optik:** Transparenter Hintergrund mit Blur: `backdrop-filter: blur(10px); background: rgba(249, 250, 251, 0.8);`
- **Rahmen:** `border-top: 1px solid #E5E7EB;`
- **Safe Area:** `padding-bottom: env(safe-area-inset-bottom);` damit der Button nicht mit dem Home-Indikator kollidiert.
- **Button-Design:** Dezentes Rot für „Abmelden“ / „Profil dauerhaft löschen“, z. B. `color: #EF4444; border: 1px solid #FCA5A5;` – nicht die volle Breite, optional `max-width: 400px; margin: 0 auto;`

**Referenz:** `#btnProviderDeleteAccount`, `.provider-footer-delete`, ggf. neuer Wrapper `.sticky-footer` in [app/index.html](app/index.html).

---

## 4. Sektion „FOLGE UNS“ (zwischen COMMUNITY und SUPPORT & HILFE)

### 4.1 Platzierung und Hierarchie

**Finale Reihenfolge Ebene 2:**

1. Profil-Header (Name & Ort)
2. **DEIN ACCOUNT** – Betriebsdaten, Inseratseinstellungen, Zahlungsmethoden, PDF-Archiv
3. **COMMUNITY** – Kollegen einladen
4. **FOLGE UNS** – mittagio.de, Instagram, WhatsApp Kanal (mit Hype-Subtitles)
5. **SUPPORT & HILFE** – Was ist was?, Hilfe bei einem Inserat
6. **RECHTLICHES** – AGB, Datenschutz, Impressum
7. Abmelden (Sticky-Bottom)

### 4.2 Inhalt der drei Zeilen

| Zeile    | Haupt-Label     | Subtitle                           | Link          |
|----------|----------------|-------------------------------------|---------------|
| Website  | mittagio.de    | Unsere Vision & Partner             | https://mittagio.de |
| Instagram| Instagram      | Werde Teil von 5.000+ Genießern     | z. B. https://instagram.com/mittagio |
| WhatsApp | WhatsApp Kanal | Exklusive Gastro-Tipps & News       | WhatsApp-Kanal-URL (Platzhalter) |

### 4.3 Design-Vorgaben

- **Flat-List:** Gleiche Optik wie `tgtg-row` (Inset-Dividers, Padding 14px 16px, min-height für zwei Zeilen ggf. 60px).
- **Icons:** SVG 20×20px, Farbe **#22C55E** (Mittagio-Grün).
- **Subtitle:** 12px, Farbe **#6B7280**, direkt unter dem Haupt-Label (`display: block; margin-top: 2px`).
- **Links:** `<a href="..." target="_blank" rel="noopener noreferrer">` – öffnen in neuem Tab / externer App.

### 4.4 SVG-Icons (minimalistisch, stroke-basiert)

**Website (Globe):**

```html
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 018.716 6.747M12 3a9.004 9.004 0 00-8.716 6.747" />
</svg>
```

**Instagram:**

```html
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <rect width="16" height="16" x="4" y="4" rx="4" />
  <circle cx="12" cy="12" r="3" />
  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
</svg>
```

**WhatsApp (Chat-Bubble):**

```html
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
</svg>
```

Jeweils in einem Container:  
`<span class="tgtg-row-icon tgtg-row-icon--green">` mit `width:20px; height:20px; color:#22C55E;` (SVG mit `stroke="currentColor"`).

### 4.5 HTML-Struktur pro Zeile

- Sektions-Header: `<p class="tgtg-section-title">FOLGE UNS</p>`
- Liste: `<div class="tgtg-list">` mit drei `<a class="tgtg-row" href="..." target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit; display:flex; align-items:center; box-sizing:border-box;">`
  - Icon: `<span class="tgtg-row-icon tgtg-row-icon--green">` + inline SVG
  - Label: `<span class="tgtg-label">` mit `<span class="tgtg-label-main">...</span>` und `<span class="tgtg-label-sub">...</span>`
  - Chevron: `<i data-lucide="chevron-right" class="tgtg-chevron"></i>`

### 4.6 CSS (in #v-provider-profile)

```css
#v-provider-profile .tgtg-row-icon { width:20px; height:20px; flex-shrink:0; display:inline-flex; align-items:center; justify-content:center; }
#v-provider-profile .tgtg-row-icon svg { width:20px; height:20px; }
#v-provider-profile .tgtg-row-icon--green { color:#22C55E; }
#v-provider-profile .tgtg-label-sub { display:block; margin-top:2px; font-size:12px; font-weight:600; color:#6B7280; }
```

**Datei:** Nur [app/index.html](app/index.html) – HTML-Block nach COMMUNITY einfügen, CSS im `#v-provider-profile`-Block ergänzen.

---

## 5. Performance & Instant-Load (Ebene 1 – optional / später)

Für „Mein Profil“ (Ebene 1, 7-Screen-Slider, Fokus-Kacheln):

- **Skeleton-Screens:** Während Daten laden, graue pulsierende Platzhalter in Form der Kacheln anzeigen (verhindert Layout-Springen).
- **Image-Lazy-Loading:** Bilder im Slider erst beim Wischen laden; erstes/aktuelles Bild mit Priorität.
- **Caching:** Profil-Daten (Name, Logo, Status) lokal speichern, damit beim Öffnen sofort angezeigt werden.
- **Optimized Assets:** Icons als SVG oder Icon-Font, um HTTP-Requests zu reduzieren.

---

## 6. Kurz-Checkliste Umsetzung

- [ ] Mobile: Keine festen Breiten, Container-Padding 16–20px, Flex-Layout für Menüzeilen, no overflow.
- [ ] Media Query (max-width: 600px): Container full-width, Header-Titel zentriert.
- [ ] Sticky-Bottom: Abmelden/Profil-löschen mit backdrop-blur und safe-area-inset-bottom.
- [ ] FOLGE UNS: Neue Sektion zwischen COMMUNITY und SUPPORT & HILFE.
- [ ] FOLGE UNS: Drei Zeilen mit SVG-Icons (20×20, #22C55E), Hype-Subtitles (12px, #6B7280), Chevron, Links target="_blank".
- [ ] (Optional) Ebene 1: Skeleton, Lazy-Loading, Caching.

---

*Stand: Zusammenfassung aus Nutzer- und Gemini-Vorgaben für Cursor. Alle Änderungen ausschließlich in [app/index.html](app/index.html), Bereich Anbieter-Profil / Account verwalten.*
