/**
 * Simulation de l'API AutoDS
 * Dans un environnement de production, ce script ferait des appels réels vers AutoDS
 * pour synchroniser les stocks et les prix.
 */

export interface SourcingData {
    productId: string;
    stock: number;
    available: boolean;
    lastUpdated: string;
}

export async function getSourcingData(productId: string): Promise<SourcingData> {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulation de données de stock
    // On utilise le hash de l'ID pour avoir un stock consistant pour le même produit
    const hash = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const stock = hash % 20; // Stock entre 0 et 19

    return {
        productId,
        stock,
        available: stock > 0,
        lastUpdated: new Date().toISOString(),
    };
}

export function shouldShowLimitedStockBadge(stock: number): boolean {
    return stock > 0 && stock < 5;
}
