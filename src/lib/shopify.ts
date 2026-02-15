const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN as string;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN as string;

export interface ShopifyProduct {
    id: string;
    title: string;
    handle: string;
    description: string;
    images: {
        edges: {
            node: {
                url: string;
                altText: string;
            };
        }[];
    };
    priceRange: {
        minVariantPrice: {
            amount: string;
            currencyCode: string;
        };
    };
}

export async function shopifyFetch<T>({ query, variables = {} }: { query: string, variables?: Record<string, unknown> }): Promise<{ status: number, body: { data?: T, errors?: unknown[] } }> {
    const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
            },
            body: JSON.stringify({ query, variables }),
        });

        return {
            status: result.status,
            body: await result.json(),
        };
    } catch (error) {
        console.error('Error fetching from Shopify:', error);
        return {
            status: 500,
            body: { errors: [{ message: 'Network error' }] },
        };
    }
}

export async function getProducts(): Promise<ShopifyProduct[]> {
    const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

    const response = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({ query });
    return response.body.data?.products.edges.map((edge) => edge.node) || [];
}

