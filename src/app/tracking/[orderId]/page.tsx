"use client";

import { useParams } from "next/navigation";
import { Box, CheckCircle2, MapPin, Search, Terminal } from "lucide-react";

export default function TrackingPage() {
    const { orderId } = useParams();

    const blocks = [
        { status: "Transaction Minée", time: "Feb-15-2024 02:15:02 PM", desc: "La commande a été validée sur le réseau.", active: true },
        { status: "Smart Contract Exécuté", time: "Feb-15-2024 02:22:45 PM", desc: "Préparation logistique via AutoDS Protocol.", active: true },
        { status: "Nœud de Transit", time: "Pending", desc: "Transit en cours vers le nœud de destination.", active: false },
        { status: "Livraison Confirmée", time: "Final Block", desc: "Signature du destinataire requise sur la blockchain.", active: false },
    ];

    return (
        <main className="min-h-screen bg-black pt-32 pb-20 font-mono">
            <div className="container mx-auto px-6">
                {/* Header Style "Etherscan" */}
                <div className="glass-card p-8 border-b-0 rounded-b-none mb-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Terminal className="text-electric-blue w-4 h-4" />
                                <span className="text-xs font-bold text-electric-blue uppercase tracking-widest">Omnis Scan | Block Explorer</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-black font-outfit uppercase tracking-tighter text-white">
                                TX Hash: <span className="text-titanium break-all">{orderId || "0x7a...f92d"}</span>
                            </h1>
                        </div>
                        <div className="bg-electric-blue/10 border border-electric-blue/20 px-6 py-3 rounded-md">
                            <span className="text-[10px] text-electric-blue font-bold uppercase block mb-1">Status</span>
                            <span className="text-white font-bold flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                Mining in Progress...
                            </span>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder Holographic */}
                <div className="h-64 glass-card border-t-0 rounded-t-none bg-blue-500/5 overflow-hidden relative mb-12">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:30px_30px]" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin className="text-electric-blue w-12 h-12 mx-auto mb-4 animate-bounce" />
                            <p className="text-xs uppercase tracking-[0.5em] text-electric-blue font-bold">Localisation Holographique Active</p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent" />
                </div>

                {/* Blockchain Status List */}
                <div className="grid grid-cols-1 gap-4">
                    {blocks.map((block, i) => (
                        <div key={i} className={`glass-card p-6 border-l-4 transition-all duration-300 ${block.active ? 'border-l-green-500 bg-white/[0.03]' : 'border-l-white/10 opacity-40'}`}>
                            <div className="flex items-start gap-6">
                                <div className={`mt-1 p-3 rounded-lg ${block.active ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-titanium'}`}>
                                    {block.active ? <CheckCircle2 className="w-5 h-5" /> : <Box className="w-5 h-5" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-1">
                                        <h3 className="text-lg font-bold font-outfit text-white uppercase">{block.status}</h3>
                                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-titanium">Block #{450239 + i}</span>
                                    </div>
                                    <p className="text-xs text-titanium font-light mb-2">{block.desc}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                                        <Search className="w-3 h-3" />
                                        Explorer Log: {block.time}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
