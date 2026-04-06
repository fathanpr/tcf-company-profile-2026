<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    @php
        $component = $page['component'] ?? null;
        $isNewsDetail = $component === 'News/Detail';
        $article = $isNewsDetail ? ($page['props']['article'] ?? []) : [];

        $metaTitle = $isNewsDetail
            ? trim((string) (data_get($article, 'translated_meta_title') ?: data_get($article, 'translated_title') ?: config('app.name', 'PT Tri Centrum Fortuna')))
            : config('app.name', 'PT Tri Centrum Fortuna');

        $defaultDescription = "PT Tri Centrum Fortuna (TCF) is Indonesia's leading professional automotive manufacturing partner specializing in stamping and robotic welding.";

        $metaDescription = $isNewsDetail
            ? trim((string) (data_get($article, 'translated_meta_description') ?: data_get($article, 'translated_excerpt') ?: $defaultDescription))
            : $defaultDescription;

        $metaKeywords = $isNewsDetail
            ? trim((string) (data_get($article, 'translated_meta_keywords') ?: ''))
            : 'automotive manufacturing, stamping indonesia, tier 2 automotive parts';

        $rawImage = (string) data_get($article, 'image', '');
        $metaImage = $rawImage !== ''
            ? (\Illuminate\Support\Str::startsWith($rawImage, ['http://', 'https://']) ? $rawImage : asset(ltrim($rawImage, '/')))
            : asset('img/tcf-logo.png');

        $canonicalUrl = url()->current();
        $ogLocale = app()->getLocale() === 'id' ? 'id_ID' : 'en_US';
        $articleTags = array_values(array_filter(array_map('trim', explode(',', (string) data_get($article, 'tags', '')))));
    @endphp

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="canonical" href="{{ $canonicalUrl }}" />
    <meta name="description" content="{{ $metaDescription }}" />
    <meta name="keywords" content="{{ $metaKeywords }}" />

    @if ($isNewsDetail)
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="{{ config('app.name', 'PT Tri Centrum Fortuna') }}" />
        <meta property="og:locale" content="{{ $ogLocale }}" />
        <meta property="og:title" content="{{ $metaTitle }}" />
        <meta property="og:description" content="{{ $metaDescription }}" />
        <meta property="og:url" content="{{ $canonicalUrl }}" />
        <meta property="og:image" content="{{ $metaImage }}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{{ $metaTitle }}" />
        <meta name="twitter:description" content="{{ $metaDescription }}" />
        <meta name="twitter:image" content="{{ $metaImage }}" />

        @if (data_get($article, 'published_at'))
            <meta property="article:published_time" content="{{ data_get($article, 'published_at') }}" />
        @endif
        @if (data_get($article, 'category'))
            <meta property="article:section" content="{{ data_get($article, 'category') }}" />
        @endif
        @foreach ($articleTags as $tag)
            <meta property="article:tag" content="{{ $tag }}" />
        @endforeach
    @endif

    <title inertia>{{ $isNewsDetail ? $metaTitle . ' | TCF News' : config('app.name', 'PT Tri Centrum Fortuna') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>