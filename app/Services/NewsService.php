<?php

namespace App\Services;

use App\Repositories\Contracts\NewsRepositoryInterface;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class NewsService
{
    protected $newsRepository;

    public function __construct(NewsRepositoryInterface $newsRepository)
    {
        $this->newsRepository = $newsRepository;
    }

    /**
     * Generate by Antigravity
     */
    public function getNewsList($perPage = 6, $search = null, $category = null)
    {
        return $this->newsRepository->getPaginatedPublished($perPage, $search, $category);
    }

    /**
     * Generate by Antigravity
     */
    public function getNewsBySlug($slug)
    {
        return $this->newsRepository->getBySlug($slug);
    }

    /**
     * Generate by Antigravity
     */
    public function getLatestNews($limit = 3)
    {
        return $this->newsRepository->getLatest($limit);
    }

    /**
     * Admin methods
     * Generate by Antigravity
     */
    public function getAllNews($perPage = 10, $search = null)
    {
        return $this->newsRepository->getAllPaginated($perPage, $search);
    }

    public function getNewsById($id)
    {
        return $this->newsRepository->findById($id);
    }

    public function createNews(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Handle Image Upload
            if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
                // Generate a unique filename
                $filename = time() . '_' . $data['image']->getClientOriginalName();
                // Store in 'news' directory within 'public' disk
                $path = $data['image']->storeAs('news', $filename, 'public');
                // Save the relative path (accessible via symlink)
                $data['image'] = '/storage/' . $path;
            }

            $news = $this->newsRepository->create($data);

            activity()
                ->performedOn($news)
                ->causedBy(auth()->user())
                ->log("Created news: {$news->title}");

            return $news;
        });
    }

    public function updateNews($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            // Handle Image Upload
            if (isset($data['image']) && $data['image'] instanceof \Illuminate\Http\UploadedFile) {
                $filename = time() . '_' . $data['image']->getClientOriginalName();
                $path = $data['image']->storeAs('news', $filename, 'public');
                $data['image'] = '/storage/' . $path;
            }

            $news = $this->newsRepository->update($id, $data);

            activity()
                ->performedOn($news)
                ->causedBy(auth()->user())
                ->log("Updated news: {$news->title}");

            return $news;
        });
    }

    public function deleteNews($id)
    {
        return DB::transaction(function () use ($id) {
            $news = $this->newsRepository->findById($id);
            $title = $news->title;

            $this->newsRepository->delete($id);

            activity()
                ->causedBy(auth()->user())
                ->log("Deleted news: {$title}");

            return true;
        });
    }

    public function getCategories()
    {
        return $this->newsRepository->getCategories();
    }
}
