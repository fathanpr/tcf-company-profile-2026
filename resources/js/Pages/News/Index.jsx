import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Search,
    Calendar,
    ChevronRight,
    ArrowRight,
    Tag,
    Clock,
    User
} from 'lucide-react';

/**
 * News Index Page
 * Generate by Antigravity
 */
export default function Index({ news, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || 'All');

    const categories = ['All', 'Industry', 'Corporate', 'Technology', 'Technical', 'Business', 'CSR', 'Events', 'General'];

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                route('news.index'),
                { search, category },
                { preserveState: true, replace: true }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search, category]);

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
        <MainLayout>
            <Head>
                <title>News & Insights | PT Tri Centrum Fortuna</title>
                <meta name="description" content="Stay updated with the latest news, technological insights, and corporate updates from PT Tri Centrum Fortuna - Indonesia's professional Tier 2 partner." />
                <meta property="og:title" content="News & Insights | PT Tri Centrum Fortuna" />
                <meta property="og:description" content="Latest developments in automotive manufacturing, precision stamping, and robotic welding from TCF Indonesia." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={news.data.length > 0 ? (news.data[0].image.startsWith('https') ? news.data[0].image : `${typeof window !== 'undefined' ? window.location.origin : ''}${news.data[0].image}`) : `${typeof window !== 'undefined' ? window.location.origin : ''}/img/tcf-logo.png`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

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
                            <Calendar className="w-4 h-4" />
                            Media Center
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Insights</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Discover the latest developments in precision stamping, automotive technology,
                            and our journey as a leading manufacturing partner in Indonesia.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* News List (8 columns) */}
                        <div className="lg:col-span-8">
                            <motion.div
                                variants={container}
                                initial="hidden"
                                animate="show"
                                className="space-y-10"
                            >
                                {news.data.length > 0 ? (
                                    news.data.map((article) => (
                                        <motion.article
                                            key={article.id}
                                            variants={item}
                                            className="group relative flex flex-col md:flex-row gap-8 pb-10 border-b border-slate-100 last:border-0"
                                        >
                                            <div className="md:w-72 h-48 rounded-2xl overflow-hidden flex-shrink-0 relative">
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-800 shadow-sm">
                                                    {article.category}
                                                </div>
                                            </div>

                                            <div className="flex flex-col py-2">
                                                <div className="flex items-center gap-4 text-slate-400 text-xs mb-3 font-medium">
                                                    <span className="flex items-center gap-1.5 text-blue-500 font-bold">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        5 min read
                                                    </span>
                                                </div>

                                                <Link href={route('news.detail', article.slug)}>
                                                    <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                                                        {article.title}
                                                    </h2>
                                                </Link>

                                                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                                                    {article.excerpt}
                                                </p>

                                                <Link
                                                    href={route('news.detail', article.slug)}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:translate-x-2 transition-transform"
                                                >
                                                    Read Full Article
                                                    <ArrowRight className="w-4 h-4 text-blue-600" />
                                                </Link>
                                            </div>
                                        </motion.article>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold">No news articles found for this search/category.</p>
                                    </div>
                                )}
                            </motion.div>

                            {/* Pagination */}
                            <div className="mt-16 flex justify-center gap-2">
                                {news.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${link.active
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : link.url
                                                ? 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                                : 'bg-transparent text-slate-300 pointer-events-none'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sidebar (4 columns) */}
                        <aside className="lg:col-span-4 space-y-12">

                            {/* Search */}
                            <div className="p-8 bg-slate-900 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                                <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2 relative z-10">
                                    <Search className="w-5 h-5 text-orange-500" />
                                    Search Articles
                                </h3>
                                <div className="relative z-10">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search by keywords..."
                                        className="w-full bg-white/5 border-white/10 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 rounded-2xl py-4 pl-6 pr-12 text-sm text-white placeholder:text-slate-500 transition-all backdrop-blur-sm"
                                    />
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-hover:text-orange-500 transition-colors" />
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-orange-500" />
                                    Categories
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${category === cat
                                                ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Banner/CTA */}
                            <div className="p-8 bg-orange-600 rounded-[32px] text-white overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>
                                <h4 className="text-xl font-black mb-4 relative z-10 leading-tight">Need a professional manufacturing partner?</h4>
                                <p className="text-orange-100 text-xs mb-8 relative z-10 leading-relaxed">
                                    Check our production capabilities and see how we can support your business with high-precision components.
                                </p>
                                <Link
                                    href={route('capabilities.sales-growth')}
                                    className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all relative z-10"
                                >
                                    Our Capabilities
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                        </aside>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
