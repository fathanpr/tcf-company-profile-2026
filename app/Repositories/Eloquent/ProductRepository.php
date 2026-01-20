<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;

/**
 * Class ProductRepository
 * Generate by Antigravity
 */
class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    /**
     * ProductRepository constructor.
     * @param Product $model
     */
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    /**
     * Get paginated active products with search
     * Generate by Antigravity
     */
    public function getPaginatedActive($limit = 10, $search = null)
    {
        $query = $this->model->active()->with('customer');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        return $query->orderBy('name', 'asc')->paginate($limit);
    }

    /**
     * Get product by ID with full relations
     * Generate by Antigravity
     */
    public function getByIdWithRelations($id)
    {
        return $this->model->with(['customer', 'images'])->findOrFail($id);
    }

    /**
     * Get product by slug with full relations
     * Generate by Antigravity
     */
    public function getBySlugWithRelations($slug)
    {
        return $this->model->where('slug', $slug)
            ->active()
            ->with(['customer', 'images'])
            ->firstOrFail();
    }
}
