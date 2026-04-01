import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Box, Save, Building2, FileText, Image as ImageIcon, ToggleLeft } from 'lucide-react';
import ImageInput from '@/Components/ImageInput';
import SearchableSelect from '@/Components/SearchableSelect';
import MultiImageInput from '@/Components/MultiImageInput';

import { useTranslation } from '@/helpers';

/**
 * Product Create Page
 * Generate by Antigravity
 */
export default function Create({ customers }) {
    const [activeTab, setActiveTab] = React.useState('en');
    const { __ } = useTranslation();

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        name_id: '',
        slug: '',
        slug_id: '',
        customer_id: '',
        description: '',
        description_id: '',
        main_image: '',
        product_images: [],
        is_active: true,
        meta_title: '',
        meta_title_id: '',
        meta_description: '',
        meta_description_id: '',
        meta_keywords: '',
        meta_keywords_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    const customerOptions = customers.data.map(c => ({ value: c.id, label: c.name }));

    return (
        <AdminLayout title="Add New Product">
            <Head title="Add Product - Admin TCF" />

            <div className="max-w-2xl">
                <Link
                    href={route('admin.products.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                                <Box className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Product Specification</h3>
                                <p className="text-sm text-slate-500">Define details in multiple languages.</p>
                            </div>
                        </div>

                        {/* Language Switcher Tabs */}
                        <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setActiveTab('en')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'en' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                EN
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('id')}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'id' ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                ID
                            </button>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Box className="w-4 h-4 text-slate-400" />
                                {activeTab === 'en' ? 'Product Name (EN)' : 'Nama Produk (ID)'}
                            </label>
                            <input
                                type="text"
                                value={activeTab === 'en' ? data.name : data.name_id}
                                onChange={e => setData(activeTab === 'en' ? 'name' : 'name_id', e.target.value)}
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all ${(activeTab === 'en' ? errors.name : errors.name_id) ? 'ring-2 ring-red-500' : ''}`}
                                placeholder={activeTab === 'en' ? "E.g. Front Door Hinge" : "Misal: Engsel Pintu Depan"}
                                required={activeTab === 'en'}
                            />
                            {errors.name && <p className="text-xs font-bold text-red-500 mt-1">{errors.name}</p>}
                            {errors.name_id && <p className="text-xs font-bold text-red-500 mt-1">{errors.name_id}</p>}
                        </div>

                        {/* Customer */}
                        <div className="space-y-2">
                            <SearchableSelect
                                label="Assigned Customer"
                                options={customerOptions}
                                value={customerOptions.find(opt => opt.value === data.customer_id)}
                                onChange={(opt) => setData('customer_id', opt ? opt.value : '')}
                                placeholder="Select a customer (Optional)"
                                error={errors.customer_id}
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-400" />
                                {activeTab === 'en' ? 'Product Description (EN)' : 'Deskripsi Produk (ID)'}
                            </label>
                            <textarea
                                value={activeTab === 'en' ? data.description : data.description_id}
                                onChange={e => setData(activeTab === 'en' ? 'description' : 'description_id', e.target.value)}
                                rows="4"
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all resize-none ${(activeTab === 'en' ? errors.description : errors.description_id) ? 'ring-2 ring-red-500' : ''}`}
                                placeholder={activeTab === 'en' ? "Technical specifications, materials, etc..." : "Spesifikasi teknis, material, dll..."}
                                required={activeTab === 'en'}
                            ></textarea>
                            {errors.description && <p className="text-xs font-bold text-red-500 mt-1">{errors.description}</p>}
                            {errors.description_id && <p className="text-xs font-bold text-red-500 mt-1">{errors.description_id}</p>}
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <ImageInput
                                label="Main Image"
                                value={data.main_image}
                                onChange={(fileOrUrl) => setData('main_image', fileOrUrl)}
                                error={errors.main_image}
                            />
                        </div>

                        {/* Gallery Images */}
                        <div className="pt-4 border-t border-slate-100">
                            <MultiImageInput
                                label="Product Gallery (Optional)"
                                value={data.product_images}
                                onChange={(images) => setData('product_images', images)}
                                error={errors.product_images}
                            />
                        </div>

                        {/* Active Status */}
                        <div className="pt-2">
                            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-50 bg-slate-50 cursor-pointer transition-all hover:bg-slate-100">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 rounded text-brand-primary focus:ring-brand-primary"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-700">Active Status</span>
                                    <span className="text-xs text-slate-500">Show this product on the public catalog.</span>
                                </div>
                            </label>
                        </div>

                        {/* SEO Optimization */}
                        <div className="pt-6 border-t border-slate-100 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                                    <ChevronLeft className="w-5 h-5 rotate-180" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">SEO Optimization</h4>
                                    <p className="text-[10px] text-slate-500 font-bold">Improve search engine visibility.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Slug */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL Slug ({activeTab.toUpperCase()})</label>
                                    <input
                                        type="text"
                                        value={activeTab === 'en' ? data.slug : data.slug_id}
                                        onChange={e => setData(activeTab === 'en' ? 'slug' : 'slug_id', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all"
                                        placeholder="e.g. door-frame-component"
                                    />
                                    <p className="text-[10px] text-slate-400 font-bold italic">* Leave blank to automatically generate from name</p>
                                    {errors.slug && <p className="text-xs font-bold text-red-500 mt-1">{errors.slug}</p>}
                                    {errors.slug_id && <p className="text-xs font-bold text-red-500 mt-1">{errors.slug_id}</p>}
                                </div>

                                {/* Meta Title */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Meta Title ({activeTab.toUpperCase()})</label>
                                    <input
                                        type="text"
                                        value={activeTab === 'en' ? data.meta_title : data.meta_title_id}
                                        onChange={e => setData(activeTab === 'en' ? 'meta_title' : 'meta_title_id', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all"
                                        placeholder="SEO Title"
                                    />
                                    {errors.meta_title && <p className="text-xs font-bold text-red-500 mt-1">{errors.meta_title}</p>}
                                    {errors.meta_title_id && <p className="text-xs font-bold text-red-500 mt-1">{errors.meta_title_id}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Meta Keywords ({activeTab.toUpperCase()})</label>
                                <input
                                    type="text"
                                    value={activeTab === 'en' ? data.meta_keywords : data.meta_keywords_id}
                                    onChange={e => setData(activeTab === 'en' ? 'meta_keywords' : 'meta_keywords_id', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all"
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Meta Description ({activeTab.toUpperCase()})</label>
                                <textarea
                                    value={activeTab === 'en' ? data.meta_description : data.meta_description_id}
                                    onChange={e => setData(activeTab === 'en' ? 'meta_description' : 'meta_description_id', e.target.value)}
                                    rows="2"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all resize-none"
                                    placeholder="Brief SEO description..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-xl text-base font-black hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Creating Product...' : 'Create Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
