# Design palette — Droguerías Colsubsidio

Palette aligned with [Droguerías Colsubsidio](https://www.drogueriascolsubsidio.com/). Use this document in prompts when generating UI designs, illustrations, or marketing assets so outputs stay on-brand.

---

## Color tokens

| Token | Hex | RGB | Use in designs |
|-------|-----|-----|----------------|
| **Primary** | `#3C006B` | rgb(60, 0, 107) | Dark purple – nav bar, “Droguerías”, footer. |
| **Primary hover** | `#2D0052` | rgb(45, 0, 82) | Hover on primary. |
| **Primary foreground** | `#ffffff` | rgb(255, 255, 255) | Text on primary (white). |
| **Accent** | `#E0851A` | rgb(224, 133, 26) | Yellow/orange – “Colsubsidio” logo, 20% OFF, CTAs. |
| **Accent foreground** | `#ffffff` | rgb(255, 255, 255) | Text on accent. |
| **Promo bg** | `#87CEEB` | rgb(135, 206, 235) | Pastel blue-green – “Aprende a Pagar con la App…” banner. |
| **Promo foreground** | `#171717` | rgb(23, 23, 23) | Text on promo banner. |
| **Offer** | `#E0851A` | rgb(224, 133, 26) | Discount badges (“% Dto”), same as accent. |
| **Offer foreground** | `#ffffff` | rgb(255, 255, 255) | Text on offer badges. |
| **Secondary** | `#f5f5f5` | rgb(245, 245, 245) | Light backgrounds, cards. |
| **Secondary foreground** | `#333333` | rgb(51, 51, 51) | Text on secondary. |
| **Background** | `#ffffff` | rgb(255, 255, 255) | Page background. |
| **Foreground** | `#333333` | rgb(51, 51, 51) | Body text, headings. |
| **Muted** | `#f5f5f5` | rgb(245, 245, 245) | Subtle backgrounds. |
| **Muted foreground** | `#6b7280` | rgb(107, 114, 128) | Secondary text. |
| **Border** | `#e5e7eb` | rgb(229, 231, 235) | Dividers, borders. |
| **Footer bg** | `#3C006B` | rgb(60, 0, 107) | Same purple as nav. |
| **Footer foreground** | `#ffffff` | rgb(255, 255, 255) | Footer text and links. |
| **Footer muted** | `#e5e5e5` | rgb(229, 229, 229) | Footer secondary text. |

---

## Typography

| Use | Font | Weights |
|-----|------|--------|
| Body & UI | **Open Sans** (Google Fonts) | 400, 500, 600, 700 |

Same style as [Droguerías Colsubsidio](https://www.drogueriascolsubsidio.com/) product pages (VTEX / e-commerce). In prompts: use **Open Sans** for body and headings.

---

## Prompt snippet for AI design tools

Copy and paste this into prompts when asking for UI, illustrations, or marketing visuals:

```
Use this exact color palette (Droguerías Colsubsidio style):
- Primary: dark purple #3C006B (nav bar, “Droguerías”, footer)
- Primary hover: #2D0052
- White on purple: #ffffff
- Accent: yellow/orange #E0851A (“Colsubsidio” logo, 20% OFF, CTAs)
- Promo banner: pastel blue-green #87CEEB, text #171717 (“Aprende a Pagar con la App…”)
- Offer badges: #E0851A (same as accent)
- Page background: #ffffff
- Body text: #333333
- Secondary text: #6b7280
- Borders: #e5e7eb
- Footer: #3C006B, text #ffffff, muted #e5e5e5
Clean, professional, pharmacy e-commerce. Purple as main brand; orange for logo and offers. Use Open Sans.
```

---

## Tailwind classes (this project)

Use these in `farmfront` when building components:

| Purpose | Classes |
|---------|--------|
| Primary button | `bg-primary text-primary-foreground hover:bg-primary-hover` |
| Secondary surface | `bg-secondary text-secondary-foreground` |
| Muted surface | `bg-muted text-muted-foreground` |
| Accent / link CTA | `bg-accent text-accent-foreground` |
| Promo banner | `bg-promo-bg text-promo-foreground` |
| Offer/discount badge | `bg-offer text-offer-foreground` |
| Footer | `bg-footer-bg text-footer-foreground`, `text-footer-muted` |
| Page | `bg-background text-foreground` |
| Border | `border-border` |
| Focus ring | `ring-primary` or `focus-visible:ring-primary` |

---

## Dark mode (CSS variables)

In dark mode the following tokens change; use the same Tailwind names, they resolve automatically:

- `background` → `#0a0a0a`
- `foreground` → `#ededed`
- `secondary` → `#1a1a1a`
- `secondary-foreground` → `#e5e5e5`
- `muted` → `#262626`
- `muted-foreground` → `#a3a3a3`
- `border` → `#404040`
- `promo-bg` → `#2d4a5a`, `promo-foreground` → `#e5e5e5`
- `footer-bg` → `#2d0052`

Primary and accent unchanged in dark.
