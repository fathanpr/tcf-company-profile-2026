<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home()
    {
        return Inertia::render('Home');
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
