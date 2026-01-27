import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ChevronLeft, Newspaper, Save, Tag, Calendar, Globe, FileText, Image as ImageIcon, Send, RefreshCcw, Clock, Hash, Eye } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CreatableSelect from 'react-select/creatable';
import ImageInput from '@/Components/ImageInput';
import { useTranslation } from '@/helpers';

/**
 * News Edit Page
 * Generate by Antigravity
 */
export default function Edit({ news, categories: dbCategories = [] }) {
    const [activeTab, setActiveTab] = React.useState('en');
    const { __ } = useTranslation();

    const { data, setData, put, processing, errors } = useForm({
        title: news.title,
        title_id: news.title_id || '',
        category: news.category,
        content: news.content,
        content_id: news.content_id || '',
        excerpt: news.excerpt || '',
        excerpt_id: news.excerpt_id || '',
        image: news.image || '',
        is_published: !!news.is_published,
        published_at: news.published_at ? news.published_at.split('T')[0] : '',
        meta_title: news.meta_title || '',
        meta_title_id: news.meta_title_id || '',
        meta_description: news.meta_description || '',
        meta_description_id: news.meta_description_id || '',
        meta_keywords: news.meta_keywords || '',
        meta_keywords_id: news.meta_keywords_id || '',
        slug_id: news.slug_id || '',
        tags: news.tags || '',
        reading_time: news.reading_time || '',
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
        if (data.image instanceof File) {
            router.post(route('admin.news.update', news.id), {
                _method: 'put',
                ...data,
            });
        } else {
            put(route('admin.news.update', news.id));
        }
    };

    return (
        <AdminLayout title="Edit News Article">
            <Head title={`Edit ${news.title} - Admin TCF`} />

            <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href={route('admin.news.index')}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-bold"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Back to News List
                    </Link>

                    {/* Language Switcher Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                        <button
                            type="button"
                            onClick={() => setActiveTab('en')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'en' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            ENGLISH
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('id')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${activeTab === 'id' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            INDONESIA
                        </button>
                    </div>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-slate-400" />
                                    {activeTab === 'en' ? 'Article Title (EN)' : 'Judul Artikel (ID)'}
                                </label>
                                {activeTab === 'en' ? (
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-lg font-bold transition-all ${errors.title ? 'ring-2 ring-red-500' : ''}`}
                                        placeholder="Enter catching headline in English..."
                                        required
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={data.title_id}
                                        onChange={e => setData('title_id', e.target.value)}
                                        className={`w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-lg font-bold transition-all ${errors.title_id ? 'ring-2 ring-red-500' : ''}`}
                                        placeholder="Masukkan judul dalam Bahasa Indonesia..."
                                    />
                                )}
                                {errors.title && <p className="text-xs font-bold text-red-500 mt-1">{errors.title}</p>}
                                {errors.title_id && <p className="text-xs font-bold text-red-500 mt-1">{errors.title_id}</p>}
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    {activeTab === 'en' ? 'Short Summary (EN)' : 'Ringkasan Pendek (ID)'}
                                </label>
                                <textarea
                                    value={activeTab === 'en' ? data.excerpt : data.excerpt_id}
                                    onChange={e => setData(activeTab === 'en' ? 'excerpt' : 'excerpt_id', e.target.value)}
                                    rows="3"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all resize-none"
                                    placeholder={activeTab === 'en' ? "Brief summary in English..." : "Ringkasan singkat dalam Bahasa Indonesia..."}
                                ></textarea>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-slate-400" />
                                    {activeTab === 'en' ? 'Main Content (EN)' : 'Konten Utama (ID)'}
                                </label>
                                <div className="bg-slate-50 rounded-xl overflow-hidden">
                                    <ReactQuill
                                        theme="snow"
                                        value={activeTab === 'en' ? data.content : data.content_id}
                                        onChange={value => setData(activeTab === 'en' ? 'content' : 'content_id', value)}
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
                                {errors.content_id && <p className="text-xs font-bold text-red-500 mt-1">{errors.content_id}</p>}
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Globe className="w-5 h-5 text-brand-primary" />
                                SEO Optimization
                            </h3>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Meta Title ({activeTab.toUpperCase()})</label>
                                <input
                                    type="text"
                                    value={activeTab === 'en' ? data.meta_title : data.meta_title_id}
                                    onChange={e => setData(activeTab === 'en' ? 'meta_title' : 'meta_title_id', e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Meta Description ({activeTab.toUpperCase()})</label>
                                <textarea
                                    value={activeTab === 'en' ? data.meta_description : data.meta_description_id}
                                    onChange={e => setData(activeTab === 'en' ? 'meta_description' : 'meta_description_id', e.target.value)}
                                    rows="2"
                                    className="w-full px-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-brand-primary rounded-xl text-sm transition-all resize-none"
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
                                        value={activeTab === 'en' ? data.meta_keywords : data.meta_keywords_id}
                                        onChange={e => setData(activeTab === 'en' ? 'meta_keywords' : 'meta_keywords_id', e.target.value)}
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
                                        className="w-5 h-5 rounded text-orange-600 focus:ring-brand-primary"
                                    />
                                    <span className="text-sm font-bold text-slate-700">Published Status</span>
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
                                                borderColor: '#fdba74' // orange-300
                                            }
                                        }),
                                        option: (base, state) => ({
                                            ...base,
                                            backgroundColor: state.isFocused ? '#fff7ed' : 'white', // orange-50
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

                            <div className="pt-4 space-y-3">
                                <a
                                    href={route('news.detail', news.slug)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl text-sm font-black hover:bg-slate-50 hover:border-slate-300 transition-all"
                                >
                                    <Eye className="w-4 h-4" />
                                    Preview Article
                                </a>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange-600 text-white rounded-xl text-sm font-black hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50"
                                >
                                    <RefreshCcw className="w-4 h-4" />
                                    {processing ? 'Updating...' : 'Update Article'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
