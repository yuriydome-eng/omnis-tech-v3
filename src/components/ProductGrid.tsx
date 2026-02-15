"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const sections = [
    {
        id: "ring",
        title: "BIOMETRIC PRECISION",
        subtitle: "OMNIS RING // TITANIUM NEURAL INTERFACE",
        description: "Titanium Neural Interface. 0.1ms Latency. Track your performance with a surgical precision that defies human measurement. Engineered in black titanium grade 5.",
        image: "/assets/omnis-ring-hero.png",
        specs: ["Neural Tracking", "Biometric Flux", "Zero Latency"],
        checkoutUrl: "https://omnis-tech.myshopify.com/cart/56367065891196:1"
    },
    {
        id: "lens",
        title: "PHOTONIC CLARITY",
        subtitle: "OMNIS LENS // AUGMENTED VISION",
        description: "Augmented Vision. Photonic Clarity. A discrete holographic engine mapped directly to your visual cortex. Perception, redefined.",
        image: "/assets/omnis-lens-devialet.png",
        specs: ["Holographic HUD", "Retinal Sync", "Spectral Filter"],
        checkoutUrl: "https://omnis-tech.myshopify.com/cart/56367065923964:1"
    },
    {
        id: "aura",
        title: "CIRCADIAN FLUX",
        subtitle: "OMNIS AURA // BIO-GENERATOR",
        description: "Circadian Sun Generator. Bio-synchronized. Harness the exact frequency of natural daylight to reset your biological clock in total harmony.",
        image: "/assets/omnis-aura-devialet.png",
        specs: ["Solar Spectrum", "Bio-Resonance", "Zero-UV Output"],
        checkoutUrl: "https://omnis-tech.myshopify.com/cart/56367065956732:1"
    }
];

function ScrollySection({ section, index }: { section: typeof sections[0], index: number }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full flex flex-col items-center">
            {/* Sticky Product Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y, opacity, scale }}
                    className="relative w-full max-w-[800px] aspect-square"
                >
                    <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-contain p-20"
                    />
                </motion.div>

                {/* Floating Specs */}
                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                    <div className="w-full max-w-6xl px-12 flex justify-between">
                        <div className="flex flex-col gap-8">
                            {section.specs.slice(0, 3).map((spec, i) => (
                                <motion.div
                                    key={spec}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 0.4, x: 0 }}
                                    viewport={{ margin: "-100px" }}
                                    className="flex flex-col"
                                >
                                    <span className="text-[10px] font-mono tracking-widest text-[#86868B]">0{i + 1}</span>
                                    <span className="text-xl font-light tracking-tighter text-black uppercase">{spec}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrolling Text Content */}
            <div className="relative z-10 w-full max-w-4xl px-12 pb-[50vh]">
                <div className="flex flex-col items-center text-center">
                    <span className="text-[10px] font-mono tracking-[0.4em] text-[#86868B] uppercase mb-8">
                        {section.subtitle}
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-black uppercase leading-none mb-12">
                        {section.title}
                    </h2>
                    <p className="text-lg text-[#86868B] leading-relaxed max-w-xl mb-12">
                        {section.description}
                    </p>
                    <a href={section.checkoutUrl}>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-black text-white px-12 py-6 rounded-full text-[10px] font-black tracking-[0.5em] uppercase"
                        >
                            ACQUÉRIR
                        </motion.button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function ProductGrid() {
    return (
        <section className="relative w-full bg-[#FCFCFD]">
            {sections.map((section, index) => (
                <ScrollySection
                    key={section.id}
                    section={section}
                    index={index}
                />
            ))}

            {/* Final Call to Action Section */}
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
                <h2 className="text-[12vw] font-black tracking-tighter text-[#F2F2F4] leading-none mb-20 uppercase">
                    READY?
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-black text-white px-16 py-8 rounded-full text-xs font-black tracking-[0.5em] uppercase"
                >
                    ACQUÉRIR MAINTENANT
                </motion.button>
            </div>
        </section>
    );
}
