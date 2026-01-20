import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Box, Save, Building2, FileText, Image as ImageIcon, ToggleLeft } from 'lucide-react';
import ImageInput from '@/Components/ImageInput';
import SearchableSelect from '@/Components/SearchableSelect';

/**
 * Product Create Page
 * Generate by Antigravity
 */
export default function Create({ customers }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        customer_id: '',
        description: '',
        main_image: '',
        is_active: true,
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
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
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                <Box className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Product Specification</h3>
                                <p className="text-sm text-slate-500">Define product details and associate with a customer.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Box className="w-4 h-4 text-slate-400" />
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                placeholder="E.g. Front Door Hinge"
                                required
                            />
                            {errors.name && <p className="text-xs font-bold text-red-500 mt-1">{errors.name}</p>}
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
                                Product Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="4"
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all resize-none ${errors.description ? 'ring-2 ring-red-500' : ''}`}
                                placeholder="Technical specifications, materials, etc..."
                                required
                            ></textarea>
                            {errors.description && <p className="text-xs font-bold text-red-500 mt-1">{errors.description}</p>}
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

                        {/* Active Status */}
                        <div className="pt-2">
                            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-50 bg-slate-50 cursor-pointer transition-all hover:bg-slate-100">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 rounded text-orange-600 focus:ring-orange-500"
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
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">URL Slug</label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all ${errors.slug ? 'ring-2 ring-red-500' : ''}`}
                                        placeholder="e.g. door-frame-component (Leave blank for auto)"
                                    />
                                    <p className="text-[10px] text-slate-400 font-bold italic">* Leave blank to automatically generate from product name</p>
                                    {errors.slug && <p className="text-xs font-bold text-red-500 mt-1">{errors.slug}</p>}
                                </div>

                                {/* Meta Title */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Meta Title</label>
                                    <input
                                        type="text"
                                        value={data.meta_title}
                                        onChange={e => setData('meta_title', e.target.value)}
                                        className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all ${errors.meta_title ? 'ring-2 ring-red-500' : ''}`}
                                        placeholder="SEO Title"
                                    />
                                    {errors.meta_title && <p className="text-xs font-bold text-red-500 mt-1">{errors.meta_title}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Meta Keywords</label>
                                <input
                                    type="text"
                                    value={data.meta_keywords}
                                    onChange={e => setData('meta_keywords', e.target.value)}
                                    className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all ${errors.meta_keywords ? 'ring-2 ring-red-500' : ''}`}
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                                {errors.meta_keywords && <p className="text-xs font-bold text-red-500 mt-1">{errors.meta_keywords}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Meta Description</label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    rows="2"
                                    className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-emerald-500 rounded-xl text-sm transition-all resize-none ${errors.meta_description ? 'ring-2 ring-red-500' : ''}`}
                                    placeholder="Brief SEO description..."
                                ></textarea>
                                {errors.meta_description && <p className="text-xs font-bold text-red-500 mt-1">{errors.meta_description}</p>}
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-xl text-base font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50"
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
