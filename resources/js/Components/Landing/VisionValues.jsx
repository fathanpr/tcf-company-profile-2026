import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass, Award, Users, Heart, Shield, Zap, TrendingUp } from 'lucide-react';

export default function VisionValues() {
    const values = [
        { letter: 'E', title: 'Empowerment', desc: 'Giving our people the strength and confidence to achieve more.' },
        { letter: 'X', title: 'Excellence', desc: 'Striving for highest quality and distinction in everything we do.' },
        { letter: 'I', title: 'Integrity', desc: 'Upholding honesty and strong moral principles in our business.' },
        { letter: 'S', title: 'Service', desc: 'Dedication to meeting customer needs with superior service.' },
        { letter: 'T', title: 'Tenacity', desc: 'Persistent determination to overcome challenges and succeed.' }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-[#020617] to-primary-950 text-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* PART 1: VISION & MISSION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-10 relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                            <Compass size={120} />
                        </div>
                        <div className="relative z-10">
                            <span className="text-accent-400 font-bold tracking-widest uppercase text-sm mb-3 block">Our Vision</span>
                            <h3 className="text-3xl font-bold mb-6">To Be a World Class Manufacturing Company</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Expanding towards the global market by consistently delivering superior quality products and sustainable innovation, setting the benchmark for the industry.
                            </p>
                        </div>
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-10 relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                            <Target size={120} />
                        </div>
                        <div className="relative z-10">
                            <span className="text-primary-400 font-bold tracking-widest uppercase text-sm mb-3 block">Our Mission</span>
                            <h3 className="text-3xl font-bold mb-6">Driving Excellence & Welfare</h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex gap-3">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                                    <span>Prioritizing total customer satisfaction through quality and service.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                                    <span>Enhancing employee welfare and fostering a culture of growth.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2"></span>
                                    <span>Contributing positively to shareholders and the environment.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* PART 2: CORE VALUES (EXIST) */}
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Image Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-5/12"
                    >
                        <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                            <img
                                src="/img/exist-logo.jpg"
                                alt="EXIST Core Values"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-8 left-8">
                                <h2 className="text-5xl font-extrabold text-white tracking-tighter mb-2 drop-shadow-lg">EXIST</h2>
                                <p className="text-white/80 font-medium tracking-wide">Our Core Values</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Values List */}
                    <div className="w-full lg:w-7/12">
                        <div className="space-y-6">
                            {values.map((val, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-start gap-6 group"
                                >
                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-accent-400 group-hover:scale-110 transition-transform shadow-lg">
                                        {val.letter}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{val.title}</h4>
                                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                                            {val.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
