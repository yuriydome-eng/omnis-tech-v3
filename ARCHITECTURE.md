# Architecture Technique : Omnis Tech (Headless Commerce v2.0)

## 1. Vue d'ensemble
L'architecture repose sur un modèle **Headless Commerce** découplé :
- **Frontend (La Vitrine)** : Next.js 16 (App Router), hébergé sur Vercel. Responsable de l'UX/UI "Web 3.0" et des performances.
- **Backend (Le Moteur)** : Shopify (SaaS). Responsable du catalogue, du checkout et de la gestion des commandes.
- **Automation (Le Sourcing)** : Scripts Node.js / n8n connectés à AutoDS (simulation) pour l'injection de produits.

## 2. Stack Technologique

### Frontend
- **Framework** : Next.js 16.1.6 (React 19)
- **Langage** : TypeScript 5.x
- **Styling** : Tailwind CSS v4 (Design System "Omnis Luxury")
- **State Management** : React Context / Hooks (Panier, Session)
- **Data Fetching** : Shopify Storefront API (GraphQL)

### Backend & Data
- **CMS / Commerce** : Shopify (Headless)
- **API Sourcing** : AutoDS (Mock/Simulation via `src/lib/autods.ts` - *à créer*)
- **Base de Données** : Prisma (pour les données additionnelles non gérées par Shopify, ex: wishlist avancée, pré-commandes custom)

### Qualité & Tests (The Nerd)
- **Unitaires** : Jest
- **E2E** : Playwright (à implémenter)
- **CI/CD** : GitHub Actions (Audit, Build, Test)

## 3. Flux de Données

### A. Parcours Client (Lecture)
1.  User visite `omnis.tech` --> Next.js Server Components.
2.  Next.js fetch --> Shopify Storefront API (Cached).
3.  Affichage du HTML statique/dynamique optimisé.

### B. Parcours Achat (Écriture)
1.  User "Add to Cart" --> Context React (Local) + Shopify Cart API.
2.  User "Checkout" --> Redirection vers Checkout Shopify (Hosted) pour la sécurité PCI-DSS.

### C. Parcours Automation (Sourcing)
1.  Détection produit (Sourcing Bot) --> Extraction Data.
2.  Validation (`debug-validator.ts`) --> Vérification Marge & Qualité.
3.  Publication --> Shopify Admin API (Write).

## 4. Structure du Projet
```
/src
  /app              # Next.js App Router (Pages)
  /components       # Composants React (UI System)
  /lib
    shopify.ts      # Client Shopify Storefront
    debug-validator # Logique de validation métier
  /__tests__        # Tests Unitaires (Jest)
```

## 5. Stratégie de Maintenance
- **The Nerd** : Gatekeeper. Aucun code ne passe en prod sans validation `npm run test` et `npm run lint`.
- **The Researcher** : Veille constante sur l'API Shopify (versioning trimestriel) et les updates Next.js.
