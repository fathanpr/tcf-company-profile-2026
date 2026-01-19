<?php

namespace App\Repositories\Contracts;

/**
 * Interface ProductRepositoryInterface
 * Generate by Antigravity
 */
interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedActive($limit = 10, $search = null);
    public function getByIdWithRelations($id);
}
