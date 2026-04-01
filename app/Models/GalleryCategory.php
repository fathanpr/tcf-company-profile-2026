<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class GalleryCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_id',
        'slug',
        'slug_id',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }

            if (!empty($category->name_id) && empty($category->slug_id)) {
                $category->slug_id = Str::slug($category->name_id);
            }
        });
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }

    public function getLocalized($field)
    {
        $locale = app()->getLocale();

        if ($locale === 'id') {
            return $this->{$field . '_id'} ?? $this->{$field};
        }

        return $this->{$field};
    }

    public function getTranslatedNameAttribute()
    {
        return $this->getLocalized('name');
    }

    protected $appends = [
        'translated_name',
    ];
}
