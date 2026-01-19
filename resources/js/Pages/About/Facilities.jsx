import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MapPin, Users, Calendar, Building2, X, Maximize2 } from 'lucide-react';
import Modal from '@/Components/Modal';

const facilityData = {
    purwakarta: {
        layout: '/img/facilities/purwakarta-layout.png',
        machines: [
            {
                category: "Stamping Press",
                icon: <Building2 className="w-5 h-5 text-orange-500" />,
                items: [
                    { name: "Progressive 110T - 300T", details: "SC/DC Types", count: "14 Units" },
                    { name: "Tandem 110T - 1000T", details: "Line Medium & High Tonnage", count: "48 Units" },
                    { name: "Double Crank 200T - 500T", details: "High Precision", count: "8 Units" },
                ]
            },
            {
                category: "Welding & Assembly",
                icon: <Users className="w-5 h-5 text-orange-500" />,
                items: [
                    { name: "Robot Welding", details: "Automated Cells", count: "27 Cells" },
                    { name: "Spot Welding", details: "35kVA - 110kVA", count: "25 Units" },
                    { name: "Manual CO2 Welding", details: "Manual Stations", count: "9 Stations" },
                    { name: "Rotary Welding", details: "Special Purpose", count: "3 Units" },
                ]
            },
            {
                category: "Tool Room & Support",
                icon: <Calendar className="w-5 h-5 text-emerald-500" />,
                items: [
                    { name: "CNC Machining", details: "Milling & Lathe", count: "5 Units" },
                    { name: "Wire Cut EDM", details: "High Precision", count: "2 Units" },
                    { name: "Surface Grinding", details: "Various Sizes", count: "4 Units" },
                    { name: "CMM & Measuring", details: "Quality Control Lab", count: "Complete" },
                ]
            }
        ]
    },
    karawang: {
        layout: '/img/facilities/karawang-layout.png',
        machines: [
            {
                category: "Stamping Press",
                icon: <Building2 className="w-5 h-5 text-orange-500" />,
                items: [
                    { name: "Transfer Machine 1500T", details: "High Tonnage Transfer", count: "1 Unit" },
                    { name: "Progressive 200T - 600T", details: "Coil Feed Lines", count: "8 Units" },
                    { name: "Tandem 300T - 1000T", details: "Robotic Transfer", count: "3 Lines" },
                ]
            },
            {
                category: "Welding & Assembly",
                icon: <Users className="w-5 h-5 text-orange-500" />,
                items: [
                    { name: "Robot Welding", details: "Spot & Arc", count: "35 Cells" },
                    { name: "Spot Welding", details: "Stationary & Gun", count: "40 Units" },
                    { name: "Nut Runner / Tapping", details: "Assembly Support", count: "12 Units" },
                ]
            },
            {
                category: "Tool Maintenance",
                icon: <Calendar className="w-5 h-5 text-emerald-500" />,
                items: [
                    { name: "Overhead Crane", details: "5T - 30T Capacity", count: "12 Units" },
                    { name: "Forklift", details: "Material Handling", count: "15 Units" },
                    { name: "Die Maintenance", details: "Repair & Polishing", count: "Area Available" },
                ]
            }
        ]
    }
};

