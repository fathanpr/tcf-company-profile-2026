import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Cpu, CheckCircle2, Factory, Users, Zap, ShieldCheck, Microscope, Layers, TrendingUp, ArrowUpRight } from 'lucide-react';
import Chart from 'react-apexcharts';

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

    // Efficiency Chart Config
    const efficiencyOptions = {
        chart: {
            id: 'efficiency-chart',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        xaxis: {
            categories: manpowerData.map(d => d.year),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#94a3b8', fontWeight: 700, fontSize: '11px' }
            }
        },
        yaxis: [
            {
                title: { text: "Man Power", style: { color: "#eab308", fontWeight: 700 } },
                labels: { style: { colors: '#94a3b8', fontWeight: 700 } }
            },
            {
                opposite: true,
                title: { text: "Volume (M)", style: { color: "#f97316", fontWeight: 700 } },
                labels: { style: { colors: '#94a3b8', fontWeight: 700 } }
            }
        ],
        grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
        colors: ['#eab308', '#f97316'],
        plotOptions: {
            bar: { borderRadius: 4, columnWidth: '40%' }
        },
        dataLabels: { enabled: false },
        stroke: { width: [0, 3], curve: 'smooth' },
        markers: { size: [0, 4], strokeWidth: 2, strokeColors: '#fff' },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            fontWeight: 700,
            fontSize: '10px'
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false
        }
    };

    const efficiencySeries = [
        { name: 'Man Power', type: 'bar', data: manpowerData.map(d => d.mp) },
        { name: 'Production Volume', type: 'line', data: manpowerData.map(d => d.vol) }
    ];

    // Quality Chart Config
    const qualityOptions = {
        chart: {
            id: 'quality-chart',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        xaxis: {
            categories: qualityData.map(d => d.year),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: '#94a3b8', fontWeight: 700, fontSize: '11px' }
            }
        },
        yaxis: {
            labels: { style: { colors: '#94a3b8', fontWeight: 700 } }
        },
        grid: { borderColor: '#f1f5f9', strokeDashArray: 4 },
        colors: ['#f97316', '#ef4444'],
        plotOptions: {
            bar: { borderRadius: 4, columnWidth: '45%' }
        },
        dataLabels: { enabled: false },
        stroke: { width: [0, 2], dashArray: [0, 5] },
        markers: { size: [0, 4], strokeWidth: 2, strokeColors: '#fff' },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            fontWeight: 700,
            fontSize: '10px'
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false
        }
    };

    const qualitySeries = [
        { name: 'NCR Cases', type: 'bar', data: qualityData.map(d => d.ncr) },
        { name: 'Target NCR', type: 'line', data: qualityData.map(d => d.target) }
    ];

    return (
        <MainLayout title="Production & Quality">
            <Head title="Production & Quality - PT Tri Centrum Fortuna" />

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
                            <ShieldCheck className="w-4 h-4" />
                            Precision & Reliability
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Production & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Quality</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Precision engineering driven by automation and a relentless
                            pursuit of zero-defect quality standards.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Automation Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Industrial 4.0</span>
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
                            <div className="min-h-[300px] w-full">
                                <Chart
                                    options={efficiencyOptions}
                                    series={efficiencySeries}
                                    type="line"
                                    height={300}
                                />
                            </div>
                            <p className="mt-4 text-[10px] text-slate-400 italic text-center">
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
                            <div className="min-h-[300px] w-full">
                                <Chart
                                    options={qualityOptions}
                                    series={qualitySeries}
                                    type="line"
                                    height={300}
                                />
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

                    {/* Navigation Buttons */}
                    <div className="mt-24 pt-10 border-t border-slate-200 flex flex-wrap justify-center gap-6">
                        <Link
                            href={route('capabilities.sales-growth')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg group"
                        >
                            Sales Growth
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                        <Link
                            href={route('capabilities.loading-capacity')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:border-orange-600 hover:text-orange-600 transition-all shadow-sm group"
                        >
                            Loading Capacity
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
