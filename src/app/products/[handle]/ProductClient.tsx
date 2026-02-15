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
        <main className="min-h-screen bg-black text-white">
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

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Visual Section */}
                    <div className="sticky top-32">
                        <div className="glass-card p-4 group">
                            <div className="relative aspect-square overflow-hidden rounded-sm">
                                <Image
                                    src={imageUrl}
                                    alt={`${product.title} - Bague connectée titane ou Smart Glasses HUD - Vue technique haute résolution`}
                                    fill
                                    className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                    loading="eager"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                                <div className="absolute top-6 left-6">
                                    <span className="bg-electric-blue/20 backdrop-blur-xl border border-electric-blue/30 text-electric-blue text-[10px] font-bold px-4 py-2 rounded uppercase tracking-[0.2em]">
                                        Product ID: #OMNIS-{product.id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Features */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="glass-card aspect-video flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer border-white/5">
                                    <Zap className="w-4 h-4 text-electric-blue" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px w-8 bg-electric-blue" />
                            <span className="text-xs font-bold text-electric-blue uppercase tracking-widest font-mono">Omnis Protocol v1.0.4</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black font-outfit uppercase tracking-tighter mb-8 leading-none">
                            {product.title}
                        </h1>

                        <div className="flex items-baseline gap-4 mb-10">
                            <span className="text-4xl font-bold font-outfit">{product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}</span>
                            <span className="text-titanium/50 line-through text-lg font-light">499.00 EUR</span>
                        </div>

                        <p className="text-titanium text-lg font-light leading-relaxed mb-12 max-w-xl uppercase tracking-widest text-[11px]">
                            {product.description}
                        </p>

                        {/* Inventory Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="glass-card p-6 border-white/5">
                                <span className="text-[10px] text-titanium uppercase tracking-widest mb-2 block font-bold">Statut du Réseau</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-bold uppercase tracking-tighter">Stock Disponible: {sourcing?.stock || 0}</span>
                                </div>
                            </div>
                            <div className="glass-card p-6 border-white/5">
                                <span className="text-[10px] text-titanium uppercase tracking-widest mb-2 block font-bold">Temps de Hashage</span>
                                <div className="flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-electric-blue" />
                                    <span className="text-sm font-bold uppercase tracking-tighter">Livraison: 2-4 Blocs (Jours)</span>
                                </div>
                            </div>
                        </div>

                        {/* Main Action */}
                        <button
                            onClick={() => {
                                if (product) {
                                    addToCart(product);
                                }
                            }}
                            className="w-full neon-button py-8 text-sm font-black uppercase tracking-[0.4em] mb-12 flex items-center justify-center gap-4 group active:scale-95 transition-transform"
                        >
                            Acquérir cet Actif
                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                        </button>

                        {/* Security Manifest */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded bg-white/[0.02] border border-white/5">
                                <ShieldCheck className="w-5 h-5 text-electric-blue shrink-0" />
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Authenticité Blockchain</h4>
                                    <p className="text-[10px] text-titanium font-light uppercase tracking-wider">Chaque pièce est accompagnée d&apos;un NFT de propriété unique sur le protocole Omnis Ledger.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded bg-white/[0.02] border border-white/5">
                                <Smartphone className="w-5 h-5 text-electric-blue shrink-0" />
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Ecosystème Connecté</h4>
                                    <p className="text-[10px] text-titanium font-light uppercase tracking-wider">Synchronisation bidirectionnelle avec vos appareils Omnis via interface neuronale simulée.</p>
                                </div>
                            </div>
                        </div>

                        {/* Debug Validation */}
                        {validation && !validation.isValid && (
                            <div className="mt-16 p-8 glass-card border-orange-500/20 bg-orange-500/5">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                                    <h4 className="text-[10px] uppercase font-bold text-orange-400 tracking-[0.3em]">IA Diagnostic Alert</h4>
                                </div>
                                <div className="space-y-3">
                                    {validation.errors.map((err, i) => (
                                        <p key={i} className="text-[10px] text-orange-200/60 uppercase tracking-widest font-mono">ERR:: {err}</p>
                                    ))}
                                    {validation.warnings.map((warn, i) => (
                                        <p key={i} className="text-[10px] text-titanium/40 uppercase tracking-widest font-mono">WARN:: {warn}</p>
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
