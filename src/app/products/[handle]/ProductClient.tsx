"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ShopifyProduct } from "@/lib/shopify";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, Check, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";
import TrustSection from "@/components/TrustSection";

// Types for our sidebar interaction
type Finition = {
    id: string;
    name: string;
    color: string;
    image: string;
};

type Accessory = {
    id: string;
    name: string;
    description: string;
    price: number;
};

const FINITIONS: Finition[] = [
    { id: "black", name: "Sideral Black", color: "#1A1A1A", image: "/assets/omnis-ring.png" },
    { id: "silver", name: "Silver", color: "#E5E5E5", image: "/assets/omnis-ring.png" }, // Using same image for demo if others don't exist
    { id: "gold", name: "Gold", color: "#D4AF37", image: "/assets/omnis-ring.png" },
];

const ACCESSORIES: Accessory[] = [
    { id: "dock", name: "Omnis Dock", description: "Station de recharge induction", price: 79 },
    { id: "case", name: "Leather Travel Case", description: "Étui de transport en cuir véritable", price: 49 },
];

export default function ProductPage() {
    const { handle } = useParams() as { handle: string };
    const { addToCart } = useCart();

    // State management for configuration
    const [selectedFinition, setSelectedFinition] = useState<Finition>(FINITIONS[0]);
    const [selectedSizing, setSelectedSizing] = useState<"standard" | "custom">("standard");
    const [selectedAccessories, setSelectedAccessories] = useState<Set<string>>(new Set());
    const [protection, setProtection] = useState<"none" | "warranty">("none");

    const [product, setProduct] = useState<ShopifyProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            // Mock product data for Omnis Ring
            const mockProduct: ShopifyProduct = {
                id: "1",
                title: "Omnis Ring",
                handle: "omnis-ring-titanium",
                description: "Titanium Neural Interface",
                priceRange: { minVariantPrice: { amount: "399.00", currencyCode: "EUR" } },
                images: { edges: [{ node: { url: "/assets/omnis-ring.png", altText: "Omnis Ring" } }] }
            };
            setProduct(mockProduct);
            setLoading(false);
        };
        loadProduct();
    }, [handle]);

    const toggleAccessory = (id: string) => {
        const next = new Set(selectedAccessories);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedAccessories(next);
    };

    if (loading || !product) {
        return <div className="min-h-screen bg-white flex items-center justify-center font-sans tracking-widest text-[10px] uppercase">Chargement...</div>;
    }

    return (
        <div className="bg-white">
            <main className="flex flex-col lg:flex-row min-h-screen bg-white text-black font-sans selection:bg-black/5">
                {/* LEFT COLUMN - Visual Showcase (60%) */}
                <div className="lg:w-[60%] relative flex items-center justify-center p-12 bg-[#F5F5F7] min-h-[50vh] lg:min-h-screen">
                    {/* Product Image with Framer Motion for Transitions */}
                    <div className="relative w-full aspect-square max-w-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedFinition.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-full relative"
                            >
                                <Image
                                    src={selectedFinition.image}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-20 drop-shadow-2xl"
                                    priority
                                />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* RIGHT COLUMN - Sidebar Configuration (40%) */}
                <div className="lg:w-[40%] bg-white sidebar-scroll overflow-y-auto lg:h-screen border-l border-black/[0.03]">
                    <div className="px-10 lg:px-20 py-20 lg:py-24 space-y-12">

                        {/* Header Section */}
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h1 className="text-3xl lg:text-4xl font-normal tracking-tight uppercase">OMNIS TECH</h1>
                                <p className="text-sm font-light text-black/50 tracking-wide">{product.title} // {product.description}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-normal">399 €</span>
                            </div>
                        </div>

                        <hr className="border-black/[0.06]" />

                        {/* Section 1 - Finition */}
                        <div className="space-y-8">
                            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em]">Finition</h3>
                            <div className="flex gap-6">
                                {FINITIONS.map((fin) => (
                                    <div key={fin.id} className="flex flex-col items-center gap-3">
                                        <button
                                            onClick={() => setSelectedFinition(fin)}
                                            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${selectedFinition.id === fin.id ? "border-black scale-110" : "border-transparent hover:border-black/20"
                                                }`}
                                        >
                                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: fin.color }} />
                                        </button>
                                        <span className={`text-[9px] uppercase tracking-widest transition-opacity duration-300 ${selectedFinition.id === fin.id ? "opacity-100" : "opacity-0"
                                            }`}>
                                            {fin.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-black/[0.06]" />

                        {/* Section 2 - Sizing (Interactive Cards) */}
                        <div className="space-y-8">
                            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em]">Taille</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setSelectedSizing("standard")}
                                    className={`p-8 text-left border rounded-none transition-all duration-300 ${selectedSizing === "standard" ? "border-black bg-[#F5F5F7] shadow-sm" : "border-black/5 bg-transparent hover:border-black/20"
                                        }`}
                                >
                                    <span className="block text-xs font-medium mb-1 uppercase tracking-[0.2em]">Standard</span>
                                    <span className="block text-[10px] text-black/40 font-light uppercase tracking-wider">Tailles 6-13</span>
                                </button>
                                <button
                                    onClick={() => setSelectedSizing("custom")}
                                    className={`p-8 text-left border rounded-none transition-all duration-300 ${selectedSizing === "custom" ? "border-black bg-[#F5F5F7] shadow-sm" : "border-black/5 bg-transparent hover:border-black/20"
                                        }`}
                                >
                                    <span className="block text-xs font-medium mb-1 uppercase tracking-[0.2em]">Custom Fit</span>
                                    <span className="block text-[10px] text-black/40 font-light uppercase tracking-wider">Kit inclus</span>
                                </button>
                            </div>
                        </div>

                        <hr className="border-black/[0.06]" />

                        {/* Section 3 - Accessoires */}
                        <div className="space-y-8">
                            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em]">Accessoires</h3>
                            <div className="space-y-3">
                                {ACCESSORIES.map((acc) => (
                                    <div
                                        key={acc.id}
                                        onClick={() => toggleAccessory(acc.id)}
                                        className={`p-6 flex items-center justify-between border cursor-pointer transition-all duration-300 ${selectedAccessories.has(acc.id) ? "border-black bg-[#F5F5F7]" : "border-black/5 bg-transparent hover:border-black/10"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-5 h-5 border transition-all flex items-center justify-center ${selectedAccessories.has(acc.id) ? "bg-black border-black" : "border-black/20"
                                                }`}>
                                                {selectedAccessories.has(acc.id) && <Check size={14} className="text-white" />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium uppercase tracking-wider">{acc.name}</p>
                                                <p className="text-[10px] text-black/40 font-light">{acc.description}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium">+{acc.price} €</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-black/[0.06]" />

                        {/* Section 4 - Protection */}
                        <div className="space-y-8">
                            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em]">Omnis Care : <span className="text-black/40 font-light">Extension de garantie</span></h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => setProtection("warranty")}
                                    className={`w-full p-6 text-left border flex items-center justify-between transition-all duration-300 ${protection === "warranty" ? "border-black bg-white" : "border-black/5 bg-transparent hover:border-black/10"
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-5 h-5 border rounded-full flex items-center justify-center transition-all ${protection === "warranty" ? "border-black border-[5px]" : "border-black/20"
                                            }`} />
                                        <span className="text-xs font-medium uppercase tracking-wider">Garantie 2 ans</span>
                                    </div>
                                    <span className="text-xs font-medium">+99 €</span>
                                </button>
                                <button
                                    onClick={() => setProtection("none")}
                                    className="block w-full text-center py-2 text-[10px] text-black/30 uppercase tracking-[0.2em] hover:text-black transition-colors"
                                >
                                    Sans garantie
                                </button>
                            </div>
                        </div>

                        {/* Final Action Button */}
                        <div className="pt-12">
                            <button
                                onClick={() => {
                                    // Direct Checkout with Shopify Logic
                                    const variantId = "56367065891196";
                                    window.location.href = `https://omnis-tech.myshopify.com/cart/${variantId}:1`;
                                }}
                                className="w-full bg-black text-white py-8 px-10 rounded-none text-[12px] font-medium uppercase tracking-[0.5em] hover:bg-black/90 transition-all duration-300 transform active:scale-[0.98] shadow-2xl shadow-black/10"
                            >
                                ACQUÉRIR
                            </button>
                        </div>

                    </div>
                </div>

                <style jsx global>{`
                    .sidebar-scroll::-webkit-scrollbar {
                        width: 0px;
                    }
                    .sidebar-scroll {
                        scrollbar-width: none;
                    }
                `}</style>
            </main>

            <TrustSection />
        </div>
    );
}
