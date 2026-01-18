import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-secondary-50 pt-20">
            {/* Background Overlay with Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-50 via-white to-white z-0"></div>

            {/* Subtle Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(#0ea5e9 1px, transparent 1px), linear-gradient(90deg, #0ea5e9 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Glowing Orbs (Subtle) */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-200/20 rounded-full blur-[120px] z-0 mix-blend-multiply"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-200/20 rounded-full blur-[100px] z-0 mix-blend-multiply"></div>

            <div className="container relative z-10 px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border rounded-full bg-white border-primary-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                            <span className="text-xs font-bold tracking-widest uppercase text-primary-700">
                                Leading Manufacturing Partner
                            </span>
                        </div>

                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-secondary-900 font-sans md:text-7xl leading-tight">
                            Building the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">Foundation</span> of <br />
                            <span className="text-secondary-800">Tomorrow</span>
                        </h1>

                        <p className="max-w-xl mb-10 text-lg font-light text-secondary-600 md:text-xl border-l-4 border-accent-500 pl-6">
                            Excellence in precision stamping, robotic welding, and engineering solutions for the automotive industry.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="relative px-8 py-4 font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 hover:shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1">
                                <span className="relative z-10">Our Solutions</span>
                            </button>

                            <button className="px-8 py-4 font-medium transition-all duration-300 text-secondary-700 border border-slate-200 rounded-full hover:bg-white hover:border-primary-200 hover:text-primary-700 bg-white/50 backdrop-blur-sm">
                                View Capabilities
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Visual (Glass Cards / Corporate Image) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        {/* Main Visual Frame */}
                        <div className="relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden glass-card shadow-2xl skew-y-1 hover:skew-y-0 transition-all duration-700 border border-white">
                            <div className="absolute inset-0 bg-secondary-100">
                                {/* Corporate Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
                                    alt="Automotive Manufacturing"
                                    className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/60 to-transparent"></div>
                            </div>

                            {/* Floating Info Card */}
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-secondary-500 uppercase tracking-wider mb-1">Annual Output</p>
                                        <p className="text-2xl font-bold text-secondary-900">2.4M <span className="text-sm font-normal text-primary-600">Units</span></p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements around visual */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-100 rounded-full blur-3xl opacity-60"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-60"></div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
