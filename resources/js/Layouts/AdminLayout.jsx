import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    Newspaper,
    Box,
    ShieldCheck,
    History,
    Menu,
    X,
    LogOut,
    User as UserIcon,
    ChevronRight,
    Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernAlert from '@/Components/ModernAlert';
import ApplicationLogo from '@/Components/ApplicationLogo';

/**
 * Admin Layout
 * Generate by Antigravity
 */
export default function AdminLayout({ children, title }) {
    const { auth, flash } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [localFlash, setLocalFlash] = useState({ success: null, error: null });

    useEffect(() => {
        setLocalFlash({
            success: flash.success,
            error: flash.error
        });
    }, [flash]);

    // Close sidebar automatically on mobile when navigating
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const userPermissions = auth.user.permissions || [];

    const navigation = [
        {
            name: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutDashboard,
            active: route().current('dashboard')
        },
        {
            name: 'User Management',
            href: route('admin.users.index'),
            icon: Users,
            permission: 'manage users',
            active: route().current('admin.users.*')
        },
        {
            name: 'Customer Management',
            href: route('admin.customers.index'),
            icon: Building2,
            permission: 'manage customers',
            active: route().current('admin.customers.*')
        },
        {
            name: 'News Management',
            href: route('admin.news.index'),
            icon: Newspaper,
            permission: 'manage news',
            active: route().current('admin.news.*')
        },
        {
            name: 'Product Management',
            href: route('admin.products.index'),
            icon: Box,
            permission: 'manage products',
            active: route().current('admin.products.*')
        },
        {
            name: 'Role & Permission',
            href: route('admin.roles.index'),
            icon: ShieldCheck,
            permission: 'manage roles',
            active: route().current('admin.roles.*')
        },
        {
            name: 'Activity Logs',
            href: route('admin.activity-logs.index'),
            icon: History,
            permission: 'view logs',
            active: route().current('admin.activity-logs.*')
        },
    ];

    const filteredNavigation = navigation.filter(item =>
        !item.permission || userPermissions.includes(item.permission)
    );

    return (
        <div className="min-h-screen bg-slate-50 flex overflow-hidden">
            {/* Mobile Sidebar Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 transform 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                    lg:translate-x-0 lg:fixed lg:inset-y-0 shadow-2xl lg:shadow-none`}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="h-16 flex-shrink-0 flex items-center px-6 bg-slate-950/50 border-b border-slate-800/50">
                        <Link href="/" className="flex items-center gap-3">
                            <ApplicationLogo className="w-8 h-8" />
                            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Admin Panel</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                        {filteredNavigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${item.active
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'group-hover:text-orange-400 text-slate-500'}`} />
                                <span className="text-sm font-bold tracking-wide">{item.name}</span>
                                {item.active && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="ml-auto"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile Summary */}
                    <div className="p-4 bg-slate-950/30 m-4 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                <UserIcon className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="overflow-hidden text-ellipsis">
                                <p className="text-sm font-bold truncate">{auth.user.name}</p>
                                <p className="text-xs text-slate-500 truncate">{auth.user.roles[0] || 'Member'}</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 rounded-lg border border-transparent transition-all"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64 transition-all duration-300 h-screen">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        >
                            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Status / Notifications placeholder */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-100 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            System Live
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={route().current()}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            {/* Global Modern Alerts */}
            <ModernAlert
                type="success"
                message={localFlash.success}
                onClose={() => setLocalFlash(prev => ({ ...prev, success: null }))}
            />
            <ModernAlert
                type="error"
                message={localFlash.error}
                onClose={() => setLocalFlash(prev => ({ ...prev, error: null }))}
            />
        </div>
    );
}
