import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, ExternalLink, ChevronLeft, ChevronRight, Box, ArrowRight, Tag } from 'lucide-react';
import { useLocalic, useTranslation } from '@/helpers';

/**
 * Product Index Page
 * Generate by Antigravity
 */
export default function Index({ products, filters }) {
    const { lRoute } = useLocalic();
    const { __ } = useTranslation();
    const [search, setSearch] = useState(filters.search || '');

    // Handle Search with debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search !== (filters.search || '')) {
                router.get(lRoute('products.index'), { search }, {
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

    const getAbsoluteUrl = (path) => {
        if (!path) return `${typeof window !== 'undefined' ? window.location.origin : ''}/img/tcf-logo.png`;
        if (path.startsWith('http')) return path;
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `${origin}${cleanPath}`;
    };

    const firstProductImage = String(products.data.length > 0 ? getAbsoluteUrl(products.data[0].main_image) : getAbsoluteUrl(null));

    return (
        <MainLayout>
            <Head>
                <title>{__('High-Quality Automotive Products | PT Tri Centrum Fortuna')}</title>
                <meta name="description" content={__('Explore TCF\'s range of high-precision automotive components. From stamping to robotic welding, we provide the best Tier 2 manufacturing solutions in Indonesia.')} />
                <meta property="og:title" content={__('Our Products - Precision Automotive Components | TCF')} />
                <meta property="og:description" content={__('Discover our comprehensive range of high-quality automotive parts manufactured with robotic precision in Indonesia.')} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={firstProductImage} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-primary via-transparent to-slate-900"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-secondary text-xs font-bold uppercase tracking-widest mb-6">
                            <Package className="w-4 h-4" />
                            {__('Precision Manufacturing')}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            {__('Our High-Quality')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">{__('Products')}</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            {__('Explore our comprehensive range of stamped and welded components, engineered for durability and manufactured to world-class standards.')}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Search & List Section */}
            <section className="py-20 bg-slate-50 min-h-[600px] relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-amber-500/5 blur-[120px] rounded-full"></div>

                <div className="container mx-auto px-6">
                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-16">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm"
                                placeholder={__('Search our products...')}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Product Grid */}
                    <AnimatePresence mode="wait">
                        {products.data.length > 0 ? (
                            <motion.div
                                key="grid"
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            >
                                {products.data.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        variants={item}
                                        className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                                    >
                                        {/* Image Container */}
                                        <Link
                                            href={product.slug ? lRoute('products.detail', { slug: product.slug }) : '#'}
                                            className="aspect-[4/3] relative overflow-hidden bg-slate-100 block"
                                        >
                                            <img
                                                src={product.main_image?.startsWith('http') ? product.main_image : `/${product.main_image}`}
                                                alt={product.translated_name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {product.customer && (
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-slate-100">
                                                    <img
                                                        src={product.customer.logo?.startsWith('http') ? product.customer.logo : `/${product.customer.logo}`}
                                                        className="h-3 w-auto grayscale"
                                                        alt={product.customer.name}
                                                    />
                                                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{product.customer.name}</span>
                                                </div>
                                            )}
                                        </Link>

                                        {/* Content */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Tag className="w-3 h-3 text-brand-primary" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{__('Automotive Part')}</span>
                                            </div>
                                            <Link href={product.slug ? lRoute('products.detail', { slug: product.slug }) : '#'}>
                                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                    {product.translated_name}
                                                </h3>
                                            </Link>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                                {product.translated_description}
                                            </p>

                                            <div className="mt-auto">
                                                <Link
                                                    href={product.slug ? lRoute('products.detail', { slug: product.slug }) : '#'}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-all"
                                                >
                                                    {__('View Details')}
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                                    <Box className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{__('No products found')}</h3>
                                <p className="text-slate-500">{__('Try adjusting your search criteria')}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pagination */}
                    {products.links.length > 3 && (
                        <div className="mt-20 flex justify-center">
                            <nav className="inline-flex items-center gap-2 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                {products.links.map((link, idx) => {
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
                                            className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${link.active ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-primary'}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </nav>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
