import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Globe, Award, Zap, Shield, Target, Compass } from 'lucide-react';

export default function Home({ translations }) {
    // --- Data & State ---
    const values = [
        { letter: 'E', title: 'Empowerment', desc: 'Giving our people the strength and confidence to achieve more.' },
        { letter: 'X', title: 'Excellence', desc: 'Striving for highest quality and distinction in everything we do.' },
        { letter: 'I', title: 'Integrity', desc: 'Upholding honesty and strong moral principles in our business.' },
        { letter: 'S', title: 'Service', desc: 'Dedication to meeting customer needs with superior service.' },
        { letter: 'T', title: 'Tenacity', desc: 'Persistent determination to overcome challenges and succeed.' }
    ];

    const capabilities = [
        {
            title: 'Precision Stamping',
            desc: 'High-tonnage press capabilities delivering intricate automotive components with micron-level accuracy.',
            icon: <Award className="w-12 h-12 text-orange-500" />,
            image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: 'Robotic Welding',
            desc: 'State-of-the-art automated welding lines ensuring structural integrity and consistent quality for safety-critical parts.',
            icon: <Zap className="w-12 h-12 text-blue-500" />,
            image: "https://images.unsplash.com/photo-1531297461136-82lw8e41f5e8?auto=format&fit=crop&q=80&w=800"
        },
        {
            title: 'Assembly & Tooling',
            desc: 'End-to-end assembly solutions and in-house tooling maintenance to guarantee uninterrupted production flow.',
            icon: <Shield className="w-12 h-12 text-green-500" />,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
        }
    ];

    const products = [
        { name: 'Chassis Components', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=400' },
        { name: 'Body Shell Parts', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=400' },
        { name: 'Suspension Systems', image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=400' },
        { name: 'Engine Brackets', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400' }
    ];

    const news = [
        {
            category: 'Corporate',
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
        <MainLayout title={translations['Home'] || 'Home'}>

            {/* --- HERO SECTION --- */}
            <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
                {/* Background Image/Video Placeholder */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/img/hero-factory.png"
                        alt="Factory Future"
                        className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">Future Manufacturing</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                            Precision in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-500">Motion</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                            Advanced Welding & Stamping solutions for the automotive industry. We engineer the future with integrity and excellence.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#capabilities" className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2">
                                Our Capabilities <ArrowRight size={18} />
                            </a>
                            <a href="#about" className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-sm">
                                Explore TCF
                            </a>
                        </div>
                    </motion.div>

                    {/* Decorative Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl skew-y-3 hover:skew-y-2 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <Zap className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Smart Factory</h3>
                                    <p className="text-slate-400 text-xs">Industry 4.0 Ready</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                                    <Shield className="text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">ISO Certified</h3>
                                    <p className="text-slate-400 text-xs">Global Quality Standards</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- ABOUT US SECTION (Vision, Mission, Core Values) --- */}
            <section id="about" className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">About Us</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Driven by Vision, Guided by Values</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        {/* Vision */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                <Compass size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
                            <p className="text-slate-600 leading-relaxed">
                                To be a World Class Manufacturing Company, expanding towards the global market by consistently delivering superior quality products and sustainable innovation.
                            </p>
                        </div>
                        {/* Mission */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative group hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
                                <Target size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-orange-500" /> Total customer satisfaction via quality.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-orange-500" /> Enhance employee welfare & growth.</li>
                                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-orange-500" /> Positive contribution to shareholders & environment.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
                        <div className="relative z-10 text-center mb-12">
                            <h3 className="text-3xl font-bold mb-4">Our Core Values: <span className="text-orange-500">EXIST</span></h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center"
                                >
                                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-orange-400 mb-3">{val.letter}</div>
                                    <h4 className="font-bold text-lg mb-2">{val.title}</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">{val.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR CAPABILITIES SECTION --- */}
            <section id="capabilities" className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">What We Do</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Manufacturing Capabilities</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {capabilities.map((cap, idx) => (
                            <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                                <div className="h-48 overflow-hidden">
                                    <img src={cap.image} alt={cap.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-8 relative">
                                    <div className="absolute -top-10 right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                                        {cap.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{cap.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{cap.desc}</p>
                                    <a href="#contact" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                                        Learn more <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PRODUCT SECTION --- */}
            <section id="product" className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Our Output</span>
                            <h2 className="text-4xl font-bold mt-2">Quality Products</h2>
                        </div>
                        <p className="text-slate-400 max-w-md text-sm mt-4 md:mt-0">
                            Delivering high-precision components used by leading automotive manufacturers globally.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map((prod, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                className="relative rounded-2xl overflow-hidden group aspect-square bg-slate-800"
                            >
                                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                    <span className="font-bold text-white">{prod.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- NEWS SECTION --- */}
            <section id="news" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Latest Updates</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Company News</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {news.map((item, index) => (
                            <div key={index} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-xs text-slate-400 font-medium mb-3">{item.date}</p>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                    <span className="text-blue-500 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Read Article <ArrowRight size={14} /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <a href="#" className="inline-block px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-bold transition-colors">
                            View All News
                        </a>
                    </div>
                </div>
            </section>

            {/* --- LOCATION SECTION --- */}
            <section id="location" className="relative py-24 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/map-pattern.png')] opacity-10 bg-center bg-cover"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Get in Touch</span>
                            <h2 className="text-4xl font-bold mt-2 mb-6">Visit Our Plant</h2>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Strategy located in KIIC Karawang, our facility is equipped with modern infrastructure to support efficient logistics and production.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-orange-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Head Office & Factory</h4>
                                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                            Jl. Harapan Raya Lot 6-8, Karawang International Industrial City (KIIC), Karawang 41361, West Java, Indonesia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Phone</h4>
                                        <p className="text-slate-400 text-sm">+62 267 1234567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Email</h4>
                                        <p className="text-slate-400 text-sm">info@tricentrumfortuna.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.518606869403!2d107.28822037583685!3d-6.353880593636531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69762c2f741169%3A0xe5f99222c5464195!2sPT.%20Tri%20Centrum%20Fortuna!5e0!3m2!1sen!2sid!4v1705545239123!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                            <div className="absolute bottom-6 right-6 bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-lg pointer-events-none">
                                Open in Maps
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </MainLayout>
    );
}

// Generate by Antigravity
