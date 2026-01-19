<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;

/**
 * Class ProductService
 * Generate by Antigravity
 */
class ProductService extends BaseService
{
    protected $repository;

    /**
     * ProductService constructor.
     * @param ProductRepositoryInterface $repository
     */
    public function __construct(ProductRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Get list of products
     * Generate by Antigravity
     */
    public function getProductList($limit = 10, $search = null)
    {
        return $this->repository->getPaginatedActive($limit, $search);
    }

    /**
     * Get product detail
     * Generate by Antigravity
     */
    public function getProductDetail($id)
    {
        return $this->repository->getByIdWithRelations($id);
    }
}
