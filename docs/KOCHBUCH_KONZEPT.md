# Kochbuch – finales Konzept (MASTER-SPEC)

**Referenz:** `MagazinKochbuch.tsx` (Provider Magazin-Kochbuch).  
**Umsetzung:** Vanilla-SPA in `app/index.html` – View `#v-provider-cookbook`.

---

## 1. Design & Layout

- **Stil:** Minimalist High-End (Apple-Style).
- **Hintergrund:** `#F5F5F7`.
- **Navigation:** Nur Kategorie-Pills (horizontal scrollbar), keine Suche, kein Sort-Dropdown.
- **Kein** Bestseller-Strip, keine Listen-/Grid-Ansicht, keine Tabs „Meine Gerichte“ / „Entwürfe“.

---

## 2. Aufbau der View

### 2.1 Header

- **Titel:** „Mein Kochbuch“ (ohne Untertitel).
- **Pills:** Direkt unter dem Titel, horizontal scrollbar.
  - Kategorien: **Alle | Fleisch | Eintopf | Snack | Vegetarisch** (`COOKBOOK_CATEGORIES`).
  - Aktive Pill: Hintergrund `#007AFF`, Text weiß.
  - Inaktiv: Weiß, Text `#86868B`, Rand dezent.

### 2.2 Inhalt: Magazin (eine Karte)

- **Eine Karte** wird zentriert angezeigt („Horizontal Flip“-Idee).
- **Karten-Layout:**
  - Bild oben (ca. 55 % Höhe), `object-fit: cover`.
  - Darunter: Gerichtsname (fett), blaue Trennlinie (`#007AFF`), Zeile „Datum • Preis“ (z. B. „12. Feb • 14,50 €“).
  - Unten: Pill **„GESAMTUMSATZ: X €“** (`#007AFF` / `#F5F5F7`-Hintergrund).
- **Navigation zwischen Gerichten:** Bei mehreren Einträgen Pfeile ‹ › (vorheriges / nächstes). Aktuell sichtbare Karte = aktueller Eintrag für die Bottom-Bar.
- **Keine** vertikale Liste, **kein** Bestseller-Strip.

### 2.3 Bottom Action Bar

- **Immer dieselbe Bar** (kein Wechsel zwischen „Suche/Neues Gericht/Sortieren“ und „Bearbeiten/Wochenplan/Auswählen“).
- **Drei Buttons:**  
  **BEARBEITEN** | **WOCHENPLAN** | **AUSWÄHLEN**
- **AUSWÄHLEN** = primär (z. B. `#007AFF`), öffnet das Sheet „Jetzt live schalten“ (Datum, 4,99 €).
- **BEARBEITEN** = Bearbeiten der aktuellen Magazin-Karte (Wizard/Profilkarte).
- **WOCHENPLAN** = Wochenplan-Sheet für die aktuelle Karte.
- Bar nur sichtbar, wenn mindestens ein Gericht angezeigt wird (sonst ausgeblendet).
- **Kein** FAB, **kein** Button „Neues Gericht“ in der Bar.

### 2.4 Empty State

- Wenn **keine Gerichte** im Kochbuch:
  - Icon (z. B. 📖).
  - Überschrift: **„Dein Erfolgstagebuch ist noch leer.“**
  - Text: „Inseriere dein erstes Gericht und wir füllen dein Kochbuch automatisch mit Bestsellern.“
  - Ein Button: **„JETZT ERSTES GERICHT INSERIEREN“** (z. B. `#007AFF`) → öffnet Inseratsflow / neues Gericht.
- Wenn **Kategorie gefiltert** und keine Treffer: Hinweis „In dieser Kategorie sind noch keine Gerichte.“ (keine Bar).

---

## 3. Technik (Vanilla)

- **Konstanten:** `COOKBOOK_CATEGORIES = ['Alle','Fleisch','Eintopf','Snack','Vegetarisch']`.
- **Filter:** „Fleisch“ = Einträge mit `category` „Fleisch“ oder „Mit Fleisch“; sonst exakte Übereinstimmung.
- **Status:** `cookbookMagazineIndex` = Index in der gefilterten Liste; `selectedCookbookId` = ID der aktuell angezeigten Karte (für Bar-Aktionen).
- **Keine** Suche (`cookbookQuery`), **kein** Sort-Dropdown in der Kochbuch-UI.

---

## 4. Was nicht zum Konzept gehört (entfernt)

- Suchfeld und Sort-Auswahl im Kochbuch-Header.
- Untertitel „Deine Umsatz-Könige“.
- Bestseller-Strip / horizontale Streifen-Karten.
- Vertikale Listen- oder Grid-Ansicht im Kochbuch.
- Action-Bar mit „Suche | Neues Gericht | Sortieren“.
- Zwei Modi (Default-Bar vs. Auswahl-Bar).
- FAB auf der Kochbuch-View (FAB nur auf dem Dashboard).
- Kategorien „Vegetarisch, Vegan, Fisch, Mit Fleisch“ als Kochbuch-Pills (ersetzt durch Alle, Fleisch, Eintopf, Snack, Vegetarisch).

---

## 5. Referenz-Implementierung

- **React:** `src/components/Provider/MagazinKochbuch.tsx`.
- **Vanilla:** `app/index.html` – Section `#v-provider-cookbook`, `renderCookbook()`, `wireCookbookActionBar()`, `updateCookbookActionBar()`.

Dieses Dokument ist die verbindliche Spezifikation für alle zukünftigen Anpassungen am Kochbuch.
