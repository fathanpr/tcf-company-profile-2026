<?php

namespace App\Services;

use App\Repositories\Contracts\ActivityLogRepositoryInterface;

/**
 * Class ActivityLogService
 * Generate by Antigravity
 */
class ActivityLogService
{
    protected $repository;

    public function __construct(ActivityLogRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllLogs($limit = 20)
    {
        return $this->repository->getAllPaginated($limit);
    }

    public function getLogById($id)
    {
        return $this->repository->findById($id);
    }
}
