<?php

namespace App\Repositories\Eloquent;

use App\Models\Ad;
use App\Repositories\Contracts\AdRepositoryInterface;

class AdRepository extends BaseRepository implements AdRepositoryInterface
{
    public function __construct(Ad $model)
    {
        parent::__construct($model);
    }

    public function getPaginatedActive($limit = 10)
    {
        return $this->model
            ->currentlyActive()
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->paginate($limit);
    }

    public function paginate($perPage = 10, $search = null)
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->where('title', 'like', '%' . $search . '%')
                ->orWhere('target_url', 'like', '%' . $search . '%');
        }

        return $query
            ->orderByDesc('is_active')
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }
}
