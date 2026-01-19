<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CustomerService;
use App\Services\ProductService;
use App\Services\NewsService;

class PageController extends Controller
{
    protected $customerService;
    protected $productService;
    protected $newsService;

    /**
     * PageController constructor.
     * Generate by Antigravity
     */
    public function __construct(
        CustomerService $customerService,
        ProductService $productService,
        NewsService $newsService
    ) {
        $this->customerService = $customerService;
        $this->productService = $productService;
        $this->newsService = $newsService;
    }

    public function home()
    {
        $customers = $this->customerService->getCustomerList(10);
        $products = $this->productService->getProductList(8); // Display 8 products on home
        $news = $this->newsService->getLatestNews(3); // Latest 3 news for homepage

        return Inertia::render('Home', [
            'customers' => $customers->items(),
            'products' => $products->items(),
            'news' => $news
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

    /**
     * News List Page
     * Generate by Antigravity
     */
    public function news(Request $request)
    {
        $news = $this->newsService->getNewsList(
            8, // 8 items per page
            $request->input('search'),
            $request->input('category')
        );

        return Inertia::render('News/Index', [
            'news' => $news,
            'filters' => $request->only(['search', 'category'])
        ]);
    }

    /**
     * News Detail Page
     * Generate by Antigravity
     */
    public function newsDetail($slug)
    {
        $article = $this->newsService->getNewsBySlug($slug);

        if (!$article) {
            abort(404);
        }

        return Inertia::render('News/Detail', [
            'article' => $article
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
