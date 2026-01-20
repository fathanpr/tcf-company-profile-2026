import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ChevronLeft, Box, Save, Building2, FileText, Image as ImageIcon, RefreshCcw } from 'lucide-react';
import ImageInput from '@/Components/ImageInput';
import SearchableSelect from '@/Components/SearchableSelect';

/**
 * Product Edit Page
 * Generate by Antigravity
 */
export default function Edit({ product, customers }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        customer_id: product.customer_id || '',
        description: product.description,
        main_image: product.main_image || '',
        is_active: !!product.is_active,
    });

    const customerOptions = customers.data.map(c => ({ value: c.id, label: c.name }));

    const submit = (e) => {
        e.preventDefault();
        if (data.main_image instanceof File) {
            router.post(route('admin.products.update', product.id), {
                _method: 'put',
                ...data,
            });
        } else {
            put(route('admin.products.update', product.id));
        }
    };

    return (
        <AdminLayout title="Edit Product">
            <Head title={`Edit ${product.name} - Admin TCF`} />

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
                                <h3 className="text-xl font-bold text-slate-900">Update Product</h3>
                                <p className="text-sm text-slate-500">Modify specifications and customer association for {product.name}.</p>
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
                                    <span className="text-sm font-bold text-slate-700 font-bold">Active Status</span>
                                    <span className="text-xs text-slate-500">Show this product on the public catalog.</span>
                                </div>
                            </label>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-xl text-base font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50"
                            >
                                <RefreshCcw className="w-5 h-5" />
                                {processing ? 'Updating...' : 'Save Product Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
