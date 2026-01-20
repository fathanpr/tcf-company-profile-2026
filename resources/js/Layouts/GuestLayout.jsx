import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden px-6">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-md">
                {/* <Link href="/" className="mb-6 group">
                    <div className="p-3 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 group-hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
                        <ApplicationLogo className="h-10 w-auto fill-current text-white" />
                    </div>
                </Link> */}

                <div className="w-full bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

                    {children}
                </div>
            </div>
        </div>
    );
}
