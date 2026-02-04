# E-Mail-Template: „Dein Inserat ist live!“

## Zweck

Bestätigungs-E-Mail an den Anbieter, sobald ein Inserat veröffentlicht wurde. Kann vom Backend versendet oder als Vorschau in der App („E-Mail-Vorschau kopieren“) genutzt werden.

## Implementierung

- **JavaScript:** `getInseratLiveEmailTemplate(offer)` in `app/index.html`  
  Gibt `{ subject, body, offerUrl }` mit ersetzten Platzhaltern zurück.
- **UI:** Button „E-Mail-Vorschau kopieren“ im Inserat-Erfolgs-Sheet kopiert Betreff + Body in die Zwischenablage.

## Platzhalter

| Platzhalter    | Quelle                          |
|----------------|----------------------------------|
| `providerName`  | Anbietername / Profil           |
| `dishName`     | Gerichtsname des Inserats       |
| `day`          | Datum des Inserats (YYYY-MM-DD) |
| `offerUrl`     | Teilbarer Link zum Angebot      |

## Vorlage (Plain-Text)

**Betreff:**  
`Dein Inserat ist live! 🚀`

**Body:**  
```
Hallo {{providerName}},

dein Gericht „{{dishName}}“ ist ab sofort auf Mittagio sichtbar.

🔗 Link zum Angebot: {{offerUrl}}
📅 Datum: {{day}}

Viel Erfolg beim Verkaufen!

Dein Mittagio-Team
```

## Hinweis

Für echten E-Mail-Versand (z. B. nach `publishOffer`) muss ein Backend/Send-Service angebunden werden; die App stellt nur das Template und die Vorschau bereit.
