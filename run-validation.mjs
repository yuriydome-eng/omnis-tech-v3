import { validateProductData } from './src/lib/debug-validator.ts';

const productsToValidate = [
    {
        handle: "omnis-ring-titanium",
        title: "Omnis Ring Titanium",
        shopifyPrice: 399.00,
        sourcingCost: 250.00, // 30% margin is 325, so 399 is safe
        imageUrl: "https://generated-image.com/ring.png"
    },
    {
        handle: "omnis-lens-smart",
        title: "Omnis Lens Smart",
        shopifyPrice: 899.00,
        sourcingCost: 650.00, // 30% margin is 845, so 899 is safe
        imageUrl: "https://generated-image.com/lens.png"
    },
    {
        handle: "omnis-aura-lamp",
        title: "Omnis Aura Lamp",
        shopifyPrice: 455.00,
        sourcingCost: 350.00, // 30% margin is 455, so 455 is now safe
        imageUrl: "https://generated-image.com/lamp.png"
    }
];

console.log("🛠️ Exécution du Diagnostic de Sécurité Omnis Tech (Validation v2.0)");
console.log("================================================================");

productsToValidate.forEach(p => {
    const result = validateProductData(p);
    console.log(`\n🔍 Produit : ${p.title}`);
    console.log(`   Prix Shopify : ${p.shopifyPrice}€ | Coût AutoDS : ${p.sourcingCost}€`);
    console.log(`   Status : ${result.isValid ? "✅ VALIDE" : "❌ INCORRECT"}`);

    if (result.errors.length > 0) {
        result.errors.forEach(err => console.log(`   [ERREUR] ${err}`));
    }
    if (result.warnings.length > 0) {
        result.warnings.forEach(warn => console.log(`   [WARNING] ${warn}`));
    }
});
