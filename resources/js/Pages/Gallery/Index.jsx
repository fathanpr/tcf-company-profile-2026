import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Maximize2, Tag, Package } from "lucide-react";
import { useLocalic, useTranslation } from "@/helpers";

export default function Index({ galleries, categories = [], filters = {} }) {
    const { lRoute } = useLocalic();
    const { __ } = useTranslation();
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "all");
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(
                lRoute("gallery.index"),
                { search, category },
                { preserveState: true, replace: true },
            );
        }, 450);

        return () => clearTimeout(delayDebounceFn);
    }, [search, category]);

    const categoryChips = useMemo(() => {
        return [
            { slug: "all", translated_name: __("All Categories") },
            ...categories,
        ];
    }, [categories]);

    return (
        <MainLayout>
            <Head>
                <title>{__("Gallery | PT Tri Centrum Fortuna")}</title>
                <meta
                    name="description"
                    content={__(
                        "Explore TCF production highlights through categorized gallery images with detailed descriptions.",
                    )}
                />
            </Head>

            <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
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
                            {__("Visual Showcase")}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            {__("Our Visual")}{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                                {__("Gallery")}
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            {__(
                                "Preview our work in responsive grid format, then open each image in maximize mode to read full details.",
                            )}
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-14 bg-white">
                <div className="container mx-auto px-6 space-y-8">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                        <div className="relative w-full lg:max-w-md">
                            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={__(
                                    "Search image title or description...",
                                )}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-brand-primary text-sm"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categoryChips.map((cat) => (
                                <button
                                    key={cat.slug || cat.id}
                                    onClick={() =>
                                        setCategory(cat.slug || "all")
                                    }
                                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                                        category === (cat.slug || "all")
                                            ? "bg-brand-primary border-brand-primary text-white"
                                            : "bg-white border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
                                    }`}
                                >
                                    {cat.translated_name || cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {galleries.data.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                        >
                            {galleries.data.map((item, idx) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.03 }}
                                    onClick={() => setActiveImage(item)}
                                    className="group text-left rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                                >
                                    <div className="aspect-[4/3] overflow-hidden relative">
                                        <img
                                            src={item.image}
                                            alt={item.translated_title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute right-3 top-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Maximize2 className="w-4 h-4" />
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-sm font-black text-slate-900 line-clamp-1">
                                            {item.translated_title}
                                        </h3>
                                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                                            {item.translated_description}
                                        </p>
                                        <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                                            <Tag className="w-3 h-3" />
                                            {item.category?.translated_name ||
                                                "-"}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="py-24 text-center bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
                            <p className="font-bold text-slate-500">
                                {__("No gallery items found for this filter.")}
                            </p>
                        </div>
                    )}

                    <div className="pt-4 flex flex-wrap justify-center gap-2">
                        {galleries.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || "#"}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                    link.active
                                        ? "bg-brand-primary text-white"
                                        : link.url
                                          ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                          : "bg-slate-50 text-slate-300 pointer-events-none"
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {activeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm p-4 md:p-8"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveImage(null)}
                            className="absolute top-5 right-5 md:top-8 md:right-8 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-full h-full max-w-6xl mx-auto grid lg:grid-cols-5 gap-6 items-center">
                            <div className="lg:col-span-3 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
                                <img
                                    src={activeImage.image}
                                    alt={activeImage.translated_title}
                                    className="w-full h-full max-h-[80vh] object-contain bg-black"
                                />
                            </div>
                            <div className="lg:col-span-2 bg-white rounded-3xl p-8 max-h-[80vh] overflow-y-auto">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-50 text-orange-600 text-[11px] font-black uppercase tracking-wider">
                                    <Tag className="w-3.5 h-3.5" />
                                    {activeImage.category?.translated_name ||
                                        "-"}
                                </span>
                                <h3 className="text-2xl font-black text-slate-900 mt-4 leading-tight">
                                    {activeImage.translated_title}
                                </h3>
                                <p className="text-sm text-slate-600 mt-4 leading-relaxed whitespace-pre-line">
                                    {activeImage.translated_description ||
                                        __(
                                            "No description available for this image yet.",
                                        )}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
