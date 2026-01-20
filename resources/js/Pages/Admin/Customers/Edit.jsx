import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Building2, Save, Globe, Image as ImageIcon, RefreshCcw } from 'lucide-react';

/**
 * Customer Edit Page
 * Generate by Antigravity
 */
export default function Edit({ customer }) {
    const { data, setData, put, processing, errors } = useForm({
        name: customer.name,
        logo: customer.logo || '',
        website: customer.website || '',
        is_active: !!customer.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.customers.update', customer.id));
    };

    return (
        <AdminLayout title="Edit Customer">
            <Head title={`Edit ${customer.name} - Admin TCF`} />

            <div className="max-w-2xl">
                <Link
                    href={route('admin.customers.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Customers
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Partner Details</h3>
                                <p className="text-sm text-slate-500">Update company profile and status for {customer.name}.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-slate-400" />
                                Company Name
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

                        {/* Website */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-slate-400" />
                                Website URL
                            </label>
                            <input
                                type="url"
                                value={data.website}
                                onChange={e => setData('website', e.target.value)}
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all ${errors.website ? 'ring-2 ring-red-500' : ''}`}
                            />
                            {errors.website && <p className="text-xs font-bold text-red-500 mt-1">{errors.website}</p>}
                        </div>

                        {/* Logo */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <ImageIcon className="w-4 h-4 text-slate-400" />
                                Logo URL
                            </label>
                            <input
                                type="text"
                                value={data.logo}
                                onChange={e => setData('logo', e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all"
                            />
                            {data.logo && (
                                <div className="mt-2 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center h-32 max-w-xs">
                                    <img src={data.logo.startsWith('http') || data.logo.startsWith('/') ? data.logo : `/${data.logo}`} alt="Preview" className="max-w-full max-h-full object-contain" />
                                </div>
                            )}
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
                                    <span className="text-xs text-slate-500">Show this partner in the client scroll and about page.</span>
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
                                {processing ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
