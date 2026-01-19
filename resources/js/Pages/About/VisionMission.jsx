import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function VisionMission() {
    return (
        <MainLayout title="Vision & Mission">
            <Head title="Vision & Mission - PT Tri Centrum Fortuna" />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-600/10 via-transparent to-slate-900"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Building2 className="w-4 h-4" />
                            Our Identity
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Vision & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Mission</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Our guiding principles and long-term goals for success,
                            committed to excellence in every component we manufacture.
                        </p>
                    </motion.div>
                </div>
            </div>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        {/* History / Intro */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-12 text-slate-700 leading-relaxed text-lg"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-6 border-b-2 border-orange-500 inline-block">TRI CENTRUM FORTUNA</h2>
                            <p className="mb-6">
                                Tri Centrum Fortuna mulai beroperasi pada tahun 2017 sebagai perusahaan yang bergerak di bidang stamping, welding, painting, dan machining untuk suku cadang berpresisi tinggi yang digunakan dalam industri otomotif khususnya dan industri lainnya.
                            </p>
                            <p>
                                PT. Tri Centrum Fortuna berkomitmen penuh untuk mengutamakan kepuasan pelanggan, dengan cara mengirimkan pesanan pelanggan secara tepat waktu, tepat kualitas dan tepat kuantitas disertai semangat dan sikap pantang menyerah.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 mt-16">
                            {/* Vision */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                                    VISI
                                </h3>
                                <p className="text-slate-700 font-medium italic">
                                    "Berusaha untuk menjadi perusahaan manufaktur suku cadang metal second-tier pilihan pertama dan mitra terbaik dengan membina kerja sama, perbaikan berkelanjutan, dan inovasi."
                                </p>
                            </motion.div>

                            {/* Mission */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <h3 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-orange-600 rounded-full"></span>
                                    MISI
                                </h3>
                                <ul className="space-y-4 text-slate-700">
                                    <li className="flex gap-3">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 flex-shrink-0"></span>
                                        <span>Memproduksi komponen berkualitas tinggi dalam lingkungan kerja yang aman dan nyaman untuk memenuhi harapan dan kepuasan mitra.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 flex-shrink-0"></span>
                                        <span>Membangun pengelolaan organisasi yang efektif dan efisien dengan menyelaraskan dan mengembangkan sumber daya manusia dalam hal keterampilan, etos kerja, dan kesejahteraan untuk mencapai tata kelola perusahaan yang unggul, keberlanjutan operasional, dan profitabilitas.</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
