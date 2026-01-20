<?php

namespace App\Services;

use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Support\Facades\DB;

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

    /**
     * Admin methods
     * Generate by Antigravity
     */
    public function getAllProducts($perPage = 10, $search = null)
    {
        return $this->repository->paginate($perPage, $search);
    }

    public function createProduct(array $data)
    {
        return DB::transaction(function () use ($data) {
            // Handle Main Image Upload
            if (isset($data['main_image']) && $data['main_image'] instanceof \Illuminate\Http\UploadedFile) {
                $filename = time() . '_' . $data['main_image']->getClientOriginalName();
                $path = $data['main_image']->storeAs('products', $filename, 'public');
                $data['main_image'] = '/storage/' . $path;
            }

            $product = $this->repository->create($data);

            activity()
                ->performedOn($product)
                ->causedBy(auth()->user())
                ->log("Created product: {$product->name}");

            return $product;
        });
    }

    public function updateProduct($id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            // Handle Main Image Upload
            if (isset($data['main_image']) && $data['main_image'] instanceof \Illuminate\Http\UploadedFile) {
                $filename = time() . '_' . $data['main_image']->getClientOriginalName();
                $path = $data['main_image']->storeAs('products', $filename, 'public');
                $data['main_image'] = '/storage/' . $path;
            }

            $product = $this->repository->update($id, $data);

            activity()
                ->performedOn($product)
                ->causedBy(auth()->user())
                ->log("Updated product: {$product->name}");

            return $product;
        });
    }

    public function deleteProduct($id)
    {
        return DB::transaction(function () use ($id) {
            $product = $this->repository->find($id);
            $name = $product->name;

            $this->repository->delete($id);

            activity()
                ->causedBy(auth()->user())
                ->log("Deleted product: {$name}");

            return true;
        });
    }
}
