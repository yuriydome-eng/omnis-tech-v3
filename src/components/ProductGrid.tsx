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
                        "countryOfOrigin": {
                            "@type": "Country",
                            "name": section.id === "ring" ? "Switzerland" : "Germany"
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
                    className="relative w-full max-w-[700px] aspect-square"
                >
                    <Image
                        src={section.image}
                        alt={`${section.title} - ${section.subtitle} - Bague connectée titane haut de gamme`}
                        fill
                        className="object-contain p-20"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                    />
                </motion.div>

                {/* Mobile Sticky CTA Placeholder */}
                {isMobile && (
                    <motion.div
                        initial={{ y: 100 }}
                        whileInView={{ y: 0 }}
                        className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#F2F2F4] p-6 z-[100] flex justify-between items-center"
                    >
                        <div className="flex flex-col">
                            <span className="text-lg font-medium tracking-tighter text-black">{section.price}</span>
                        </div>
                        <a href={section.checkoutUrl}>
                            <button className="luxury-button !px-8 !py-4">
                                ACHETER
                            </button>
                        </a>
                    </motion.div>
                )}
            </div>

            {/* Scrolling Text Content */}
            <div className="relative z-10 w-full max-w-4xl px-12 pb-[80vh] pt-[20vh]">
                <div className="flex flex-col items-center text-center">
                    <h2 className="display-large text-black leading-none mb-20">
                        {section.title}
                    </h2>
                    <p className="text-editorial max-w-xl mb-24">
                        {section.description}
                    </p>

                    {/* Variant Selector for Ring */}
                    {section.hasVariants && (
                        <div className="w-full max-w-sm mb-24">
                            <div className="flex justify-between items-baseline mb-10 opacity-40">
                                <span className="text-[10px] font-medium uppercase tracking-[0.4em]">SÉLECTION TAILLE</span>
                                <span className="text-lg font-light tracking-tighter italic">us {size}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                                {[6, 7, 8, 9, 10, 11, 12, 13].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSize(s)}
                                        className={`w-10 h-10 rounded-full border transition-all duration-700 text-[10px] ${size === s ? 'bg-black text-white border-black' : 'border-black/5 text-black/20 hover:border-black hover:text-black'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col items-center gap-12 w-full max-w-md">
                        <a href={section.checkoutUrl} className="w-full">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="luxury-button w-full"
                            >
                                ACHETER — {section.price}
                            </motion.button>
                        </a>
                        <button
                            onClick={() => setIsSpecsOpen(true)}
                            className="text-[9px] font-medium tracking-[0.5em] uppercase text-black/40 hover:text-black transition-colors"
                        >
                            FICHE TECHNIQUE
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
        <section id="collection" className="relative w-full bg-[#FCFCFD]">
            {sections.map((section, index) => (
                <ScrollySection
                    key={section.id}
                    section={section}
                    index={index}
                />
            ))}

            {/* Final Call to Action Section */}
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#FCFCFD] border-t border-black/5">
                <h2 className="display-giant text-black/5 mb-32">
                    OMNIS
                </h2>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="luxury-button"
                >
                    COMMENCER L&apos;EXPÉRIENCE
                </motion.button>
            </div>
        </section>
    );
}