export default function Facilities() {
    const [showModal, setShowModal] = useState(false);
    const [activePlant, setActivePlant] = useState('purwakarta');
    const [previewImage, setPreviewImage] = useState(null);

    const openModal = (plant) => {
        setActivePlant(plant);
        setShowModal(true);
    };

    const currentData = facilityData[activePlant];

    return (
        <MainLayout title="Facilities">
            <Head title="Our Facilities - PT Tri Centrum Fortuna" />

            {/* Lightbox Overlay - Rendered in Portal to sit above Modal */}
            {previewImage && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setPreviewImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20"
                        onClick={() => setPreviewImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
                        <img
                            src={previewImage}
                            alt="Full Preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>,
                document.body
            )}

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-600/10 via-transparent to-slate-900"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Building2 className="w-4 h-4" />
                            Production Excellence
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Facilities</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Operating from strategic locations to serve our partners efficiently,
                            equipped with high-precision machinery and automated systems.
                        </p>
                    </motion.div>
                </div>
            </div>

            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* PLANT PURWAKARTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group flex flex-col h-full"
                        >
                            <div className="h-64 overflow-hidden relative flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=800"
                                    alt="Plant Purwakarta"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    PURWAKARTA
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Building2 className="text-orange-500" />
                                    PLANT – PURWAKARTA
                                </h2>
                                <div className="flex items-start gap-4 text-slate-600 mb-auto">
                                    <MapPin className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                                    <p className="leading-relaxed">
                                        JL. Sadang - Subang KM 10 Kp. Karajan RT 004/001, <br />
                                        Desa Cibatu Kec. Cibatu <br />
                                        Kab. Purwakarta 41183
                                    </p>
                                </div>

                                <button
                                    onClick={() => openModal('purwakarta')}
                                    className="w-full mt-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    View Plant Details
                                </button>
                            </div>
                        </motion.div>

                        {/* PLANT KARAWANG */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 group flex flex-col h-full"
                        >
                            <div className="h-64 overflow-hidden relative flex-shrink-0">
                                <img
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                                    alt="Plant Karawang"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    KARAWANG (HQ)
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Building2 className="text-blue-500" />
                                    PLANT – KARAWANG
                                </h2>
                                <div className="space-y-4 mb-auto">
                                    <div className="flex items-start gap-4 text-slate-600">
                                        <MapPin className="w-6 h-6 text-slate-400 mt-1 flex-shrink-0" />
                                        <p className="leading-relaxed">
                                            Kawasan Industri Mitra Karawang, <br />
                                            JL. Mitra Raya II Blok F-7-8, <br />
                                            Desa Parungmulya, Ciampel, Karawang 41363
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                                <Calendar className="text-blue-500 w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Established</p>
                                                <p className="font-bold text-slate-800">2017</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                                                <Users className="text-orange-500 w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400">Total Workforce</p>
                                                <p className="font-bold text-slate-800">920 Persons</p>
                                                <p className="text-[10px] text-slate-400">(Total for Both Plants)</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => openModal('karawang')}
                                        className="w-full mt-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                        View Plant Details
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Modal show={showModal} onClose={() => setShowModal(false)} maxWidth="7xl" closeable={!previewImage}>
                {currentData && (
                    <ContainerModal
                        activePlant={activePlant}
                        data={currentData}
                        setShowModal={setShowModal}
                        onPreviewImage={setPreviewImage}
                    />
                )}
            </Modal>
        </MainLayout>
    );
}

const ContainerModal = ({ activePlant, data, setShowModal, onPreviewImage }) => (
    <div className="p-4 md:p-8">
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
            <div>
                <h3 className="text-3xl font-bold text-slate-900">
                    {activePlant === 'purwakarta' ? 'Plant Purwakarta' : 'Plant Karawang'}
                </h3>
                <p className="text-slate-500 mt-1">Detailed Facility & Equipment Overview</p>
            </div>
            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div className="space-y-12">
            {/* Layout Section */}
            <div>
                <h4 className={`font-bold text-xl mb-6 flex items-center gap-2 ${activePlant === 'purwakarta' ? 'text-orange-600' : 'text-blue-600'}`}>
                    <Building2 className="w-6 h-6" />
                    Factory Layout
                </h4>
                <div
                    className="bg-slate-50 rounded-2xl p-2 border border-slate-200 cursor-zoom-in group relative overflow-hidden transition-all hover:shadow-md hover:border-slate-300"
                    onClick={() => onPreviewImage(data.layout)}
                >
                    <div className="h-48 md:h-64 overflow-hidden rounded-xl relative">
                        <img
                            src={data.layout}
                            alt={`${activePlant} layout`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-300 flex items-center justify-center">
                            <span className="bg-white/90 text-slate-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                <Maximize2 className="w-4 h-4" />
                                View Full Screen
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Production Facilities Grid */}
            <div>
                <h4 className={`font-bold text-xl mb-6 flex items-center gap-2 ${activePlant === 'purwakarta' ? 'text-orange-600' : 'text-blue-600'}`}>
                    <Users className="w-6 h-6" />
                    Production Facilities & Equipment
                </h4>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.machines.map((category, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    {category.icon}
                                </div>
                                <h5 className="font-bold text-slate-800">{category.category}</h5>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-4">
                                    {category.items.map((item, i) => (
                                        <li key={i} className="flex justify-between items-start border-b last:border-0 border-slate-50 pb-3 last:pb-0">
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                                                <p className="text-xs text-slate-500">{item.details}</p>
                                            </div>
                                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                                                {item.count}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
