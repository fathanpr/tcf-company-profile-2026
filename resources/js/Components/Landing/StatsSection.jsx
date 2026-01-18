import React from 'react';
import { motion } from 'framer-motion';

export default function StatsSection() {
    const stats = [
        { label: 'Years with Indonesia', value: '50+', delay: 0 },
        { label: 'Employees', value: '190,000', delay: 0.1 },
        { label: 'Subsidiaries', value: '301', delay: 0.2 },
        { label: 'Beneficiaries', value: '2.8M', delay: 0.3 },
    ];

    return (
        <section className="relative py-20 bg-white">
            <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: stat.delay }}
                            className="p-8 text-center rounded-2xl bg-secondary-50 border border-slate-100 hover:shadow-lg hover:border-primary-100 transition-all duration-300 hover:bg-white group"
                        >
                            <h3 className="text-4xl font-bold text-primary-600 font-sans mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-medium tracking-wide text-secondary-500 uppercase">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
