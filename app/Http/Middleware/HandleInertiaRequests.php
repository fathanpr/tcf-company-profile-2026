<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'roles' => $request->user()->getRoleNames(),
                    'permissions' => $request->user()->getAllPermissions()->pluck('name'),
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'locale' => app()->getLocale(),
            'translations' => (function () {
                $locale = app()->getLocale();
                $jsonPath = base_path("lang/{$locale}.json");

                // Fallback for newer Laravel versions that might use resources/lang
                if (!file_exists($jsonPath)) {
                    $jsonPath = lang_path("{$locale}.json");
                }

                $translations = [];
                if (file_exists($jsonPath)) {
                    $content = file_get_contents($jsonPath);
                    $decoded = json_decode($content, true);

                    if (json_last_error() === JSON_ERROR_NONE) {
                        $translations = $decoded;
                        // Add some debug info (will be visible in JS console)
                        $translations['_debug'] = [
                            'locale' => $locale,
                            'source' => $jsonPath,
                            'count' => count($translations),
                            'loaded_at' => date('Y-m-d H:i:s')
                        ];
                    } else {
                        \Log::error("Failed to decode translation file: {$jsonPath}. Error: " . json_last_error_msg());
                        $translations['_debug_error'] = json_last_error_msg();
                    }
                } else {
                    \Log::warning("Translation file not found: {$jsonPath}");
                    $translations['_debug_not_found'] = $jsonPath;
                }

                return $translations;
            })(),
        ];
    }
}
