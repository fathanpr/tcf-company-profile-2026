import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { BarChart3, LineChart, Package, Clock, Building2, ArrowUpRight, Maximize2 } from 'lucide-react';
import Chart from 'react-apexcharts';

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
            color: "text-orange-600",
            bg: "bg-orange-50",
            border: "border-orange-100"
        }
    ];

    const maxTotal = 300;

    const getChartOptions = (plant) => ({
        chart: {
            stacked: true,
            toolbar: { show: false },
            zoom: { enabled: false },
            background: 'transparent'
        },
        xaxis: {
            categories: plant.years,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: {
                    colors: '#64748b',
                    fontWeight: 700,
                    fontSize: '11px'
                }
            }
        },
        yaxis: {
            max: maxTotal,
            labels: {
                formatter: (val) => `${val}M`,
                style: {
                    colors: '#94a3b8',
                    fontWeight: 700
                }
            }
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4,
            padding: { left: 10, right: 10 }
        },
        colors: ['#fbbf24', '#f59e0b', '#f97316', '#ea580c', '#d97706', '#94a3b8'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '40%',
                dataLabels: {
                    position: 'top',
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val, opts) => {
                // Only show total label if it's the top bar (Big)
                if (opts.seriesIndex === 2) {
                    const total = plant.stats[opts.dataPointIndex].total;
                    return `${total}M`;
                }
                return '';
            },
            offsetY: -20,
            style: {
                fontSize: '10px',
                colors: ["#334155"]
            }
        },
        stroke: {
            width: [0, 0, 0, 2, 2, 2],
            curve: 'smooth',
            dashArray: [0, 0, 0, 0, 0, 0]
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '10px',
            fontWeight: 700,
            markers: { radius: 4 },
            itemMargin: { horizontal: 10, vertical: 5 }
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: (val) => `${val} Million Strokes`
            }
        },
        markers: {
            size: [0, 0, 0, 4, 4, 4],
            strokeWidth: 2,
            strokeColors: '#fff'
        }
    });

    const getChartSeries = (plant) => [
        {
            name: 'Small Parts',
            type: 'bar',
            data: plant.stats.map(s => s.small)
        },
        {
            name: 'Medium Parts',
            type: 'bar',
            data: plant.stats.map(s => s.medium)
        },
        {
            name: 'Big Parts',
            type: 'bar',
            data: plant.stats.map(s => s.big)
        },
        {
            name: 'Shift 1 Cap',
            type: 'line',
            data: Array(plant.years.length).fill(80)
        },
        {
            name: 'Shift 2 Cap',
            type: 'line',
            data: Array(plant.years.length).fill(160)
        },
        {
            name: 'Shift 3 Cap',
            type: 'line',
            data: Array(plant.years.length).fill(240)
        }
    ];

    return (
        <MainLayout>
            <Head>
                <title>Loading Capacity & Operational Scale - PT Tri Centrum Fortuna</title>
                <meta name="description" content="Analyze TCF's production loading capacity and efficiency. Our scalable infrastructure is ready to meet high-volume automotive component demands." />
                <meta property="og:title" content="TCF Loading Capacity - Scalable Manufacturing Powerhouse" />
                <meta property="og:description" content="Optimized production lines and high-capacity facilities for Tier 1 and Tier 2 automotive partners." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`${typeof window !== 'undefined' ? window.location.origin : ''}/img/tcf-logo.png`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 left-0 find w-full h-full bg-gradient-to-b from-brand-primary via-transparent to-slate-900"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-secondary text-xs font-bold uppercase tracking-widest mb-6">
                            <Clock className="w-4 h-4" />
                            Reliable Output
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Loading <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Capacity</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Strategic capacity planning across our manufacturing facilities
                            to ensure on-time delivery for complex automotive projects.
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

                                <div className="min-h-[400px] w-full relative z-10">
                                    <Chart
                                        options={getChartOptions(plant)}
                                        series={getChartSeries(plant)}
                                        type="line"
                                        height={400}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Details */}
            <section className="pt-0 pb-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px]"></div>

                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    Operational Strategy <LineChart className="text-brand-primary" />
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
                                        <Link
                                            href={route('about.facilities')}
                                            className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase cursor-pointer group hover:text-emerald-300 transition-colors"
                                        >
                                            Explore Facilities <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            href={route('capabilities.production-quality')}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 border border-slate-200 font-bold rounded-2xl hover:border-orange-600 hover:text-orange-600 transition-all shadow-sm group"
                        >
                            Production & Quality
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
