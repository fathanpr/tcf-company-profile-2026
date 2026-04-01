import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useLocalic } from "@/helpers";
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Tag,
    Type,
    FileText,
    Upload,
    Trash2,
} from "lucide-react";

export default function Create({ categories = [] }) {
    const [activeTab, setActiveTab] = React.useState("en");
    const { lRoute } = useLocalic();

    const createEmptyItem = () => ({
        title: "",
        title_id: "",
        description: "",
        description_id: "",
        image: null,
        is_active: true,
        sort_order: 1,
    });

    const { data, setData, post, processing, errors } = useForm({
        gallery_category_id: "",
        category_name: "",
        items: [createEmptyItem()],
    });

    const itemImagePreviews = React.useMemo(() => {
        return data.items.map((item) => {
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
    }, [data.items]);

    React.useEffect(() => {
        return () => {
            itemImagePreviews.forEach((preview) => {
                if (preview.isObjectUrl && preview.url) {
                    URL.revokeObjectURL(preview.url);
                }
            });
        };
    }, [itemImagePreviews]);

    const isPlaceholderItem = (item) => {
        return (
            !item.image &&
            !item.title &&
            !item.title_id &&
            !item.description &&
            !item.description_id
        );
    };

    const applyAutoSortOrder = (items) => {
        return items.map((item, index) => ({
            ...item,
            sort_order: index + 1,
        }));
    };

    const buildItem = (file = null) => ({
        ...createEmptyItem(),
        image: file,
        title: file?.name ? file.name.replace(/\.[^/.]+$/, "") : "",
    });

    const appendItems = (files = []) => {
        const baseItems =
            data.items.length === 1 && isPlaceholderItem(data.items[0])
                ? []
                : [...data.items];

        const newItems = files.length
            ? files.map((file) => buildItem(file))
            : [buildItem()];

        setData("items", applyAutoSortOrder([...baseItems, ...newItems]));
    };

    const removeItem = (index) => {
        const updated = data.items.filter((_, i) => i !== index);
        const nextItems = updated.length ? updated : [createEmptyItem()];
        setData("items", applyAutoSortOrder(nextItems));
    };

    const updateItemField = (index, field, value) => {
        const updated = [...data.items];
        updated[index] = {
            ...updated[index],
            [field]: value,
        };
        setData("items", updated);
    };

    const handleMultiFilePick = (event) => {
        const files = Array.from(event.target.files || []);
        if (!files.length) {
            return;
        }

        appendItems(files);
        event.target.value = "";
    };

    const submit = (e) => {
        e.preventDefault();
        post(lRoute("admin.galleries.store"), { forceFormData: true });
    };

    return (
        <AdminLayout title="Add Gallery Item">
            <Head title="Add Gallery Item - Admin TCF" />

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
                                    New Gallery Content
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Upload multiple images in one category with
                                    per-image details.
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

                        <div className="space-y-4 border border-slate-100 rounded-2xl p-5 bg-slate-50/50">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                                    Gallery Items
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
                                            onChange={handleMultiFilePick}
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => appendItems()}
                                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-brand-primary hover:text-brand-primary transition-all"
                                    >
                                        Add Empty Item
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {data.items.map((item, index) => {
                                    const imagePreview =
                                        itemImagePreviews[index]?.url || "";
                                    const fileInputId = `gallery-item-image-${index}`;

                                    return (
                                        <div
                                            key={index}
                                            className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4"
                                        >
                                            <div className="flex justify-between items-center">
                                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                                    Image #{index + 1}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(index)
                                                    }
                                                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />{" "}
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="grid md:grid-cols-3 gap-4">
                                                <div className="md:col-span-1">
                                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                        Image
                                                    </label>
                                                    <div className="mt-2 border border-slate-200 rounded-xl p-2 bg-slate-50">
                                                        <input
                                                            id={fileInputId}
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) =>
                                                                updateItemField(
                                                                    index,
                                                                    "image",
                                                                    e.target
                                                                        .files?.[0] ||
                                                                        null,
                                                                )
                                                            }
                                                            className="hidden"
                                                        />
                                                        <label
                                                            htmlFor={
                                                                fileInputId
                                                            }
                                                            className="inline-flex items-center justify-center w-full px-3 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer hover:border-brand-primary hover:text-brand-primary transition-all"
                                                        >
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
                                                                alt={`preview-${index}`}
                                                                className="mt-2 w-full h-32 object-cover rounded-lg border border-slate-200"
                                                            />
                                                        ) : (
                                                            <div className="mt-2 h-32 rounded-lg border border-dashed border-slate-200 flex items-center justify-center text-[11px] text-slate-400">
                                                                No image
                                                                selected
                                                            </div>
                                                        )}
                                                    </div>
                                                    {errors[
                                                        `items.${index}.image`
                                                    ] && (
                                                        <p className="text-xs font-bold text-red-500 mt-1">
                                                            {
                                                                errors[
                                                                    `items.${index}.image`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="md:col-span-2 space-y-3">
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
                                                                updateItemField(
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
                                                        {errors[
                                                            `items.${index}.title`
                                                        ] &&
                                                            activeTab ===
                                                                "en" && (
                                                                <p className="text-xs font-bold text-red-500 mt-1">
                                                                    {
                                                                        errors[
                                                                            `items.${index}.title`
                                                                        ]
                                                                    }
                                                                </p>
                                                            )}
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
                                                                updateItemField(
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
                                                                    updateItemField(
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
                                                            min="0"
                                                            value={
                                                                item.sort_order
                                                            }
                                                            readOnly
                                                            className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm text-slate-500 font-bold"
                                                            placeholder="Auto sort"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-xl text-base font-black hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {processing ? "Saving..." : "Create Gallery Item"}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
