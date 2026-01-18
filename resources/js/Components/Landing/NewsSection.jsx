import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, FileText } from 'lucide-react';

/**
 * Komponen NewsSection
 * Menampilkan berita terbaru dan laporan perusahaan.
 * 
 * Generate by Antigravity
 */
export default function NewsSection() {
    const news = [
        {
            category: 'Corporate News',
            date: 'Oct 24, 2025',
            title: 'TCF Expands Production Capacity with New 500T Press Line',
            image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=600'
        },
        {
            category: 'Sustainability',
            date: 'Sep 12, 2025',
            title: 'Achieving ISO 14001: Green Manufacturing Milestones',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
        },
        {
            category: 'Innovation',
            date: 'Aug 05, 2025',
            title: 'Integrating AI-Driven Quality Control Systems',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=600'
        }
    ];

    return (
        <section className="py-24 bg-transparent">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <span className="text-primary-400 tracking-widest uppercase text-xs font-bold mb-2 block">Updates</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">Latest News & Reports</h2>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-primary-400 font-bold hover:gap-3 transition-all">
                        View All News <ArrowRight size={18} />
                    </button>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {news.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/10">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-xs text-slate-400 font-medium mb-3">{item.date}</p>
                                <h3 className="text-lg font-bold text-white mb-4 group-hover:text-primary-400 transition-colors line-clamp-2">
                                    {item.title}
                                </h3>
                                <div className="flex items-center text-primary-400 font-bold text-sm gap-1 group-hover:gap-2 transition-all">
                                    Read More <ArrowRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Reports Section (Highlight) */}
                <div className="rounded-3xl bg-secondary-900/50 border border-white/10 p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600 rounded-full blur-[100px] opacity-20"></div>

                    <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Annual Sustainability Report 2025</h3>
                            <p className="text-slate-400 max-w-xl">
                                Discover how TCF is leading the charge in sustainable manufacturing and reduced carbon footprint.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-white text-secondary-900 rounded-full font-bold hover:bg-slate-100 transition-colors">
                                <Download size={18} /> Download PDF
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-colors">
                                <FileText size={18} /> View Online
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:hidden mt-8 text-center">
                    <button className="inline-flex items-center gap-2 text-primary-400 font-bold">
                        View All News <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}
