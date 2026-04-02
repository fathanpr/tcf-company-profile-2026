<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AdService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdController extends Controller
{
    protected $service;

    public function __construct(AdService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Ads/Index', [
            'ads' => $this->service->getAllAds(10, $request->search),
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Ads/Create');
    }

    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'target_url' => 'required|url|max:500',
            'is_active' => 'boolean',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'sort_order' => 'nullable|integer|min:0|max:9999',
        ];

        $rules['image'] = $request->hasFile('image')
            ? 'required|image|max:3072'
            : 'required|string|max:255';

        $request->validate($rules);

        $this->service->createAd($request->all());

        return redirect()->route('admin.ads.index')
            ->with('success', 'Ad created successfully.');
    }

    public function edit($id)
    {
        $ad = $this->service->getAdById($id);

        if (!$ad) {
            return redirect()->route('admin.ads.index')
                ->with('error', 'Ad not found.');
        }

        return Inertia::render('Admin/Ads/Edit', [
            'ad' => $ad,
        ]);
    }

    public function show($id)
    {
        return redirect()->route('admin.ads.edit', $id);
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'target_url' => 'required|url|max:500',
            'is_active' => 'boolean',
            'start_at' => 'nullable|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'sort_order' => 'nullable|integer|min:0|max:9999',
        ];

        $rules['image'] = $request->hasFile('image')
            ? 'nullable|image|max:3072'
            : 'nullable|string|max:255';

        $request->validate($rules);

        $this->service->updateAd($id, $request->all());

        return redirect()->route('admin.ads.index')
            ->with('success', 'Ad updated successfully.');
    }

    public function destroy($id)
    {
        $this->service->deleteAd($id);

        return redirect()->route('admin.ads.index')
            ->with('success', 'Ad deleted successfully.');
    }
}
