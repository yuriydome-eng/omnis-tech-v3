/**
 * Validateur de conformité pour Omnis Tech
 * Vérifie la marge de sécurité des prix et la conformité visuelle.
 */

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

export interface ValidationData {
    shopifyPrice: number;
    sourcingCost: number;
    title: string;
    imageUrl: string;
}

export function validateProductData(data: ValidationData): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 1. Price Safety Check (Marge de 30% minimum)
    // Prix de vente doit être >= Coût de sourcing * 1.3
    const minimumSafePrice = data.sourcingCost * 1.3;

    if (data.shopifyPrice < minimumSafePrice) {
        errors.push(`Price Safety Violation: La marge est inférieure à 30%. Prix min recommandé: ${minimumSafePrice.toFixed(2)}€`);
    }

    // 2. Conformité Visuelle (Logique simulée pour l'IA)
    // On vérifie si le titre contient des mots clés premium
    const premiumKeywords = ['titanium', 'smart', 'aura', 'omnis', 'premium', 'luxury'];
    const hasPremiumKeyword = premiumKeywords.some(kw => data.title.toLowerCase().includes(kw));

    if (!hasPremiumKeyword) {
        warnings.push("Conformité Visuelle: Le titre ne contient pas de mots-clés 'Premium' Web 3.0.");
    }

    // Vérification de la présence d'une image
    if (!data.imageUrl || data.imageUrl.includes('placeholder')) {
        errors.push("Conformité Visuelle: L'image produit est manquante ou est un placeholder.");
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

export function logValidationReport(productId: string, result: ValidationResult) {
    if (!result.isValid) {
        console.group(`🚨 Validation Error: Product ${productId}`);
        result.errors.forEach(err => console.error(err));
        result.warnings.forEach(warn => console.warn(warn));
        console.groupEnd();
    } else if (result.warnings.length > 0) {
        console.group(`⚠️ Validation Warning: Product ${productId}`);
        result.warnings.forEach(warn => console.warn(warn));
        console.groupEnd();
    }
}
