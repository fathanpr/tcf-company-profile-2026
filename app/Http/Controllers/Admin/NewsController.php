<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\NewsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

/**
 * Class NewsController
 * Generate by Antigravity
 */
class NewsController extends Controller
{
    protected $service;

    public function __construct(NewsService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/News/Index', [
            'news' => $this->service->getAllNews(10, $request->search),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/News/Create', [
            'categories' => $this->service->getCategories(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'image' => 'nullable|string',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_keywords' => 'nullable|string',
            'tags' => 'nullable|string',
            'reading_time' => 'nullable|integer',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['title']);

        if ($data['is_published'] && !$data['published_at']) {
            $data['published_at'] = now();
        }

        $this->service->createNews($data);

        return redirect()->route('admin.news.index')
            ->with('success', 'News created successfully.');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/News/Edit', [
            'news' => $this->service->getNewsById($id),
            'categories' => $this->service->getCategories(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'image' => 'nullable|string',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
            'meta_keywords' => 'nullable|string',
            'tags' => 'nullable|string',
            'reading_time' => 'nullable|integer',
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['title']);

        $this->service->updateNews($id, $data);

        return redirect()->route('admin.news.index')
            ->with('success', 'News updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteNews($id);

        return redirect()->route('admin.news.index')
            ->with('success', 'News deleted successfully.');
    }
}
