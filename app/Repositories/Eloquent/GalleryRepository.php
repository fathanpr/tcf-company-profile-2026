<?php

namespace App\Repositories\Eloquent;

use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Repositories\Contracts\GalleryRepositoryInterface;

class GalleryRepository extends BaseRepository implements GalleryRepositoryInterface
{
    public function __construct(Gallery $model)
    {
        parent::__construct($model);
    }

    public function getPaginatedActive($perPage = 12, $search = null, $category = null)
    {
        $query = $this->model->active()->with('category');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title_id', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('description_id', 'like', "%{$search}%");
            });
        }

        if ($category && $category !== 'all') {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category)->orWhere('slug_id', $category);
            });
        }

        return $query
            ->orderBy('sort_order')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getAllPaginated($perPage = 10, $search = null, $category = null)
    {
        $query = $this->model->with('category')->latest();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title_id', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $query->where('gallery_category_id', $category);
        }

        return $query->paginate($perPage)->withQueryString();
    }

    public function getBySlug($slug)
    {
        return $this->model->active()
            ->with('category')
            ->where(function ($query) use ($slug) {
                $query->where('slug', $slug)
                    ->orWhere('slug_id', $slug);
            })
            ->first();
    }

    public function getByIdWithCategory($id)
    {
        return $this->model->with('category')->findOrFail($id);
    }

    public function getCategories()
    {
        return GalleryCategory::query()
            ->where('is_active', true)
            ->withCount('galleries')
            ->orderBy('name')
            ->get();
    }
}
