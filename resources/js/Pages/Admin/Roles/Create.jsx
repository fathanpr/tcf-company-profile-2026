import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Shield, Save, Lock, CheckCircle2 } from 'lucide-react';

/**
 * Role Create Page
 * Generate by Antigravity
 */
export default function Create({ permissions }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.roles.store'));
    };

    const handlePermissionChange = (permName) => {
        let newPerms = [...data.permissions];
        if (newPerms.includes(permName)) {
            newPerms = newPerms.filter(p => p !== permName);
        } else {
            newPerms.push(permName);
        }
        setData('permissions', newPerms);
    };

    return (
        <AdminLayout title="Create New Role">
            <Head title="Create Role - Admin TCF" />

            <div className="max-w-4xl">
                <Link
                    href={route('admin.roles.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Roles
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Define Access Role</h3>
                                <p className="text-sm text-slate-500">Specify role name and assign granular permissions.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-8">
                        {/* Name */}
                        <div className="space-y-2 max-w-md">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-slate-400" />
                                Role Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                placeholder="E.g. Content Manager"
                                required
                            />
                            {errors.name && <p className="text-xs font-bold text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Permissions Grid */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-orange-500" />
                                    Assign Permissions
                                </label>
                                <span className="text-xs text-slate-400 font-bold">{data.permissions.length} selected</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {permissions.map((perm) => (
                                    <button
                                        key={perm.id}
                                        type="button"
                                        onClick={() => handlePermissionChange(perm.name)}
                                        className={`flex items-center p-4 rounded-xl border-2 transition-all text-left ${data.permissions.includes(perm.name)
                                                ? 'bg-orange-50 border-orange-500 shadow-md shadow-orange-500/5'
                                                : 'bg-white border-slate-100 hover:border-slate-200'
                                            }`}
                                    >
                                        <div className={`w-6 h-6 rounded flex items-center justify-center mr-3 shrink-0 transition-colors ${data.permissions.includes(perm.name) ? 'bg-orange-500 text-white' : 'bg-slate-100 text-transparent'
                                            }`}>
                                            <CheckCircle2 className="w-4 h-4 shadow-sm" />
                                        </div>
                                        <div>
                                            <p className={`text-xs font-black uppercase tracking-widest ${data.permissions.includes(perm.name) ? 'text-orange-950' : 'text-slate-600'}`}>
                                                {perm.name.replace('manage ', '')}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {errors.permissions && <p className="text-xs font-bold text-red-500 mt-1">{errors.permissions}</p>}
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-orange-600 text-white rounded-xl text-base font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Creating...' : 'Register Access Role'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
