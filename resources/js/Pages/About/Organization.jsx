import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

const OrgCard = ({ name, title, highlight = false, image }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={`relative flex flex-col items-center p-4 rounded-xl border ${highlight ? 'bg-blue-900 border-blue-800 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-800 shadow-md'} w-64 mx-auto transition-all`}
    >
        <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 border-4 ${highlight ? 'border-blue-400' : 'border-slate-100'}`}>
            {/* Placeholder for person image, using generic avatar if no specific image */}
            <img
                src={image || `https://ui-avatars.com/api/?name=${name}&background=random`}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <h3 className={`font-bold text-lg text-center ${highlight ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
        <p className={`text-xs uppercase tracking-wider font-semibold mt-1 text-center ${highlight ? 'text-blue-200' : 'text-orange-500'}`}>{title}</p>
    </motion.div>
);

const Connector = ({ vertical = false }) => (
    <div className={`bg-slate-300 ${vertical ? 'w-0.5 h-8 mx-auto' : 'h-0.5 w-full absolute top-0 left-0'}`}></div>
);

export default function Organization() {
    return (
        <MainLayout title="Organization Structure">
            <Head title="Organization Structure - PT Tri Centrum Fortuna" />

            <div className="relative pt-24 pb-12 bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Organization Structure
                    </motion.h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Our leadership team dedicated to driving excellence.
                    </p>
                </div>
            </div>

            <section className="py-16 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-6 overflow-x-auto">
                    <div className="min-w-[800px] flex flex-col items-center">

                        {/* Level 1: President Director */}
                        <div className="mb-8">
                            <OrgCard name="Markus Maturo" title="President Director" highlight={true} />
                        </div>

                        {/* Connector Level 1 to 2 */}
                        <div className="w-0.5 h-8 bg-slate-300 -mt-8 mb-8 relative z-0"></div>
                        <div className="w-[50%] h-0.5 bg-slate-300 mb-8 relative">
                            <div className="absolute left-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                            <div className="absolute right-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                        </div>

                        {/* Level 2: Directors */}
                        <div className="flex justify-between w-[60%] gap-8 mb-8 -mt-4">
                            <div className="flex flex-col items-center w-1/2">
                                <OrgCard name="FX Kuncara" title="Operational Director" />
                                <div className="w-0.5 h-8 bg-slate-300"></div>
                                {/* Connector for Level 3 under Ops */}
                                <div className="w-[80%] h-0.5 bg-slate-300 relative mb-4">
                                    <div className="absolute left-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                    <div className="absolute right-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                </div>
                                <div className="flex gap-4 justify-center w-full">
                                    <OrgCard name="Pujiono" title="Manufacturing" />
                                    <OrgCard name="Rendy Aminda" title="Engineering" />
                                </div>
                            </div>

                            <div className="flex flex-col items-center w-1/2">
                                <OrgCard name="Fauziah Fajrin" title="Administration Director" />
                                <div className="w-0.5 h-8 bg-slate-300"></div>
                                {/* Connector for Level 3 under Admin */}
                                <div className="w-[80%] h-0.5 bg-slate-300 relative mb-4">
                                    <div className="absolute left-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                    <div className="absolute right-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                </div>
                                <div className="flex gap-4 justify-center w-full">
                                    <OrgCard name="Yemima D Fortuna" title="Administration" />
                                    <OrgCard name="Enos Impra Karambe" title="Cost Control" />
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Mobile Note */}
                    <p className="text-center text-slate-400 text-sm mt-8 md:hidden">Scroll horizontally to view full chart</p>
                </div>
            </section>
        </MainLayout>
    );
}
