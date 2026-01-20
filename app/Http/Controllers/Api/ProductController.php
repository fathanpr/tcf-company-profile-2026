<?php

namespace App\Http\Controllers\Api;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends BaseController
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $products = $this->productService->getAllProducts($request->get('limit', 10), $request->get('search'));
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'customer_id' => 'nullable|integer',
            'main_image' => 'nullable',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $product = $this->productService->createProduct($request->all());
        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = $this->productService->getProductDetail($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        // Simple check if exists
        $product = $this->productService->getProductDetail($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'customer_id' => 'nullable|integer',
            'main_image' => 'nullable',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $updatedProduct = $this->productService->updateProduct($id, $request->all());
        return response()->json($updatedProduct);
    }

    public function destroy($id)
    {
        $product = $this->productService->getProductDetail($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $this->productService->deleteProduct($id);
        return response()->json(null, 204);
    }
}
