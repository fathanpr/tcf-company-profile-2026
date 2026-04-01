import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ImageInput from "@/Components/ImageInput";
import { useLocalic } from "@/helpers";
import {
    ChevronLeft,
    RefreshCcw,
    Image as ImageIcon,
    Tag,
    Type,
    FileText,
} from "lucide-react";

export default function Edit({ gallery, categories = [] }) {
    const [activeTab, setActiveTab] = React.useState("en");
    const { lRoute } = useLocalic();

    const { data, setData, put, processing, errors } = useForm({
        title: gallery.title || "",
        title_id: gallery.title_id || "",
        description: gallery.description || "",
        description_id: gallery.description_id || "",
        image: gallery.image || "",
        gallery_category_id: gallery.gallery_category_id || "",
        category_name: "",
        is_active: !!gallery.is_active,
        sort_order: gallery.sort_order || 0,
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.image instanceof File) {
            router.post(
                lRoute("admin.galleries.update", { gallery: gallery.id }),
                {
                    _method: "put",
                    ...data,
                },
            );
            return;
        }

        put(lRoute("admin.galleries.update", { gallery: gallery.id }));
    };

    return (
        <AdminLayout title="Edit Gallery Item">
            <Head title={`Edit ${gallery.title} - Admin TCF`} />

            <div className="max-w-3xl">
                <Link
                    href={lRoute("admin.galleries.index")}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Gallery Management
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    Edit Gallery Content
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Update image details and category.
                                </p>
                            </div>
                        </div>

                        <div className="flex bg-slate-200/50 p-1 rounded-xl border border-slate-200">
                            <button
                                type="button"
                                onClick={() => setActiveTab("en")}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === "en" ? "bg-white text-brand-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                EN
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("id")}
                                className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === "id" ? "bg-white text-brand-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                                ID
                            </button>
                        </div>
                    </div>

                    <form onSubmit={submit} className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Type className="w-4 h-4 text-slate-400" />
                                {activeTab === "en"
                                    ? "Title (EN)"
                                    : "Judul (ID)"}
                            </label>
                            <input
                                type="text"
                                value={
                                    activeTab === "en"
                                        ? data.title
                                        : data.title_id
                                }
                                onChange={(e) =>
                                    setData(
                                        activeTab === "en"
                                            ? "title"
                                            : "title_id",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                required={activeTab === "en"}
                            />
                            {errors.title && (
                                <p className="text-xs font-bold text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-slate-400" />
                                {activeTab === "en"
                                    ? "Description (EN)"
                                    : "Deskripsi (ID)"}
                            </label>
                            <textarea
                                rows="4"
                                value={
                                    activeTab === "en"
                                        ? data.description
                                        : data.description_id
                                }
                                onChange={(e) =>
                                    setData(
                                        activeTab === "en"
                                            ? "description"
                                            : "description_id",
                                        e.target.value,
                                    )
                                }
                                className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm resize-none"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-slate-400" />
                                    Select Existing Category
                                </label>
                                <select
                                    value={data.gallery_category_id}
                                    onChange={(e) =>
                                        setData(
                                            "gallery_category_id",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                >
                                    <option value="">Choose category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">
                                    Or Create New Category
                                </label>
                                <input
                                    type="text"
                                    value={data.category_name}
                                    onChange={(e) =>
                                        setData("category_name", e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                    placeholder="e.g. Production Line"
                                />
                            </div>
                        </div>

                        <ImageInput
                            label="Gallery Image"
                            value={data.image}
                            onChange={(fileOrUrl) =>
                                setData("image", fileOrUrl)
                            }
                            error={errors.image}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-50 bg-slate-50 cursor-pointer transition-all hover:bg-slate-100">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData("is_active", e.target.checked)
                                    }
                                    className="w-5 h-5 rounded text-brand-primary focus:ring-brand-primary"
                                />
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-700">
                                        Active Status
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        Display this item on public gallery.
                                    </span>
                                </div>
                            </label>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">
                                    Sort Order
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.sort_order}
                                    onChange={(e) =>
                                        setData("sort_order", e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-xl text-base font-black hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            {processing ? "Updating..." : "Update Gallery Item"}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
