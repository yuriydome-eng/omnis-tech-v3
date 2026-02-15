const SHOPIFY_DOMAIN = 'omnis-tech.myshopify.com';
const SHOPIFY_TOKEN = 'b1bbe080775da2dd8c3fa9b4d7b8c7b3';

async function testConnection() {
    const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;
    const query = `{
    shop {
      name
      description
    }
  }`;

    console.log(`Testing connection to ${SHOPIFY_DOMAIN}...`);

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
            },
            body: JSON.stringify({ query }),
        });

        const data = await response.json();

        if (response.ok && !data.errors) {
            console.log('✅ Connexion Shopify réussie !');
            console.log('Détails de la boutique :', JSON.stringify(data.data.shop, null, 2));
        } else {
            console.error('❌ Erreur de connexion Shopify :');
            console.error(JSON.stringify(data.errors || data, null, 2));
        }
    } catch (error) {
        console.error('❌ Erreur réseau lors du test Shopify :', error.message);
    }
}

testConnection();
