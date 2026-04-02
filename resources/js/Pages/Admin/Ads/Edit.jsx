import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import {
    ChevronLeft,
    Megaphone,
    Save,
    ExternalLink,
    Calendar,
} from "lucide-react";
import ImageInput from "@/Components/ImageInput";

export default function Edit({ ad }) {
    const { data, setData, processing, errors } = useForm({
        title: ad.title || "",
        image: ad.image || "",
        target_url: ad.target_url || "",
        is_active: !!ad.is_active,
        start_at: ad.start_at ? ad.start_at.split("T")[0] : "",
        end_at: ad.end_at ? ad.end_at.split("T")[0] : "",
        sort_order: ad.sort_order ?? 0,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(
            route("admin.ads.update", ad.id),
            {
                _method: "put",
                ...data,
            },
            { forceFormData: true },
        );
    };

    return (
        <AdminLayout title="Edit Ad">
            <Head title={`Edit ${ad.title} - Admin TCF`} />

            <div className="max-w-3xl">
                <Link
                    href={route("admin.ads.index")}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Ads
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                                <Megaphone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    Edit Advertisement
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Update poster, click URL, and active period.
                                </p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">
                                Ad Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all ${errors.title ? "ring-2 ring-red-500" : ""}`}
                                required
                            />
                            {errors.title && (
                                <p className="text-xs font-bold text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <ImageInput
                                label="Poster / Image"
                                value={data.image}
                                onChange={(value) =>
                                    setData("image", value ?? "")
                                }
                                error={errors.image}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                                Target URL
                            </label>
                            <input
                                type="url"
                                value={data.target_url}
                                onChange={(e) =>
                                    setData("target_url", e.target.value)
                                }
                                className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all ${errors.target_url ? "ring-2 ring-red-500" : ""}`}
                                required
                            />
                            {errors.target_url && (
                                <p className="text-xs font-bold text-red-500">
                                    {errors.target_url}
                                </p>
                            )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={data.start_at}
                                    onChange={(e) =>
                                        setData("start_at", e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                />
                                {errors.start_at && (
                                    <p className="text-xs font-bold text-red-500">
                                        {errors.start_at}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={data.end_at}
                                    onChange={(e) =>
                                        setData("end_at", e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                />
                                {errors.end_at && (
                                    <p className="text-xs font-bold text-red-500">
                                        {errors.end_at}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">
                                    Sort Order
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(e) =>
                                        setData(
                                            "sort_order",
                                            Number(e.target.value || 0),
                                        )
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                />
                                {errors.sort_order && (
                                    <p className="text-xs font-bold text-red-500">
                                        {errors.sort_order}
                                    </p>
                                )}
                            </div>

                            <div className="pt-7">
                                <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-50 bg-slate-50 cursor-pointer transition-all hover:bg-slate-100">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                "is_active",
                                                e.target.checked,
                                            )
                                        }
                                        className="w-5 h-5 rounded text-orange-600 focus:ring-brand-primary"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-700">
                                            Active
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            Enable this ad for public pages
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                            <Link
                                href={route("admin.ads.index")}
                                className="px-5 py-2.5 text-sm font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? "Updating..." : "Update Ad"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
