import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, Factory, Users, Zap, ShieldCheck, Microscope, Layers } from 'lucide-react';

export default function ProductionQuality() {
    const automationFeatures = [
        { title: "CNC Machine Automation", desc: "Robotic arm integration for high-precision CNC milling and turning operations.", icon: <Cpu />, img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=600" },
        { title: "Transfer Line System", desc: "Automated transfer lines with robotic handlers to optimize production flow.", icon: <Layers />, img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
        { title: "Stamping Robotization", desc: "Full automation for high-tonnage stamping presses using industrial robots.", icon: <Factory />, img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
    ];

    const manpowerData = [
        { year: "2021", vol: 173.5, mp: 434 },
        { year: "2022", vol: 201.1, mp: 1203 },
        { year: "2023", vol: 272.0, mp: 1216 },
        { year: "2024", vol: 210.3, mp: 1015 },
        { year: "2025", vol: 232.6, mp: 921 },
        { year: "2026", vol: 275.6, mp: 900, target: true },
    ];

    const qualityData = [
        { year: "2021", ncr: 406, target: 60 },
        { year: "2022", ncr: 336, target: 40 },
        { year: "2023", ncr: 215, target: 10 },
        { year: "2024", ncr: 34, target: 5 },
        { year: "2025", ncr: 12, target: 3 },
        { year: "2026", ncr: 0, target: 0 },
    ];

    const maxNCR = 450;
    const maxVol = 300;
    const maxMP = 1300;

    return (
        <MainLayout title="Production & Quality">
            <Head title="Production & Quality - PT Tri Centrum Fortuna" />

            {/* Hero Section */}
            <div className="relative pt-24 pb-12 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Production & Quality</h1>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Precision engineering driven by automation and a relentless pursuit of zero-defect quality standards.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Automation Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Industrial 4.0</span>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">Robotic Process Automation</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {automationFeatures.map((f, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="relative h-64 rounded-3xl overflow-hidden mb-6 shadow-xl border border-slate-100">
                                    <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                        <div className="p-2 bg-orange-600 rounded-lg text-white shadow-lg">
                                            {f.icon}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{f.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Efficiency & Quality Stats Section */}
            <section className="py-20 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* EFFICIENCY CHART */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100"
                        >
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Efficiency Trend</h3>
                                    <p className="text-slate-500 text-sm">Man Power vs Production Volume</p>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> MP</div>
                                    <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-400"></span> Vol</div>
                                </div>
                            </div>

                            <div className="h-[250px] flex items-end justify-between gap-2 md:gap-4 relative px-4">
                                {/* SVG Line for Vol Production */}
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        d={`M ${manpowerData.map((d, i) => `${(i / (manpowerData.length - 1)) * 100} ${100 - (d.vol / maxVol) * 100}`).join(' L ')}`}
                                        fill="none"
                                        stroke="#f97316"
                                        strokeWidth="2"
                                        vectorEffect="non-scaling-stroke"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    {manpowerData.map((d, i) => (
                                        <circle
                                            key={i}
                                            cx={`${(i / (manpowerData.length - 1)) * 100}`}
                                            cy={`${100 - (d.vol / maxVol) * 100}`}
                                            r="1.5"
                                            fill="#f97316"
                                        />
                                    ))}
                                </svg>

                                {manpowerData.map((d, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center group relative z-10 h-full justify-end">
                                        {/* MP Bar */}
                                        <div
                                            className="w-full max-w-[35px] rounded-t-sm bg-yellow-400 shadow-md relative z-10 border border-yellow-500/20"
                                            style={{ height: `${(d.mp / maxMP) * 100}%` }}
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 rounded shadow-sm border border-slate-100">{d.mp}</div>
                                        </div>
                                        <span className="mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{d.year}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-8 text-xs text-slate-400 italic text-center">
                                *In 2026, we aim for maximum output with optimized workforce through high-level automation.
                            </p>
                        </motion.div>

                        {/* QUALITY CHART (NCR) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100 relative"
                        >
                            <div className="flex justify-between items-start mb-10 relative z-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">Quality Performance</h3>
                                    <p className="text-slate-500 text-sm">NCR Cases (Non-Conformance Reports)</p>
                                </div>
                                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5 text-slate-900"><span className="w-3 h-3 rounded-sm bg-orange-400"></span> NCR</div>
                                    <div className="flex items-center gap-1.5 text-slate-900"><span className="w-3 h-3 rounded-full border-2 border-red-500 bg-white"></span> Target</div>
                                </div>
                            </div>

                            <div className="h-[250px] flex items-end justify-between gap-2 md:gap-4 relative px-4 z-10">
                                {/* SVG Line for Target NCR (Dotted Red) */}
                                <svg
                                    className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                >
                                    <motion.path
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5 }}
                                        d={`M ${qualityData.map((d, i) => `${(i / (qualityData.length - 1)) * 100} ${100 - (d.target / maxNCR) * 100}`).join(' L ')}`}
                                        fill="none"
                                        stroke="#ef4444"
                                        strokeWidth="2"
                                        strokeDasharray="4 4"
                                        vectorEffect="non-scaling-stroke"
                                    />
                                    {qualityData.map((d, i) => (
                                        <circle
                                            key={i}
                                            cx={`${(i / (qualityData.length - 1)) * 100}`}
                                            cy={`${100 - (d.target / maxNCR) * 100}`}
                                            r="1.5"
                                            fill="#ef4444"
                                        />
                                    ))}
                                </svg>

                                {qualityData.map((d, idx) => (
                                    <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                                        <div
                                            className={`w-full max-w-[35px] rounded-t-lg transition-all duration-700 shadow-md ${d.ncr === 0 ? 'bg-emerald-500' : 'bg-orange-400 border border-orange-500/20'}`}
                                            style={{ height: `${Math.max(2, (d.ncr / maxNCR) * 100)}%` }}
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 rounded shadow-sm border border-slate-100">{d.ncr}</div>
                                            {d.ncr === 0 && (
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                                                    <CheckCircle2 className="text-emerald-500 w-5 h-5 drop-shadow-sm" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="mt-4 text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{d.year}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-4 relative z-10">
                                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-3xl shadow-inner">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Target NCR 2026</span>
                                    <span className="text-2xl font-black text-emerald-600">0.00</span>
                                </div>
                                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-3xl shadow-inner">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Status</span>
                                    <span className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        World Class <Zap className="w-3 h-3 text-orange-500 animate-pulse" />
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
