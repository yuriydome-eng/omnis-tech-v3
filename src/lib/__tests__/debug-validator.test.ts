import { validateProductData, ValidationData } from '../debug-validator';

describe('Debug Validator (The Nerd Check)', () => {
    const validProduct: ValidationData = {
        title: 'Omnis Ring Titanium Premium',
        shopifyPrice: 399,
        sourcingCost: 250,
        imageUrl: 'https://example.com/ring.jpg'
    };

    test('DOIT valider un produit avec une marge suffisante et des mots-clés premium', () => {
        const result = validateProductData(validProduct);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    test('DOIT échouer si la marge est inférieure à 30%', () => {
        const lowMarginProduct = {
            ...validProduct,
            shopifyPrice: 260, // Sourcing 250 * 1.3 = 325 min
            title: 'Omnis Ring Titanium'
        };
        const result = validateProductData(lowMarginProduct);
        expect(result.isValid).toBe(false);
        expect(result.errors.some(e => e.includes('Price Safety Violation'))).toBe(true);
    });

    test('DOIT avertir (warning) si le titre manque de mots-clés premium', () => {
        const basicProduct = {
            ...validProduct,
            title: 'Simple Bague Connectée'
        };
        const result = validateProductData(basicProduct);
        expect(result.isValid).toBe(true); // Reste valide mais avec warning
        expect(result.warnings.some(w => w.includes('Conformité Visuelle'))).toBe(true);
    });

    test('DOIT échouer si l\'image est manquante ou placeholder', () => {
        const noImageProduct = {
            ...validProduct,
            imageUrl: 'placeholder.png'
        };
        const result = validateProductData(noImageProduct);
        expect(result.errors.some(e => e.includes('image produit est manquante'))).toBe(true);
    });
});
