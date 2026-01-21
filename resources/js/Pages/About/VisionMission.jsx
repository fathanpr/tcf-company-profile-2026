import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

export default function VisionMission() {
    return (
        <MainLayout>
            <Head>
                <title>Vision & Mission - PT Tri Centrum Fortuna | TCF Identity</title>
                <meta name="description" content="Discover TCF's vision to be the first-choice Tier 2 automotive partner in Indonesia. Our mission focuses on high-quality manufacturing and operational excellence." />
                <meta property="og:title" content="TCF Vision & Mission - Engineering the Future" />
                <meta property="og:description" content="Guided by excellence, integrity, and innovation. Learn more about PT Tri Centrum Fortuna's core identity." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`${typeof window !== 'undefined' ? window.location.origin : ''}/img/tcf-logo.png`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

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
                                Tri Centrum Fortuna began its operations in 2017 as a company specializing in stamping, welding, painting, and machining of high-precision parts used primarily in the automotive industry and other sectors.
                            </p>
                            <p>
                                PT Tri Centrum Fortuna is fully committed to prioritizing customer satisfaction by delivering orders on time, with the right quality and quantity, accompanied by a spirit of persistence and dedication.
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
                                    VISION
                                </h3>
                                <p className="text-slate-700 font-medium italic">
                                    "Striving to be the first-choice second-tier metal parts manufacturing company and the best partner by fostering cooperation, continuous improvement, and innovation."
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
                                    MISSION
                                </h3>
                                <ul className="space-y-4 text-slate-700">
                                    <li className="flex gap-3">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 flex-shrink-0"></span>
                                        <span>Manufacturing high-quality components in a safe and comfortable working environment to meet the expectations and satisfaction of our partners.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2.5 flex-shrink-0"></span>
                                        <span>Building effective and efficient organizational management by aligning and developing human resources in terms of skills, work ethic, and welfare to achieve superior corporate governance, operational sustainability, and profitability.</span>
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
