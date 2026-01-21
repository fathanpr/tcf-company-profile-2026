import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function MainLayout({ children, title }) {
    const siteTitle = String(title ? `${title} - PT Tri Centrum Fortuna` : 'PT Tri Centrum Fortuna - Premium Automotive Manufacturing Partner');
    const siteLogo = String(`${typeof window !== 'undefined' ? window.location.origin : ''}/img/tcf-logo.png`);

    return (
        <div className="min-h-screen bg-[#020617] text-white font-sans antialiased overflow-x-hidden">
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content="PT Tri Centrum Fortuna (TCF) is a leading professional automotive manufacturing partner in Indonesia, specializing in high-precision stamping and robotic welding. Your best choice for second tier automotive parts." />
                <meta name="keywords" content="stamping indonesia, welding automotive, tier 2 automotive indonesia, pt tri centrum fortuna, tcf karawang, tcf purwakarta, automotive spare parts manufacturer" />
                <meta name="author" content="PT Tri Centrum Fortuna" />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content="Partner with TCF, Indonesia's premier choice for high-precision stamping and automated welding in the automotive industry." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={siteLogo} />
                <meta name="robots" content="index, follow" />
            </Head>
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
