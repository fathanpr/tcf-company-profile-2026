import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, Package, Clock, Building2, ArrowUpRight, Maximize2 } from 'lucide-react';

export default function LoadingCapacity() {
    const plantsData = [
        {
            name: "Purwakarta Plant",
            id: "purwakarta",
            years: ["2025", "2026", "2027", "2028"],
            stats: [
                { small: 170, medium: 25, big: 5, total: 200 },
                { small: 180, medium: 30, big: 8, total: 218 },
                { small: 200, medium: 35, big: 10, total: 245 },
                { small: 210, medium: 40, big: 15, total: 265 },
            ],
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-100"
        },
        {
            name: "Karawang Plant",
            id: "karawang",
            years: ["2025", "2026", "2027", "2028"],
            stats: [
                { small: 110, medium: 15, big: 5, total: 130 },
                { small: 125, medium: 20, big: 8, total: 153 },
                { small: 140, medium: 25, big: 12, total: 177 },
                { small: 150, medium: 30, big: 15, total: 195 },
            ],
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100"
        }
    ];

    const maxTotal = 300;

    return (
        <MainLayout title="Loading Capacity">
            <Head title="Loading Capacity - PT Tri Centrum Fortuna" />

            {/* Hero Section */}
            <div className="relative pt-24 pb-12 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Loading Capacity</h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Strategic capacity planning across our manufacturing facilities to ensure on-time delivery for complex automotive projects.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Capacity Overview */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {plantsData.map((plant, pIdx) => (
                            <motion.div
                                key={pIdx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`p-8 md:p-10 rounded-[40px] border ${plant.border} ${plant.bg} overflow-hidden relative group`}
                            >
                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <Building2 className={`${plant.color} w-6 h-6`} />
                                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{plant.name}</h3>
                                        </div>
                                        <p className="text-slate-500 text-sm">Projected Output (Millions of Strokes)</p>
                                    </div>
                                    <BarChart3 className={`${plant.color} opacity-20 w-12 h-12`} />
                                </div>

                                <div className="h-[300px] flex items-end justify-between gap-3 md:gap-6 relative px-4 z-10">
                                    {/* Capacity Shift Lines */}
                                    <svg
                                        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                    >
                                        {/* Shift 1 (Blue) */}
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 1.5 }}
                                            d={`M ${plant.stats.map((s, i) => `${(i / (plant.stats.length - 1)) * 100} ${100 - (80 / maxTotal) * 100}`).join(' L ')}`}
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="1.5"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        {/* Shift 2 (Orange) */}
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, delay: 0.2 }}
                                            d={`M ${plant.stats.map((s, i) => `${(i / (plant.stats.length - 1)) * 100} ${100 - (160 / maxTotal) * 100}`).join(' L ')}`}
                                            fill="none"
                                            stroke="#f97316"
                                            strokeWidth="1.5"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                        {/* Shift 3 (Grey) */}
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 1.5, delay: 0.4 }}
                                            d={`M ${plant.stats.map((s, i) => `${(i / (plant.stats.length - 1)) * 100} ${100 - (240 / maxTotal) * 100}`).join(' L ')}`}
                                            fill="none"
                                            stroke="#94a3b8"
                                            strokeWidth="1.5"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>

                                    {plant.stats.map((s, idx) => (
                                        <div key={idx} className="flex-1 flex flex-col items-center group/bar relative">
                                            {/* Stacked Bar */}
                                            <div className="w-full max-w-[40px] flex flex-col-reverse relative h-full justify-end">
                                                {/* Big (Green as visual) */}
                                                <div
                                                    className="w-full bg-[#10b981] rounded-t-sm"
                                                    style={{ height: `${(s.big / maxTotal) * 100}%` }}
                                                    title={`Big: ${s.big}M`}
                                                ></div>
                                                {/* Medium (Light Blue as visual) */}
                                                <div
                                                    className="w-full bg-[#38bdf8] border-b border-white/20"
                                                    style={{ height: `${(s.medium / maxTotal) * 100}%` }}
                                                    title={`Medium: ${s.medium}M`}
                                                ></div>
                                                {/* Small (Yellow as visual) */}
                                                <div
                                                    className="w-full bg-[#fbbf24] rounded-b-md border-b border-white/20"
                                                    style={{ height: `${(s.small / maxTotal) * 100}%` }}
                                                    title={`Small: ${s.small}M`}
                                                ></div>

                                                {/* Total Tooltip */}
                                                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-40">
                                                    Total: {s.total}M
                                                </div>
                                                {/* Label Angka Statis */}
                                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] font-black text-slate-700 whitespace-nowrap">
                                                    {s.total}M
                                                </div>
                                            </div>
                                            <span className="mt-4 text-[10px] font-bold text-slate-500">{plant.years[idx]}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Legend */}
                                <div className="mt-12 flex flex-wrap gap-4 text-[9px] font-black uppercase tracking-widest relative z-10 border-t border-slate-200/50 pt-6">
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#fbbf24]"></div><span>Small</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#38bdf8]"></div><span>Medium</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#10b981]"></div><span>Big</span></div>
                                    <div className="flex items-center gap-1.5 ml-auto"><div className="w-2.5 h-0.5 bg-[#3b82f6]"></div><span>Shift 1</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-[#f97316]"></div><span>Shift 2</span></div>
                                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-0.5 bg-[#94a3b8]"></div><span>Shift 3</span></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Details */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px]"></div>

                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    Operational Strategy <LineChart className="text-orange-500" />
                                </h3>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                <Clock className="text-blue-400 w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xl mb-1 text-blue-400">3-Shift System</h4>
                                                <p className="text-slate-400 text-sm leading-relaxed">Full utilization of capacity with a structured three-shift rotation to 24/7 ensure continuous production cycles.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                                <Maximize2 className="text-orange-400 w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-xl mb-1 text-orange-400">Scalable Infrastructure</h4>
                                                <p className="text-slate-400 text-sm leading-relaxed">Proactive expansion projects planned from 2025 to 2028 to maintain 20%+ annual growth in strokes.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl h-full flex flex-col justify-center">
                                        <Package className="text-emerald-400 w-10 h-10 mb-4" />
                                        <h4 className="font-bold text-xl mb-2 text-white">Full Tonnage Range</h4>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-6">Our capacity spans from small precision components to large structural parts using 1500T robotic transfer lines.</p>
                                        <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase cursor-pointer group">
                                            Explore Facilities <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
