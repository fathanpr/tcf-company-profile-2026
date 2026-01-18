import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const { props } = usePage();
    const { translations } = props;

    return (
        <footer className="bg-[#020617] text-white pt-16 pb-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-3xl font-bold text-white">TCF</h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            PT Tri Centrum Fortuna
                            <br />
                            A leading automotive spare parts manufacturer committed to Empowerment, Excellence, Integrity, Service, and Tenacity.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                                <Facebook className="w-5 h-5 text-gray-300" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                                <Instagram className="w-5 h-5 text-gray-300" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors">
                                <Twitter className="w-5 h-5 text-gray-300" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Link 1 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-400">{translations['Our Capabilities'] || 'Our Capabilities'}</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#capabilities" className="hover:text-white transition-colors">Stamping</a></li>
                            <li><a href="#capabilities" className="hover:text-white transition-colors">Welding</a></li>
                            <li><a href="#capabilities" className="hover:text-white transition-colors">Tooling</a></li>
                            <li><a href="#location" className="hover:text-white transition-colors">Our Plants</a></li>
                        </ul>
                    </div>

                    {/* Quick Link 2 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-400">Company</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#about" className="hover:text-white transition-colors">{translations['About Us'] || 'About Us'}</a></li>
                            <li><a href="#about" className="hover:text-white transition-colors">{translations['Core Values'] || 'Core Values'}</a></li>
                            <li><a href="#news" className="hover:text-white transition-colors">{translations['News'] || 'News'}</a></li>
                            <li><a href="#location" className="hover:text-white transition-colors">{translations['Contact Us'] || 'Contact Us'}</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-primary-400">Contact</h3>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-secondary-500 mt-0.5" />
                                <span>Jl. Harapan Raya Lot 6-8, Karawang International Industrial City (KIIC), Karawang 41361, West Java, Indonesia</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-secondary-500" />
                                <span>+62 267 1234567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-secondary-500" />
                                <span>info@tricentrumfortuna.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center px-4">
                    <p className="text-gray-500 text-xs">
                        &copy; 2026 PT Tri Centrum Fortuna. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
