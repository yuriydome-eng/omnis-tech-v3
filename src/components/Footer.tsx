"use client";

export default function Footer() {
    return (
        <footer className="bg-white py-24 border-t border-[#F2F2F4]">
            <div className="container mx-auto px-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-20">
                    <div className="max-w-xs">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-5 h-5 bg-black" />
                            <span className="text-xl font-black tracking-tighter uppercase font-heading">Omnis</span>
                        </div>
                        <p className="text-xs text-[#86868B] leading-relaxed uppercase tracking-widest leading-loose">
                            Designed in Paris. engineered for the future. Omnis tech represents the pinnacle of wearable intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-8">Collection</h4>
                            <ul className="space-y-4 text-[10px] font-mono tracking-widest text-[#86868B]">
                                <li><a href="#" className="hover:text-black transition-colors">Omnis Ring</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Omnis Lens</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Omnis Aura</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-8">Support</h4>
                            <ul className="space-y-4 text-[10px] font-mono tracking-widest text-[#86868B]">
                                <li><a href="#" className="hover:text-black transition-colors">Hustle Support</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-black mb-8">Social</h4>
                            <ul className="space-y-4 text-[10px] font-mono tracking-widest text-[#86868B]">
                                <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-24 pt-8 border-t border-[#F2F2F4] flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#86868B] uppercase">© 2026 OMNIS TECH — ALL RIGHTS RESERVED.</span>
                    <span className="text-[9px] font-mono tracking-widest text-black/20 uppercase">PROTOCOL STATUS: OPTIMAL</span>
                </div>
            </div>
        </footer>
    );
}
