import React from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import ImageInput from './ImageInput';

/**
 * MultiImageInput Component
 * Handles multiple image inputs with upload and URL options
 * Generate by Antigravity
 */
export default function MultiImageInput({ value = [], onChange, error, label = "Product Gallery" }) {

    // Safety check for value
    const images = Array.isArray(value) ? value : [];

    const addImage = () => {
        onChange([...images, '']);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    const updateImage = (index, val) => {
        const newImages = [...images];
        newImages[index] = val;
        onChange(newImages);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                    {label}
                </label>
                <button
                    type="button"
                    onClick={addImage}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-black hover:bg-orange-100 transition-all border border-orange-100"
                >
                    <Plus className="w-3 h-3" />
                    Add Image
                </button>
            </div>

            {images.length === 0 ? (
                <div
                    onClick={addImage}
                    className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all group"
                >
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-100 transition-colors">
                        <Plus className="w-6 h-6 text-slate-400 group-hover:text-orange-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-500">No additional images added</p>
                    <p className="text-xs text-slate-400 mt-1">Click to add product gallery images</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group transition-all hover:border-orange-200 hover:bg-white shadow-sm hover:shadow-md">
                            <div className="absolute top-4 right-4 z-10">
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="p-2 bg-white text-red-500 rounded-lg hover:bg-red-50 transition-colors border border-slate-100 shadow-sm"
                                    title="Remove Image"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-[10px] font-black text-slate-600">
                                    {index + 1}
                                </span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gallery Image</span>
                            </div>

                            <ImageInput
                                label=""
                                value={image}
                                onChange={(val) => updateImage(index, val)}
                                className="!space-y-2"
                            />
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-xs font-bold text-red-500 mt-1">{error}</p>}
        </div>
    );
}
