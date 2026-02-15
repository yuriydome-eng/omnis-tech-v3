"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Award } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white">
            {/* Section Engineering Truth */}
            <div className="py-24 border-t border-[#F2F2F4]">
                <div className="container mx-auto px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: ShieldCheck, label: "30-Day Trial", sub: "Risk-free evaluation" },
                            { icon: Cpu, label: "Swiss Engineering", sub: "High-precision architecture" },
                            { icon: Award, label: "2-Year Warranty", sub: "Guaranteed durability" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <item.icon className="w-8 h-8 text-[#86868B] group-hover:text-black transition-colors mb-4 stroke-1" />
                                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black mb-1">{item.label}</span>
                                <span className="text-[9px] font-mono tracking-widest text-[#86868B] uppercase">{item.sub}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-24 border-t border-[#F2F2F4]">
                <div className="container mx-auto px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-20">
                        <div className="max-w-xs">
                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-5 h-5 bg-black" />
                                <span className="text-xl font-black tracking-tighter uppercase font-heading">Omnis</span>
                            </div>
                            <p className="text-xs text-[#86868B] leading-relaxed uppercase tracking-widest leading-loose">
                                Designed in Paris. engineered for the future. Omnis tech represents the pinnacle of wearable intelligence.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                            <div>
                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-8">Collection</h4>
                                <ul className="space-y-4 text-[10px] font-mono tracking-widest text-[#86868B]">
                                    <li><a href="#" className="hover:text-black transition-colors">Omnis Ring</a></li>
                                    <li><a href="#" className="hover:text-black transition-colors">Omnis Lens</a></li>
                                    <li><a href="#" className="hover:text-black transition-colors">Omnis Aura</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-8">Support</h4>
                                <ul className="space-y-4 text-[10px] font-mono tracking-widest text-[#86868B]">
                                    <li><a href="#" className="hover:text-black transition-colors">Hustle Support</a></li>
                                    <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
                                    <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-8">Social</h4>
                                <ul className="space-y-4 text-[10px] font-mono tracking-widest text-[#86868B]">
                                    <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                                    <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-24 pt-8 border-t border-[#F2F2F4] flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-8 order-2 md:order-1">
                            {["Privacy Policy", "Terms of Sales", "Contact Support"].map((link) => (
                                <a key={link} href="#" className="text-[9px] font-mono tracking-widest text-[#888] uppercase hover:text-black transition-colors">
                                    {link}
                                </a>
                            ))}
                        </div>
                        <span className="text-[9px] font-mono tracking-widest text-[#86868B] uppercase order-1 md:order-2">© 2026 OMNIS TECH — ALL RIGHTS RESERVED.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
