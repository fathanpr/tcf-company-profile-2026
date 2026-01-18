import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ClosingBrand() {
    const qualities = [
        { label: "Manufacturing Partner", desc: "Collaborating for mutual success, not just production." },
        { label: "Strong Culture", desc: "Built on EXIST values that empower our people." },
        { label: "High Standards", desc: "Uncompromising quality and precision in every part." },
        { label: "Long-Term Vision", desc: "Innovating today for a sustainable tomorrow." }
    ];

    return (
        <section className="py-32 bg-[#020617] relative overflow-hidden flex items-center justify-center">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-900/10 to-transparent"></div>
            <div className="absolute w-[800px] h-[800px] bg-accent-600/5 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                        More Than Just a Factory.
                    </h2>
                    <p className="text-xl md:text-2xl text-primary-200 font-light mb-16 max-w-3xl mx-auto">
                        We are TCF. Your strategic partner in building the future of industry.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {qualities.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.6 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group hover:-translate-y-2"
                            >
                                <div className="w-12 h-12 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.label}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
