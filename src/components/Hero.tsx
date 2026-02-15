"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
    const { scrollY } = useScroll();

    // Scrollytelling offsets
    const yRing = useTransform(scrollY, [0, 800], [0, -100]);
    const scaleRing = useTransform(scrollY, [0, 800], [1, 1.2]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);
    const scaleText = useTransform(scrollY, [0, 800], [1, 0.8]);

    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-[#FCFCFD] overflow-hidden">
            {/* Background Massive Text */}
            <motion.div
                style={{ opacity: opacityText, scale: scaleText }}
                className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none"
            >
                <h1 className="text-[25vw] font-black tracking-tighter text-[#F2F2F4] leading-none mb-[10vh]">
                    OMNIS
                </h1>
            </motion.div>

            {/* Product Centerpiece */}
            <motion.div
                style={{ y: yRing, scale: scaleRing }}
                className="relative z-10 w-full max-w-[900px] aspect-square flex items-center justify-center p-12"
            >
                <div className="relative w-full h-full animate-float">
                    <Image
                        src="/assets/omnis-ring-hero.png"
                        alt="Omnis Ring Pro"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </motion.div>

            {/* Bottom Info Bar - Devialet Style */}
            <div className="absolute bottom-12 left-0 w-full px-12 z-20 flex justify-between items-end">
                <div className="max-w-md">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-[10px] font-mono tracking-[0.3em] text-[#86868B] uppercase mb-4"
                    >
                        /// WEARABLE INTELLIGENCE PROTOCOL
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="text-4xl font-light tracking-tight text-black"
                    >
                        The silence of engineering.<br />The power of data.
                    </motion.h2>
                </div>

                <div className="flex flex-col items-end gap-6">
                    <a href="https://omnis-tech.myshopify.com/cart/56367065891196:1">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-black text-white px-10 py-5 rounded-full text-[10px] font-black tracking-[0.4em] uppercase shadow-2xl hover:bg-[#333] transition-all"
                        >
                            ACQUÉRIR L&apos;ACTIF
                        </motion.button>
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
            >
                <div className="w-[1px] h-12 bg-black" />
            </motion.div>
        </section>
    );
}
