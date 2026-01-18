import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import HeroSection from '@/Components/Landing/HeroSection';
import StatsSection from '@/Components/Landing/StatsSection';
import ServicePillars from '@/Components/Landing/ServicePillars';
import CoreValues from '@/Components/Landing/CoreValues';
import NewsSection from '@/Components/Landing/NewsSection';
import Footer from '@/Components/Landing/Footer';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome to Future TCF" />
            <main className="text-secondary-800 selection:bg-primary-100 selection:text-primary-900 bg-secondary-50 min-h-screen font-sans antialiased">
                <Navbar />
                <HeroSection />
                <StatsSection />
                <CoreValues />
                <ServicePillars />
                <NewsSection />
                <Footer />
            </main>
        </>
    );
}
