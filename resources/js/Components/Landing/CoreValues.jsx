import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Globe, Zap } from 'lucide-react';

/**
 * Komponen CoreValues
 * Menampilkan nilai-nilai inti perusahaan dalam layout grid.
 * 
 * Generate by Antigravity
 */
export default function CoreValues() {
    const values = [
        {
            title: 'Integrity First',
            description: 'Unwavering commitment to ethical standards and transparency in every partnership.',
            icon: <ShieldCheck className="w-8 h-8 text-primary-600" />
        },
        {
            title: 'Customer Focus',
            description: 'Delivering value-driven solutions that exceed expectations and ensure client success.',
            icon: <Users className="w-8 h-8 text-accent-500" />
        },
        {
            title: 'Sustainability',
            description: 'Pioneering eco-efficient manufacturing processes for a greener tomorrow.',
            icon: <Globe className="w-8 h-8 text-secondary-600" />
        },
        {
            title: 'Innovation',
            description: 'Continuously adopting advanced technologies to stay ahead of industry curves.',
            icon: <Zap className="w-8 h-8 text-primary-500" />
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-50 skew-x-12 opacity-50 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row gap-16 items-start">

                    {/* Header */}
                    <div className="md:w-1/3 sticky top-24">
                        <span className="text-accent-500 tracking-widest uppercase text-xs font-bold mb-2 block">Our DNA</span>
                        <h2 className="text-4xl font-bold text-secondary-900 mb-6 font-sans leading-tight">
                            Driven by <span className="text-primary-600">Values</span>,<br />
                            Powered by <span className="text-secondary-800">People</span>.
                        </h2>
                        <p className="text-secondary-500 font-light leading-relaxed mb-8">
                            Our core values define who we are and how we operate. They are the foundation of our success and the promise we make to our stakeholders.
                        </p>
                        <button className="px-6 py-3 text-sm font-bold text-primary-700 border border-primary-200 rounded-full hover:bg-primary-50 transition-colors">
                            Read Our Culture Code
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="mb-4 p-3 rounded-xl bg-secondary-50 w-fit group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-secondary-900 mb-3">{value.title}</h3>
                                <p className="text-secondary-500 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
