import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Code, Copy, Server, FileJson } from 'lucide-react';

export default function Index({ auth, docs, title }) {
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        // You could add a toast notification here
    };

    const getMethodColor = (method) => {
        const colors = {
            GET: 'bg-blue-100 text-blue-800 border-blue-200',
            POST: 'bg-green-100 text-green-800 border-green-200',
            PUT: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            DELETE: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[method] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout
            user={auth.user}
            title={title || "API Documentation"}
        >
            <Head title="API Documentation" />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 rounded-xl">
                            <Server className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">API Reference</h2>
                            <p className="text-slate-500 text-sm">Documentation for TCF Company Profile API endpoints.</p>
                        </div>
                    </div>
                </div>

                {docs.map((module, moduleIndex) => (
                    <motion.div
                        key={module.module}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: moduleIndex * 0.1 }}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                    >
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                            <FileJson className="w-5 h-5 text-slate-500" />
                            <h3 className="text-lg font-bold text-slate-800">{module.module}</h3>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {module.endpoints.map((endpoint, endpointIndex) => (
                                <div key={endpointIndex} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                                        <div className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase w-fit ${getMethodColor(endpoint.method)}`}>
                                            {endpoint.method}
                                        </div>
                                        <div className="flex-1 font-mono text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center justify-between group">
                                            <span>{endpoint.url}</span>
                                            <button 
                                                onClick={() => copyToClipboard(endpoint.url)}
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded transition-all"
                                                title="Copy URL"
                                            >
                                                <Copy className="w-3 h-3 text-slate-500" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-slate-800 mb-1">Description</h4>
                                        <p className="text-sm text-slate-600">{endpoint.description}</p>
                                    </div>

                                    {endpoint.headers && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-slate-800 mb-2">Headers</h4>
                                            <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                                                <pre className="text-xs text-blue-300 font-mono">
                                                    {JSON.stringify(endpoint.headers, null, 2)}
                                                </pre>
                                            </div>
                                        </div>
                                    )}

                                    {endpoint.payload && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-slate-800 mb-2">Request Body</h4>
                                            <div className="bg-slate-900 rounded-lg p-3 overflow-x-auto">
                                                <pre className="text-xs text-green-400 font-mono">
                                                    {JSON.stringify(endpoint.payload, null, 2)}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </AdminLayout>
    );
}
