<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\CustomerService;

class PageController extends Controller
{
    protected $customerService;

    /**
     * PageController constructor.
     * Generate by Antigravity
     */
    public function __construct(CustomerService $customerService)
    {
        $this->customerService = $customerService;
    }

    public function home()
    {
        $customers = $this->customerService->getCustomerList(10);
        return Inertia::render('Home', [
            'customers' => $customers->items()
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
