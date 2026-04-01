<?php

namespace App\Services;

use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Repositories\Contracts\GalleryRepositoryInterface;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class GalleryService
{
    protected $repository;

    public function __construct(GalleryRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getGalleryList($perPage = 12, $search = null, $category = null)
    {
        return $this->repository->getPaginatedActive($perPage, $search, $category);
    }

    public function getCategoryList()
    {
        return $this->repository->getCategories();
    }

    public function getCategorySummaryList()
    {
        return GalleryCategory::query()
            ->withCount([
                'galleries as total_photos_count',
                'galleries as active_photos_count' => function ($query) {
                    $query->where('is_active', true);
                },
                'galleries as inactive_photos_count' => function ($query) {
                    $query->where('is_active', false);
                },
            ])
            ->orderBy('name')
            ->get();
    }

    public function getAllGalleries($perPage = 10, $search = null, $category = null)
    {
        return $this->repository->getAllPaginated($perPage, $search, $category);
    }

    public function getGalleryById($id)
    {
        return $this->repository->getByIdWithCategory($id);
    }

    public function getCategoryWithGalleries($categoryId)
    {
        return GalleryCategory::with(['galleries' => function ($query) {
            $query->orderBy('sort_order')->orderBy('id');
        }])->findOrFail($categoryId);
    }

    public function createGallery(array $data)
    {
        return DB::transaction(function () use ($data) {
            $categoryId = $this->resolveCategoryId($data);
            $createdItems = collect();

            $items = $data['items'] ?? [];

            foreach ($items as $item) {
                $payload = [
                    'gallery_category_id' => $categoryId,
                    'title' => $item['title'] ?? null,
                    'title_id' => $item['title_id'] ?? null,
                    'description' => $item['description'] ?? null,
                    'description_id' => $item['description_id'] ?? null,
                    'image' => $item['image'] ?? null,
                    'is_active' => isset($item['is_active']) ? (bool) $item['is_active'] : true,
                    'sort_order' => $item['sort_order'] ?? 0,
                ];

                if (isset($payload['image']) && $payload['image'] instanceof UploadedFile) {
                    $filename = time() . '_' . uniqid() . '_' . $payload['image']->getClientOriginalName();
                    $path = $payload['image']->storeAs('galleries', $filename, 'public');
                    $payload['image'] = '/storage/' . $path;
                }

                $gallery = $this->repository->create($payload);
                $createdItems->push($gallery);

                activity()
                    ->performedOn($gallery)
                    ->causedBy(auth()->user())
                    ->log("Created gallery item: {$gallery->title}");
            }

            return $createdItems;
        });
    }

    public function updateGallery($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            $resolvedCategoryId = $this->resolveCategoryId($data);

            if ($resolvedCategoryId !== null) {
                $data['gallery_category_id'] = $resolvedCategoryId;
            } else {
                unset($data['gallery_category_id']);
            }

            if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
                $filename = time() . '_' . uniqid() . '_' . $data['image']->getClientOriginalName();
                $path = $data['image']->storeAs('galleries', $filename, 'public');
                $data['image'] = '/storage/' . $path;
            }

            $gallery = $this->repository->update($id, $data);

            activity()
                ->performedOn($gallery)
                ->causedBy(auth()->user())
                ->log("Updated gallery item: {$gallery->title}");

            return $gallery;
        });
    }

    public function deleteGallery($id)
    {
        return DB::transaction(function () use ($id) {
            $gallery = $this->repository->find($id);
            $title = $gallery?->title;

            $this->repository->delete($id);

            activity()
                ->causedBy(auth()->user())
                ->log("Deleted gallery item: {$title}");

            return true;
        });
    }

    public function updateCategoryGalleries($categoryId, array $data)
    {
        return DB::transaction(function () use ($categoryId, $data) {
            $category = GalleryCategory::findOrFail($categoryId);
            $category->update([
                'name' => $data['name'],
                'name_id' => $data['name_id'] ?? null,
            ]);

            foreach (($data['galleries'] ?? []) as $item) {
                $gallery = null;

                if (!empty($item['id'])) {
                    $gallery = Gallery::where('gallery_category_id', $category->id)
                        ->where('id', $item['id'])
                        ->firstOrFail();
                }

                $payload = [
                    'gallery_category_id' => $category->id,
                    'title' => $item['title'] ?? $gallery?->title,
                    'title_id' => $item['title_id'] ?? null,
                    'description' => $item['description'] ?? null,
                    'description_id' => $item['description_id'] ?? null,
                    'is_active' => isset($item['is_active']) ? (bool) $item['is_active'] : true,
                    'sort_order' => $item['sort_order'] ?? ($gallery?->sort_order ?? 1),
                ];

                if (isset($item['image']) && $item['image'] instanceof UploadedFile) {
                    $filename = time() . '_' . uniqid() . '_' . $item['image']->getClientOriginalName();
                    $path = $item['image']->storeAs('galleries', $filename, 'public');
                    $payload['image'] = '/storage/' . $path;
                }

                if ($gallery) {
                    $gallery->update($payload);

                    activity()
                        ->performedOn($gallery)
                        ->causedBy(auth()->user())
                        ->log("Updated gallery item by category editor: {$gallery->title}");
                } else {
                    $gallery = Gallery::create($payload);

                    activity()
                        ->performedOn($gallery)
                        ->causedBy(auth()->user())
                        ->log("Created gallery item by category editor: {$gallery->title}");
                }
            }

            return $category->fresh(['galleries']);
        });
    }

    protected function resolveCategoryId(array $data)
    {
        if (!empty($data['gallery_category_id'])) {
            return $data['gallery_category_id'];
        }

        $name = trim((string) ($data['category_name'] ?? ''));

        if ($name === '') {
            return null;
        }

        $category = GalleryCategory::firstOrCreate(
            ['name' => $name],
            ['is_active' => true]
        );

        return $category->id;
    }
}
