<?php

namespace App\Repositories\Eloquent;

use App\Models\News;
use App\Repositories\Contracts\NewsRepositoryInterface;

class NewsRepository implements NewsRepositoryInterface
{
    protected $model;

    public function __construct(News $model)
    {
        $this->model = $model;
    }

    /**
     * Generate by Antigravity
     */
    public function getPaginatedPublished($perPage = 10, $search = null, $category = null)
    {
        $query = $this->model->published();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($category && $category !== 'All') {
            $query->where('category', $category);
        }

        return $query->latest('published_at')->paginate($perPage)->withQueryString();
    }

    /**
     * Generate by Antigravity
     */
    public function getBySlug($slug)
    {
        return $this->model->published()->where('slug', $slug)->first();
    }

    /**
     * Generate by Antigravity
     */
    public function getLatest($limit = 3)
    {
        return $this->model->published()->latest('published_at')->limit($limit)->get();
    }
}
