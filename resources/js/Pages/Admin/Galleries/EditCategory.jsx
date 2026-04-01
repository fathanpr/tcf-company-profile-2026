import React from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useLocalic } from "@/helpers";
import {
    ChevronLeft,
    Save,
    Tag,
    Type,
    FileText,
    Upload,
    Image as ImageIcon,
} from "lucide-react";

export default function EditCategory({ category }) {
    const { lRoute } = useLocalic();
    const [activeTab, setActiveTab] = React.useState("en");

    const createEmptyGalleryItem = (index = 0) => ({
        id: null,
        client_key: `new-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
        title: "",
        title_id: "",
        description: "",
        description_id: "",
        image: "",
        is_active: true,
        sort_order: index + 1,
    });

    const { data, setData, put, processing, errors } = useForm({
        name: category.name || "",
        name_id: category.name_id || "",
        galleries: (category.galleries || []).map((item, index) => ({
            id: item.id,
            client_key: null,
            title: item.title || "",
            title_id: item.title_id || "",
            description: item.description || "",
            description_id: item.description_id || "",
            image: item.image || "",
            is_active: !!item.is_active,
            sort_order: item.sort_order || index + 1,
        })),
    });

    const itemImagePreviews = React.useMemo(() => {
        return data.galleries.map((item) => {
            if (item.image instanceof File) {
                return {
                    url: URL.createObjectURL(item.image),
                    isObjectUrl: true,
                };
            }

            if (typeof item.image === "string" && item.image) {
                return {
                    url: item.image,
                    isObjectUrl: false,
                };
            }

            return {
                url: "",
                isObjectUrl: false,
            };
        });
    }, [data.galleries]);

    React.useEffect(() => {
        return () => {
            itemImagePreviews.forEach((preview) => {
                if (preview.isObjectUrl && preview.url) {
                    URL.revokeObjectURL(preview.url);
                }
            });
        };
    }, [itemImagePreviews]);

    const updateGalleryField = (index, field, value) => {
        const galleries = [...data.galleries];
        galleries[index] = {
            ...galleries[index],
            [field]: value,
        };
        setData("galleries", galleries);
    };

    const applyAutoSortOrder = (items) => {
        return items.map((item, index) => ({
            ...item,
            sort_order: index + 1,
        }));
    };

    const addGalleryItems = (files = []) => {
        const current = [...data.galleries];
        const start = current.length;

        const newItems = files.length
            ? files.map((file, index) => ({
                  ...createEmptyGalleryItem(start + index),
                  image: file,
                  title: file?.name ? file.name.replace(/\.[^/.]+$/, "") : "",
              }))
            : [createEmptyGalleryItem(start)];

        setData("galleries", applyAutoSortOrder([...current, ...newItems]));
    };

    const removeGalleryItem = (index) => {
        const updated = data.galleries.filter((_, i) => i !== index);
        setData("galleries", applyAutoSortOrder(updated));
    };

    const handleMultipleImages = (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) {
            return;
        }

        addGalleryItems(files);
        event.target.value = "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const hasNewFile = data.galleries.some(
            (item) => item.image instanceof File,
        );

        if (hasNewFile) {
            router.post(
                lRoute("admin.galleries.category.update", {
                    category: category.id,
                }),
                {
                    _method: "put",
                    ...data,
                },
            );
            return;
        }

        put(
            lRoute("admin.galleries.category.update", {
                category: category.id,
            }),
        );
    };

    return (
        <AdminLayout title="Edit Gallery by Category">
            <Head title={`Edit Category ${category.name} - Admin TCF`} />

            <div className="max-w-5xl">
                <Link
                    href={lRoute("admin.galleries.index")}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Gallery Management
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Bulk Edit Category
                            </h3>
                            <p className="text-sm text-slate-500">
                                Edit all gallery items inside one category at
                                once.
                            </p>
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

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-slate-400" />
                                    Category Name (EN)
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                />
                                {errors.name && (
                                    <p className="text-xs font-bold text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">
                                    Category Name (ID)
                                </label>
                                <input
                                    type="text"
                                    value={data.name_id}
                                    onChange={(e) =>
                                        setData("name_id", e.target.value)
                                    }
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-4 border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                                    Category Items
                                </h4>
                                <div className="flex items-center gap-2">
                                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all">
                                        <Upload className="w-4 h-4" />
                                        Upload Multiple Photos
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={handleMultipleImages}
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => addGalleryItems()}
                                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-brand-primary hover:text-brand-primary transition-all"
                                    >
                                        Add Empty Item
                                    </button>
                                </div>
                            </div>

                            {data.galleries.map((item, index) => (
                                <div
                                    key={
                                        item.id ??
                                        item.client_key ??
                                        `new-item-${index}`
                                    }
                                    className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4"
                                >
                                    {(() => {
                                        const fileInputId = `bulk-gallery-item-image-${item.id ?? item.client_key ?? index}`;
                                        const imagePreview =
                                            itemImagePreviews[index]?.url || "";

                                        return (
                                            <div className="grid md:grid-cols-4 gap-4">
                                                <div className="md:col-span-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                            Item #{index + 1}
                                                        </p>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeGalleryItem(
                                                                    index,
                                                                )
                                                            }
                                                            className="text-[10px] font-bold text-red-500 hover:text-red-600"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                                        <ImageIcon className="w-3.5 h-3.5" />
                                                        Image
                                                    </label>
                                                    <div className="mt-2 border border-slate-200 rounded-xl p-2 bg-slate-50">
                                                        <input
                                                            id={fileInputId}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                updateGalleryField(
                                                                    index,
                                                                    "image",
                                                                    e.target
                                                                        .files?.[0] ||
                                                                        item.image,
                                                                )
                                                            }
                                                            className="hidden"
                                                        />
                                                        <label
                                                            htmlFor={
                                                                fileInputId
                                                            }
                                                            className="inline-flex items-center justify-center w-full gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all"
                                                        >
                                                            <Upload className="w-3.5 h-3.5" />
                                                            Choose Image
                                                        </label>
                                                        {item.image instanceof
                                                            File && (
                                                            <p className="mt-2 text-[11px] font-bold text-slate-500 truncate">
                                                                {
                                                                    item.image
                                                                        .name
                                                                }
                                                            </p>
                                                        )}
                                                        {imagePreview ? (
                                                            <img
                                                                src={
                                                                    imagePreview
                                                                }
                                                                alt={
                                                                    item.title ||
                                                                    `gallery-${item.id}`
                                                                }
                                                                className="mt-2 w-full h-32 object-cover rounded-lg border border-slate-200"
                                                            />
                                                        ) : (
                                                            <div className="mt-2 h-32 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-[11px] text-slate-400">
                                                                No image
                                                                selected
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="md:col-span-3 space-y-3">
                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                                            <Type className="w-3.5 h-3.5" />
                                                            {activeTab === "en"
                                                                ? "Title (EN)"
                                                                : "Judul (ID)"}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={
                                                                activeTab ===
                                                                "en"
                                                                    ? item.title
                                                                    : item.title_id
                                                            }
                                                            onChange={(e) =>
                                                                updateGalleryField(
                                                                    index,
                                                                    activeTab ===
                                                                        "en"
                                                                        ? "title"
                                                                        : "title_id",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 bg-slate-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                                        />
                                                    </div>

                                                    <div className="space-y-1">
                                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                                            <FileText className="w-3.5 h-3.5" />
                                                            {activeTab === "en"
                                                                ? "Description (EN)"
                                                                : "Deskripsi (ID)"}
                                                        </label>
                                                        <textarea
                                                            rows="3"
                                                            value={
                                                                activeTab ===
                                                                "en"
                                                                    ? item.description
                                                                    : item.description_id
                                                            }
                                                            onChange={(e) =>
                                                                updateGalleryField(
                                                                    index,
                                                                    activeTab ===
                                                                        "en"
                                                                        ? "description"
                                                                        : "description_id",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 bg-slate-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm resize-none"
                                                        />
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-3">
                                                        <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    !!item.is_active
                                                                }
                                                                onChange={(e) =>
                                                                    updateGalleryField(
                                                                        index,
                                                                        "is_active",
                                                                        e.target
                                                                            .checked,
                                                                    )
                                                                }
                                                                className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary"
                                                            />
                                                            <span className="text-xs font-bold text-slate-600">
                                                                Active
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={
                                                                item.sort_order
                                                            }
                                                            onChange={(e) =>
                                                                updateGalleryField(
                                                                    index,
                                                                    "sort_order",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full px-3 py-2 bg-slate-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm"
                                                            placeholder="Sort order"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-xl text-base font-black hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? "Saving..." : "Save Category Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
