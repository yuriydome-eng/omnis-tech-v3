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
                <h1 className="text-[20vw] font-medium tracking-tighter text-[#F2F2F4] leading-none mb-[12vh] opacity-80">
                    OMNIS TECH
                </h1>
            </motion.div>

            {/* Product Centerpiece */}
            <motion.div
                style={{ y: yRing, scale: scaleRing }}
                className="relative z-10 w-full max-w-[900px] aspect-square flex items-center justify-center p-12"
            >
                <div className="relative w-full h-full animate-float aspect-square">
                    <Image
                        src="/assets/omnis-ring-hero.png"
                        alt="Omnis Ring Titanium Neural Interface in matte black floating in studio light"
                        fill
                        className="object-contain"
                        priority
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    />
                </div>
            </motion.div>

            {/* Bottom Info Bar - Devialet Style */}
            <div className="absolute bottom-20 left-0 w-full px-20 z-20 flex justify-between items-end">
                <div className="max-w-xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                        className="text-5xl font-light tracking-tight text-black leading-tight"
                    >
                        The silence of engineering.
                    </motion.h2>
                </div>

                <div className="flex flex-col items-end">
                    <a href="#collection">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="luxury-button"
                        >
                            ACQUÉRIR — 399€
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
