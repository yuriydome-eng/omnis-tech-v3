"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap, Activity, Eye, Sun } from "lucide-react";

// Updated Collection Data based on "Wearable Intelligence" Focus
const collections = [
    {
        id: 1,
        layout: "precision",
        title: "BIOMETRIC PRECISION",
        subtitle: "TITANIUM GRADE 5 // HEALTH 2.0",
        description: "Bague intelligente en titane brossé noir pour le suivi haute précision : cardiaque, oxygène et sommeil.",
        image: "/assets/omnis-ring.png",
        handle: "omnis-ring-titanium",
        price: "399 EUR",
        span: "col-span-1 md:col-span-2 lg:col-span-1 row-span-2"
    },
    {
        id: 2,
        layout: "neural",
        title: "NEURAL SYNC",
        subtitle: "AR INTERFACE // VISION",
        description: "Lunettes ultra-légères avec affichage HUD discret et optique anti-lumière bleue.",
        image: "/assets/omnis-lens.png",
        handle: "omnis-lens-smart",
        price: "299 EUR",
        span: "col-span-1 md:col-span-1 row-span-1"
    },
    {
        id: 3,
        layout: "circadian",
        title: "CIRCADIAN OPTIMIZATION",
        subtitle: "BIO-ADAPTIVE LIGHT // WELLNESS",
        description: "Solution de biohacking lumineuse pour synchroniser votre rythme circadien au quotidien.",
        image: "/assets/omnis-aura.png",
        handle: "omnis-aura-lamp",
        price: "455 EUR",
        span: "col-span-1 md:col-span-1 row-span-1"
    }
];

function PanzeraCard({ collection, index }: { collection: typeof collections[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.23, 1, 0.32, 1] }}
            className={`relative group overflow-hidden bg-[#0A0A0A] border border-white/5 rounded-3xl ${collection.span}`}
        >
            <Link href={`/products/${collection.handle}`} className="block w-full h-full relative">
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:mix-blend-normal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                    {/* Top Labels */}
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-electric-blue/80">
                                /// {collection.subtitle}
                            </span>
                            <span className="text-[10px] font-mono text-white/40">
                                {collection.price}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur group-hover:border-electric-blue group-hover:text-electric-blue transition-colors">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Main Title based on Layout */}
                    <div>
                        <h3 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-white leading-[0.9] mb-4">
                            {collection.title}
                        </h3>
                        <p className="text-xs text-white/60 font-mono max-w-[80%] leading-relaxed border-l-2 border-white/10 pl-3">
                            {collection.description}
                        </p>
                    </div>
                </div>

                {/* Technical Grid Overlay on Card */}
                <div className="absolute inset-0 border border-white/5 pointer-events-none" />

                {/* Micro-interaction: Acquire Asset */}
                <div className="absolute bottom-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-electric-blue/10 backdrop-blur border-t border-l border-electric-blue/20">
                    <span className="text-[10px] font-mono text-electric-blue font-bold tracking-wider">
                        ACQUIRE ASSET -&gt;
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ProductGrid() {
    return (
        <section className="relative py-32 bg-black z-10">
            {/* Background Grid Lines specific to section */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="container mx-auto h-full border-r border-l border-white/5" />
            </div>

            <div className="container mx-auto px-6">
                {/* Section Header with Web 3.0 / Tesla Style */}
                <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-white/40 text-xs font-mono tracking-widest uppercase">
                                Eth Mainnet Active
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                            Wearable Intelligence
                        </h2>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="text-[10px] font-mono text-white/40">
                            BLOCK: #18293402<br />HASH: 0x7a...9f2
                        </div>
                    </div>
                </div>

                {/* Asymmetric Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
                    {collections.map((collection, index) => (
                        <PanzeraCard
                            key={collection.id}
                            collection={collection}
                            index={index}
                        />
                    ))}
                </div>

                {/* Massive Footer Typography */}
                <div className="mt-32 border-t border-white/10 pt-8 overflow-hidden select-none opacity-20 hover:opacity-40 transition-opacity duration-1000">
                    <h1 className="text-[12vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent tracking-tighter text-center">
                        OMNIS TECH
                    </h1>
                </div>
            </div>
        </section>
    );
}
