<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\ActivityLogRepositoryInterface;
use Spatie\Activitylog\Models\Activity;

/**
 * Class EloquentActivityLogRepository
 * Generate by Antigravity
 */
class EloquentActivityLogRepository implements ActivityLogRepositoryInterface
{
    protected $model;

    public function __construct(Activity $model)
    {
        $this->model = $model;
    }

    public function getAllPaginated($limit = 20)
    {
        return $this->model->with('causer')->latest()->paginate($limit);
    }

    public function findById($id)
    {
        return $this->model->with(['causer', 'subject'])->findOrFail($id);
    }
}
