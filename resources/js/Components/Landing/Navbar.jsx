import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: route('home') },
        { name: 'About Us', href: route('about') },
        { name: 'Our Capabilities', href: route('capabilities') },
        { name: 'Plants', href: route('plants') },
        { name: 'Core Values', href: route('core-values') },
        { name: 'News', href: route('news') },
        { name: 'Contact Us', href: route('contact') },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'py-6 bg-gradient-to-b from-secondary-900/60 to-transparent'
                }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        {/* Logo Icon Placeholder - Corporate Shape */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-colors duration-300 ${scrolled ? 'bg-primary-600 text-white' : 'bg-white text-primary-600'}`}>
                            T
                        </div>
                        <span className={`text-2xl font-bold tracking-tight font-sans transition-colors duration-300 ${scrolled ? 'text-secondary-900' : 'text-white'}`}>
                            TCF <span className={`${scrolled ? 'text-primary-600' : 'text-primary-300'} font-normal`}>Profile</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 ${scrolled ? 'text-secondary-600 hover:text-primary-600' : 'text-white hover:text-primary-300'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href={route('login')}
                            className={`text-sm font-bold transition-colors ${scrolled ? 'text-primary-600 hover:text-primary-700' : 'text-white hover:text-primary-200'}`}
                        >
                            Log In
                        </Link>
                        <Link
                            href={route('register')}
                            className={`px-6 py-2.5 text-sm font-bold rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${scrolled
                                ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-primary-600/30'
                                : 'bg-white text-primary-700 hover:bg-primary-50'
                                }`}
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={`md:hidden ${scrolled ? 'text-secondary-900' : 'text-white'}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-slate-100 overflow-hidden shadow-xl"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-secondary-700 hover:text-primary-600 text-lg font-bold"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-100 my-2"></div>
                            <Link
                                href={route('login')}
                                className="text-secondary-600 font-medium"
                            >
                                Log In
                            </Link>
                            <Link
                                href={route('register')}
                                className="text-primary-600 font-bold"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
