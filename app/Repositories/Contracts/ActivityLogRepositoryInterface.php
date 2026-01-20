<?php

namespace App\Repositories\Contracts;

/**
 * Interface ActivityLogRepositoryInterface
 * Generate by Antigravity
 */
interface ActivityLogRepositoryInterface
{
    public function getAllPaginated($limit = 20);
    public function findById($id);
}
