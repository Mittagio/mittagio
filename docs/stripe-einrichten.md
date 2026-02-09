# Stripe einrichten (Mittagio)

Kurz-Anleitung, um echte Kartenzahlung im Checkout zu aktivieren.

---

## 1. Stripe-Keys besorgen

1. Öffne **[dashboard.stripe.com](https://dashboard.stripe.com)** und melde dich an.
2. Oben rechts: für Tests **„Test mode“** aktivieren (empfohlen zum Ausprobieren).
3. Gehe zu **Developers → API keys**.
4. Kopiere:
   - **Publishable key** (beginnt mit `pk_test_...` oder `pk_live_...`) → kommt ins **Frontend**.
   - **Secret key** („Reveal“, beginnt mit `sk_test_...` oder `sk_live_...`) → kommt **nur** ins Backend (Netlify).

---

## 2. Secret Key in Netlify eintragen (Backend)

1. Netlify: deine Site öffnen → **Site configuration** (oder **Site settings**) → **Environment variables**.
2. **Add a variable** / **Add environment variable**:
   - **Key:** `STRIPE_SECRET_KEY`
   - **Value:** dein Secret Key (z. B. `sk_test_51ABC...`).
3. Speichern. Danach einen neuen **Deploy** auslösen (z. B. **Trigger deploy** oder Push), damit die Function den Key nutzt.

---

## 3. Publishable Key in der App eintragen (Frontend)

1. Im Projekt die Datei **`app/index.html`** öffnen.
2. Ganz oben im `<script>`-Block findest du die Zeile:
   ```js
   const STRIPE_PUBLISHABLE_KEY = '';  // z.B. 'pk_test_51ABC...'
   ```
3. Den Publishable Key zwischen die Anführungszeichen setzen:
   ```js
   const STRIPE_PUBLISHABLE_KEY = 'pk_test_51ABC...';  // dein Key
   ```
4. Datei speichern und App neu deployen (oder lokal testen).

---

## 4. Testen

- **Lokal:** `netlify dev` (falls Netlify CLI installiert), dann Bestellung durchspielen → Checkout sollte zu Stripe weiterleiten.
- **Live (Netlify):** Nach Deploy eine Testbestellung ausführen. Testkarte im Test-Modus: `4242 4242 4242 4242`, beliebiges zukünftiges Datum, beliebige CVC.

Wenn **STRIPE_PUBLISHABLE_KEY** leer bleibt, läuft der Checkout im **Demo-Modus** (Dialog „Zahlung simulieren?“ ohne echte Stripe-Weiterleitung).

---

## Übersicht

| Key              | Wo eintragen        | Beispiel    |
|------------------|----------------------|-------------|
| Publishable key  | `app/index.html` → `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
| Secret key       | Netlify → Environment variables → `STRIPE_SECRET_KEY` | `sk_test_...` |

**Wichtig:** Den Secret Key niemals in den Frontend-Code oder in ein öffentliches Repo eintragen – nur in Netlify (oder anderem Backend) als Umgebungsvariable.
