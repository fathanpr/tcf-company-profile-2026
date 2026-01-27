import React, { useState, useEffect } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X } from 'lucide-react';

export default function ImageInput({ value, onChange, error, label = "Image", className = "" }) {
    const [mode, setMode] = useState('upload'); // 'upload' or 'url'
    const [preview, setPreview] = useState(null);
    const [urlInput, setUrlInput] = useState('');
    const [localError, setLocalError] = useState(null);

    useEffect(() => {
        // Determine initial mode and preview based on value
        if (value instanceof File) {
            setMode('upload');
            setPreview(URL.createObjectURL(value));
        } else if (typeof value === 'string' && value.length > 0) {
            setMode('url');
            setUrlInput(value);
            setPreview(value);
        } else {
            setPreview(null);
            setUrlInput('');
        }
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setLocalError(null);

        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB
                setLocalError('File size exceeds 2MB limit.');
                return;
            }
            if (!file.type.startsWith('image/')) {
                setLocalError('Please upload a valid image file.');
                return;
            }
            onChange(file);
        }
    };

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setUrlInput(url);
        setLocalError(null);
        onChange(url); // Pass URL string directly
        setPreview(url); // Optimistic preview
    };

    const clearImage = () => {
        onChange(null);
        setPreview(null);
        setUrlInput('');
        setLocalError(null);
        // Reset file input value if needed via ref, simpler to just rely on re-render
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">{label}</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => { setMode('upload'); setLocalError(null); }}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${mode === 'upload' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <Upload className="w-3 h-3" />
                        <span className="hidden sm:inline">Upload</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => { setMode('url'); setLocalError(null); }}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-2 ${mode === 'url' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        <LinkIcon className="w-3 h-3" />
                        <span className="hidden sm:inline">Via URL</span>
                    </button>
                </div>
            </div>

            <div className="relative group">
                {mode === 'upload' ? (
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-xs file:font-semibold
                                file:bg-sky-50 file:text-sky-700
                                hover:file:bg-sky-100
                                cursor-pointer file:cursor-pointer"
                        />
                        <p className="mt-2 text-xs text-slate-400 font-medium">* Maximum file size: 2MB</p>
                    </div>
                ) : (
                    <div className="relative">
                        <input
                            type="url"
                            value={urlInput}
                            onChange={handleUrlChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-3 bg-slate-50 border-slate-200 focus:border-brand-primary focus:ring-brand-primary rounded-xl text-sm transition-all"
                        />
                    </div>
                )}
            </div>

            {/* Error Message */}
            {(error || localError) && (
                <p className="text-sm text-red-600 font-bold">{error || localError}</p>
            )}

            {/* Preview Section */}
            {preview && (
                <div className="relative mt-4 w-full aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                        }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={clearImage}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
