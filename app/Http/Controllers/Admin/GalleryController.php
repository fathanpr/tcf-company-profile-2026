<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\GalleryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    protected $service;

    public function __construct(GalleryService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $this->service->getAllGalleries(10, $request->search, $request->category),
            'categories' => $this->service->getCategoryList(),
            'categoryStats' => $this->service->getCategorySummaryList(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Galleries/Create', [
            'categories' => $this->service->getCategoryList(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'gallery_category_id' => 'nullable|exists:gallery_categories,id|required_without:category_name',
            'category_name' => 'nullable|string|max:100|required_without:gallery_category_id',
            'items' => 'required|array|min:1',
            'items.*.title' => 'required|string|max:255',
            'items.*.title_id' => 'nullable|string|max:255',
            'items.*.description' => 'nullable|string',
            'items.*.description_id' => 'nullable|string',
            'items.*.image' => 'required',
            'items.*.is_active' => 'nullable|boolean',
            'items.*.sort_order' => 'nullable|integer|min:0',
        ]);

        $this->service->createGallery($request->all());

        return redirect()->route('admin.galleries.index')
            ->with('success', 'Gallery item created successfully.');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $this->service->getGalleryById($id),
            'categories' => $this->service->getCategoryList(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'title_id' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_id' => 'nullable|string',
            'image' => 'nullable',
            'gallery_category_id' => 'nullable|exists:gallery_categories,id',
            'category_name' => 'nullable|string|max:100',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $this->service->updateGallery($id, $request->all());

        return redirect()->route('admin.galleries.index')
            ->with('success', 'Gallery item updated successfully.');
    }

    public function editByCategory($category)
    {
        return Inertia::render('Admin/Galleries/EditCategory', [
            'category' => $this->service->getCategoryWithGalleries($category),
        ]);
    }

    public function updateByCategory(Request $request, $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'name_id' => 'nullable|string|max:255',
            'galleries' => 'required|array|min:1',
            'galleries.*.id' => 'nullable|integer|exists:galleries,id',
            'galleries.*.title' => 'required|string|max:255',
            'galleries.*.title_id' => 'nullable|string|max:255',
            'galleries.*.description' => 'nullable|string',
            'galleries.*.description_id' => 'nullable|string',
            'galleries.*.image' => 'nullable|required_without:galleries.*.id',
            'galleries.*.is_active' => 'nullable|boolean',
            'galleries.*.sort_order' => 'nullable|integer|min:1',
        ]);

        $this->service->updateCategoryGalleries($category, $request->all());

        return redirect()->route('admin.galleries.index')
            ->with('success', 'Gallery category updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteGallery($id);

        return redirect()->route('admin.galleries.index')
            ->with('success', 'Gallery item deleted successfully.');
    }
}
