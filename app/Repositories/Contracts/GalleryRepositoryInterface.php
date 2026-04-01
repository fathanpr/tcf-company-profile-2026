<?php

namespace App\Repositories\Contracts;

interface GalleryRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedActive($perPage = 12, $search = null, $category = null);
    public function getAllPaginated($perPage = 10, $search = null, $category = null);
    public function getBySlug($slug);
    public function getByIdWithCategory($id);
    public function getCategories();
}
