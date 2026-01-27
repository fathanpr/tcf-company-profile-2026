import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Newspaper, Save, Tag, Calendar, Globe, FileText, Image as ImageIcon, Send, Clock, Hash } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreatableSelect from 'react-select/creatable';
import ImageInput from '@/Components/ImageInput';

/**
 * News Create Page
 * Generate by Antigravity
 */
export default function Create({ categories: dbCategories = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'Press Release',
        content: '',
        excerpt: '',
        image: '',
        is_published: true,
        published_at: new Date().toISOString().split('T')[0],
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        tags: '',
        reading_time: '',
    });

    const defaultCategories = [
        { value: 'Press Release', label: 'Press Release' },
        { value: 'Corporate', label: 'Corporate' },
        { value: 'Events', label: 'Events' },
        { value: 'Sustainability', label: 'Sustainability' },
    ];

    const categoryOptions = React.useMemo(() => {
        const uniqueCategories = Array.from(new Set([...defaultCategories.map(c => c.value), ...dbCategories]));
        return uniqueCategories.map(cat => ({ value: cat, label: cat }));
    }, [dbCategories]);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.news.store'));
    };

    return (
        <AdminLayout title="Write News Article">
            <Head title="Write News - Admin TCF" />

            <div className="max-w-4xl">
                <Link
                    href={route('admin.news.index')}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-bold"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to News List
                </Link>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Newspaper className="w-4 h-4 text-slate-400" />
                                    Article Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-lg font-bold transition-all ${errors.title ? 'ring-2 ring-red-500' : ''}`}
                                    placeholder="Enter catching headline..."
                                    required
                                />
                                {errors.title && <p className="text-xs font-bold text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    Short Summary (Excerpt)
                                </label>
                                <textarea
                                    value={data.excerpt}
                                    onChange={e => setData('excerpt', e.target.value)}
                                    rows="3"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all resize-none"
                                    placeholder="Briefly describe what this article is about..."
                                ></textarea>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    Main Content
                                </label>
                                <div className="bg-slate-50 rounded-xl overflow-hidden">
                                    <ReactQuill
                                        theme="snow"
                                        value={data.content}
                                        onChange={value => setData('content', value)}
                                        className="h-96 mb-12"
                                        modules={{
                                            toolbar: [
                                                [{ 'header': [1, 2, 3, false] }],
                                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                                ['link', 'image'],
                                                ['clean']
                                            ],
                                        }}
                                    />
                                </div>
                                {errors.content && <p className="text-xs font-bold text-red-500 mt-1">{errors.content}</p>}
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Globe className="w-5 h-5 text-brand-primary" />
                                SEO Optimization
                            </h3>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Meta Title</label>
                                <input
                                    type="text"
                                    value={data.meta_title}
                                    onChange={e => setData('meta_title', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all"
                                    placeholder="Keywords for search engines..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Meta Description</label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    rows="2"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all resize-none"
                                    placeholder="Article snippet for Google search results..."
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-slate-400" />
                                        Meta Keywords
                                    </label>
                                    <input
                                        type="text"
                                        value={data.meta_keywords}
                                        onChange={e => setData('meta_keywords', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all"
                                        placeholder="news, update, event..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Hash className="w-4 h-4 text-slate-400" />
                                        Tags
                                    </label>
                                    <input
                                        type="text"
                                        value={data.tags}
                                        onChange={e => setData('tags', e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all"
                                        placeholder="Comma separated tags..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    Reading Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    value={data.reading_time}
                                    onChange={e => setData('reading_time', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all"
                                    placeholder="e.g. 5"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Settings */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                            {/* Publication Status */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Publishing</h4>

                                <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-slate-50 bg-slate-50 cursor-pointer transition-all hover:bg-slate-100">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={e => setData('is_published', e.target.checked)}
                                        className="w-5 h-5 rounded text-brand-primary focus:ring-brand-primary"
                                    />
                                    <span className="text-sm font-bold text-slate-700">Publish Immediately</span>
                                </label>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        Publish Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.published_at}
                                        onChange={e => setData('published_at', e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-lg text-xs font-bold transition-all"
                                    />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-2">
                                    <Tag className="w-3.5 h-3.5" />
                                    Category
                                </label>
                                <CreatableSelect
                                    isClearable
                                    options={categoryOptions}
                                    value={categoryOptions.find(option => option.value === data.category) || { value: data.category, label: data.category }}
                                    onChange={(newValue) => setData('category', newValue ? newValue.value : '')}
                                    onCreateOption={(inputValue) => {
                                        // Automatically select the new option
                                        setData('category', inputValue);
                                    }}
                                    className="text-sm font-bold"
                                    styles={{
                                        control: (base) => ({
                                            ...base,
                                            borderRadius: '0.75rem',
                                            padding: '2px',
                                            borderColor: 'transparent',
                                            backgroundColor: '#f8fafc', // bg-slate-50
                                            boxShadow: 'none',
                                            '&:hover': {
                                                borderColor: '#0ea5e9' // brand-primary
                                            }
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isFocused ? '#f0f9ff' : 'white', // sky-50
                                            color: '#334155', // slate-700
                                            fontWeight: 'bold',
                                        })
                                    }}
                                />
                            </div>

                            <hr className="border-slate-100" />

                            {/* Featured Image */}
                            <div className="space-y-2">
                                <ImageInput
                                    label="Featured Image"
                                    value={data.image}
                                    onChange={(fileOrUrl) => setData('image', fileOrUrl)}
                                    error={errors.image}
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-primary text-white rounded-xl text-sm font-black hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                    {processing ? 'Saving...' : 'Save & Publish'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
