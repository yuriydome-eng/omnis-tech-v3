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
        <Link href={`/products/${product.handle}`} className="glass-luxury group overflow-hidden flex flex-col h-full transition-all duration-700 hover:-translate-y-3 rounded-3xl border-white/5">
            <div className="relative aspect-square overflow-hidden bg-black/40">
                <Image
                    src={imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    {!loading && sourcing && shouldShowLimitedStockBadge(sourcing.stock) && (
                        <span className="bg-red-500/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                            STOCK CRITIQUE: {sourcing.stock}
                        </span>
                    )}
                    <span className="bg-electric-blue/10 backdrop-blur-xl text-electric-blue text-[9px] font-black px-3 py-1 rounded-full border border-electric-blue/20 uppercase tracking-[0.1em]">
                        VERIFIED PROTOCOL
                    </span>
                </div>

                {/* Fast Acquisition Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-[0.23,1,0.32,1]">
                    <button className="w-full bg-white text-black py-4 text-[11px] font-black uppercase tracking-[0.3em] hover:bg-electric-blue transition-colors rounded-none">
                        ACQUÉRIR CET ACTIF
                    </button>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-heading font-black uppercase tracking-tighter group-hover:text-electric-blue transition-colors leading-tight">
                        {product.title}
                    </h3>
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-black font-heading text-white">
                            {price?.amount}
                        </span>
                        <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{price?.currencyCode}</span>
                    </div>
                </div>
                <p className="text-white/40 text-[10px] font-mono leading-relaxed line-clamp-2 mb-8 uppercase tracking-widest border-l border-white/10 pl-4">
                    {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-[9px] text-electric-blue/60 font-black uppercase tracking-[0.4em]">Ready for Sync</span>
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transform group-hover:scale-110 group-hover:border-electric-blue/40 transition-all duration-500">
                        <ArrowRight className="w-4 h-4 text-white group-hover:text-electric-blue" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
