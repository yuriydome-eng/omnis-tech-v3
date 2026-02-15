"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSourcingData, SourcingData, shouldShowLimitedStockBadge } from "@/lib/sourcing";
import { ShopifyProduct } from "@/lib/shopify";
import { validateProductData, ValidationResult, logValidationReport } from "@/lib/debug-validator";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
    product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [sourcing, setSourcing] = useState<SourcingData | null>(null);
    const [loading, setLoading] = useState(true);
    const [validation, setValidation] = useState<ValidationResult | null>(null);

    useEffect(() => {
        async function fetchData() {
            const sourcingData = await getSourcingData(product.id);
            setSourcing(sourcingData);

            // Simulation du coût (en prod, AutoDS donnerait le coût réel)
            const mockCost = parseFloat(product.priceRange.minVariantPrice.amount) * 0.6;

            const valResult = validateProductData({
                shopifyPrice: parseFloat(product.priceRange.minVariantPrice.amount),
                sourcingCost: mockCost,
                title: product.title,
                imageUrl: product.images?.edges[0]?.node?.url || ""
            });

            setValidation(valResult);
            logValidationReport(product.handle, valResult);
            setLoading(false);
        }
        fetchData();
    }, [product]);

    const price = product.priceRange?.minVariantPrice;
    const imageUrl = product.images?.edges[0]?.node?.url || "https://via.placeholder.com/400x400/000000/00F0FF?text=Omnis+Tech";

    return (
        <Link href={`/products/${product.handle}`} className="glass-card glow-hover group overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-2">
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {!loading && sourcing && shouldShowLimitedStockBadge(sourcing.stock) && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                            Stock Limité: {sourcing.stock}
                        </span>
                    )}
                    <span className="bg-electric-blue/10 backdrop-blur-md text-electric-blue text-[10px] font-bold px-2 py-1 rounded border border-electric-blue/20 uppercase tracking-tighter">
                        Web 3.0 Verified
                    </span>

                    {/* Debug Validator Badge */}
                    {validation && !validation.isValid && (
                        <span className="bg-orange-500/80 backdrop-blur-md text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                            Check Price Safety
                        </span>
                    )}
                </div>

                {/* Quick Add Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button className="w-full bg-white text-black py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-electric-blue transition-colors">
                        Acquérir l&apos;Actif
                    </button>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black font-outfit uppercase tracking-tighter group-hover:text-electric-blue transition-colors">{product.title}</h3>
                    <span className="text-lg font-bold font-outfit text-white">
                        {price?.amount} {price?.currencyCode}
                    </span>
                </div>
                <p className="text-titanium text-sm font-light leading-relaxed line-clamp-2 mb-8 uppercase tracking-widest text-[10px]">
                    {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-[10px] text-electric-blue font-bold uppercase tracking-[0.3em]">Protocol Ready</span>
                    <ArrowRight className="w-4 h-4 text-white transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
            </div>
        </Link>
    );
}
