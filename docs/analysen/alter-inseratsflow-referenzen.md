# Alter Inseratsflow – alle Referenzen im Projekt

Übersicht aller Stellen, die mit dem **alten Inseratsflow** (Formular „Erstes Gericht anlegen“ und ALT-5-Schritte-Onboarding) zu tun haben. Die InseratCard (buildListingStep) ist der einzige gewünschte Flow; diese Reste können bei einer Bereinigung entfernt oder angepasst werden.

---

## 1. App-Code (app/index.html)

### 1.1 View „Erstes Gericht anlegen“ (alter Flow)

| Zeilen   | Inhalt |
|----------|--------|
| **7085–7168** | Komplette `<section id="v-provider-onboarding-first-dish">`: Formular mit Gerichtname, Preis, Kategorie (Fleisch/Veggie/Vegan), Beschreibung, Abholzeiten Von/Bis, Foto (Kamera/Galerie), Buttons „Zurück“ / „Weiter“. |
| **10783**      | `views.providerOnboardingFirstDish: 'v-provider-onboarding-first-dish'` (Navigation/Views-Objekt). |

### 1.2 Funktion und Aufrufer von showOnboardingFirstDish

| Zeilen   | Inhalt |
|----------|--------|
| **19092–19112** | `function showOnboardingFirstDish(prefill)` – zeigt die View, füllt bei prefill aus `onboardingDraftDish` (onboardingDishName, PickupTimeStart/End, Foto). |
| **15702**       | Back-Navigation: von Signup zurück → `showOnboardingFirstDish(!!onboardingDraftDish)`. |
| **15706**       | Back-Navigation: wenn aktive View `v-provider-onboarding-first-dish` → `showOnboardingEntry(...)`. |
| **19083**       | Draft-Overlay auf Entry: „Weiter bearbeiten“ → `showOnboardingFirstDish(true)`. |
| **19704**       | Preview „Angaben bearbeiten“ → `showOnboardingFirstDish(true)`. |

### 1.3 Handler und Logik für das First-Dish-Formular

| Zeilen   | Inhalt |
|----------|--------|
| **19437–19450** | `btnOnboardingFirstDishBack`: Zurück → showOnboardingEntry, ggf. Confirm bei Änderungen. |
| **19453–19480** | `btnOnboardingFirstDishNext`: Validierung (Name, Preis, Zeit, Kategorie), Speichern in `onboardingDraftDish`, dann showOnboardingSignup() oder showOnboardingPreview(). |
| **19271–19295** | `btnOnboardingChooseProPhoto` / `btnOnboardingAddPhoto`: Foto wählen, in `onboardingDraftDish.photoData` speichern. |
| **19322–19324** | Weitere Foto-Zuweisung zu `onboardingDraftDish.photoData`. |
| **19490–19514** | Auto-Save/Cache für onboardingDishName, onboardingDishPrice, onboardingDishDesc, onboardingPickupTimeStart/End; Preis +/- Buttons. |
| **19519–19526** | Cache für dishDiet (Kategorie-Radios). |

### 1.4 onboardingDraftDish und LS.onboardingDraft

| Zeilen   | Inhalt |
|----------|--------|
| **19061**   | `let onboardingDraftDish = load(LS.onboardingDraft, null);` |
| **19068**   | Entry: Draft-Overlay anzeigen wenn `onboardingDraftDish` und Eintrag im Input. |
| **19085**   | „Verwerfen“ im Draft-Overlay → `onboardingDraftDish = null`, save(LS.onboardingDraft, null). |
| **19244–19247, 19291–19294, 19322–19324** | Foto speichern in onboardingDraftDish. |
| **19415–19417** | startOnboardingFromEntry (nicht eingeloggt): Wert in onboardingDraftDish.dishName speichern. |
| **19468–19477** | First-Dish „Weiter“: kompletten onboardingDraftDish (dishName, dishPrice, dishDiet, dishDesc, pickupTimeStart/End, photoData) setzen und speichern. |
| **19546–19572** | Signup „Konto erstellen“: aus onboardingDraftDish Kochbuch-Eintrag bauen, cookbook.push, dann onboardingDraftDish = null, Cache löschen. |
| **19617**   | Business: savedDish aus cookbook per onboardingDraftDish.dishName finden. |
| **19658–19682** | Signup „Später“: gleiche Kochbuch-Speicherung aus onboardingDraftDish, dann null + Cache löschen. |
| **19696–19702** | Preview „Angaben bearbeiten“: onboardingDraftDish aus savedDish wiederherstellen, save(LS.onboardingDraft). |

### 1.5 HTML-IDs nur in der First-Dish-View

Diese IDs existieren nur im alten Formular und in obigen Handlern:

- `onboardingDishName`, `onboardingDishPrice`, `onboardingDishPriceDisplay`, `onboardingDishPriceControl`, `btnOnboardingPriceMinus`, `btnOnboardingPricePlus`
- `onboardingDishDesc`
- `input[name="dishDiet"]` (Fleisch/Vegetarisch/Vegan)
- `onboardingPickupTimeStart`, `onboardingPickupTimeEnd`
- `btnOnboardingAddPhoto`, `btnOnboardingChooseProPhoto`, `onboardingPhotoPreview`, `onboardingPhotoPreviewImg`
- `btnOnboardingFirstDishBack`, `btnOnboardingFirstDishNext`

### 1.6 Preview / Dashboard – Nutzung von onboardingDraftDish

