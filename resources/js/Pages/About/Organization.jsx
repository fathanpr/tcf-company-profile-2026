import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const OrgCard = ({ name, title, highlight = false, image }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={`relative flex flex-col items-center p-4 rounded-xl border ${highlight ? 'bg-orange-600 border-orange-500 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-800 shadow-md'} w-64 mx-auto transition-all`}
    >
        <div className={`w-24 h-24 rounded-full overflow-hidden mb-4 border-4 ${highlight ? 'border-orange-300' : 'border-slate-100'}`}>
            {/* Placeholder for person image, using generic avatar if no specific image */}
            <img
                src={image || `https://ui-avatars.com/api/?name=${name}&background=random`}
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
        <h3 className={`font-bold text-lg text-center ${highlight ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
        <p className={`text-xs uppercase tracking-wider font-semibold mt-1 text-center ${highlight ? 'text-orange-200' : 'text-orange-500'}`}>{title}</p>
    </motion.div>
);

const Connector = ({ vertical = false }) => (
    <div className={`bg-slate-300 ${vertical ? 'w-0.5 h-8 mx-auto' : 'h-0.5 w-full absolute top-0 left-0'}`}></div>
);

export default function Organization() {
    return (
        <MainLayout title="Organization Structure">
            <Head title="Organization Structure - PT Tri Centrum Fortuna" />

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
                            <Users className="w-4 h-4" />
                            Our Leadership
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Organization <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">Structure</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Our leadership team dedicated to driving excellence and innovation
                            across all levels of our manufacturing operations.
                        </p>
                    </motion.div>
                </div>
            </div>

            <section className="py-16 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-6 overflow-x-auto">
                    <div className="min-w-[800px] flex flex-col items-center">

                        {/* Level 1: President Director */}
                        <div className="mb-8">
                            <OrgCard name="Markus Maturo" title="President Director" highlight={true} image={'/img/so/presdir.jpg'} />
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
                                <OrgCard name="FX Kuncara" title="Operational Director" image={'/img/so/user_dummy.png'} />
                                <div className="w-0.5 h-8 bg-slate-300"></div>
                                {/* Connector for Level 3 under Ops */}
                                <div className="w-[80%] h-0.5 bg-slate-300 relative mb-4">
                                    <div className="absolute left-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                    <div className="absolute right-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                </div>
                                <div className="flex gap-4 justify-center w-full">
                                    <OrgCard name="Pujiono" title="Manufacturing" image={'/img/so/user_dummy.png'} />
                                    <OrgCard name="Rendy Aminda" title="Engineering" image={'/img/so/user_dummy.png'} />
                                </div>
                            </div>

                            <div className="flex flex-col items-center w-1/2">
                                <OrgCard name="Fauziah Fajrin" title="Administration Director" image={'/img/so/user_dummy.png'} />
                                <div className="w-0.5 h-8 bg-slate-300"></div>
                                {/* Connector for Level 3 under Admin */}
                                <div className="w-[80%] h-0.5 bg-slate-300 relative mb-4">
                                    <div className="absolute left-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                    <div className="absolute right-0 top-0 w-0.5 h-4 bg-slate-300"></div>
                                </div>
                                <div className="flex gap-4 justify-center w-full">
                                    <OrgCard name="Yemima D Fortuna" title="Administration" image={'/img/so/user_dummy.png'} />
                                    <OrgCard name="Enos Impra Karambe" title="Cost Control" image={'/img/so/user_dummy.png'} />
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
