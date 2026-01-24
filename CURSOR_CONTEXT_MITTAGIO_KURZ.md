# 📌 Mittagio – Cursor-Kurzreferenz (Stand 24.01.2026)

> **WICHTIG:** Bitte strikt nach der Cursor-Gesamtzusammenfassung Mittagio (Stand 24.01.2026) arbeiten.

## 🎯 Grundprinzip

**Vermittlungs- & Entdeckungsplattform** – kein Marktplatz, kein Checkout, kein Abo, keine Verträge mit Endkunden.

## 🔀 Trennung

**Endkunden:** öffentlich, ohne Login/Profil/Registrierung  
**Anbieter:** eigener Bereich `/anbieter/*`, eigene Navigation, eigene Rechtstexte  
❌ **Keine Vermischung**

## 👥 Endkunden

**Erlaubt:** Standort (Stadt/Region), session-basierte Anzeige  
**Nicht erlaubt:** Profil, Bestellungen, Warenkorb, Checkout, Abholcodes

**Screen "Mein Mittagio":**  
✅ Willkommenstext, "Angebote entdecken", "Kürzlich angesehen", "Als Anbieter starten"  
❌ Profil anlegen, Meine Bestellungen, Zur Mittagsbox

## 🏢 Anbieter

**Routing:** `/anbieter` → `/anbieter/dashboard`  
**Logo-Klick:** immer `/anbieter/dashboard`  
**Back:** ❌ kein `history.back()`, ✅ explizite Navigation, Fallback: `/anbieter/dashboard`

**Dashboard:** Kein Onboarding, zeigt nur Inserate/Abholung/Kochbuch + CTA "Inserat erstellen"

**Profil:** Nur Kontaktkarte wenn Daten vorhanden, Bearbeitung nur unter `/anbieter/profil/bearbeiten`

## ⚡ Dead-Click-Regel

**Jeder Button MUSS reagieren** (Navigation oder Toast) – ❌ kein Klick ohne Reaktion

## 📜 Rechtstexte

**Anbieter:** `/anbieter/recht/*` (Zurück → `/anbieter/hilfe`)  
**Endkunden:** `/datenschutz`, `/impressum`, `/agb`  
❌ Kein "Kurzfassung", ✅ professioneller Ton

## 🏆 Golden Rules

> Shop/Account-Feeling → **falsch**  
> Klick tut nichts → **nicht done**  
> Endkunde & Anbieter vermischt → **Bug**

## 📝 Verbindliche UI-Texte

**Endkunden-Dashboard:**
* Titel: "Dein Mittag in der Nähe"
* Willkommen: "Willkommen bei Mittagio 👋" + "Finde frische Mittagsangebote in deiner Nähe."
* Buttons: "Angebote entdecken", "Angebote ansehen", "Zum Anbieterbereich"
* Bereiche: "Kürzlich angesehen", "Als Anbieter starten"

**Anbieter-Dashboard:**
* Inserate, Abholung, Kochbuch
* Button: "Inserat erstellen"
* ❌ Kein Onboarding-Text

**Recht:**
* AGB, Impressum, Datenschutz (exakt so, keine "Kurzfassung")

**❌ Verboten:**
* Profil anlegen, Meine Bestellungen, Zur Mittagsbox, Bestellen, Abholcodes (für Endkunden)

---

*Vollständige Version: `CURSOR_CONTEXT_MITTAGIO.md`*
