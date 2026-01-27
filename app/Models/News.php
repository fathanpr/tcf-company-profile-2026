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
        'title_id',
        'slug',
        'slug_id',
        'category',
        'content',
        'content_id',
        'excerpt',
        'excerpt_id',
        'image',
        'meta_title',
        'meta_title_id',
        'meta_description',
        'meta_description_id',
        'meta_keywords',
        'meta_keywords_id',
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
            if (!empty($news->title_id) && empty($news->slug_id)) {
                $news->slug_id = Str::slug($news->title_id);
            }
        });

        static::updating(function ($news) {
            if ($news->isDirty('title_id') && empty($news->slug_id)) {
                $news->slug_id = Str::slug($news->title_id);
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

    /**
     * Get localized attribute
     * Generate by Antigravity
     */
    public function getLocalized($field)
    {
        $locale = app()->getLocale();
        if ($locale === 'id') {
            return $this->{$field . '_id'} ?? $this->{$field};
        }
        return $this->{$field};
    }

    /**
     * Accessors for common fields
     * Generate by Antigravity
     */
    public function getTranslatedTitleAttribute()
    {
        return $this->getLocalized('title');
    }
    public function getTranslatedContentAttribute()
    {
        return $this->getLocalized('content');
    }
    public function getTranslatedExcerptAttribute()
    {
        return $this->getLocalized('excerpt');
    }
    public function getTranslatedMetaTitleAttribute()
    {
        return $this->getLocalized('meta_title');
    }
    public function getTranslatedMetaDescriptionAttribute()
    {
        return $this->getLocalized('meta_description');
    }
    public function getTranslatedMetaKeywordsAttribute()
    {
        return $this->getLocalized('meta_keywords');
    }

    /**
     * Set appends for serialization
     * Generate by Antigravity
     */
    protected $appends = [
        'translated_title',
        'translated_content',
        'translated_excerpt',
        'translated_meta_title',
        'translated_meta_description',
        'translated_meta_keywords'
    ];
}
