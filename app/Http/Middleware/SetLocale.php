<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->segment(1);

        if (in_array($locale, ['en', 'id'])) {
            app()->setLocale($locale);
            session()->put('locale', $locale);
        } else {
            // Default to session value or fallback
            $locale = session()->get('locale', config('app.locale'));
            app()->setLocale($locale);
        }

        URL::defaults(['locale' => $locale]);

        return $next($request);
    }
}
