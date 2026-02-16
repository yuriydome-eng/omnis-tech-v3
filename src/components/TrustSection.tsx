"use client";

import { motion } from "framer-motion";
import { RotateCcw, ShieldCheck, Award } from "lucide-react";

const TRUST_ITEMS = [
    {
        icon: RotateCcw,
        title: "30-Day Neural Trial",
        text: "Testez l'interface dans votre environnement. Retour simplifié sous 30 jours."
    },
    {
        icon: ShieldCheck,
        title: "Swiss Precision",
        text: "Composants certifiés OEM. Assemblage de précision en Suisse et Allemagne."
    },
    {
        icon: Award,
        title: "2-Year Hardware Warranty",
        text: "Protection complète contre les défauts matériels et l'usure prématurée."
    }
];

export default function TrustSection() {
    return (
        <section className="bg-white border-t border-gray-100 py-24 lg:py-32 px-12 md:px-24">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-32">
                    {TRUST_ITEMS.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-6"
                        >
                            <item.icon
                                strokeWidth={1}
                                size={24}
                                className="text-black"
                            />
                            <div className="space-y-4">
                                <h3 className="text-[14px] font-medium uppercase tracking-[0.2em] text-black">
                                    {item.title}
                                </h3>
                                <p className="text-[12px] font-light text-[#444] leading-relaxed max-w-[280px]">
                                    {item.text}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
