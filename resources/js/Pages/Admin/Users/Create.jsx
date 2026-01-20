import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, UserPlus, Save, Shield, Mail, Lock } from 'lucide-react';

/**
 * User Create Page
 * Generate by Antigravity
 */
export default function Create({ roles }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    const handleRoleChange = (roleName) => {
        let newRoles = [...data.roles];
        if (newRoles.includes(roleName)) {
            newRoles = newRoles.filter(r => r !== roleName);
        } else {
            newRoles.push(roleName);
        }
        setData('roles', newRoles);
    };

    return (
        <AdminLayout title="Create User">
            <Head title="Create User - Admin TCF" />

            <div className="max-w-2xl">
                <Link
                    href={route('admin.users.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Users
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                                <UserPlus className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">User Information</h3>
                                <p className="text-sm text-slate-500">Add a new administrative user and assign roles.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <UserPlus className="w-4 h-4 text-slate-400" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                                placeholder="John Doe"
                                required
                            />
                            {errors.name && <p className="text-xs font-bold text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-slate-400" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                                placeholder="john@example.com"
                                required
                            />
                            {errors.email && <p className="text-xs font-bold text-red-500 mt-1">{errors.email}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-slate-400" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all ${errors.password ? 'ring-2 ring-red-500' : ''}`}
                                    required
                                />
                                {errors.password && <p className="text-xs font-bold text-red-500 mt-1">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-slate-400" />
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-orange-500 rounded-xl text-sm transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Roles */}
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-slate-400" />
                                Assign Roles
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {roles.map((role) => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => handleRoleChange(role.name)}
                                        className={`flex items-center p-4 rounded-xl border-2 transition-all text-left group ${data.roles.includes(role.name)
                                                ? 'bg-orange-50 border-orange-500'
                                                : 'bg-white border-slate-100 hover:border-slate-200'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 transition-colors ${data.roles.includes(role.name) ? 'bg-orange-500 text-white' : 'bg-slate-100 text-transparent'
                                            }`}>
                                            <Save className="w-3 h-3" />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-bold ${data.roles.includes(role.name) ? 'text-orange-900' : 'text-slate-700'}`}>
                                                {role.name}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {errors.roles && <p className="text-xs font-bold text-red-500 mt-1">{errors.roles}</p>}
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-xl text-base font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Creating User...' : 'Create User Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
