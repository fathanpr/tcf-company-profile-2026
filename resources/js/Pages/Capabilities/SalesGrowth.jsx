import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { TrendingUp, Milestone, Target, Award, Rocket, Trophy, Globe, Home, Settings, Flag, Medal, ArrowUpRight } from 'lucide-react';
import Chart from 'react-apexcharts';

export default function SalesGrowth() {
    const milestones = [
        { year: "2024", title: "Building up Manufacturing Infrastructure", icon: <Globe className="text-white w-6 h-6" />, color: "bg-orange-600", textColor: "text-orange-600", desc: "Strengthening our foundation with state-of-the-art facilities." },
        { year: "2025", title: "2nd Tier with 1st Tier Standard Operation", icon: <Home className="text-white w-6 h-6" />, color: "bg-amber-600", textColor: "text-amber-600", desc: "Elevating our operations to first-tier quality standards." },
        { year: "2026", title: "Excellence Operation", icon: <Settings className="text-white w-6 h-6" />, color: "bg-orange-500", textColor: "text-orange-500", desc: "Achieving peak operational efficiency and reliability." },
        { year: "2027", title: "Benchmark Factory in 2nd Tier", icon: <Flag className="text-white w-6 h-6" />, color: "bg-red-600", textColor: "text-red-600", desc: "Setting the industry standard for second-tier manufacturers." },
        { year: "2028", title: "Building Focus Industry 4.0 and 5.0", icon: <Medal className="text-white w-6 h-6" />, color: "bg-purple-600", textColor: "text-purple-600", desc: "Integrating advanced robotics and smart technology." },
        { year: "2029", title: "Irreplaceable Supplier", icon: <Trophy className="text-white w-6 h-6" />, color: "bg-yellow-600", textColor: "text-yellow-600", desc: "Becoming a strategic, long-term partner for global leaders." },
    ];

    const salesData = [
        { year: "2021", value: 104.89 },
        { year: "2022", value: 472.98 },
        { year: "2023", value: 651.91 },
        { year: "2024", value: 406.12 },
        { year: "2025", value: 526.18 },
        { year: "2026", value: 826.00, projected: true },
    ];

    const maxValue = Math.max(...salesData.map(d => d.value));

    // ApexCharts Config
    const chartOptions = {
        chart: {
            id: 'sales-growth-chart',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        xaxis: {
            categories: salesData.map(d => d.year),
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontWeight: 700,
                    fontSize: '11px'
                }
            }
        },
        yaxis: {
            labels: {
                formatter: (val) => `${val}B`,
                style: {
                    colors: '#94a3b8',
                    fontWeight: 700
                }
            }
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4
        },
        colors: ['#f97316', '#fbbf24'],
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '40%',
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            width: [0, 4],
            curve: 'smooth'
        },
        markers: {
            size: 5,
            strokeWidth: 3,
            strokeColors: '#ffffff'
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            fontWeight: 700,
            fontSize: '10px',
            markers: { radius: 4 }
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: (val) => `IDR ${val} Billion`
            }
        }
    };

    const chartSeries = [
        {
            name: 'Sales Revenue',
            type: 'bar',
            data: salesData.map(d => d.value)
        },
        {
            name: 'Growth Trend',
            type: 'line',
            data: salesData.map(d => d.value)
        }
    ];

    return (
        <MainLayout title="Sales & Growth">
            <Head title="Sales & Growth - PT Tri Centrum Fortuna" />

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
                            <TrendingUp className="w-4 h-4" />
                            Future Growth
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Sales & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Growth</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Driving sustainable growth through innovation and strategic expansion,
                            committed to becoming the irreplaceable partner in the automotive sector.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Milestone Responsive Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-xl mx-auto text-center mb-20">
                        <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Strategic Roadmap</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">Target & Milestones</h2>
                        <div className="w-20 h-1.5 bg-orange-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    {/* Desktop View: Polished Staircase (visible on Large screens) */}
                    <div className="hidden lg:flex items-end justify-between gap-4 max-w-6xl mx-auto min-h-[500px] mb-10">
                        {milestones.map((m, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex-1 flex flex-col items-center group relative"
                            >
                                {/* Tooltip / Description Box (Hover) */}
                                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 bg-slate-900 text-white p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none shadow-2xl mb-4 transform group-hover:-translate-y-2">
                                    <p className="text-[11px] leading-relaxed text-slate-300">{m.desc}</p>
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rotate-45"></div>
                                </div>

                                {/* Floating Icon */}
                                <div className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center shadow-lg mb-6 ring-4 ring-white relative z-20 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                                    {m.icon}
                                </div>

                                {/* Stair Block */}
                                <div
                                    className={`w-full ${m.color} rounded-t-[32px] relative shadow-xl overflow-hidden group-hover:brightness-110 transition-all flex flex-col items-center pt-10 px-4`}
                                    style={{ height: `${(idx + 1) * 60 + 100}px` }}
                                >
                                    <div className="absolute inset-x-0 top-0 h-2 bg-white/10"></div>
                                    <div className="mb-4">
                                        <span className="text-white/20 font-black text-5xl tracking-tighter">{m.year}</span>
                                    </div>
                                    <h4 className="text-white font-bold text-xs uppercase tracking-wider leading-tight text-center relative z-10">{m.title}</h4>

                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile & Tablet View: Clean Vertical List (visible below Large screens) */}
                    <div className="lg:hidden grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {milestones.map((m, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex gap-5 p-6 bg-slate-50 rounded-[32px] border border-slate-100 items-start hover:bg-white hover:shadow-xl transition-all group"
                            >
                                <div className={`w-14 h-14 shrink-0 rounded-2xl ${m.color} flex items-center justify-center shadow-lg text-white`}>
                                    {m.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-xl font-black ${m.textColor} opacity-80`}>{m.year}</span>
                                        <div className="h-px flex-1 bg-slate-200"></div>
                                    </div>
                                    <h4 className="text-base font-black text-slate-900 mb-1 leading-tight">{m.title}</h4>
                                    <p className="text-slate-500 text-[13px] leading-relaxed">{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sales Chart Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Financial Report</span>
                            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">Sales & Growth Analysis</h2>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Our performance reflects the trust of our partners. We recorded significant growth starting from 2022, with a target to reach IDR 826 Billion by 2026 through operational excellence and capacity expansion.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                        <span className="text-slate-500 text-sm font-bold uppercase">Sales (Billion)</span>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">826<span className="text-sm font-normal text-slate-400 ml-1">TRG</span></p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                        <span className="text-slate-500 text-sm font-bold uppercase">Growth Trend</span>
                                    </div>
                                    <p className="text-3xl font-black text-slate-900">+45%<span className="text-sm font-normal text-slate-400 ml-1">AVG</span></p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-xl border border-slate-100 relative overflow-hidden">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <TrendingUp className="text-blue-600 w-5 h-5" />
                                    Sales Performance Record
                                </h3>
                            </div>

                            <div className="min-h-[350px] w-full">
                                <Chart
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="line"
                                    height={350}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-24 pt-10 border-t border-slate-200 flex flex-wrap justify-center gap-6">
                        <Link
                            href={route('capabilities.production-quality')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-lg group"
                        >
                            Production & Quality
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
