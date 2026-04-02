import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Plus,
    Edit2,
    Trash2,
    Search,
    CheckCircle2,
    XCircle,
    Calendar,
    ExternalLink,
    Megaphone,
} from "lucide-react";
import ConfirmationModal from "@/Components/ConfirmationModal";
import { useLocalic, useTranslation } from "@/helpers";

export default function Index({ ads, filters }) {
    const { lRoute } = useLocalic();
    const { __ } = useTranslation();
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [deletionId, setDeletionId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = (id) => {
        setDeletionId(id);
        setConfirmingDeletion(true);
    };

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route("admin.ads.destroy", deletionId), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setDeletionId(null);
                setIsDeleting(false);
            },
            onError: () => {
                setIsDeleting(false);
            },
        });
    };

    const getDisplayImage = (image) => {
        if (!image) return null;
        return image.startsWith("http") || image.startsWith("/")
            ? image
            : `/${image}`;
    };

    const formatPeriod = (ad) => {
        if (!ad.start_at && !ad.end_at) return "Always On";
        const start = ad.start_at
            ? new Date(ad.start_at).toLocaleDateString("id-ID")
            : "Anytime";
        const end = ad.end_at
            ? new Date(ad.end_at).toLocaleDateString("id-ID")
            : "No Expiry";
        return `${start} - ${end}`;
    };

    const getStatusPresentation = (ad) => {
        switch (ad.display_status) {
            case "active":
                return {
                    label: __("Active"),
                    className: "text-emerald-600",
                    Icon: CheckCircle2,
                };
            case "scheduled":
                return {
                    label: __("Scheduled"),
                    className: "text-blue-600",
                    Icon: Calendar,
                };
            case "expired":
                return {
                    label: __("Expired"),
                    className: "text-amber-600",
                    Icon: XCircle,
                };
            default:
                return {
                    label: __("Inactive"),
                    className: "text-slate-400",
                    Icon: XCircle,
                };
        }
    };

    return (
        <AdminLayout title="Ads Management">
            <Head title="Ads Management - Admin TCF" />

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search ads..."
                            defaultValue={filters.search}
                            onBlur={(e) =>
                                router.get(
                                    route("admin.ads.index"),
                                    { search: e.target.value },
                                    { preserveState: true },
                                )
                            }
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all"
                        />
                    </div>

                    <Link
                        href={lRoute("admin.ads.create")}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                    >
                        <Plus className="w-4 h-4" />
                        {__("Add New Ad")}
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-[10px]">
                                    {__("Ad")}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-[10px]">
                                    {__("Target Link")}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-[10px]">
                                    {__("Period")}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-[10px]">
                                    {__("Status")}
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center text-[10px]">
                                    {__("Actions")}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {ads.data.map((ad) => {
                                const status = getStatusPresentation(ad);
                                const StatusIcon = status.Icon;

                                return (
                                    <tr
                                        key={ad.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-20 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                                                    {ad.image ? (
                                                        <img
                                                            src={getDisplayImage(
                                                                ad.image,
                                                            )}
                                                            alt={ad.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Megaphone className="w-5 h-5 text-slate-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">
                                                        {ad.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500">
                                                        Order:{" "}
                                                        {ad.sort_order ?? 0}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href={ad.target_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs text-sky-600 font-bold hover:underline"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                {
                                                    ad.target_url
                                                        .replace(
                                                            /^https?:\/\/(www\.)?/,
                                                            "",
                                                        )
                                                        .split("/")[0]
                                                }
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatPeriod(ad)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div
                                                className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${status.className}`}
                                            >
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {status.label}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                <Link
                                                    href={lRoute(
                                                        "admin.ads.edit",
                                                        {
                                                            ad: ad.id,
                                                        },
                                                    )}
                                                    className="p-2 text-slate-400 hover:text-brand-primary hover:bg-orange-50 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        confirmDelete(ad.id)
                                                    }
                                                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                    <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-widest">
                        <p>
                            Showing {ads.from || 0} to {ads.to || 0} of{" "}
                            {ads.total} ads
                        </p>
                        <div className="flex gap-2">
                            {ads.links.map((link, i) =>
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                                            link.active
                                                ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20"
                                                : "bg-white border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <span
                                        key={i}
                                        className="px-3 py-1.5 rounded-lg border bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ),
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={confirmingDeletion}
                onClose={() => setConfirmingDeletion(false)}
                onConfirm={handleDelete}
                title="Delete Ad"
                message="Are you sure you want to delete this ad? This action cannot be undone."
                isDeleting={isDeleting}
            />
        </AdminLayout>
    );
}
