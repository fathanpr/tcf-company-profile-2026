import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function ModernAlert({ type = 'success', message, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto close after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    const isSuccess = type === 'success';

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-end sm:items-start justify-center px-4 py-6 pointer-events-none sm:p-6">
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.3 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto ring-1 ring-black/5"
                >
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                {isSuccess ? (
                                    <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                ) : (
                                    <XCircle className="h-6 w-6 text-red-500" />
                                )}
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-black text-slate-900">
                                    {isSuccess ? 'Success!' : 'Error!'}
                                </p>
                                <p className="mt-1 text-sm text-slate-500">
                                    {message}
                                </p>
                            </div>
                            <div className="ml-4 flex flex-shrink-0">
                                <button
                                    type="button"
                                    className="inline-flex rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                    onClick={onClose}
                                >
                                    <span className="sr-only">Close</span>
                                    <X className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "0%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        className={`h-1 ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'}`}
                    />
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
