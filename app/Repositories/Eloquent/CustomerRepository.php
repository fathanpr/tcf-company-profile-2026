<?php

namespace App\Repositories\Eloquent;

use App\Models\Customer;
use App\Repositories\Contracts\CustomerRepositoryInterface;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{
    /**
     * CustomerRepository constructor.
     * Generate by Antigravity
     */
    public function __construct(Customer $model)
    {
        parent::__construct($model);
    }

    /**
     * Get paginated active customers with search
     * Generate by Antigravity
     */
    public function getPaginatedActive($limit = 10, $search = null)
    {
        $query = $this->model->active();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        return $query->orderBy('name', 'asc')->paginate($limit);
    }
}
