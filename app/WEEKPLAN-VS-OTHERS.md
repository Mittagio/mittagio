# Wochenplan vs. andere Provider-Views – warum verrutscht der Screen?

## Wochenplan (funktioniert korrekt)

| Eigenschaft | Wochenplan |
|-------------|------------|
| **Höhe** | `height: 100vh` (fix) |
| **overflow** | `overflow: hidden` (mobile) / `overflow: visible` |
| **Scroll** | **innen** in `.week-list-scroll` (overflow-y: auto) |
| **main scrollt** | **Nein** – Inhalt bleibt in 100vh |
| **Header** | `.week-header-compact` – padding-top: calc(12px + safe-area) |

→ Inhalt bleibt in einer festen Viewport-Höhe, nur der innere Bereich scrollt. Kein Verrutschen, kein Overscroll auf main.

---

## Dashboard (verrutscht)

| Eigenschaft | Dashboard |
|-------------|-----------|
| **Höhe** | `min-height: 100vh` (kein max-height, wächst mit Inhalt) |
| **overflow** | `overflow: visible` |
| **Scroll** | **außen** auf `main` (overflow-y: auto) |
| **main scrollt** | **Ja** – gesamte Seite scrollt |
| **Header** | `.prov-header-inner` – padding-top: max(12px, safe-area) |

→ main scrollt, die View wächst mit dem Inhalt. Overscroll/Rubber-Band und Hintergrund (fixed) vs. Inhalt (scrollt) können Verrutschen verursachen.

---

## Abholungen / Kochbuch / Profil

| Eigenschaft | Abholungen, Kochbuch |
|-------------|----------------------|
| **Höhe** | `height: 100vh` (fix) |
| **overflow** | `overflow: hidden` |
| **Scroll** | **innen** im Content-Div |
| **main scrollt** | **Nein** |

→ Ähnlich wie Wochenplan. Mögliche Ursachen für Platz oben:
- `prov-page-header` hat padding: calc(10px + safe-area)
- Zusätzliches Padding durch Media Queries / andere Styles

---

## Empfohlene Änderung (Dashboard wie Wochenplan)

1. `#v-provider-home`: `height: 100vh`, `overflow: hidden`, `display: flex`, `flex-direction: column`
2. `.dashboard-floating-wrap`: `flex: 1`, `min-height: 0`, `overflow-y: auto` (Scroll innen statt auf main)
3. `body.provider-mode main`: `overflow: hidden` (kein Scroll auf main im Provider-Modus)

Damit verhält sich das Dashboard wie der Wochenplan: feste Höhe, inneres Scrollen, kein Verrutschen.
