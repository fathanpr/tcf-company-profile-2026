<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    use HasFactory;

    /**
     * Generate by Antigravity
     */
    protected $fillable = [
        'title',
        'slug',
        'category',
        'content',
        'excerpt',
        'image',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'tags',
        'reading_time',
        'is_published',
        'published_at',
    ];

    /**
     * Generate by Antigravity
     */
    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Boot the model.
     * Generate by Antigravity
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($news) {
            if (empty($news->slug)) {
                $news->slug = Str::slug($news->title);
            }
        });
    }

    /**
     * Scope a query to only include published news.
     * Generate by Antigravity
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
            ->where('published_at', '<=', now());
    }
}
