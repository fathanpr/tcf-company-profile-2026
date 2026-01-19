<?php

namespace App\Repositories\Contracts;

interface CustomerRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * Get paginated active customers with search
     * Generate by Antigravity
     */
    public function getPaginatedActive($limit = 10, $search = null);
}
