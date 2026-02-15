"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShopifyProduct } from "@/lib/shopify";
import { getSourcingData, SourcingData } from "@/lib/sourcing";
import { validateProductData, ValidationResult } from "@/lib/debug-validator";
import Image from "next/image";
import { ShieldCheck, Truck, Zap, Smartphone, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
    const { handle } = useParams() as { handle: string };
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<ShopifyProduct | null>(null);
    const [sourcing, setSourcing] = useState<SourcingData | null>(null);
    const [validation, setValidation] = useState<ValidationResult | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            // Effet de chargement Web 3.0
            await new Promise(resolve => setTimeout(resolve, 800));

            // Dynamic content based on handle
            const isAura = handle === "omnis-aura-lamp";
            const isLens = handle === "omnis-lens-smart";
            const price = isAura ? "455.00" : "399.00";

            const imageMap: Record<string, string> = {
                "omnis-ring-titanium": "/assets/omnis-ring.png",
                "omnis-lens-smart": "/assets/omnis-lens.png",
                "omnis-aura-lamp": "/assets/omnis-aura.png"
            };

            const mockProduct: ShopifyProduct = {
                id: handle === "omnis-aura-lamp" ? "3" : handle === "omnis-lens-smart" ? "2" : "1",
                title: handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
                handle: handle,
                description: isAura
                    ? "Une solution de biohacking lumineuse pour synchroniser votre rythme circadien. Le spectre solaire au service de votre vitalité."
                    : isLens
                        ? "Lunettes connectées ultra-légères avec affichage HUD discret. Optique anti-lumière bleue et interface holographique latérale."
                        : "L'anneau intelligent en titane de grade 5 (titane brossé noir) conçu pour le suivi biométrique haute précision (cardiaque, oxygène, sommeil).",
                priceRange: { minVariantPrice: { amount: price, currencyCode: "EUR" } },
                images: { edges: [{ node: { url: imageMap[handle] || "https://images.unsplash.com/photo-1617042375876-a13e36732a04?auto=format", altText: handle } }] }
            };

            const sourcingData = await getSourcingData(mockProduct.id);
            const shopifyPriceNum = parseFloat(price);
            const sourcingCost = shopifyPriceNum * 0.45; // Margin validated

            const valResult = validateProductData({
                shopifyPrice: shopifyPriceNum,
                sourcingCost: sourcingCost,
                title: mockProduct.title,
                imageUrl: mockProduct.images.edges[0].node.url
            });

            setProduct(mockProduct);
            setSourcing(sourcingData);
            setValidation(valResult);
            setLoading(false);
        };

        if (handle) loadProduct();
    }, [handle]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-mono">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-electric-blue border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                    <p className="text-electric-blue text-[10px] uppercase tracking-[0.5em] animate-pulse">Initialisation de la Matrice...</p>
                </div>
            </div>
        );
    }

    if (!product) return null;

    const imageUrl = product.images.edges[0].node.url;

    return (
        <main className="min-h-screen bg-[#FCFCFD] text-black">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": product.title,
                        "description": product.description,
                        "image": `https://omnis-tech-v3.netlify.app${imageUrl}`,
                        "brand": {
                            "@type": "Brand",
                            "name": "OMNIS TECH"
                        },
                        "countryOfOrigin": {
                            "@type": "Country",
                            "name": handle === "omnis-ring-titanium" ? "Switzerland" : "Germany"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": product.priceRange.minVariantPrice.amount,
                            "priceCurrency": "EUR",
                            "availability": "https://schema.org/InStock",
                            "url": `https://omnis-tech-v3.netlify.app/products/${handle}`
                        }
                    })
                }}
            />

            <div className="container mx-auto px-20 pt-60 pb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start">
                    {/* Visual Section */}
                    <div className="sticky top-40">
                        <div className="bg-transparent p-12 group transition-all duration-1000">
                            <div className="relative aspect-square overflow-hidden rounded-none">
                                <Image
                                    src={imageUrl}
                                    alt={`${product.title}`}
                                    fill
                                    className="object-contain"
                                    priority
                                    loading="eager"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                />
                            </div>
                        </div>

                        {/* Interactive Features - Simple Size Selector */}
                        <div className="mt-32">
                            <span className="text-[10px] font-medium uppercase tracking-[0.5em] mb-10 block opacity-40">CONFIGURATEUR</span>
                            <div className="flex gap-6">
                                {[6, 7, 8, 9, 10, 11, 12, 13].map((s) => (
                                    <button
                                        key={s}
                                        className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-[10px] font-medium transition-all hover:border-black"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="pl-0 lg:pl-32 pt-20">
                        <h1 className="display-hero text-black mb-16 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-baseline gap-10 mb-24">
                            <span className="text-4xl font-light tracking-tighter">{product.priceRange.minVariantPrice.amount} EUR</span>
                        </div>

                        <p className="text-editorial max-w-lg mb-32">
                            {product.description}
                        </p>

                        {/* Main Action */}
                        <button
                            onClick={() => {
                                if (product) {
                                    addToCart(product);
                                }
                            }}
                            className="luxury-button w-full mb-32"
                        >
                            ACHETER
                        </button>

                        <div className="border-t border-black/5 pt-20 space-y-12">
                            <div className="flex items-start gap-8">
                                <ShieldCheck className="w-5 h-5 text-black shrink-0 opacity-20" />
                                <div>
                                    <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] mb-4">TRAÇABILITÉ</h4>
                                    <p className="text-[11px] text-black/40 font-light uppercase tracking-widest leading-loose">Assemblé à la main. Certificat numérique de propriété unique.</p>
                                </div>
                            </div>
                        </div>

                        {/* Debug Validation */}
                        {validation && !validation.isValid && (
                            <div className="mt-32 p-10 border border-black/5 bg-[#F5F5F7]/30">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                                    <h4 className="text-[10px] uppercase font-bold text-black tracking-[0.4em]">IA Diagnostic Alert</h4>
                                </div>
                                <div className="space-y-4">
                                    {validation.errors.map((err, i) => (
                                        <p key={i} className="text-[11px] text-black/40 uppercase tracking-widest font-mono italic">ERR// {err}</p>
                                    ))}
                                    {validation.warnings.map((warn, i) => (
                                        <p key={i} className="text-[11px] text-black/20 uppercase tracking-widest font-mono">WARN// {warn}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
