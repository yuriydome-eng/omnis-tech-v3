"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const sections = [
    {
        id: "ring",
        title: "BIOMETRIC PRECISION",
        subtitle: "OMNIS RING // TITANIUM",
        description: "The zero-gravity ring. Follow your heartbeat with a precision that defies measurement. Brushed Titanium Grade 5.",
        image: "/assets/omnis-ring-hero.png",
        specs: ["Heart Rate", "SPO2", "Sleep Sync"]
    },
    {
        id: "lens",
        title: "NEURAL INTERFACE",
        subtitle: "OMNIS LENS // AR",
        description: "Vision beyond sight. A discrete HUD interface mapped directly to your perception. Minimalist. Invisible.",
        image: "/assets/omnis-lens-devialet.png",
        specs: ["HUD Overlay", "AI Context", "Blue Light Pro"]
    },
    {
        id: "aura",
        title: "CIRCADIAN FLUX",
        subtitle: "OMNIS AURA // LIGHT",
        description: "The light of a new day. Bio-adaptive light spectrum designed to reset your biological clock. Elegant harmony.",
        image: "/assets/omnis-aura-devialet.png",
        specs: ["10,000 Lux", "UV Free", "Sunset Mode"]
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
                            {section.specs.slice(0, 2).map((spec, i) => (
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
                    <p className="text-lg text-[#86868B] leading-relaxed max-w-xl">
                        {section.description}
                    </p>
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
