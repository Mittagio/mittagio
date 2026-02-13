# Mittagio – Seiten-Audit (Logik, Aufbau, Applike / Silicon Valley)

**Stand:** Februar 2026  
**Ziel:** Jede Seite auf klare Logik, konsistenten Aufbau und „applike“ Qualität prüfen.

---

## Kunden-Bereich

### 1. Entdecken (v-discover)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Filter (Standort, Tag, Kategorie), Liste/Karte-Umschaltung, Klick → Gericht-Detail (Pin-Drawer). |
| **Aufbau** | ✅ | Sticky Header (Standort, Logo, Suche), Pills, dann Karten. Klare Hierarchie. |
| **Applike** | ✅ | Empty State mit Bild + „Hunger? Momentan keine Angebote…“ + Standort ändern. Moderne Karten. |
| **Rückweg** | ✅ | Immer über Tab-Bar (4 Tabs). |

---

### 2. Favoriten (v-fav)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Gerichte in Box + Lieblings-Betriebe, Tag-Pills, Empty → „Jetzt entdecken“. |
| **Aufbau** | ✅ | Header „Deine Favoriten ⚡“, Teaser „Gerichte in deiner Box“ / „Lieblings-Betriebe“. |
| **Applike** | ✅ | Empty State mit Herz-Icon, CTA. Konsistent mit Discover. |
| **Rückweg** | ✅ | Tab „Favoriten“; kein Dead End. |

---

### 3. Mittagsbox / Warenkorb (v-cart)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Aktive Abholnummern (wenn vorhanden) + Warenkorb-Items, Verzehrart (Vor Ort/Mitnehmen), CTA „Abholnummer sichern“. |
| **Aufbau** | ✅ | Header „Mittagsbox heute ⚡“, Karten für Abholnummern + Box-Inhalt, dann Button. |
| **Applike** | ✅ | Leere Box: „Deine Box ist noch leer. Such dir was Leckeres aus.“ – klar, kein weißer Schirm. |
| **Rückweg** | ✅ | Zurück über Tab oder Checkout-Back → Cart. |

**Begriffe:** Nav = „Mittagsbox“, Cart = „Mittagsbox heute“ – einheitlich ✅

---

### 4. Aktive Abholnummern / Bestellungen (v-orders)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Liste aktiver Abholnummern, Filter, Klick → Abholnummer anzeigen. |
| **Aufbau** | ⚠️ | Nutzt noch **.panel** (alte Optik), kein cust-header-sticky wie bei Fav/Cart. Wirkt wie „alte“ Webseite. |
| **Applike** | ⚠️ | Sollte gleiche Sprache wie v-fav/v-cart: Sticky Header, Karten, gleiche Abstände. |
| **Rückweg** | ✅ | Erreichbar nur über Profil → „Alle Bestellungen anzeigen“ → Zurück geht zu Profil. |

**Empfehlung:** v-orders an Design von v-fav/v-cart angleichen (Header + Card-Liste).

---

### 5. Checkout (v-checkout)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Zusammenfassung, Verzehrart, Abholzeit, Name, E-Mail, Zahlung. Klarer Linear-Flow. |
| **Aufbau** | ✅ | Back-Button links, Titel „Zahlung“, dann Blöcke. Panel mit Backdrop. |
| **Applike** | ✅ | Ein Seite, keine Ablenkung. Guest-Checkout-Hinweis dezent. |
| **Rückweg** | ✅ | „Zurück“ → Warenkorb. |

---

### 6. Zahlung erfolgreich (v-order-success)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Abholnummer anzeigen, optional „Kollegen bescheid geben“, „Erledigt“ → zurück ins App. |
| **Aufbau** | ✅ | Zentriert, große Nummer, klare Reihenfolge. |
| **Applike** | ✅ | Klarer Success-Screen, ein CTA. |
| **Rückweg** | ✅ | „Erledigt“ → Discover. |

---

### 7. Profil „Meins“ (v-profile)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Abholnummern, Bestellungen, Food-Profil, Favoriten, Gut zu wissen, PWA-Tipp, Anbieter-Portal, Rechtliches. |
| **Aufbau** | ✅ | Header „Meins“, dann Karten/Collapse. Klar getrennt. |
| **Applike** | ✅ | PWA-Hinweis ausblendbar, Anbieter-Portal klar, keine Schiefertafel. |
| **Rückweg** | ✅ | Tab „Meins“; Rechtliches → „Zurück“ (goBackFromLegalPage). |

---

### 8. Öffentlicher Wochenplan (#/plan/[id])
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Read-Only, Snapshot aus localStorage, Fallback „nicht verfügbar“. |
| **Aufbau** | ✅ | Header mit Logo/Name, Karten mit Bild + 3 Säulen + Preis. |
| **Applike** | ✅ | „← Zur App“ klar. Keine Gebühren-Logik für Kunden. |
| **Rückweg** | ✅ | Link „Zur App“ → Discover. |

---

## Anbieter-Bereich

### 9. Anbieter-Login (v-provider-login)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | E-Mail/Passwort, Einloggen, Zurück → Kunde. |
| **Aufbau** | ✅ | Panel, wenige Felder. |
| **Applike** | ⚠️ | **Demo-Hinweis** sichtbar: „Demo: beliebige E-Mail/Passwort -> du bist drin. (Später: Firebase Auth.)“ – für Live optional ausblenden oder unter „Hilfe?“ legen. |
| **Rückweg** | ✅ | „Zurück“ → Profil (Kunde). |

---

