import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    ArrowLeft,
    Share2,
    Tag,
    ChevronRight,
    MessageSquare
} from 'lucide-react';

/**
 * News Detail Page
 * Generate by Antigravity
 */
export default function Detail({ article }) {
    return (
        <MainLayout>
            <Head>
                <title>{article.meta_title || article.title}</title>
                <meta name="description" content={article.meta_description || article.excerpt} />
                <meta property="og:title" content={article.meta_title || article.title} />
                <meta property="og:description" content={article.meta_description || article.excerpt} />
                <meta property="og:image" content={article.image} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* Breadcrumbs & Centered Hero */}
            <section className="pt-32 pb-20 bg-slate-900 border-b border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-orange-600/5 blur-[120px] rounded-full"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center gap-6"
                    >
                        <Link
                            href={route('news.index')}
                            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-400 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to News
                        </Link>

                        <div className="space-y-4 max-w-4xl">
                            <div className="flex items-center justify-center gap-3">
                                <span className="px-3 py-1 rounded-lg bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                                    {article.category}
                                </span>
                                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(article.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                {article.title}
                            </h1>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Article Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Main Content (8 columns) */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {/* Featured Image */}
                                <div className="aspect-video w-full rounded-[40px] overflow-hidden mb-12 shadow-2xl border border-slate-100">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Rich Text Content Area */}
                                <div className="prose prose-lg prose-slate max-w-none">
                                    <p className="text-xl text-slate-600 leading-relaxed font-medium mb-10 italic border-l-4 border-orange-500 pl-8">
                                        {article.excerpt}
                                    </p>

                                    <div className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
                                        {article.content}
                                    </div>

                                    {/* Share Section */}
                                    <div className="mt-16 p-8 bg-slate-50 rounded-[32px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white">
                                                <Share2 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Share this Insight</p>
                                                <p className="text-xs text-slate-500">Help others discover our manufacturing updates</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            {[
                                                { name: 'LinkedIn', url: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
                                                { name: 'Twitter', url: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
                                                { name: 'WhatsApp', url: (url, title) => `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}` }
                                            ].map((platform) => (
                                                <button
                                                    key={platform.name}
                                                    onClick={() => window.open(platform.url(window.location.href, article.title), '_blank')}
                                                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-orange-500 hover:text-orange-600 transition-all active:scale-95"
                                                >
                                                    {platform.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar (4 columns) */}
                        <aside className="lg:col-span-4 space-y-12">

                            {/* Author/Source Info */}
                            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Article Info</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                            <img src="/img/tcf-logo.png" alt="TCF" className="w-full h-full object-contain p-1" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">Published By</p>
                                            <p className="text-sm font-bold text-slate-900">TCF Media Team</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">Reading Time</p>
                                            <p className="text-sm font-bold text-slate-900">Approx. 5-7 Minutes</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Tag className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">Category Tag</p>
                                            <p className="text-sm font-bold text-slate-900">{article.category} Insights</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Links / CTA */}
                            <div className="p-8 bg-slate-900 rounded-[32px] text-white relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-600/20 to-transparent"></div>
                                <h4 className="text-xl font-black mb-4 relative z-10 leading-tight">Interested in our services?</h4>
                                <p className="text-slate-400 text-xs mb-8 relative z-10 leading-relaxed">
                                    Request a technical consultation or a quote for your stamping and welding assembly needs.
                                </p>
                                <Link
                                    href="/contact"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-4 rounded-2xl font-black text-xs hover:bg-orange-700 transition-all relative z-10 shadow-xl shadow-orange-600/20 uppercase tracking-widest"
                                >
                                    Contact Sales
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Sticky Help Area */}
                            <div className="sticky top-24 p-8 border-2 border-slate-100 rounded-[32px] bg-white">
                                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                                    <MessageSquare className="w-6 h-6 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-2">Have a question?</h3>
                                <p className="text-sm text-slate-500 mb-6">Feel free to message our team for any inquiries about our manufacturing process.</p>
                                <a href="mailto:info@tricentrumfortuna.com" className="text-orange-600 font-bold hover:underline">info@tricentrumfortuna.com</a>
                            </div>

                        </aside>

                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
