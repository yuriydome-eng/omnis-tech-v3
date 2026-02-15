"use client";

import { ShoppingBag, X, ArrowRight, Zap } from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cart, subtotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={toggleCart}
            />

            <div className="relative w-full max-w-md bg-black/80 backdrop-blur-3xl border-l border-white/5 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-500">
                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black font-outfit uppercase tracking-tighter">Votre Coffre</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-electric-blue rounded-full animate-pulse" />
                            <span className="text-[10px] text-electric-blue font-bold uppercase tracking-widest">Protocole Sécurisé v1.0</span>
                        </div>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-8">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 opacity-20">
                            <ShoppingBag className="w-12 h-12 mx-auto mb-4" />
                            <p className="text-xs uppercase tracking-[0.3em] font-bold">Le coffre est vide</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative w-16 h-16 bg-white/5 rounded overflow-hidden">
                                        {/* Ideally render image here, but item might not have nice image shape for small thumb */}
                                        <div className="absolute inset-0 bg-gray-800" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold">{item.title}</h4>
                                        <p className="text-xs text-white/50">{item.quantity} x {item.priceRange.minVariantPrice.amount} {item.priceRange.minVariantPrice.currencyCode}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer / Transaction Summary */}
                <div className="p-8 bg-white/[0.02] border-t border-white/5">
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-titanium uppercase tracking-widest">Valeur des Actifs</span>
                            <span className="text-sm font-bold">{subtotal.toFixed(2)} EUR</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-electric-blue uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-3 h-3" />
                                Gas Fee (Protocol)
                            </span>
                            <span className="text-[10px] font-mono text-electric-blue">0.00 ETH</span>
                        </div>
                        <div className="h-px bg-white/5 w-full" />
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-outfit font-black uppercase tracking-tighter">Total Final</span>
                            <span className="font-outfit font-black">{subtotal.toFixed(2)} EUR</span>
                        </div>
                    </div>

                    <button className="w-full neon-button py-6 text-sm font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 group">
                        Sign Transaction
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                    </button>

                    <p className="text-[8px] text-center text-titanium/30 uppercase mt-4 tracking-widest">
                        En signant, vous acceptez l&apos;exécution du smart contract Omnis-1
                    </p>
                </div>
            </div>
        </div>
    );
}
