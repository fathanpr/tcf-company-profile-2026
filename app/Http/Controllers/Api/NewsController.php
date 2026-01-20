<?php

namespace App\Http\Controllers\Api;

use App\Services\NewsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsController extends BaseController
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function index(Request $request)
    {
        $news = $this->newsService->getAllNews($request->get('limit', 10), $request->get('search'));
        return response()->json($news);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'image' => 'nullable',
            'category' => 'nullable|string',
            'published_at' => 'required|date',
            'is_published' => 'boolean',
            'meta_keywords' => 'nullable|string',
            'tags' => 'nullable|string',
            'reading_time' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $news = $this->newsService->createNews($request->all());
        return response()->json($news, 201);
    }

    public function show($id)
    {
        $news = $this->newsService->getNewsById($id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }
        return response()->json($news);
    }

    public function update(Request $request, $id)
    {
        $news = $this->newsService->getNewsById($id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'excerpt' => 'sometimes|string',
            'content' => 'sometimes|string',
            'image' => 'nullable',
            'category' => 'nullable|string',
            'published_at' => 'sometimes|date',
            'is_published' => 'boolean',
            'meta_keywords' => 'nullable|string',
            'tags' => 'nullable|string',
            'reading_time' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $updatedNews = $this->newsService->updateNews($id, $request->all());
        return response()->json($updatedNews);
    }

    public function destroy($id)
    {
        $news = $this->newsService->getNewsById($id);
        if (!$news) {
            return response()->json(['message' => 'News not found'], 404);
        }

        $this->newsService->deleteNews($id);
        return response()->json(null, 204);
    }
}
