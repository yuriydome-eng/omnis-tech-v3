const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN || 'omnis-tech.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = (process.env.SHOPIFY_ADMIN_TOKEN || '') as string;

export async function shopifyAdminFetch({ path, method = 'GET', body }: { path: string, method?: string, body?: Record<string, unknown> }) {
    const endpoint = `https://${SHOPIFY_DOMAIN}/admin/api/2024-01/${path}`;

    try {
        const result = await fetch(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        return {
            status: result.status,
            body: await result.json(),
        };
    } catch (error) {
        console.error('Error fetching from Shopify Admin API:', error);
        return {
            status: 500,
            body: { errors: [{ message: 'Network error' }] },
        };
    }
}

export async function createProduct(productData: Record<string, unknown>) {
    const response = await shopifyAdminFetch({
        path: 'products.json',
        method: 'POST',
        body: { product: productData }
    });
    return response;
}
