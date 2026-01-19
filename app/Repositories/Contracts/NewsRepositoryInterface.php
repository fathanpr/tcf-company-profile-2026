<?php

namespace App\Repositories\Contracts;

interface NewsRepositoryInterface
{
    /**
     * Get paginated published news.
     * Generate by Antigravity
     */
    public function getPaginatedPublished($perPage = 10, $search = null, $category = null);

    /**
     * Get news by slug.
     * Generate by Antigravity
     */
    public function getBySlug($slug);

    /**
     * Get latest published news.
     * Generate by Antigravity
     */
    public function getLatest($limit = 3);
}
