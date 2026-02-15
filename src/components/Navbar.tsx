"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ShoppingBag, Wallet, X } from "lucide-react";
import CartDrawer from "./CartDrawer";

import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { isCartOpen, toggleCart, itemCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // ... (rest of imports and motion/state)

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="fixed top-0 left-0 right-0 z-overlay"
            >
                {/* ... (Logo and Nav content same as before) */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <nav className="container mx-auto px-6 h-20 flex items-center justify-between relative z-10">
                    {/* ... Logo ... */}
                    <motion.a
                        href="/"
                        className="relative z-10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 relative">
                                <div className="absolute inset-0 bg-white rounded-sm" />
                                <div className="absolute inset-0 bg-black rotate-45 scale-50" />
                            </div>
                            <span className="text-xl font-bold tracking-tighter uppercase hidden sm:block">
                                Omnis
                            </span>
                        </div>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        <a href="#products" className="hud-label hover:text-white transition-colors">
                            COLLECTION
                        </a>
                        <a href="#" className="hud-label hover:text-white transition-colors">
                            INNOVATION
                        </a>
                        <a href="#" className="hud-label hover:text-white transition-colors">
                            ABOUT
                        </a>
                    </div>


                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        <motion.button
                            onClick={toggleCart}
                            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00f0ff] text-black text-[10px] flex items-center justify-center rounded-full font-bold">
                                    {itemCount}
                                </span>
                            )}
                        </motion.button>

                        <motion.button
                            className="hidden sm:flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full hover:border-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Wallet className="w-4 h-4" />
                            <span className="text-caption">CONNECT</span>
                        </motion.button>

                        <motion.button
                            className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-2xl border-t border-white/5"
                        >
                            <div className="container mx-auto px-6 py-8 space-y-6">
                                <a href="#products" className="block hud-label hover:text-white transition-colors">
                                    COLLECTION
                                </a>
                                <a href="#" className="block hud-label hover:text-white transition-colors">
                                    INNOVATION
                                </a>
                                <a href="#" className="block hud-label hover:text-white transition-colors">
                                    ABOUT
                                </a>
                                <div className="pt-4 border-t border-white/10">
                                    <button className="w-full btn-luxury">
                                        Connect Wallet
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <CartDrawer />
        </>
    );
}
