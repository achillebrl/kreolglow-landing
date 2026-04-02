# KRÉOL GLOW — Instructions Claude Code

## Contexte du projet
Boutique e-commerce de produits de beauté & accessoires capillaires low-ticket ciblant La Réunion (974).
Audience : femmes réunionnaises 18-45 ans, pouvoir d'achat limité, très actives sur Facebook/Instagram.
Modèle : stock local en 974, livraison J+1-2, ventes via lives Facebook + site.

## Nom de marque
**KRÉOL GLOW** — handle Instagram : @kreolglow ✅ disponible
Slogan : *"La beauté péï, livrée chez ou"*

## Identité visuelle

### Palette de couleurs
```
--color-primary:    #C8435A   /* rose hibiscus — couleur signature */
--color-secondary:  #2D6A4F   /* vert tropical profond */
--color-accent:     #F4A261   /* or chaud / coucher de soleil */
--color-bg:         #FFF8F3   /* crème chaud — fond principal */
--color-bg-dark:    #1C1C1C   /* quasi-noir pour sections contrastées */
--color-text:       #1A1A1A   /* texte principal */
--color-text-muted: #6B7280   /* texte secondaire */
```

### Typographie
- **Titres** : Playfair Display (serif élégant, Google Fonts)
- **Corps / UI** : Inter (sans-serif moderne, lisible)
- **Accent** : Dancing Script (script fluide, pour taglines uniquement)

### Style
- Minimaliste tropical — propre, aéré, chaleureux
- Références : Fenty Beauty (inclusive) + Aesop (typographie) + Glossier (ton conversationnel)
- Pas luxe, pas cheap — accessible et qualitatif

## Stack technique
- **Framework** : Next.js 14 App Router (TypeScript)
- **Style** : Tailwind CSS v3 + variables CSS custom
- **Paiement** : Stripe Checkout (NO Shopify — frais trop élevés DOM-TOM)
- **Formulaires** : React Hook Form + Zod validation
- **Animations** : Framer Motion (subtiles, max 300ms)
- **Hébergement** : Vercel (gratuit hobby tier)
- **Emails** : Resend (transactionnel) + Brevo (newsletters, gratuit 300/jour)
- **Base de données** : Supabase (gratuit) — liste d'attente + commandes

## Structure du projet

```
kreolglow/
├── CLAUDE.md              ← Ce fichier — contexte global
├── landing/               ← Phase 1 : landing teasing + waitlist (PRIORITÉ)
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/waitlist/route.ts
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── PacksSection.tsx
│   │   ├── WaitlistForm.tsx
│   │   ├── Countdown.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   └── resend.ts
│   ├── .env.local
│   ├── tailwind.config.ts
│   └── package.json
├── shop/                  ← Phase 2 : boutique Stripe complète
├── docs/
│   └── LOGO_PROMPTS.md
└── assets/
    ├── logo/
    └── mockups/
```

## Phase 1 — Landing Page (PRIORITÉ ABSOLUE)

### Stratégie
Montrer les 3 packs directement (pas de teasing pur).
Formulaire : prénom + WhatsApp + choix du pack → Supabase → email confirmation + code promo KREOL20.

### Sections de la landing (ordre scroll)
```
1. NAV        Logo Kréol Glow + lien Instagram @kreolglow
2. HERO       Titre fort + tagline créole + countdown + CTA scroll
3. PACKS      3 cartes — clic pré-sélectionne le pack dans le formulaire
4. WAITLIST   Formulaire (prénom, WhatsApp, email optionnel, pack choisi)
5. PROOF      Compteur d'inscrits + logos groupes FB beauté 974
6. FOOTER     @kreolglow + Facebook + email contact
```

### Les 3 packs
```typescript
export const PACKS = [
  {
    id: "nuit",
    name: "Kit Nuit Cheveux",
    emoji: "🌙",
    price: 12.90,
    priceDisplay: "12,90€",
    tag: "Le plus populaire",
    tagColor: "#C8435A",
    items: ["Bonnet satin double couche", "Brosse démêlante bouclés", "20 élastiques sans trace"],
    costPrice: 3.75,
  },
  {
    id: "glam",
    name: "Kit Glam Créole",
    emoji: "✨",
    price: 14.90,
    priceDisplay: "14,90€",
    tag: "Beauté & cheveux",
    tagColor: "#2D6A4F",
    items: ["Bonnet satin", "2 paires créoles dorées", "Chouchou satin", "10 élastiques"],
    costPrice: 4.45,
  },
  {
    id: "routine",
    name: "Kit Routine Complète",
    emoji: "💎",
    price: 22.90,
    priceDisplay: "22,90€",
    tag: "Meilleure valeur",
    tagColor: "#F4A261",
    items: ["Bonnet satin", "Brosse + Peigne démêlant", "2 paires créoles", "Chouchou satin", "20 élastiques"],
    costPrice: 7.64,
  },
] as const
```

### Schéma Supabase — table waitlist
```sql
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  first_name text not null,
  whatsapp text not null,
  email text,
  pack_interest text check (pack_interest in ('nuit', 'glam', 'routine')),
  promo_code text default 'KREOL20',
  source text default 'landing'
);
```

### Variables d'environnement (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_LAUNCH_DATE=2025-05-01T00:00:00
```

## Phase 2 — Boutique complète

### Pages
```
/               → Home avec featured packs
/shop           → Catalogue
/product/[slug] → Page produit
/cart           → Panier
/checkout       → Stripe Checkout Session
/success        → Confirmation + upsell
/about          → Histoire Kréol Glow
/contact        → WhatsApp direct + formulaire
```

### Stripe — Livraison 974 uniquement
```typescript
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  shipping_address_collection: { allowed_countries: ['RE'] },
  shipping_options: [{
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 390, currency: 'eur' },
      display_name: 'Livraison 974 (J+1-2)',
    },
  }],
  success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
})
```

## Règles de développement

### Mobile-first OBLIGATOIRE (80%+ trafic 974 = mobile)
```tsx
// Toujours mobile d'abord
className="text-sm md:text-base"
className="px-4 md:px-8"
className="grid grid-cols-1 md:grid-cols-3"
```

### Touch-friendly
- Boutons minimum h-12 (48px) sur mobile
- Inputs minimum h-12 avec text-base (évite le zoom iOS)

### Copy & ton
- Langue : français (pas de créole dans le code)
- Quelques mots créoles dans le UI copy : "péï", "ou" (vous/toi), "kréol"
- Ton : chaleureux, féminin, proche — comme une amie qui recommande
- CTA : "Je rejoins la liste !" / "Je veux ce pack !" / "M'inscrire avec -20%"

## Commandes de démarrage

```bash
cd kreolglow/landing
npx create-next-app@latest . --typescript --tailwind --app --no --import-alias "@/*"
npm install framer-motion react-hook-form zod @hookform/resolvers
npm install @supabase/supabase-js resend
npm run dev
```

## Instructions pour Claude Code

1. Lis ce fichier CLAUDE.md en entier en premier
2. La landing page (landing/) est la PRIORITÉ ABSOLUE — fais-la en premier
3. TypeScript strict, pas de `any`
4. Tailwind uniquement pour les styles
5. Teste toujours le rendu mobile (390px) en premier
6. Le WaitlistForm est le composant le plus critique — soigne l'UX
7. Après la landing : demander validation avant de passer à shop/