### 10. Dashboard „Küche“ (v-provider-home)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | KPIs, Tagesessen, Wochenplan-Vorschau, Deep-Link „Zum Wochenplan“, Quick-Action „Weiteres Gericht planen“. |
| **Aufbau** | ✅ | Klare Blöcke, einheitliche Karten. |
| **Applike** | ✅ | Applike-Vorschau, eine Scroll-Zone, FAB. |
| **Rückweg** | ✅ | Tab „Küche“; andere Tabs immer sichtbar. |

---

### 11. Abholungen (v-provider-pickups)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Liste Abholungen/Abholnummern für Anbieter. |
| **Aufbau** | ✅ | Header, Liste. |
| **Applike** | ✅ | Konsistent mit Rest. |
| **Rückweg** | ✅ | Tab + ggf. „Zurück“-Zeile. |

---

### 12. Wochenplan (v-provider-week)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Tag-Pills, Status ONLINE/ENTWURF, Karten mit Swipe (Löschen/Kopieren), Drag-Sortierung, Teilen, Drucken, Refresh. |
| **Aufbau** | ✅ | Header + Untertitel, eine Scroll-Zone (#weekList), Thumb-Zone fix. |
| **Applike** | ✅ | Applike umgesetzt (Deep-Link, eine Scroll-Zone, Untertitel). |
| **Rückweg** | ✅ | Tab „Wochenplan“. |

---

### 13. Kochbuch (v-provider-cookbook)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Suche, Sortierung, Gerichte/Entwürfe, Tap → Action-Sheet (Bearbeiten, In Wochenplan, Löschen). |
| **Aufbau** | ✅ | Header, Suche, Tabs, Grid. |
| **Applike** | ✅ | Klar, große Touch-Ziele. |
| **Rückweg** | ✅ | Tab „Kochbuch“. |

---

### 14. Anbieter-Profil „Meins“ (v-provider-profile)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Betrieb, Menü (Daten, Präferenzen, Zahlung, FAQ), Sub-Views mit Zurück. |
| **Aufbau** | ✅ | Header, Karte mit Logo, dann Menüzeilen. |
| **Applike** | ✅ | Einheitliche Rows, Zurück-Button in Sub-Views. |
| **Rückweg** | ✅ | Tab „Meins“; aus Sub-View → Zurück. |

---

### 15. Abrechnung (v-provider-billing)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Guthaben, Umsätze, Abrechnungen. |
| **Aufbau** | ✅ | Header, Zurück-Button, Inhalt. |
| **Applike** | ✅ | Helles Layout wie Rest. |
| **Rückweg** | ✅ | „Zurück“ → Profil. |

---

### 16. Anbieter-Detail (öffentlich) (v-provider-detail-public)
| Kriterium | Status | Anmerkung |
|-----------|--------|-----------|
| **Logik** | ✅ | Kunde sieht Anbieter-Info, Tagesessen, Wochenplan. |
| **Aufbau** | ✅ | Header mit Name, Karten. |
| **Applike** | ✅ | Clean. |
| **Rückweg** | ✅ | Zurück → Discover. |

---

## Rechtliche Seiten

| Seite | Logik | Aufbau | Applike | Rückweg |
|-------|--------|--------|---------|---------|
| Impressum (Kunde/Anbieter) | ✅ | Text, klar | ✅ | goBackFromLegalPage() |
| AGB (Kunde/Anbieter) | ✅ | Text | ✅ | Zurück |
| Datenschutz | ✅ | Text | ✅ | Zurück |
| FAQ | ✅ | Accordion | ✅ | Zurück |
| Support | ✅ | Formular/Info | ✅ | Zurück |
| Version | ✅ | Kurzinfo | ✅ | Zurück |

**Hinweis:** goBackFromLegalPage() muss die richtige Herkunft (Kunde vs. Anbieter) berücksichtigen – prüfen ob gespeichert.

---

## Zusammenfassung: Was fehlt für „100 % Applike“?

1. **v-orders (Aktive Abholnummern)**  
   Optik an v-fav/v-cart angleichen: Sticky Header, Karten-Liste, gleiche Abstände. Kein nacktes .panel.

2. **Provider-Login**  
   Demo-Hinweis für Live optional ausblenden oder in „Hilfe?“ verschieben (damit keine Verwirrung für echte Nutzer).

3. **Begriffe**  
   Durchgängig „Mittagsbox“ (Nav + Cart) – bereits konsistent. „Abholbox“ nur in v-orders Copy – optional auf „Mittagsbox“ oder „Abholnummern“ vereinheitlichen.

4. **Rechtliche Zurück-Navigation**  
   Sicherstellen, dass goBackFromLegalPage() aus Kunden- und Anbieter-Kontext korrekt zurückführt (Profil vs. Anbieter-Profil).

---

## Umgesetzte Anpassungen (Februar 2026)

1. **v-orders**  
   Sticky Header („Aktive Abholnummern“ + Untertitel „Deine Bestellungen im Überblick“), gleiche Abstände wie v-fav/v-cart, Filter als Pills, Empty State mit Icon + „Zur Mittagsbox“-CTA. `renderOrders()` blendet Empty-State bzw. Liste korrekt ein/aus.

2. **Provider-Login (Seite + Modal)**  
   Demo-Hinweis als ausklappbares **„Hilfe? Demo-Zugang“** („Details“-Element), damit die Oberfläche applike wirkt und der Hinweis nur bei Bedarf sichtbar ist.

---

*Alle übrigen Seiten: Logik und Aufbau stimmig, keine Dead Ends, klare CTAs und Rückwege. Für Silicon-Valley-/Applike-Stand sind die genannten Anpassungen umgesetzt.*
