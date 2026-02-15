# OMNIS TECH - PRODUCT REQUIREMENT DOCUMENT (V3.0)

## 1. VISION & IDENTITÉ
* **Concept :** Luxury Tech & Wearable Intelligence.
* **Référence Visuelle Absolue :** https://www.devialet.com (Minimalisme, Blanc/Gris, Sculptural).
* **Expérience Utilisateur :** "Scrollytelling". Le site ne montre pas des pages statiques, il raconte une histoire par le mouvement.
* **Tone of Voice :** Clinique, poétique, court. Pas de marketing agressif. Juste des faits techniques sublimes.

## 2. CATALOGUE & POSITIONNEMENT
* **Omnis Ring :** "Titanium Neural Interface".
    * *Key Visual :* Lévitation, Titane brossé.
    * *Key Feature :* 0.1ms Latency, Neural Sync.
* **Omnis Lens :** "Augmented Vision Layer".
    * *Key Visual :* Vue éclatée ou HUD holographique.
    * *Key Feature :* Photonic Clarity, Heads-Up Display.
* **Omnis Aura :** "Circadian Sun Generator".
    * *Key Visual :* Texture minérale, lumière chaude.
    * *Key Feature :* Bio-synchronized Light.
* **Règle de Prix (Safety Check) :** Aucun produit ne doit être vendu avec une marge < 30%. (Ex: Aura Lamp fixée à 455€ min).

## 3. UX & NAVIGATION (NO-FRICTION)
* **Structure :** One-Page immersive ou Pages Produits dédiées "Full Viewport".
* **Navigation :** Suppression des distractions (Pas de Blog, Pas de FAQ, Pas de "About Us").
* **Tunnel d'Achat :** DIRECT CHECKOUT.
    * Le bouton "ACQUÉRIR" envoie directement vers `/cart/[variantId]:1`.
    * Pas de page panier intermédiaire.

## 4. DESIGN SYSTEM (DEVIALET CLONE)
* **Layout :** Full Bleed (Bord à bord). Pas de conteneurs visibles.
* **Typography :** Sans-Serif, Massive (pour les titres) ou Ultra-Fine (pour les specs).
* **Palette :** Monochrome nuancé (Blanc, Gris #F5F5F7, Noir Profond pour le texte).
* **Motion :** Utilisation de `framer-motion`. Les produits doivent tourner ou s'assembler au scroll.

## 5. STACK TECHNIQUE
* **Frontend :** Next.js 16 (App Router), Tailwind CSS.
* **Backend :** Shopify Storefront API (via `shopify-admin.ts` et `publish-products.mjs`).
* **Hosting :** Netlify (Deploy via GitHub CI/CD).
* **Assets :** Images générées par IA (Style Studio Photo 8k) stockées dans `/public/assets/`.

## 6. CONFIGURATION PRODUIT & INTERACTION
* **Sélecteur de Variantes (Omnis Ring) :**
    * Avant le clic "Acquérir", l'utilisateur doit sélectionner une taille via un slider minimaliste.
    * L'ID de la variante dans l'URL /cart/[variantId] doit se mettre à jour dynamiquement selon la sélection.
* **Tech Specs Overlay :**
    * Un bouton discret "VIEW SPECS" ouvre un panneau latéral (Glassmorphism) listant : Poids, Autonomie (ex: "7 Days Battery"), Matériaux (Titanium Grade 5).

## 7. RÉASSURANCE & CONFIANCE (TRUST ELEMENTS)
* **Section "Engineering Truth" :**
    * Juste avant le footer, une section avec 3 icônes filaires minimalistes :
        * "30-Day Trial" (Essai 30 jours).
        * "Swiss Engineering" (ou autre origine tech).
        * "2-Year Warranty" (Garantie).
* **Footer Minimaliste :**
    * Doit contenir en petits caractères gris (#888) : Privacy Policy, Terms of Sales, Contact Support. (Liens non-intrusifs).

## 8. COMPORTEMENT MOBILE (RESPONSIVE)
* **Sticky CTA (Mobile Only) :**
    * Sur écran < 768px, le bouton "ACQUÉRIR" et le PRIX (455€) doivent rester fixés en bas de l'écran (Bottom Bar) pour être toujours accessibles au pouce.
* **Adaptation Scrollytelling :**
    * Si l'animation 3D est trop lourde sur mobile, basculer automatiquement sur une séquence d'images optimisée (Image Sequence Scroll).
## 9. SUPPLY CHAIN & LOGISTICS
* **Sourcing Strategy :** European-centric manufacturing (OEM/ODM). Focus on precision chirurgicale (Switzerland/Germany) and manual assembly.
* **Lead Times :** 48h Processing / 3-5 Days Express Shipping (Europe).
* **Quality Standard :** QC-Level 1 (Inspection unitaire de chaque produit avant scellage). Each asset carries a unique neural calibration certificate.
* **Fulfillment :** Direct integration with high-end 3PL partners (luxury-compliant) or Shopify Fulfillment Network with white-glove delivery options.
