<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_category_id',
        'title',
        'title_id',
        'slug',
        'slug_id',
        'description',
        'description_id',
        'image',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($gallery) {
            if (empty($gallery->slug)) {
                $gallery->slug = static::generateUniqueSlug($gallery->title);
            }

            if (!empty($gallery->title_id) && empty($gallery->slug_id)) {
                $gallery->slug_id = static::generateUniqueSlug($gallery->title_id, 'slug_id');
            }
        });

        static::updating(function ($gallery) {
            if ($gallery->isDirty('title') && empty($gallery->slug)) {
                $gallery->slug = static::generateUniqueSlug($gallery->title);
            }

            if ($gallery->isDirty('title_id') && empty($gallery->slug_id)) {
                $gallery->slug_id = static::generateUniqueSlug($gallery->title_id, 'slug_id');
            }
        });
    }

    public static function generateUniqueSlug($name, $column = 'slug')
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (static::where($column, $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    public function category()
    {
        return $this->belongsTo(GalleryCategory::class, 'gallery_category_id');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function getLocalized($field)
    {
        $locale = app()->getLocale();

        if ($locale === 'id') {
            return $this->{$field . '_id'} ?? $this->{$field};
        }

        return $this->{$field};
    }

    public function getTranslatedTitleAttribute()
    {
        return $this->getLocalized('title');
    }

    public function getTranslatedDescriptionAttribute()
    {
        return $this->getLocalized('description');
    }

    protected $appends = [
        'translated_title',
        'translated_description',
    ];
}
