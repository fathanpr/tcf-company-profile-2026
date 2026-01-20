import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit2, Trash2, Shield, Lock, Layers } from 'lucide-react';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useState } from 'react';

/**
 * Role Management Index
 * Generate by Antigravity
 */
export default function Index({ roles }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = (id) => {
        setDeletionId(id);
        setConfirmingDeletion(true);
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('admin.roles.destroy', deletionId), {
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
        <AdminLayout title="Role & Permission Management">
            <Head title="Roles - Admin TCF" />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Actions Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Available Roles</h3>
                            <p className="text-xs text-slate-500">Define access levels and permissions.</p>
                        </div>
                    </div>

                    <Link
                        href={route('admin.roles.create')}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                        <Plus className="w-4 h-4" />
                        Create New Role
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {roles.map((role) => (
                        <div key={role.id} className="group p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/5 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={route('admin.roles.edit', role.id)}
                                        className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => confirmDelete(role.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <h4 className="text-lg font-black text-slate-800 mb-1">{role.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-bold uppercase tracking-tighter">
                                <Layers className="w-3.5 h-3.5" />
                                {role.permissions.length} Permissions Assigned
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {role.permissions.slice(0, 3).map((perm) => (
                                    <span key={perm.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                                        <Lock className="w-2.5 h-2.5" />
                                        {perm.name.replace('manage ', '')}
                                    </span>
                                ))}
                                {role.permissions.length > 3 && (
                                    <span className="text-[10px] font-bold text-slate-400 self-center">
                                        +{role.permissions.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirmingDeletion}
                onClose={() => setConfirmingDeletion(false)}
                onConfirm={handleDelete}
                title="Delete Role"
                message="Are you sure you want to delete this role? This might affect existing users."
                isDeleting={isDeleting}
            />
        </AdminLayout >
    );
}
