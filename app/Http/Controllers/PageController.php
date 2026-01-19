<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CustomerService;
use App\Services\ProductService;

class PageController extends Controller
{
    protected $customerService;
    protected $productService;

    /**
     * PageController constructor.
     * Generate by Antigravity
     */
    public function __construct(
        CustomerService $customerService,
        ProductService $productService
    ) {
        $this->customerService = $customerService;
        $this->productService = $productService;
    }

    public function home()
    {
        $customers = $this->customerService->getCustomerList(10);
        $products = $this->productService->getProductList(8); // Display 8 products on home

        return Inertia::render('Home', [
            'customers' => $customers->items(),
            'products' => $products->items()
        ]);
    }

    public function customers(Request $request)
    {
        $customers = $this->customerService->getCustomerList(
            10,
            $request->input('search')
        );

        return Inertia::render('About/Customers', [
            'customers' => $customers,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Product List Page
     * Generate by Antigravity
     */
    public function products(Request $request)
    {
        $products = $this->productService->getProductList(
            12, // 12 items per page for product grid
            $request->input('search')
        );

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Product Detail Page
     * Generate by Antigravity
     */
    public function productDetail($id)
    {
        $realId = \App\Models\Product::decryptId($id);

        if (!$realId) {
            abort(404);
        }

        $product = $this->productService->getProductDetail($realId);

        if (!$product) {
            abort(404);
        }

        return Inertia::render('Products/Detail', [
            'product' => $product
        ]);
    }



    public function visionMission()
    {
        return Inertia::render('About/VisionMission');
    }

    public function organization()
    {
        return Inertia::render('About/Organization');
    }

    public function facilities()
    {
        return Inertia::render('About/Facilities');
    }

    public function salesGrowth()
    {
        return Inertia::render('Capabilities/SalesGrowth');
    }

    public function productionQuality()
    {
        return Inertia::render('Capabilities/ProductionQuality');
    }

    public function loadingCapacity()
    {
        return Inertia::render('Capabilities/LoadingCapacity');
    }
    public function setLanguage($locale)
    {
        if (in_array($locale, ['en', 'id', 'ja'])) {
            session(['locale' => $locale]);
            app()->setLocale($locale);
        }
        return redirect()->back();
    }
}
