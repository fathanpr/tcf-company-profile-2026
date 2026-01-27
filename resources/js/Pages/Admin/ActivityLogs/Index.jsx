import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { History, User, Activity, Clock, Database, ChevronRight } from 'lucide-react';

/**
 * Activity Log Index
 * Generate by Antigravity
 */
export default function Index({ logs }) {
    const getActionColor = (description) => {
        if (description.includes('created')) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        if (description.includes('updated')) return 'text-blue-600 bg-blue-50 border-blue-100';
        if (description.includes('deleted')) return 'text-red-600 bg-red-50 border-red-100';
        return 'text-slate-600 bg-slate-50 border-slate-100';
    };

    return (
        <AdminLayout title="Activity Logs">
            <Head title="System Logs - Admin TCF" />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/10">
                        <History className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Audit Trail</h3>
                        <p className="text-sm text-slate-500">Chronological record of all administrative actions performed in the system.</p>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {logs.data.map((log) => (
                        <div key={log.id} className="p-6 hover:bg-slate-50/50 transition-colors group">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 p-2 rounded-lg border shrink-0 ${getActionColor(log.description)}`}>
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-black text-slate-800 uppercase tracking-tight">
                                                {log.causer ? log.causer.name : 'System'}
                                            </span>
                                            <ChevronRight className="w-3 h-3 text-slate-300" />
                                            <span className="text-sm text-slate-600 font-medium">
                                                {log.description}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400">
                                            <div className="flex items-center gap-1.5 uppercase tracking-widest">
                                                <Database className="w-3 h-3" />
                                                {log.log_name}
                                            </div>
                                            <div className="flex items-center gap-1.5 uppercase tracking-widest">
                                                <Clock className="w-3 h-3" />
                                                {new Date(log.created_at).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 self-end md:self-center">
                                    <div className="flex flex-col items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Target Object</span>
                                        <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                                            {log.subject_type ? log.subject_type.split('\\').pop() : 'General'} #{log.subject_id || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {logs.data.length === 0 && (
                        <div className="p-20 text-center">
                            <Activity className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold">No activities recorded yet.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
                        <p>Showing {logs.from || 0} to {logs.to || 0} of {logs.total} activities</p>
                        <div className="flex gap-2">
                            {logs.links.map((link, i) => (
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
        </AdminLayout>
    );
}
