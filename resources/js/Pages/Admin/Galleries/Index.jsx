import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ConfirmationModal from "@/Components/ConfirmationModal";
import {
    Search,
    Plus,
    Edit2,
    Tag,
    Layers,
    Images,
    Trash2,
    Image as ImageIcon,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { useLocalic, useTranslation } from "@/helpers";

export default function Index({ galleries, categoryStats = [], filters = {} }) {
    const { lRoute } = useLocalic();
    const { __ } = useTranslation();
    const [activeTab, setActiveTab] = useState("photos");
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = (id) => {
        setDeletionId(id);
        setConfirmingDeletion(true);
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(
            lRoute("admin.galleries.destroy", { gallery: deletionId }),
            {
                onSuccess: () => {
                    setConfirmingDeletion(false);
                    setDeletionId(null);
                    setIsDeleting(false);
                },
                onError: () => setIsDeleting(false),
            },
        );
    };

    return (
        <>
            <Head title="Gallery Management - Admin TCF" />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-100 flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
                    <div className="flex flex-col gap-4 w-full lg:max-w-3xl">
                        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 w-fit">
                            <button
                                type="button"
                                onClick={() => setActiveTab("categories")}
                                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === "categories" ? "bg-white text-brand-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                <Layers className="w-4 h-4" />
                                {__("Per Kategori")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("photos")}
                                className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === "photos" ? "bg-white text-brand-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                <Images className="w-4 h-4" />
                                {__("Per Foto")}
                            </button>
                        </div>

                        {activeTab === "photos" && (
                            <div className="flex flex-col sm:flex-row gap-3 w-full">
                                <div className="relative flex-1">
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search gallery item..."
                                        defaultValue={filters.search}
                                        onBlur={(e) =>
                                            router.get(
                                                lRoute("admin.galleries.index"),
                                                {
                                                    ...filters,
                                                    search: e.target.value,
                                                },
                                                { preserveState: true },
                                            )
                                        }
                                        className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-transparent focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <Link
                        href={lRoute("admin.galleries.create")}
                        className="inline-flex items-center justify-center gap-2 self-start lg:self-auto px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800"
                    >
                        <Plus className="w-4 h-4" />
                        {__("Add Gallery Item")}
                    </Link>
                </div>

                {activeTab === "categories" ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/70">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                                        {__("Category")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-center">
                                        {__("Total Photos")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-center">
                                        {__("Active")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-center">
                                        {__("Inactive")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-center">
                                        {__("Actions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {categoryStats.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="hover:bg-slate-50/70"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">
                                                    {category.name}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {category.name_id || "-"}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-black bg-slate-100 text-slate-700">
                                                {category.total_photos_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-100 text-emerald-700">
                                                {category.active_photos_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-black bg-slate-200 text-slate-700">
                                                {category.inactive_photos_count}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link
                                                href={lRoute(
                                                    "admin.galleries.category.edit",
                                                    { category: category.id },
                                                )}
                                                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 hover:bg-blue-100"
                                            >
                                                <Tag className="w-3.5 h-3.5" />
                                                {__("Edit Category")}
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/70">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                                        {__("Image")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                                        {__("Title")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                                        {__("Category")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500">
                                        {__("Status")}
                                    </th>
                                    <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-black text-slate-500 text-center">
                                        {__("Actions")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {galleries.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50/70"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ImageIcon className="w-4 h-4 text-slate-300" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-slate-800">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-slate-500 line-clamp-1">
                                                {item.description}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-xs font-bold text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {item.category?.name || "-"}
                                                </span>
                                                {item.gallery_category_id && (
                                                    <Link
                                                        href={lRoute(
                                                            "admin.galleries.category.edit",
                                                            {
                                                                category:
                                                                    item.gallery_category_id,
                                                            },
                                                        )}
                                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 hover:bg-blue-100"
                                                    >
                                                        <Tag className="w-3 h-3" />
                                                        Edit Category
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                                                    {__("Active")}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-wider">
                                                    <XCircle className="w-3.5 h-3.5" />{" "}
                                                    {__("Inactive")}
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={lRoute(
                                                        "admin.galleries.edit",
                                                        { gallery: item.id },
                                                    )}
                                                    className="p-2 text-slate-400 hover:text-brand-primary hover:bg-orange-50 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        confirmDelete(item.id)
                                                    }
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 rounded-b-2xl flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
                    {activeTab === "photos" ? (
                        <>
                            <p>
                                Showing {galleries.from || 0} to{" "}
                                {galleries.to || 0} of {galleries.total} results
                            </p>
                            <div className="flex gap-2">
                                {galleries.links.map((link, i) =>
                                    link.url ? (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`px-3 py-1.5 rounded-lg border transition-all ${
                                                link.active
                                                    ? "bg-brand-primary border-brand-primary text-white"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ) : (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-lg border bg-slate-50 border-slate-100 text-slate-300"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ),
                                )}
                            </div>
                        </>
                    ) : (
                        <p>
                            {__("Total Categories")}: {categoryStats.length}
                        </p>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirmingDeletion}
                onClose={() => setConfirmingDeletion(false)}
                onConfirm={handleDelete}
                title="Delete Gallery Item"
                message="Are you sure you want to delete this gallery item? This action cannot be undone."
                isDeleting={isDeleting}
            />
        </>
    );
}

Index.layout = (page) => (
    <AdminLayout title="Gallery Management">{page}</AdminLayout>
);
