import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Search, Building2, CheckCircle2, XCircle, Globe } from 'lucide-react';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useState } from 'react';

/**
 * Customer Management Index
 * Generate by Antigravity
 */
export default function Index({ customers, filters }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = (id) => {
        setDeletionId(id);
        setConfirmingDeletion(true);
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.customers.destroy', deletionId), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setDeletionId(null);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            }
        });
    };

    return (
        <AdminLayout title="Customer Management">
            <Head title="Customer Management - Admin TCF" />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Actions Header */}
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            defaultValue={filters.search}
                            onBlur={(e) => router.get(route('admin.customers.index'), { search: e.target.value }, { preserveState: true })}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all"
                        />
                    </div>

                    <Link
                        href={route('admin.customers.create')}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Customer
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-[10px]">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-[10px]">Website</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-[10px]">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center text-[10px]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.data.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden p-2">
                                                {customer.logo ? (
                                                    <img src={customer.logo.startsWith('http') || customer.logo.startsWith('/') ? customer.logo : `/${customer.logo}`} alt={customer.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Building2 className="w-6 h-6 text-slate-300" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{customer.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.website ? (
                                            <a
                                                href={customer.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-xs text-orange-600 font-bold hover:underline"
                                                title={customer.website}
                                            >
                                                <Globe className="w-3.5 h-3.5" />
                                                {customer.website.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                                            </a>
                                        ) : (
                                            <span className="text-xs text-slate-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {customer.is_active ? (
                                            <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Active
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                                                <XCircle className="w-3.5 h-3.5" />
                                                Inactive
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <Link
                                                href={route('admin.customers.edit', customer.id)}
                                                className="p-2 text-slate-400 hover:text-brand-primary hover:bg-orange-50 rounded-lg transition-all"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => confirmDelete(customer.id)}
                                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
                        <p>Showing {customers.from || 0} to {customers.to || 0} of {customers.total} customers</p>
                        <div className="flex gap-2">
                            {customers.links.map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3 py-1.5 rounded-lg border transition-all ${link.active
                                            ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20'
                                            : 'bg-white border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 rounded-lg border bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirmingDeletion}
                onClose={() => setConfirmingDeletion(false)}
                onConfirm={handleDelete}
                title="Delete Customer"
                message="Are you sure you want to delete this customer? This action cannot be undone."
                isDeleting={isDeleting}
            />
        </AdminLayout >
    );
}
