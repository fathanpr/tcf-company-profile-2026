import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, ExternalLink, ChevronLeft, ChevronRight, Building2, UserCheck } from 'lucide-react';

export default function Customers({ customers, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    // Handle Search with debounce or simple effect
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(route('about.customers'), { search }, {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true
                });
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <MainLayout title="Our Valued Customers">
            <Head title="Our Customers - PT Tri Centrum Fortuna" />

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
                            <UserCheck className="w-4 h-4" />
                            Trusted Partnership
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Our Valued <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Customers</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We are proud to serve industry leaders across the automotive and manufacturing sectors,
                            building long-term relationships through quality and reliability.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Search & List Section */}
            <section className="py-20 bg-slate-50 min-h-[600px] relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-500/5 blur-[120px] rounded-full"></div>

                <div className="container mx-auto px-6">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-16">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                                placeholder="Search our customer base..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Customer Grid */}
                    <AnimatePresence mode="wait">
                        {customers.data.length > 0 ? (
                            <motion.div
                                key="grid"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
                            >
                                {customers.data.map((customer) => (
                                    <motion.div
                                        key={customer.id}
                                        variants={item}
                                        whileHover={{ y: -5 }}
                                        className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                                    >
                                        <div className="w-24 h-24 mb-6 relative">
                                            <div className="absolute inset-0 bg-slate-100 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"></div>
                                            <img
                                                src={`/${customer.logo}`}
                                                alt={customer.name}
                                                className="w-full h-full object-contain relative z-10 p-4 drop-shadow-sm grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </div>
                                        <h3 className="text-slate-900 font-bold text-sm leading-tight group-hover:text-blue-600 transition-colors">
                                            {customer.name}
                                        </h3>
                                        <div className="mt-4 pt-4 border-t border-slate-50 w-full flex flex-col items-center gap-3">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                                Active Partner <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            </div>
                                            {customer.website && (
                                                <a
                                                    href={customer.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 text-slate-600 text-[10px] font-bold hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                    Visit Website
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                transition={{ duration: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                                    <Users className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No customers found</h3>
                                <p className="text-slate-500">Try adjusting your search criteria</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pagination */}
                    {customers.links.length > 3 && (
                        <div className="mt-20 flex justify-center">
                            <nav className="inline-flex items-center gap-2 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                {customers.links.map((link, idx) => {
                                    if (link.label.includes('Previous')) {
                                        return (
                                            <Link
                                                key={idx}
                                                href={link.url || '#'}
                                                className={`p-2 rounded-xl transition-all ${!link.url ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </Link>
                                        );
                                    }
                                    if (link.label.includes('Next')) {
                                        return (
                                            <Link
                                                key={idx}
                                                href={link.url || '#'}
                                                className={`p-2 rounded-xl transition-all ${!link.url ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </Link>
                                        );
                                    }
                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${link.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </nav>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-black mb-4">Interested in Partnering with Us?</h2>
                                <p className="text-blue-100 max-w-xl">
                                    Join our growing network of industry leaders. Let's discuss how we can support your manufacturing needs with our expertise.
                                </p>
                            </div>
                            <Link
                                href="/#location"
                                className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-colors shadow-xl"
                            >
                                Contact Sales Team
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
