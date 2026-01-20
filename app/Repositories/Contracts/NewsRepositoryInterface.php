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

    /**
     * Admin methods
     */
    public function getAllPaginated($perPage = 10, $search = null);
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);

    /**
     * Get unique categories.
     * Generate by Antigravity
     */
    public function getCategories();
}
