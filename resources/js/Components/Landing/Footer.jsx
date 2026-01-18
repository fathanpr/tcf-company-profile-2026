import React from 'react';
import { Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative pt-20 pb-10 overflow-hidden bg-secondary-900 text-slate-300">
            <div className="container px-6 mx-auto relative z-10">
                <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <h3 className="mb-6 text-2xl font-bold text-white font-sans tracking-tight">
                            TCF <span className="text-primary-500">Profile</span>
                        </h3>
                        <p className="mb-6 leading-relaxed text-sm text-slate-400">
                            Pioneering the future of manufacturing through precision stamping and robotic welding innovations.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 transition-colors border rounded-full border-slate-700 hover:bg-primary-600 hover:border-primary-600 hover:text-white"><Linkedin size={18} /></a>
                            <a href="#" className="p-2 transition-colors border rounded-full border-slate-700 hover:bg-primary-600 hover:border-primary-600 hover:text-white"><Twitter size={18} /></a>
                            <a href="#" className="p-2 transition-colors border rounded-full border-slate-700 hover:bg-primary-600 hover:border-primary-600 hover:text-white"><Instagram size={18} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="transition-colors hover:text-primary-400">About Us</a></li>
                            <li><a href="#" className="transition-colors hover:text-primary-400">Careers</a></li>
                            <li><a href="#" className="transition-colors hover:text-primary-400">Sustainability</a></li>
                            <li><a href="#" className="transition-colors hover:text-primary-400">News</a></li>
                        </ul>
                    </div>

                    {/* Capabilities */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">Capabilities</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="transition-colors hover:text-primary-400">Stamping</a></li>
                            <li><a href="#" className="transition-colors hover:text-primary-400">Welding</a></li>
                            <li><a href="#" className="transition-colors hover:text-primary-400">Engineering</a></li>
                            <li><a href="#" className="transition-colors hover:text-primary-400">Project Management</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">Stay Ahead</h4>
                        <p className="mb-4 text-sm text-slate-400">Subscribe to our newsletter for industry insights.</p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 text-sm text-white transition-all bg-secondary-800 border border-secondary-700 rounded-l-lg focus:outline-none focus:border-primary-500"
                            />
                            <button className="px-6 py-3 text-sm font-bold text-white transition-all bg-primary-600 rounded-r-lg hover:bg-primary-700">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-8 text-center text-sm border-t border-slate-800">
                    <p>&copy; {new Date().getFullYear()} PT Tri Centrum Fortuna. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
