"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-xl font-bold font-outfit">
                    OMNIS<span className="text-electric-blue">TECH</span>
                </div>

                <div className="flex space-x-10 text-[10px] uppercase tracking-widest text-titanium font-bold">
                    <a href="#" className="hover:text-white transition-colors">Termes</a>
                    <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter (X)</a>
                </div>

                <div className="text-[10px] text-titanium/50 uppercase tracking-widest">
                    © 2024 Omnis Tech. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}
