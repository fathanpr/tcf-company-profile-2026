import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    Box,
    Tag,
    Layers,
    ShieldCheck,
    Settings,
    ArrowRight,
    Users,
    X,
    Maximize2
} from 'lucide-react';

/**
 * Product Detail Page
 * Generate by Antigravity
 */
export default function Detail({ product }) {
    const [activeImage, setActiveImage] = React.useState(product.main_image);
    const [previewImage, setPreviewImage] = useState(null);

    // Sync state with product prop
    React.useEffect(() => {
        setActiveImage(product.main_image);
    }, [product.id]);

    const allImages = [product.main_image, ...(product.images || []).map(img => img.image_path)];

    return (
        <MainLayout title={product.name}>
            <Head>
                <title>{product.meta_title || `${product.name} - PT Tri Centrum Fortuna`}</title>
                <meta name="description" content={product.meta_description || product.description} />
                <meta name="keywords" content={product.meta_keywords || ''} />
                <meta property="og:title" content={product.meta_title || product.name} />
                <meta property="og:description" content={product.meta_description || product.description} />
                <meta property="og:image" content={product.main_image} />
                <meta property="og:type" content="product" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {/* Breadcrumb / Back Navigation */}
            <div className="pt-32 pb-6 bg-slate-900">
                <div className="container mx-auto px-6">
                    <Link
                        href={route('products.index')}
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors text-sm font-bold"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                </div>
            </div>

            {/* Product Section */}
            <section className="pb-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-orange-600/10 blur-[120px] rounded-full"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">

                        {/* Image Gallery (5/12 cols) */}
                        <div className="lg:col-span-5 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-800 border border-slate-700 relative cursor-zoom-in group shadow-2xl"
                                onClick={() => setPreviewImage(activeImage)}
                            >
                                <img
                                    src={activeImage?.startsWith('http') ? activeImage : `/${activeImage}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center">
                                    <span className="bg-white/90 text-slate-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <Maximize2 className="w-4 h-4" />
                                        Click to Preview
                                    </span>
                                </div>
                            </motion.div>

                            {allImages.length > 1 && (
                                <div className="grid grid-cols-5 gap-3">
                                    {allImages.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(img)}
                                            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all relative group ${activeImage === img ? 'border-orange-500 ring-4 ring-orange-500/20' : 'border-slate-700 hover:border-slate-500'}`}
                                        >
                                            <img
                                                src={img?.startsWith('http') ? img : `/${img}`}
                                                className={`w-full h-full object-cover transition-all duration-300 ${activeImage === img ? 'scale-110' : 'opacity-60 group-hover:opacity-100'}`}
                                                alt=""
                                            />
                                            {activeImage === img && (
                                                <div className="absolute inset-0 bg-orange-500/10 flex items-center justify-center">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info (7/12 cols) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-7 flex flex-col"
                        >
                            <div className="mb-6">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">
                                        <Box className="w-3 h-3" />
                                        Active Production
                                    </div>
                                    {product.customer && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                                            <Users className="w-3 h-3 text-orange-500" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">{product.customer.name}</span>
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                                    {product.name}
                                </h1>

                                <div className="h-1 w-20 bg-orange-500 mb-6 rounded-full"></div>

                                <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                                    {product.description}
                                </p>

                                {/* Technical Specs Grid - Optimized for density */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center text-orange-400 flex-shrink-0">
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-0.5">Material Process</h4>
                                            <p className="text-sm font-bold text-slate-100">Cold Stamping & Welding</p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-0.5">Quality Standard</h4>
                                            <p className="text-sm font-bold text-slate-100">ISO 9001 & IATF 16949</p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                                            <Settings className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-0.5">Precision level</h4>
                                            <p className="text-sm font-bold text-slate-100">Up to 0.01mm Tolerance</p>
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-2xl flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                                            <Tag className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-0.5">Category</h4>
                                            <p className="text-sm font-bold text-slate-100">Automotive Tier-1 Parts</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Link
                                    href="/contact"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-orange-600 text-white font-black rounded-2xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 group uppercase tracking-widest text-sm"
                                >
                                    Inquiry for this Product
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
                                    *Subject to technical verification and volume agreement
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Additional Features / Technical Details */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-slate-900 mb-4">Technical Excellence</h2>
                            <p className="text-slate-500">How we ensure the highest standards for every part.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-orange-600 border border-slate-100">
                                    <Settings className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-3 text-lg">High Precision</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Utilizing the latest robotic technology to maintain tolerances up to 0.01mm.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-amber-600 border border-slate-100">
                                    <Box className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-3 text-lg">Mass Production</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Capable of high-volume output with consistent quality across millions of strokes.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-emerald-600 border border-slate-100">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-slate-900 mb-3 text-lg">Strict Quality</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    Every component undergoes rigorous testing using CMM and manual inspection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Overlay */}
            {previewImage && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setPreviewImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 z-[110]"
                        onClick={() => setPreviewImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={previewImage?.startsWith('http') ? previewImage : `/${previewImage}`}
                            alt="Full Preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>,
                document.body
            )}
        </MainLayout>
    );
}
