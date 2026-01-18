import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

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
        { name: translations['Our Capabilities'] || 'Our Capabilities', href: '#capabilities' },
        { name: translations['Product'] || 'Product', href: '#product' },
        { name: translations['News'] || 'News', href: '#news' },
        { name: translations['Location'] || 'Location', href: '#location' },
    ];

    const toggleLanguage = () => {
        // Logic to toggle language (to be implemented via route or state)
        // For now, simple console log or redirect
        const nextLocale = locale === 'en' ? 'id' : (locale === 'id' ? 'ja' : 'en');
        window.location.href = `/lang/${nextLocale}`;
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 group ${scrolled
            ? 'bg-primary-900/80 backdrop-blur-md shadow-lg py-2'
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
                            <span className="hidden md:block text-white font-bold text-sm tracking-widest uppercase opacity-90 group-hover:opacity-100 transition-opacity">
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
                                            const offset = 80;
                                            const elementPosition = element.getBoundingClientRect().top;
                                            const offsetPosition = elementPosition + window.pageYOffset - offset;
                                            window.scrollTo({
                                                top: offsetPosition,
                                                behavior: "smooth"
                                            });
                                        }
                                    }
                                }}
                                className="text-sm font-medium transition-all text-white/90 hover:text-accent-400 hover:scale-105"
                            >
                                {link.name}
                            </a>
                        ))}

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center space-x-1 text-sm font-medium transition-colors text-white/90 hover:text-accent-400"
                        >
                            <Globe className="w-4 h-4" />
                            <span className="uppercase">{locale}</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-accent-400 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-primary-900/95 backdrop-blur-xl border-t border-white/10 shadow-xl">
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
                                            const offset = 80;
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
                                className="block px-4 py-3 rounded-xl text-base font-medium transition-colors text-white/80 hover:bg-white/5 hover:text-white"
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="border-t border-white/10 my-2 pt-2">
                            <button
                                onClick={toggleLanguage}
                                className="w-full text-left flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:bg-white/5 hover:text-white"
                            >
                                <Globe className="w-4 h-4" />
                                Change Language ({locale})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
