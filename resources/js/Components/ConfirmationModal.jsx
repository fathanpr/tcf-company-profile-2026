import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, isDeleting = false }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 text-center">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                />

                {/* Modal Panel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all"
                >
                    <div className="p-6">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-black text-slate-900 leading-6">
                                {title || 'Confirm Deletion'}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-slate-500">
                                    {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 px-6 py-4 flex flex-row-reverse gap-3">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="inline-flex w-full justify-center rounded-xl bg-red-600 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 sm:w-auto transition-all disabled:opacity-50 disabled:cursor-not-allowed items-center gap-2"
                        >
                            {isDeleting ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isDeleting}
                            className="inline-flex w-full justify-center rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 sm:w-auto transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
