import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Factory, Users, Ruler, ArrowRight, X } from 'lucide-react';

export default function CompanyPlants() {
    const [activePlant, setActivePlant] = useState(null); // 'karawang' or 'purwakarta' or null

    const plants = {
        karawang: {
            id: 'karawang',
            name: 'Plant Karawang',
            image: 'https://images.unsplash.com/photo-1565126891008-08535b46761f?auto=format&fit=crop&q=80&w=1200', // Modern factory
            address: 'Jl. Harapan Raya Lot 6-8, KIIC, Karawang, West Java',
            stats: [
                { icon: <Ruler size={18} />, label: 'Area', value: '45,000 m²' },
                { icon: <Factory size={18} />, label: 'Lines', value: '12 Production Lines' },
                { icon: <Users size={18} />, label: 'Manpower', value: '850+ Employees' },
            ],
            desc: 'Our main manufacturing hub specializing in high-precision stamping and welding assembly. Equipped with automated robotic lines and advanced QC facilities.'
        },
        purwakarta: {
            id: 'purwakarta',
            name: 'Plant Purwakarta',
            image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=1200', // Industrial interior
            address: 'Kawasan Industri Kota Bukit Indah, Purwakarta, West Java',
            stats: [
                { icon: <Ruler size={18} />, label: 'Area', value: '32,000 m²' },
                { icon: <Factory size={18} />, label: 'Lines', value: '8 Production Lines' },
                { icon: <Users size={18} />, label: 'Manpower', value: '400+ Employees' },
            ],
            desc: 'Focused on component fabrication and overflow capacity, supporting our agile manufacturing network with specialized machining capabilities.'
        }
    };

    return (
        <section className="py-24 bg-[#020617] relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12 text-center">
                <span className="text-primary-400 tracking-widest uppercase text-xs font-bold mb-2 block">Our Presence</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Strategic Manufacturing Facilities</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Operating from two strategic locations in West Java to ensure efficiency and proximity to our partners.</p>
            </div>

            <div className="container mx-auto px-4 h-[600px] flex flex-col md:flex-row gap-4">
                {Object.values(plants).map((plant) => (
                    <motion.div
                        key={plant.id}
                        layout
                        onClick={() => setActivePlant(plant.id === activePlant ? null : plant.id)}
                        className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group ${activePlant === plant.id
                                ? 'flex-[3] md:flex-[3]'
                                : activePlant === null
                                    ? 'flex-1 hover:flex-[1.2]'
                                    : 'flex-[0.5] opacity-50 hover:opacity-100 hover:flex-[0.8]'
                            }`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={plant.image}
                                alt={plant.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-primary-950/60 to-transparent transition-opacity duration-500 ${activePlant === plant.id ? 'opacity-90' : 'opacity-70 group-hover:opacity-60'}`}></div>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 flex flex-col justify-end h-full">
                            <div className="flex items-center justify-between mb-4">
                                <motion.h3
                                    layout="position"
                                    className={`font-bold text-white leading-tight ${activePlant === plant.id ? 'text-4xl' : 'text-2xl md:text-3xl'}`}
                                >
                                    {plant.name}
                                </motion.h3>
                                {/* Indicator Icon */}
                                <motion.div layout className={`w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white backdrop-blur-md ${activePlant === plant.id ? 'bg-white text-primary-900 rotate-90 ' : 'bg-transparent'}`}>
                                    {activePlant === plant.id ? <X size={20} /> : <ArrowRight size={20} className="-rotate-45" />}
                                </motion.div>
                            </div>

                            <motion.div
                                className="overflow-hidden"
                                animate={{
                                    height: activePlant === plant.id ? 'auto' : 0,
                                    opacity: activePlant === plant.id ? 1 : 0
                                }}
                            >
                                <div className="flex items-start gap-2 text-slate-300 mb-6 font-medium">
                                    <MapPin size={18} className="text-accent-400 mt-1 flex-shrink-0" />
                                    {plant.address}
                                </div>
                                <p className="text-slate-400 leading-relaxed mb-8 max-w-xl">
                                    {plant.desc}
                                </p>

                                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                                    {plant.stats.map((stat, i) => (
                                        <div key={i}>
                                            <div className="text-accent-400 mb-1">{stat.icon}</div>
                                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                                            <div className="text-white font-bold text-lg">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
