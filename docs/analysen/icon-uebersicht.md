# Icon-Übersicht: Einheitliche Festlegung

Übersicht aller Icons für **Essen / Mittag / Mittagsbox / Abholung** und verwandte Konzepte in der App (Kunden- und Anbieterseite), damit ihr euch auf **ein Icon pro Konzept** einigen könnt.

---

## 1. Mittagsbox / Warenkorb / „In die Mittagsbox“

| Konzept | Wo | Aktuell | Typ |
|--------|----|---------|-----|
| Tab „Mittagsbox“ (Bottom-Nav Kunde) | `#customerNav` | `shopping-basket` (Lucide) | Lucide |
| Header „Mittagsbox heute“ | Cart-View | `shopping-basket` (Lucide) | Lucide |
| Button „In die Mittagsbox“ (mit grauer Box) | Karten-Actions, Favoriten | `iconMarkup('shopping-basket')` | Custom SVG (Basket) |
| Button „In die Mittagsbox“ (gelber CTA) | Discovery-Karten, Favoriten | 🛍️ (Emoji) | Emoji |
| Toast „In der Box!“ | Nach Hinzufügen | 🥗 (Emoji) | Emoji |

**Inkonsistenz:** Zwei Darstellungen für denselben Button: **Lucide/SVG shopping-basket** vs **Emoji 🛍️**. Einigung: entweder überall `shopping-basket` (Lucide/iconMarkup) oder überall 🛍️.

---

## 2. Entdecken / Discovery

| Konzept | Wo | Aktuell | Typ |
|--------|----|---------|-----|
| Tab „Entdecken“ (Bottom-Nav Kunde) | `#customerNav` | `compass` (Lucide) | Lucide |

Einheitlich Lucide `compass`. Kein Wechsel nötig.

---

## 3. Favoriten / Lieblinge

| Konzept | Wo | Aktuell | Typ |
|--------|----|---------|-----|
| Tab „Favoriten“ (Bottom-Nav Kunde) | `#customerNav` | `heart` (Lucide) | Lucide |
| Profil „Meine Lieblinge“ | Profile-Sheet | `heart` (Lucide) | Lucide |
| Swipe/Detail „Will ich“ | Buttons | `heart` (Lucide) | Lucide |

Einheitlich Lucide `heart`. Kein Wechsel nötig.

---

## 4. Drei Säulen: Vor Ort · Abholnummer · Mehrweg

| Konzept | Wo | Aktuell | Typ |
|--------|----|---------|-----|
| Vor Ort (essen) | Karten, Checkout, Einstellungen, Legende, Wochenplan | 🍴 | Emoji |
| Abholnummer | Karten, Checkout, Success, Einstellungen, TGTG PDF-Archiv, Legende | 🧾 | Emoji |
| Mehrweg | Karten, Checkout, Einstellungen, Legende | 🔄 | Emoji |
| Abholzeit / Zeitfenster | Legende, Checkout „Andere Zeit“, Success | 🕒 | Emoji |

Überall in der App sind die **3 Säulen und Zeit** als **Emoji** (🍴 🧾 🔄 🕒) umgesetzt. Eine Umstellung auf Lucide wäre ein größerer Eingriff (u. a. Design-System, `.cursorrules`). Einigung: **entweder Emoji beibehalten** oder **einmalig auf Lucide-Äquivalente** (z. B. `utensils`, `receipt`, `refresh-cw`, `clock`) wechseln.

---

## 5. Essen / Food / Küche (konzeptionell)

| Konzept | Wo | Aktuell | Typ |
|--------|----|---------|-----|
| „Mein Food-Profil“ (Kunde) | Profile-Sheet | `utensils` (Lucide) | Lucide |
| Tab „Küche“ (Anbieter Bottom-Nav) | `#providerNav` | `utensils-crossed` (data-icon) | Custom SVG |
| Provider Hero / Fokus-Karten | Profil | 🍴 🧾 | Emoji |
| Kategorien (Eintopf, Fleisch, Salat, Snack) | Filter Pills, Gerichte | 🍲 🥩 🥗 🥪 | Emoji |

**Inkonsistenz:** „Food/Küche“ mal **Lucide** (`utensils`, `utensils-crossed`), mal **Emoji** 🍴. Einigung: ein Icon für „Essen/Küche“ (z. B. nur `utensils` oder nur 🍴).

---

## 6. Abholungen / Belege / Receipt

| Konzept | Wo | Aktuell | Typ |
|--------|----|---------|-----|
| Tab „Abholungen“ (Anbieter Bottom-Nav) | `#providerNav` | `receipt` (data-icon) | Custom SVG (Receipt) |
| Abrechnung / Rechnungsarchiv | Provider | `receipt` (Lucide), `credit-card` (Lucide) | Lucide |
| TGTG „PDF-Archiv & Belege“ | Account verwalten | 🧾 (Emoji) | Emoji |
| Kunde: leere Mittagsbox / Kontext | Cart | `receipt` (Lucide) | Lucide |

**Inkonsistenz:** Abholungen/Belege mal **Lucide** `receipt`, mal **Emoji** 🧾. Einigung: entweder überall `receipt` (Lucide) oder 🧾 für „Abholnummer/Beleg“ reservieren und `receipt` nur für Abrechnung/Archiv.

---

## 7. Weitere Konzepte (kurz)

| Konzept | Wo | Aktuell | Typ |
|--------|----|---------|-----|
| Standort / Ort | Discovery, Route | `map-pin` (Lucide), teils 📍 | Lucide + Emoji |
| Teilen | Buttons, Favoriten | `share-2` (Lucide) | Lucide |
| Zurück | diverse | `chevron-left` (Lucide) | Lucide |
| Zahlung | Checkout, TGTG | `credit-card` (Lucide), 💳 (TGTG) | Lucide + Emoji |
| Account verwalten (TGTG) | Listen | 🏠 ⚙️ 💳 🧾 🤝 ❓ 🛠️ 📄 🛡️ ⚖️ | durchweg Emoji |

---

## Empfehlung für Einigung

1. **Mittagsbox / „In die Mittagsbox“:** Ein Icon: entweder **überall** `shopping-basket` (Lucide/iconMarkup) **oder** überall 🛍️. Aktuell gemischt (🛍️ vs shopping-basket).
2. **3 Säulen (Vor Ort, Abholnummer, Mehrweg):** Entweder **Emoji beibehalten** (🍴 🧾 🔄) wie in den Cursor-Regeln oder **einmalig auf Lucide** umstellen.
3. **Food/Küche:** Ein Icon: z. B. **Lucide** `utensils` (oder `utensils-crossed`) für alle „Essen/Küche“-Stellen; dann 🍴 nur noch dort nutzen, wo ausdrücklich „Vor Ort“ gemeint ist.
4. **Abholungen/Belege:** Ein Icon: z. B. **Lucide** `receipt` für Tab und Abrechnung; 🧾 nur für die **Abholnummer** (3-Säulen-Konzept) verwenden.

Sobald ihr euch pro Zeile auf **ein** Icon geeinigt habt, kann die Umsetzung (Ersetzen in `app/index.html` und ggf. in `iconMarkup`) schrittweise erfolgen.
