import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { props } = usePage();
    const { translations, locale } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: translations['Home'] || 'Home', href: '#' },
        { name: translations['About Us'] || 'About Us', href: '#about' },
        { name: translations['Capabilities'] || 'Capabilities', href: '#capabilities' },
        { name: translations['Product'] || 'Product', href: '#product' },
        { name: translations['News'] || 'News', href: '#news' },
        { name: translations['Connect with Us'] || 'Connect with Us', href: '#location' },
    ];

    const toggleLanguage = () => {
        // Logic to toggle language (to be implemented via route or state)
        // For now, simple console log or redirect
        const nextLocale = locale === 'en' ? 'id' : (locale === 'id' ? 'ja' : 'en');
        window.location.href = `/lang/${nextLocale}`;
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 group ${scrolled
            ? 'bg-[#172554]/85 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-3'
            }`}>
            {/* Remove lighting animation border as requested/implied 'border' issue */}

            {/* Optional: Glow effect on edges */}
            <div className={`absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/10 to-transparent transition-opacity duration-1000 ${scrolled ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-1000 ${scrolled ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}></div>
            <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    <div className="flex-shrink-0 flex items-center">
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="flex items-center gap-3 group border-none outline-none ring-0 cursor-pointer"
                        >
                            <img
                                src="/img/tcf-logo.png"
                                alt="TCF Logo"
                                className="h-10 w-auto object-contain"
                            />
                            <span className={`hidden md:block font-bold text-sm tracking-widest uppercase opacity-90 group-hover:opacity-100 transition-opacity ${scrolled ? 'text-white' : 'text-white'}`}>
                                PT Tri Centrum Fortuna
                            </span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.href === '#') {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else {
                                        const element = document.querySelector(link.href);
                                        if (element) {
                                            // Calculate offset to center the element
                                            const elementHeight = element.offsetHeight;
                                            const windowHeight = window.innerHeight;
                                            const navbarHeight = 80;

                                            let offset = navbarHeight;

                                            // If element fits in window, center it
                                            if (elementHeight < windowHeight) {
                                                offset = (windowHeight - elementHeight) / 2;
                                                // Ensure we don't go above the navbar (keep at least navbar buffer)
                                                if (offset < navbarHeight) offset = navbarHeight;
                                            }

                                            const elementPosition = element.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.pageYOffset - offset;

                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: "smooth"
                                            });
                                        }
                                    }
                                }}
                                className={`text-sm font-bold uppercase tracking-wider relative group ${scrolled ? 'text-white hover:text-orange-500' : 'text-white hover:text-orange-500'} transition-colors duration-300`}
                            >
                                {link.name}
                            </a>
                        ))}

                        <button
                            onClick={toggleLanguage}
                            className={`flex items-center space-x-1 text-sm font-medium transition-colors ${scrolled ? 'text-white hover:text-orange-500' : 'text-white/90 hover:text-orange-500'}`}
                        >
                            <Globe className="w-4 h-4" />
                            <span className="uppercase">{locale}</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${scrolled ? 'text-white' : 'text-white'} hover:text-orange-500 transition-colors pointer-events-auto`}
                        >
                            <motion.div
                                animate={{ rotate: isOpen ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="md:hidden absolute top-[100%] left-0 right-0 mx-4 mt-2 bg-[#172554]/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.href === '#') {
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                            setIsOpen(false);
                                        } else {
                                            const element = document.querySelector(link.href);
                                            if (element) {
                                                // Calculate offset to center the element
                                                const elementHeight = element.offsetHeight;
                                                const windowHeight = window.innerHeight;
                                                const navbarHeight = 80;

                                                let offset = navbarHeight;

                                                // If element fits in window, center it
                                                if (elementHeight < windowHeight) {
                                                    offset = (windowHeight - elementHeight) / 2;
                                                    // Ensure we don't go above the navbar (keep at least navbar buffer)
                                                    if (offset < navbarHeight) offset = navbarHeight;
                                                }

                                                const elementPosition = element.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - offset;

                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: "smooth"
                                                });
                                                setIsOpen(false);
                                            }
                                        }
                                    }}
                                    className="block px-4 py-3 rounded-xl text-base font-bold text-center transition-all duration-200 text-white hover:bg-white/10 hover:tracking-wide"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="border-t border-white/10 my-2 pt-2">
                                <button
                                    onClick={toggleLanguage}
                                    className="w-full justify-center flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
                                >
                                    <Globe className="w-4 h-4" />
                                    Change Language ({locale})
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
