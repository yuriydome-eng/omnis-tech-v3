import { validateProductData } from './src/lib/debug-validator';

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN || 'omnis-tech.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';

const products = [
    {
        handle: "omnis-ring-titanium",
        title: "Omnis Ring Titanium",
        price: 399.00,
        cost: 250.00,
        description: "<strong>L'excellence du futur au creux de votre main.</strong><br>Titane Grade 5, suivi santé 24/7.",
        image: "https://generated-image.com/ring.png"
    },
    {
        handle: "omnis-lens-smart",
        title: "Omnis Lens Smart",
        price: 899.00,
        cost: 650.00,
        description: "<strong>La vision augmentée par l'intelligence artificielle.</strong><br>HUD Micro OLED, AR navigation.",
        image: "https://generated-image.com/lens.png"
    },
    {
        handle: "omnis-aura-lamp",
        title: "Omnis Aura Lamp",
        price: 455.00,
        cost: 350.00,
        description: "<strong>Optimisez votre cycle circadien.</strong><br>10 000 Lux sans UV, design titane.",
        image: "https://generated-image.com/lamp.png"
    }
];

async function runAutomation() {
    console.log("🛠️ Mission : Automation du Catalogue Omnis Tech");
    console.log("=============================================");

    for (const item of products) {
        console.log(`\n🔍 Analyse : ${item.title}`);

        // 1. Validation
        const validationResult = validateProductData({
            shopifyPrice: item.price,
            sourcingCost: item.cost,
            title: item.title,
            imageUrl: item.image
        });

        if (!validationResult.isValid) {
            console.log(`❌ ÉCHEC DE VALIDATION :`);
            validationResult.errors.forEach(e => console.log(`   - ${e}`));
            console.log(`⚠️ Saut de la publication pour ${item.title}`);
            continue;
        }

        console.log(`✅ Validation Réussie (Marge OK)`);

        // 2. Publication (Simulation car manque scope write_products)
        console.log(`📡 Tentative de publication sur Shopify...`);

        try {
            const response = await fetch(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
                },
                body: JSON.stringify({
                    product: {
                        title: item.title,
                        body_html: item.description,
                        handle: item.handle,
                        variants: [{ price: item.price.toString() }]
                    }
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log(`🎉 Succès : Produit ajouté !`);
            } else {
                console.log(`🛑 Erreur Shopify : ${JSON.stringify(data.errors)}`);
                console.log(`👉 Note : Ajoutez le scope 'write_products' à votre application Shopify pour autoriser cette action.`);
            }
        } catch (e) {
            const error = e as Error;
            console.log(`❌ Erreur Réseau : ${error.message}`);
        }
    }
}

runAutomation();
