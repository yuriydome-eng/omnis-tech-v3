"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
    const { isCartOpen, toggleCart, cart, subtotal } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <div className="fixed inset-0 z-[100] flex justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="absolute inset-0 bg-black/10 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full"
                    >
                        {/* Header */}
                        <div className="p-10 flex items-center justify-between border-b border-[#F2F2F4]">
                            <div>
                                <h2 className="text-xl font-black uppercase tracking-tighter text-black">Panier</h2>
                                <p className="text-[10px] font-mono tracking-widest text-[#86868B] uppercase mt-1">
                                    /// {cart.length} Articles Sélectionnés
                                </p>
                            </div>
                            <button onClick={toggleCart} className="p-2 hover:bg-[#F2F2F4] rounded-full transition-colors">
                                <X className="w-5 h-5 text-black" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-10">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                                    <ShoppingBag className="w-12 h-12 mb-6" />
                                    <p className="text-[10px] uppercase font-black tracking-[0.4em]">Le panier est vide</p>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-6 items-center">
                                            <div className="w-20 h-20 bg-[#F5F5F7] rounded-xl relative overflow-hidden">
                                                {/* Image would go here if available in cart item */}
                                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-black/20">
                                                    IMG
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-xs font-black uppercase tracking-widest text-black mb-1">{item.title}</h4>
                                                <p className="text-[10px] font-mono text-[#86868B]">{item.quantity} x {item.priceRange.minVariantPrice.amount} EUR</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-10 bg-[#F5F5F7] border-t border-[#F2F2F4]">
                            <div className="flex justify-between items-end mb-8">
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#86868B]">Sous-total</span>
                                <span className="text-2xl font-black tracking-tighter text-black">{subtotal.toFixed(2)} EUR</span>
                            </div>

                            <button className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-[#333] transition-colors rounded-none">
                                PROCÉDER AU PAIEMENT
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <p className="text-[8px] text-center text-[#86868B] uppercase mt-6 tracking-widest">
                                Livraison standard gratuite partout dans le monde.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
