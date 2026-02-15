"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0]);
    const imageY = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Cinematic Video Background */}
            <div className="absolute inset-0 z-0 select-none">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40 mix-blend-screen"
                >
                    <source src="/hero-background.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwjZyIpIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')] opacity-[0.05] mix-blend-overlay" />
            </div>
            {/* HUD Technical Labels */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="fixed left-8 top-1/2 -translate-y-1/2 z-content hidden lg:block"
            >
                <div className="hud-label space-y-6">
                    <div>
                        <div className="text-[10px] mb-1">MATERIAL</div>
                        <div className="text-white/40">01 // TITANIUM GRADE 5</div>
                    </div>
                    <div>
                        <div className="text-[10px] mb-1">FINISH</div>
                        <div className="text-white/40">02 // BRUSHED CHROME</div>
                    </div>
                    <div>
                        <div className="text-[10px] mb-1">WEIGHT</div>
                        <div className="text-white/40">03 // 2.4G</div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="fixed right-8 top-1/2 -translate-y-1/2 z-content hidden lg:block"
            >
                <div className="hud-label space-y-6 text-right">
                    <div>
                        <div className="text-[10px] mb-1">LOCATION</div>
                        <div className="text-white/40">48.8566° N</div>
                        <div className="text-white/40">2.3522° E</div>
                    </div>
                    <div>
                        <div className="text-[10px] mb-1">COLLECTION</div>
                        <div className="text-white/40">OMNIS // 2024</div>
                    </div>
                </div>
            </motion.div>

            {/* Giant Background Title */}
            <motion.div
                style={{ opacity: titleOpacity }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-background"
            >
                <h1 className="display-giant text-white/10 select-none">
                    OMNIS
                </h1>
            </motion.div>

            {/* Floating Product Image with Parallax */}
            <motion.div
                style={{
                    y: imageY,
                    scale: imageScale
                }}
                className="relative z-content w-full max-w-2xl px-6"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    className="relative aspect-square"
                >
                    <div className="absolute inset-0 bg-gradient-radial from-[#00f0ff]/20 via-transparent to-transparent blur-3xl" />
                    <Image
                        src="/assets/omnis-ring.png"
                        alt="Omnis Ring Control"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Editorial Headline */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-32 left-0 right-0 z-content"
            >
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="space-y-6">
                        <div className="h-px w-16 bg-white/20" />
                        <h2 className="display-large text-gradient">
                            The Future of
                            <br />
                            Wearable Intelligence
                        </h2>
                        <p className="text-editorial max-w-xl">
                            Precision-engineered titanium meets quantum biometric sensors.
                            Experience health tracking reimagined for the discerning individual.
                        </p>
                        <div className="flex gap-6 pt-4">
                            <button className="btn-luxury">
                                Explore Collection
                            </button>
                            <button className="hud-label hover:text-white transition-colors">
                                TECHNICAL SPECS →
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-content"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="text-caption">SCROLL</div>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
