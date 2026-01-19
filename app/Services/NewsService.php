<?php

namespace App\Services;

use App\Repositories\Contracts\NewsRepositoryInterface;
use Illuminate\Support\Facades\Log;

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
}
