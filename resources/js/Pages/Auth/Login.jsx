import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="text-center mb-6">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 text-blue-500 mb-3 shadow-inner"
                >
                    <LogIn className="w-6 h-6" />
                </motion.div>
                <h2 className="text-xl font-black text-white tracking-tight">Welcome Back</h2>
                <p className="text-slate-400 text-xs mt-1">Please enter your credentials</p>
            </div>

            {status && (
                <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Email Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1.5 block">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="email"
                            value={data.email}
                            className="block w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            placeholder="name@company.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <InputError message={errors.email} className="mt-1" />
                </motion.div>

                {/* Password Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block">Password</label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[10px] text-blue-500 hover:text-blue-400 font-bold transition-colors"
                            >
                                Forgot?
                            </Link>
                        )}
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="password"
                            value={data.password}
                            className="block w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-white/5 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </motion.div>

                {/* Remember Me */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-between items-center"
                >
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-white/10 bg-slate-800 text-blue-600 shadow-sm focus:ring-blue-500 focus:ring-offset-slate-900"
                        />
                        <span className="ms-2 text-xs text-slate-400 group-hover:text-slate-300 transition-colors">
                            Remember me
                        </span>
                    </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-600 text-white text-sm font-black rounded-xl hover:from-blue-500 hover:to-sky-500 transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {processing ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Access Dashboard
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </motion.div>
            </form>

            {/* Global Activity Log Note - Generate by Antigravity */}
            <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                    Authorized Access Only
                </p>
            </div>
        </GuestLayout>
    );
}
