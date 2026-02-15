// Native global fetch will be used (Node 18+)

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

const products = [
    {
        title: "Omnis Ring Titanium",
        body_html: "<strong>L'excellence du futur au creux de votre main.</strong><br>Fabriquée en titane Grade 5 (Ti-6Al-4V), la bague Omnis Ring pèse seulement 2.4g. Équipée de capteurs PPG infrarouges haute précision pour le suivi 24/7 du rythme cardiaque, SpO2 et de la température cutanée. Étanche jusqu'à 10 ATM.",
        vendor: "Omnis Tech",
        product_type: "Smart Jewelry",
        handle: "omnis-ring-titanium",
        variants: [
            {
                price: "399.00",
                sku: "OMNIS-RING-001",
                inventory_management: "shopify"
            }
        ]
    },
    {
        title: "Omnis Lens Smart",
        body_html: "<strong>La vision augmentée par l'intelligence artificielle.</strong><br>Lunettes intelligentes en alliage de titane avec affichage Micro OLED HUD. Résolution Full HD par œil, luminosité jusqu'à 5000 nits. Assistant IA intégré pour la traduction en temps réel et la navigation AR. Poids plume de 72g.",
        vendor: "Omnis Tech",
        product_type: "Smart Eyewear",
        handle: "omnis-lens-smart",
        variants: [
            {
                price: "899.00",
                sku: "OMNIS-LENS-001",
                inventory_management: "shopify"
            }
        ]
    },
    {
        title: "Omnis Aura Lamp",
        body_html: "<strong>Optimisez votre cycle circadien avec la précision du spectre solaire.</strong><br>Lampe thérapeutique haut de gamme délivrant 10 000 Lux sans UV. IRC > 95 pour une fidélité chromatique absolue. Design minimaliste en titane brossé. Idéale pour réguler le sommeil et booster l'énergie.",
        vendor: "Omnis Tech",
        product_type: "Wellness Tech",
        handle: "omnis-aura-lamp",
        variants: [
            {
                price: "455.00",
                sku: "OMNIS-AURA-001",
                inventory_management: "shopify"
            }
        ]
    }
];

async function publishProducts() {
    console.log("🚀 Lancement de l'automation du catalogue Omnis Tech...");

    for (const product of products) {
        console.log(`\n📦 Publication de : ${product.title}...`);

        const endpoint = `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/products.json`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
                },
                body: JSON.stringify({ product }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(`✅ Produit créé avec succès ! ID: ${data.product.id}`);
            } else {
                console.error(`❌ Erreur lors de la création de ${product.title} :`, JSON.stringify(data.errors, null, 2));
            }
        } catch (error) {
            console.error(`❌ Erreur réseau pour ${product.title} :`, error.message);
        }
    }

    console.log("\n🏁 Mission d'automation terminée.");
}

publishProducts();
