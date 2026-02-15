"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { X, Info, ChevronRight } from "lucide-react";

const sections = [
    {
        id: "ring",
        title: "BIOMETRIC PRECISION",
        subtitle: "OMNIS RING // TITANIUM NEURAL INTERFACE",
        description: "Titanium Neural Interface. 0.1ms Latency. Track your performance with a surgical precision that defies human measurement. Engineered in black titanium grade 5.",
        image: "/assets/omnis-ring-hero.png",
        specs: ["Neural Tracking", "Biometric Flux", "Zero Latency"],
        checkoutUrl: "https://omnis-tech.myshopify.com/cart/56367065891196:1",
        price: "399€",
        technical: {
            weight: "2.4g",
            battery: "7 Days",
            material: "Titanium Grade 5",
            sensors: "PPG, Accelerometer, Thermistor"
        },
        hasVariants: true
    },
    {
        id: "lens",
        title: "PHOTONIC CLARITY",
        subtitle: "OMNIS LENS // AUGMENTED VISION",
        description: "Augmented Vision. Photonic Clarity. A discrete holographic engine mapped directly to your visual cortex. Perception, redefined.",
        image: "/assets/omnis-lens-devialet.png",
        specs: ["Holographic HUD", "Retinal Sync", "Spectral Filter"],
        checkoutUrl: "https://omnis-tech.myshopify.com/cart/56367065923964:1",
        price: "299€",
        technical: {
            weight: "28g",
            battery: "12 Hours",
            material: "Magnesium Alloy",
            optics: "Waveguide Holography"
        }
    },
    {
        id: "aura",
        title: "CIRCADIAN FLUX",
        subtitle: "OMNIS AURA // BIO-GENERATOR",
        description: "Circadian Sun Generator. Bio-synchronized. Harness the exact frequency of natural daylight to reset your biological clock in total harmony.",
        image: "/assets/omnis-aura-devialet.png",
        specs: ["Solar Spectrum", "Bio-Resonance", "Zero-UV Output"],
        checkoutUrl: "https://omnis-tech.myshopify.com/cart/56367065956732:1",
        price: "455€",
        technical: {
            weight: "1.2kg",
            power: "45W USB-C",
            material: "Brushed Aluminum",
            light: "Full-Spectrum LED (CRI 98+)"
        }
    }
];

function TechSpecsOverlay({ isOpen, onClose, product }: { isOpen: boolean, onClose: () => void, product: typeof sections[0] }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-sm bg-white/80 backdrop-blur-2xl p-12 flex flex-col h-full border-l border-[#F2F2F4]"
                    >
                        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors">
                            <X className="w-5 h-5 text-black" />
                        </button>

                        <h3 className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-12">Technical Specifications</h3>

                        <div className="space-y-10">
                            {Object.entries(product.technical).map(([key, value]) => (
                                <div key={key} className="flex flex-col border-b border-black/5 pb-6">
                                    <span className="text-[9px] font-mono tracking-widest text-[#86868B] uppercase mb-2">{key}</span>
                                    <span className="text-sm font-light text-black uppercase tracking-tight">{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-12 border-t border-black/5">
                            <p className="text-[8px] font-mono leading-relaxed text-[#86868B] uppercase tracking-widest">
                                /// Omnis engineering protocol v3.1. All components verified for maximum bio-compatibility.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function ScrollySection({ section, index }: { section: typeof sections[0], index: number }) {
    const containerRef = useRef(null);
    const [isSpecsOpen, setIsSpecsOpen] = useState(false);
    const [size, setSize] = useState(8);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <div ref={containerRef} className="relative h-[200vh] w-full flex flex-col items-center">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": section.title,
                        "description": section.description,
                        "image": `https://omnis-tech-v3.netlify.app${section.image}`,
                        "brand": {
                            "@type": "Brand",
                            "name": "OMNIS TECH"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": section.price.replace('€', ''),
                            "priceCurrency": "EUR",
                            "availability": "https://schema.org/InStock",
                            "url": section.checkoutUrl
                        }
                    })
                }}
            />

            {/* Sticky Product Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#FCFCFD]">
                <motion.div
                    style={{ y: isMobile ? 0 : y, opacity, scale }}
                    className="relative w-full max-w-[800px] aspect-square"
                >
                    <Image
                        src={section.image}
                        alt={`${section.title} - ${section.subtitle} technical view`}
                        fill
                        className="object-contain p-20"
                    />
                </motion.div>

                {/* Floating Specs */}
                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                    <div className="w-full max-w-6xl px-12 flex justify-between">
                        <div className="flex flex-col gap-8">
                            {section.specs.map((spec, i) => (
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

                {/* Mobile Sticky CTA Placeholder (Content is outside but this triggers visual cues) */}
                {isMobile && (
                    <motion.div
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#F2F2F4] p-6 z-[100] flex justify-between items-center"
                    >
                        <div className="flex flex-col">
                            <span className="text-[8px] font-mono tracking-widest text-[#86868B] uppercase">{section.subtitle}</span>
                            <span className="text-lg font-black tracking-tighter text-black">{section.price}</span>
                        </div>
                        <a href={section.checkoutUrl}>
                            <button className="bg-black text-white px-8 py-4 rounded-full text-[9px] font-black tracking-[0.3em] uppercase">
                                ACQUÉRIR
                            </button>
                        </a>
                    </motion.div>
                )}
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

                    {/* Variant Selector for Ring */}
                    {section.hasVariants && (
                        <div className="w-full max-w-xs mb-12 p-8 bg-[#F5F5F7] rounded-3xl">
                            <div className="flex justify-between items-baseline mb-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-black">SELECT SIZE</span>
                                <span className="text-2xl font-light text-black lowercase tracking-tighter">us {size}</span>
                            </div>
                            <input
                                type="range"
                                min="6"
                                max="13"
                                step="1"
                                value={size}
                                onChange={(e) => setSize(parseInt(e.target.value))}
                                className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black mb-4"
                            />
                            <div className="flex justify-between text-[8px] font-mono text-[#86868B] uppercase tracking-widest">
                                <span>Size 6</span>
                                <span>Size 13</span>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                        <a href={section.checkoutUrl}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-black text-white px-12 py-6 rounded-full text-[10px] font-black tracking-[0.5em] uppercase"
                            >
                                ACQUÉRIR — {section.price}
                            </motion.button>
                        </a>
                        <button
                            onClick={() => setIsSpecsOpen(true)}
                            className="text-[10px] font-black tracking-[0.3em] uppercase text-[#86868B] hover:text-black transition-colors flex items-center gap-2"
                        >
                            <Info className="w-4 h-4 stroke-1" />
                            View Specs
                        </button>
                    </div>
                </div>
            </div>

            <TechSpecsOverlay
                isOpen={isSpecsOpen}
                onClose={() => setIsSpecsOpen(false)}
                product={section}
            />
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
            <div className="h-screen w-full flex flex-col items-center justify-center bg-white border-t border-[#F2F2F4]">
                <h2 className="text-[12vw] font-black tracking-tighter text-[#F2F2F4] leading-none mb-20 uppercase">
                    READY?
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-black text-white px-16 py-8 rounded-full text-xs font-black tracking-[0.5em] uppercase"
                >
                    COMMENCER L&apos;EXPÉRIENCE
                </motion.button>
            </div>
        </section>
    );
}
