import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Flame, Settings } from 'lucide-react';

export default function ServicePillars() {
    const services = [
        {
            title: 'Precision Stamping',
            description: 'High-tonnage press capabilities ranging from 60T to 500T for complex automotive components.',
            icon: <Hammer className="w-10 h-10 text-primary-600" />,
            color: 'bg-primary-50'
        },
        {
            title: 'Robotic Welding',
            description: 'Advanced MIG/TIG welding cells with automated robotic arms for consistent, high-strength joints.',
            icon: <Flame className="w-10 h-10 text-accent-500" />,
            color: 'bg-accent-50'
        },
        {
            title: 'Dies & Engineering',
            description: 'In-house mold design and tooling maintenance ensuring precision and rapid prototyping.',
            icon: <Settings className="w-10 h-10 text-secondary-600" />,
            color: 'bg-secondary-100'
        }
    ];

    return (
        <section className="py-24 relative bg-secondary-50 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary-600 tracking-widest uppercase text-xs font-bold mb-2 block">Our Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4 font-sans">Core Capabilities</h2>
                    <div className="w-20 h-1 bg-accent-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="group relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative z-10">
                                <div className={`mb-6 p-4 rounded-xl ${service.color} inline-block group-hover:scale-110 transition-transform duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-secondary-500 leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
