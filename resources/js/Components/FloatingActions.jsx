import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, FileText, Mail, X, Plus } from 'lucide-react';

/**
 * Floating Action Button (FAB) Component
 * Allows users to download company profile and send inquiry emails.
 * Generate by Antigravity
 */
const FloatingActions = () => {
    const [isOpen, setIsOpen] = useState(false);

    const emailConfig = {
        address: 'sales.kg@tricentrumfortuna.com',
        subject: encodeURIComponent('Inquiry regarding PT Tri Centrum Fortuna Services'),
        body: encodeURIComponent('Dear Sales Team,\n\nI am interested in learning more about the automotive manufacturing services provided by PT Tri Centrum Fortuna.\n\n[Please provide details about your inquiry here]\n\nI look forward to hearing from you.\n\nBest regards,\n[Your Name/Company]')
    };

    const actions = [
        {
            icon: <FileText className="w-5 h-5" />,
            label: 'Company Profile',
            onClick: () => {
                const link = document.createElement('a');
                link.href = '/files/TCF_Company_Profile_2026.pdf';
                link.download = 'TCF_Company_Profile_2026.pdf';
                link.click();
            },
            color: 'bg-blue-600',
            hoverColor: 'hover:bg-blue-700'
        },
        {
            icon: <Mail className="w-5 h-5" />,
            label: 'Email Inquiry',
            href: `mailto:${emailConfig.address}?subject=${emailConfig.subject}&body=${emailConfig.body}`,
            color: 'bg-emerald-600',
            hoverColor: 'hover:bg-emerald-700'
        }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col items-end gap-3 mb-2">
                        {actions.map((action, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                <span className="px-3 py-1.5 bg-slate-800/90 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/10 shadow-xl pointer-events-none">
                                    {action.label}
                                </span>
                                {action.href ? (
                                    <a
                                        href={action.href}
                                        className={`w-12 h-12 ${action.color} ${action.hoverColor} text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95`}
                                    >
                                        {action.icon}
                                    </a>
                                ) : (
                                    <button
                                        onClick={action.onClick}
                                        className={`w-12 h-12 ${action.color} ${action.hoverColor} text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95`}
                                    >
                                        {action.icon}
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 ${isOpen ? 'bg-brand-primary' : 'bg-brand-primary'} text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 relative group overflow-hidden`}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'open'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <MessageCircle className="w-6 h-6" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default FloatingActions;