| Zeilen   | Inhalt |
|----------|--------|
| **19372–19384** | showOnboardingPreview: Vorschau-Karte aus savedDish oder onboardingDraftDish (dish, price, photoData, pickupWindow). |
| **19637–19670** | btnOnboardingPreviewDashboard: Beim „Zum Dashboard“ wird ggf. aus onboardingDraftDish ein Kochbuch-Eintrag erstellt, dann onboardingDraftDish = null. |

---

## 2. ALT-Onboarding (5 Schritte, statisches HTML)

Komplett **separater** alter Flow: Betriebsname → Adresse → Essenszeit → Logo → Zusammenfassung. Die Schritt-Buttons (btnOnboardingStep1Next usw.) sind **nirgends im JS gebunden** – dieser Flow ist tot, außer #btnOnboardingComplete (wurde bereits auf InseratCard umgebogen).

| Zeilen   | Inhalt |
|----------|--------|
| **3395**  | CSS `.onboarding-step` |
| **6924–7040** | `<section id="v-provider-onboarding">`: 5 Schritte (data-step 1–5), u. a. onboardingBusinessNameOld, onboardingAddress, onboardingPostalCode, onboardingCity, btnOnboardingLocationPin, onboardingMealStart/End, time-btn, onboardingLogoPreview, onboardingLogoInput, btnOnboardingLogoRemove, btnOnboardingStep1Next … Step4Next, btnOnboardingSkipLogo, onboarding-summary, **btnOnboardingComplete**, btnOnboardingEdit. |
| **7046**  | Button „Erstes Gericht erstellen“ (#btnOnboardingComplete) – Handler siehe unten. |
| **19707–19711** | Handler für #btnOnboardingComplete: startListingFlow({ entryPoint: 'dashboard' }) (bereits auf InseratCard umgestellt). |

Die anderen IDs (btnOnboardingStep1Next, btnOnboardingStep2Back, …) haben **keine** getElementById/onclick-Zuweisung im aktuellen Code.

---

## 3. Weitere Erwähnungen (Back, Entry, Signup)

| Zeilen   | Inhalt |
|----------|--------|
| **15690–15708** | popstate/Back: Wenn View id mit `v-provider-onboarding` beginnt, je nach View showOnboardingBusiness / showOnboardingSignup / **showOnboardingFirstDish** / showOnboardingEntry. |
| **18921** | showOnboardingEntry(!!load(LS.onboardingDraft, null)) – Aufruf von außen mit Draft-Flag. |

---

## 4. Dokumentation (docs)

| Datei | Inhalt |
|-------|--------|
| **docs/Layout-Zusammenfassung.md** | Zeilen 90–95: Onboarding Einstieg, Entry, **Onboarding Erstes Gericht** (v-provider-onboarding-first-dish), Signup, Betrieb, Vorschau. |
| **docs/seiten/Provider_Onboarding.md** | View-IDs inkl. v-provider-onboarding-first-dish. |
| **docs/_archive/seiten/README.md** | v-provider-onboarding-* erwähnt. |
| **docs/_archive/seiten/07_provider_onboarding.md** | Beschreibung: „Erstes Gericht anlegen (Name, Preis, …)“ → Konto → Betrieb → Vorschau. |
| **docs/_archive/GESAMTZUSAMMENFASSUNG_ALLE_SEITEN.md** | v-provider-onboarding-first-dish, „Erstes Gericht erstellen“. |
| **docs/_archive/ANBIETER-SEITEN-UEBERSICHT.md** | „Onboarding (alt)“ v-provider-onboarding, „Onboarding – Erstes Gericht“ v-provider-onboarding-first-dish mit Zweckbeschreibung. |

---

## 5. Zusammenfassung: Was „alter Inseratsflow“ ist

- **Kern:** Die View **v-provider-onboarding-first-dish** (Formular „Erstes Gericht anlegen“) mit allen zugehörigen IDs, `showOnboardingFirstDish`, `onboardingDraftDish` / `LS.onboardingDraft`, und die Handler für First-Dish-Buttons (Back, Weiter, Foto, Preis, Cache).
- **Zusätzlich:** Das **statische** 5-Schritte-Onboarding **v-provider-onboarding** (ohne funktionierende Schritt-Logik außer #btnOnboardingComplete, der schon auf InseratCard geht).
- **Abgrenzung:** Signup, Business, Preview und Entry sind **nicht** der alte Inseratsflow; sie gehören zum Onboarding-Pfad. Nur der **First-Dish-Formular-Schritt** ist der alte Inserat-Flow, der durch die InseratCard ersetzt wurde.

Wenn du den alten Inseratsflow „für immer löschen“ willst, müssen die Abschnitte unter **1.1, 1.2, 1.3, 1.4, 1.5, 1.6** und die Back-/Entry-Verweise auf showOnboardingFirstDish sowie die Nutzung von onboardingDraftDish für das First-Dish-Formular entfernt oder so umgebaut werden, dass nirgends mehr die First-Dish-View geöffnet wird und keine Leser/Schreiber von onboardingDraftDish für dieses Formular bleiben. Die ALT-Section **2** kann optional mit entfernt werden (oder nur die ungenutzten Schritt-Buttons und das zugehörige HTML lassen). Die Docs unter **4** können bei Bedarf angepasst werden, damit nur noch InseratCard/Onboarding-Entry/Signup/Business/Preview beschrieben werden.
