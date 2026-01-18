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

    public function about()
    {
        return Inertia::render('About');
    }

    public function capabilities()
    {
        return Inertia::render('Capabilities');
    }

    public function plants()
    {
        return Inertia::render('Plants');
    }

    public function coreValues()
    {
        return Inertia::render('CoreValues');
    }

    public function news()
    {
        return Inertia::render('News');
    }

    public function contact()
    {
        return Inertia::render('Contact');
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
