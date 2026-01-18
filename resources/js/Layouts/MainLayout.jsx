import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MainLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans antialiased overflow-x-hidden">
            <Head title={title} />
            <Navbar />

            <main className="flex-grow">
                {children}
            </main>

            <Footer />

            {/* Background elements for glassmorphism vibes */}
            <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[40%] bg-primary-900/10 rounded-full blur-[100px] opacity-20"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] bg-secondary-900/10 rounded-full blur-[100px] opacity-20"></div>
            </div>
        </div>
    );
}
