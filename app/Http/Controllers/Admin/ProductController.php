<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Class ProductController
 * Generate by Antigravity
 */
class ProductController extends Controller
{
    protected $service;
    protected $customerService;

    public function __construct(ProductService $service, CustomerService $customerService)
    {
        $this->service = $service;
        $this->customerService = $customerService;
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => $this->service->getAllProducts(10, $request->search),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'customers' => $this->customerService->getCustomerList(100), // Get customers for selection
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'customer_id' => 'nullable|exists:customers,id',
            'description' => 'required|string',
            'main_image' => 'nullable|string',
            'is_active' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $this->service->createProduct($request->all());

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $this->service->getProductDetail($id),
            'customers' => $this->customerService->getCustomerList(100),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug,' . $id,
            'customer_id' => 'nullable|exists:customers,id',
            'description' => 'required|string',
            'main_image' => 'nullable|string',
            'is_active' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
        ]);

        $this->service->updateProduct($id, $request->all());

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteProduct($id);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
