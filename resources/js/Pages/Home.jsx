import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Globe, Award, Zap, Shield, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

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
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
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

    const [showHistoryModal, setShowHistoryModal] = useState(false);

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
                {/* Gradient to White (About Section) */}
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </section>

            {/* --- ABOUT US SECTION (History, Core Values) --- */}
            <section id="about" className="min-h-screen flex items-center justify-center py-12 bg-white relative overflow-hidden">
                <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">About Us</span>
                        <h2 className="text-3xl font-bold text-slate-900 mt-2">Our Journey & Values</h2>
                    </div>

                    {/* Company Brief & Image */}
                    <div className="mb-8 flex flex-col md:flex-row items-center gap-8 md:gap-16">
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Building Excellence Since 2017</h3>
                            <p className="text-slate-600 leading-relaxed mb-4 text-base">
                                PT Tri Centrum Fortuna has grown from a visionary foundation into a key player in the automotive manufacturing sector. With a relentless focus on quality and innovation, we have expanded our operations to serve global automotive leaders.
                            </p>
                            <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                                Operating from our strategic facilities in Karawang and Purwakarta, we deliver high-precision stamping and welding solutions that meet the rigorous standards of the industry.
                            </p>

                            <button
                                onClick={() => setShowHistoryModal(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all hover:gap-3 text-sm"
                            >
                                Read More <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className="w-full md:w-1/2 relative order-1 md:order-2 flex justify-center">
                            <div className="absolute -top-4 -right-4 w-64 h-64 bg-slate-100 rounded-full blur-3xl -z-10"></div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 h-64 md:h-80 w-full md:w-auto aspect-video">
                                <img
                                    src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=800"
                                    alt="TCF Facility"
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Core Values */}
                    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>
                        <div className="relative z-10 text-center mb-6">
                            <h3 className="text-2xl font-bold mb-2">Our Core Values: <span className="text-orange-500">EXIST</span></h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center"
                                >
                                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-orange-400 mb-1">{val.letter}</div>
                                    <h4 className="font-bold text-sm mb-1">{val.title}</h4>
                                    <p className="text-[10px] text-slate-300 leading-relaxed hidden lg:block">{val.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR CAPABILITIES SECTION --- */}
            <section id="capabilities" className="py-24 lg:py-0 lg:min-h-screen flex items-center bg-slate-50 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 lg:mb-10">
                        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">What We Do</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">Manufacturing Capabilities</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
                        {capabilities.map((cap, idx) => (
                            <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300">
                                <div className="h-48 lg:h-40 overflow-hidden">
                                    <img src={cap.image} alt={cap.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-8 lg:p-6 relative">
                                    <div className="absolute -top-10 right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center scale-90 lg:scale-100">
                                        {cap.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{cap.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">{cap.desc}</p>
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
            <section id="product" className="min-h-screen flex items-center justify-center bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 relative z-10 py-0">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <div>
                            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Our Output</span>
                            <h2 className="text-4xl font-bold mt-2">Quality Products</h2>
                        </div>
                        <p className="text-slate-400 max-w-md text-sm mt-4 md:mt-0 text-center">
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
                {/* Gradient to Slate-900 (Connect Section) */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
            </section>

            {/* --- DOWNLOAD TRANSITION --- */}
            <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">Want to know more about us?</h3>
                            <p className="text-blue-200">Download our detailed profile and view our certifications.</p>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-orange-500/25 group">
                                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span>Company Profile</span>
                            </a>
                            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/30 hover:bg-white/10 text-white rounded-full font-bold transition-all backdrop-blur-sm group">
                                <Award className="w-5 h-5 text-blue-300 group-hover:scale-110 transition-transform" />
                                <span>Certifications (ISO/IATF)</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- LOCATION SECTION --- */}
            <section id="location" className="relative py-24 lg:py-0 lg:min-h-screen flex items-center bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/map-pattern.png')] opacity-10 bg-center bg-cover"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Get in Touch</span>
                            <h2 className="text-4xl font-bold mt-2 mb-6">Connect with Us</h2>
                            <p className="text-slate-400 text-base mb-8 leading-relaxed">
                                Strategically located in KIIC Karawang, our facility is equipped with modern infrastructure to support efficient logistics and production.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="text-orange-400 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1">Head Office & Factory</h4>
                                        <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                                            Jl. Harapan Raya Lot 6-8, Karawang International Industrial City (KIIC), Karawang 41361, West Java, Indonesia
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="text-blue-400 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1">Phone</h4>
                                        <p className="text-slate-400 text-xs">+62 267 1234567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="text-green-400 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm mb-1">Email</h4>
                                        <p className="text-slate-400 text-xs">info@tricentrumfortuna.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Grid */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-0">
                            {/* Plant Purwakarta */}
                            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/20 relative group h-[250px] lg:h-[280px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253705.77378089205!2d107.25298998671873!3d-6.502343499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6913ee947302e5%3A0xaa639c3fa7f831ac!2sPT.%20Tri%20Centrum%20Fortuna%20Plant%20Sadang!5e0!3m2!1sen!2sid!4v1768701468761!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                                <div className="absolute bottom-3 left-3 bg-orange-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg pointer-events-none text-xs">
                                    Plant Purwakarta
                                </div>
                            </div>

                            {/* Plant Karawang */}
                            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/20 relative group h-[250px] lg:h-[280px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253705.77378089205!2d107.25298998671873!3d-6.502343499999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69755b3d7fc9cd%3A0x74ccb1c3b1517fa4!2sPT.%20Tri%20Centrum%20Fortuna%20(Plant%20Karawang)!5e0!3m2!1sen!2sid!4v1768701486914!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                                <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold shadow-lg pointer-events-none text-xs">
                                    Plant Karawang
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Gradient Fade to Footer */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#020617] pointer-events-none"></div>
            </section>

            {/* History Modal */}
            <Modal show={showHistoryModal} onClose={() => setShowHistoryModal(false)}>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Our History</h2>
                    <div className="space-y-4 text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
                        <p>
                            <strong>2017:</strong> PT Tri Centrum Fortuna was founded with a clear vision to support the growing automotive industry in Indonesia. Starting with a small facility in Karawang, we focused on precision stamping for 2-wheelers.
                        </p>
                        <p>
                            <strong>2019:</strong> Expanded capabilities to include Robotic Welding, securing our first major contract with a Tier-1 automotive supplier.
                        </p>
                        <p>
                            <strong>2021:</strong> Despite global challenges, we prepared for major expansion, designing our modern facilities for high-volume production.
                        </p>
                        <p>
                            <strong>2024:</strong> To meet increasing demand, we established <strong>Plant Karawang</strong> (Headquarters). This expansion allowed us to diversify into heavier stamping parts and improve our logistics network across West Java.
                        </p>
                        <p>
                            <strong>2026:</strong> Today, TCF stands as a beacon of manufacturing excellence, employing over 500 skilled professionals and serving as a trusted partner to major automotive brands.
                        </p>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <SecondaryButton onClick={() => setShowHistoryModal(false)}>
                            Close
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </MainLayout >
    );
}
