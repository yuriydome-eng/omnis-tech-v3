"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
    const { toggleCart, itemCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-12 h-20 bg-white/80 backdrop-blur-xl border-b border-[#F2F2F4]"
            >
                {/* Logo Section */}
                <a href="/" className="flex items-center gap-2 group">
                    <div className="w-6 h-6 bg-black rounded-none transition-transform group-hover:rotate-90 duration-500" />
                    <span className="text-xl font-black tracking-tighter uppercase text-black">
                        Omnis
                    </span>
                </a>

                {/* Main Links */}
                <div className="hidden md:flex items-center gap-12">
                    {["Collection"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-[10px] font-black tracking-[0.3em] uppercase text-[#86868B] hover:text-black transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-8">
                    <button
                        onClick={toggleCart}
                        className="relative p-2 group"
                    >
                        <ShoppingBag className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                                {itemCount}
                            </span>
                        )}
                    </button>

                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6 text-black" />}
                    </button>
                </div>
            </motion.nav>
            <CartDrawer />
        </>
    );
}
