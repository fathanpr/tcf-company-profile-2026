import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';

export default function Placeholder({ title, pageName }) {
    return (
        <MainLayout title={title}>
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{pageName}</h1>
                <p className="text-gray-600">This section is currently under development.</p>
            </div>
        </MainLayout>
    );
}
