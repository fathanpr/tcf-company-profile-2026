<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ActivityLogService;
use Inertia\Inertia;

/**
 * Class ActivityLogController
 * Generate by Antigravity
 */
class ActivityLogController extends Controller
{
    protected $service;

    public function __construct(ActivityLogService $service)
    {
        $this->middleware('can:view logs');
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('Admin/ActivityLogs/Index', [
            'logs' => $this->service->getAllLogs(),
        ]);
    }
}
