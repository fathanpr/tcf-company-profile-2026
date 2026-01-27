import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { Newspaper, Users, Box, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Admin Dashboard
 * Generate by Antigravity
 */
export default function Dashboard() {
    const { auth } = usePage().props;
    const userPermissions = auth.user.permissions || [];
    const canViewLogs = userPermissions.includes('view logs');

    const stats = [
        { name: 'Total News', icon: Newspaper, count: '15', color: 'bg-blue-500' },
        { name: 'Total Users', icon: Users, count: '3', color: 'bg-emerald-500' },
        { name: 'Total Products', icon: Box, count: '12', color: 'bg-brand-primary' },
        { name: 'Active Customers', icon: Building2, count: '8', color: 'bg-purple-500' },
    ];

    return (
        <>
            <Head title="Dashboard - Admin TCF" />

            <div className="space-y-8">
                {/* Welcome Hero */}
                <div className="relative overflow-hidden bg-slate-900 rounded-3xl p-10 text-white shadow-2xl shadow-slate-900/20">
                    <div className="relative z-10 max-w-2xl">
                        <h1 className="text-3xl font-black mb-4">Good Day, {auth.user.name.split(' ')[0]}! 👋</h1>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Welcome to the PT Tri Centrum Fortuna administrative dashboard.
                            From here, you can manage your corporate content, users, and digital assets with full audit tracking.
                        </p>
                    </div>
                    {/* Abstract background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[80px] translate-y-1/2 -translate-x-1/2 rounded-full"></div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-800">{stat.count}</h3>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">{stat.name}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Security Status */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 text-emerald-800">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-black uppercase tracking-tight">Security Protocol Active</h4>
                            <p className="text-sm font-medium opacity-80">Your session is encrypted and all actions are being logged to the audit trail.</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        {canViewLogs && (
                            <Link
                                href={route('admin.activity-logs.index')}
                                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-black hover:bg-emerald-700 transition-all flex items-center gap-2"
                            >
                                Review Logs
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <AdminLayout title="System Overview">{page}</AdminLayout>;
