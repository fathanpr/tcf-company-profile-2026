import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function WhoWeAre() {
    // Gallery State
    const [activeImage, setActiveImage] = useState(0);

    const images = [
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", // Industry / Welding
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200", // Factory Floor
        "https://images.unsplash.com/photo-1531297461136-82lw8e41f5e8?auto=format&fit=crop&q=80&w=1200", // Tech / Robotics
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200", // Workers
    ];

    return (
        <section className="py-20 md:py-28 bg-[#020617] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* LEFT: GALLERY SECTION */}
                    <div className="w-full lg:w-1/2">
                        {/* Main Image */}
                        <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-6 bg-slate-900">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={activeImage}
                                    src={images[activeImage]}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    alt="Who We Are Main"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>

                            {/* Overlay Badge (Optional) */}
                            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-xl">
                                <span className="block text-3xl font-bold text-white">25+</span>
                                <span className="text-sm text-slate-300">Years of Experience</span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative h-20 md:h-24 rounded-xl overflow-hidden transition-all duration-300 border-2 ${activeImage === idx ? 'border-primary-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: TEXT CONTENT */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="block text-primary-400 font-bold tracking-widest uppercase text-sm mb-4">Siapa Kita</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                                Excellence in Manufacturing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Innovation</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                PT Tri Centrum Fortuna is a leader in high-precision manufacturing, dedicated to driving Indonesia's industrial growth. We combine state-of-the-art technology with skilled craftsmanship to deliver superior quality products.
                            </p>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                Our commitment extends beyond production; we strive to empower our workforce and contribute sustainably to the communities we serve.
                            </p>

                            {/* Features List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                {['Advanced Robotics', 'Sustainable Practice', 'Global Standards', 'Expert Team'].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="text-accent-500 w-5 h-5 flex-shrink-0" />
                                        <span className="text-slate-200 font-medium">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="#" className="inline-flex items-center gap-3 bg-white text-primary-950 px-8 py-4 rounded-full font-bold hover:bg-slate-200 transition-all group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                Baca Selengkapnya <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
