import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const { props } = usePage();
    const { translations, locale } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: translations['Home'] || 'Home', href: '/', type: 'link' },
        {
            name: translations['About Us'] || 'About Us',
            type: 'dropdown',
            children: [
                { name: 'Vision & Mission', href: '/about/vision-mission' },
                { name: 'Organization Structure', href: '/about/organization' },
                { name: 'Facilities', href: '/about/facilities' },
            ]
        },
        { name: translations['Capabilities'] || 'Capabilities', href: '/#capabilities', type: 'scroll' },
        { name: translations['Product'] || 'Product', href: '/#product', type: 'scroll' },
        { name: translations['News'] || 'News', href: '/#news', type: 'scroll' },
        { name: translations['Connect with Us'] || 'Connect with Us', href: '/#location', type: 'scroll' },
    ];

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'id' : (locale === 'id' ? 'ja' : 'en');
        window.location.href = `/lang/${nextLocale}`;
    };

    const handleNavClick = (e, link) => {
        if (link.type === 'scroll') {
            // Check if we are on the home page (root path / or /home)
            if (window.location.pathname === '/' || window.location.pathname === '') {
                e.preventDefault();
                const targetId = link.href.split('#')[1];
                const element = document.getElementById(targetId);

                if (element) {
                    const elementHeight = element.offsetHeight;
                    const windowHeight = window.innerHeight;
                    const navbarHeight = 80;
                    let offset = navbarHeight;

                    if (elementHeight < windowHeight) {
                        offset = (windowHeight - elementHeight) / 2;
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
            } else {
                // If not on home page, allow default behavior (navigation to /#section)
                setIsOpen(false);
            }
        } else {
            setIsOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 group ${scrolled || isOpen
            ? 'bg-[#172554]/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent py-3'
            }`}>
            <div className={`absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white/10 to-transparent transition-opacity duration-1000 ${scrolled ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-1000 ${scrolled ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}></div>

            <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group border-none outline-none ring-0 cursor-pointer"
                        >
                            <img
                                src="/img/tcf-logo.png"
                                alt="TCF Logo"
                                className="h-10 w-auto object-contain"
                            />
                            <span className={`hidden md:block font-bold text-sm tracking-widest uppercase opacity-90 group-hover:opacity-100 transition-opacity text-white`}>
                                PT Tri Centrum Fortuna
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            link.type === 'dropdown' ? (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => setAboutDropdownOpen(true)}
                                    onMouseLeave={() => setAboutDropdownOpen(false)}
                                >
                                    <button
                                        className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wider relative group ${scrolled ? 'text-white' : 'text-white'} hover:text-orange-500 transition-colors duration-300`}
                                    >
                                        {link.name}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    <AnimatePresence>
                                        {aboutDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl overflow-hidden py-2 ring-1 ring-black/5"
                                            >
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-orange-600 transition-colors"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className={`text-sm font-bold uppercase tracking-wider relative group ${scrolled ? 'text-white' : 'text-white'} hover:text-orange-500 transition-colors duration-300`}
                                >
                                    {link.name}
                                </Link>
                            )
                        ))}

                        <button
                            onClick={toggleLanguage}
                            className={`flex items-center space-x-1 text-sm font-medium transition-colors text-white/90 hover:text-orange-500`}
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
                            className={`text-white hover:text-orange-500 transition-colors pointer-events-auto`}
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
                        className="md:hidden absolute top-[100%] left-0 right-0 mx-4 mt-2 bg-[#172554]/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10"
                    >
                        <div className="px-4 pt-4 pb-6 max-h-[80vh] overflow-y-auto overflow-x-hidden relative h-full">
                            <AnimatePresence initial={false} mode="popLayout">
                                {activeMobileSubmenu === null ? (
                                    <motion.div
                                        key="main-menu"
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -100, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-2 w-full"
                                    >
                                        {navLinks.map((link) => (
                                            link.type === 'dropdown' ? (
                                                <button
                                                    key={link.name}
                                                    onClick={() => setActiveMobileSubmenu(link.name)}
                                                    className="w-full flex justify-between items-center px-4 py-3 rounded-xl text-base font-bold text-white hover:bg-white/10 transition-all text-left"
                                                >
                                                    {link.name}
                                                    <ChevronRight className="w-5 h-5 opacity-70" />
                                                </button>
                                            ) : (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    onClick={(e) => handleNavClick(e, link)}
                                                    className="block px-4 py-3 rounded-xl text-base font-bold text-white hover:bg-white/10 transition-all text-left"
                                                >
                                                    {link.name}
                                                </Link>
                                            )
                                        ))}
                                        <div className="border-t border-white/10 my-2 pt-2">
                                            <button
                                                onClick={toggleLanguage}
                                                className="w-full justify-start flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
                                            >
                                                <Globe className="w-4 h-4" />
                                                Change Language ({locale})
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="submenu"
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 100, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-2 w-full"
                                    >
                                        <button
                                            onClick={() => setActiveMobileSubmenu(null)}
                                            className="w-full flex items-center gap-2 px-4 py-3 mb-2 rounded-xl text-sm font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                            Back to Menu
                                        </button>

                                        <div className="px-4 py-2 text-white/50 text-xs font-bold uppercase tracking-widest border-b border-white/10 mb-2">
                                            {activeMobileSubmenu}
                                        </div>

                                        {navLinks.find(link => link.name === activeMobileSubmenu)?.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-3 rounded-xl text-base font-bold text-white hover:bg-white/10 transition-all text-left"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
