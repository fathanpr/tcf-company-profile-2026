import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

export default function Directors() {
    const directors = [
        {
            name: "Ir. John Doe",
            role: "President Director",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
            quote: "Leading with integrity to build a sustainable future for Indonesia's industry."
        },
        {
            name: "Jane Smith, M.B.A",
            role: "Operational Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            quote: "Operational excellence is the key to our consistent quality and delivery."
        },
        {
            name: "Robert Wijaya",
            role: "Finance Director",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
            quote: "Prudent financial management ensures long-term stability and growth."
        }
    ];

    return (
        <section className="py-24 bg-[#020617] relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-primary-400 tracking-widest uppercase text-xs font-bold mb-3 block">Leadership</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Board of Directors</h2>
                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        Our experienced leadership team guides TCF with strategic vision and unwavering dedication.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {directors.map((dir, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="group relative"
                        >
                            {/* Card Inner */}
                            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/5 shadow-lg group-hover:border-primary-500/30 transition-all duration-500">
                                {/* Image */}
                                <div className="h-80 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                                    <img
                                        src={dir.image}
                                        alt={dir.name}
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />

                                    {/* Socials Overlay */}
                                    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className="bg-white/10 hover:bg-white text-white hover:text-primary-900 p-2 rounded-full backdrop-blur-md transition-colors">
                                            <Linkedin size={18} />
                                        </button>
                                        <button className="bg-white/10 hover:bg-white text-white hover:text-primary-900 p-2 rounded-full backdrop-blur-md transition-colors">
                                            <Mail size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-10 -mt-20">
                                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl">
                                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">{dir.name}</h3>
                                        <p className="text-xs font-bold text-accent-400 uppercase tracking-wider mb-4">{dir.role}</p>
                                        <p className="text-slate-400 text-sm italic border-l-2 border-white/20 pl-3">
                                            "{dir.quote}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
