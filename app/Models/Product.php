<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    /**
     * Boot the model.
     * Generate by Antigravity
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = static::generateUniqueSlug($product->name);
            }
            if (!empty($product->name_id) && empty($product->slug_id)) {
                $product->slug_id = static::generateUniqueSlug($product->name_id, 'slug_id');
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('name') && empty($product->slug)) {
                $product->slug = static::generateUniqueSlug($product->name);
            }
            if ($product->isDirty('name_id') && empty($product->slug_id)) {
                $product->slug_id = static::generateUniqueSlug($product->name_id, 'slug_id');
            }
        });
    }

    /**
     * Generate a unique slug for the product.
     * Generate by Antigravity
     */
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

    protected $fillable = [
        'name',
        'name_id',
        'slug',
        'slug_id',
        'description',
        'description_id',
        'customer_id',
        'main_image',
        'is_active',
        'meta_title',
        'meta_title_id',
        'meta_description',
        'meta_description_id',
        'meta_keywords',
        'meta_keywords_id',
    ];

    /**
     * The accessors to append to the model's array form.
     * Generate by Antigravity
     */


    /**
     * Get the encrypted ID for the product.
     * Generate by Antigravity
     */
    public function getEncryptedIdAttribute()
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], \Illuminate\Support\Facades\Crypt::encryptString($this->id));
    }

    /**
     * Decrypt the product ID.
     * Generate by Antigravity
     */
    public static function decryptId($encryptedId)
    {
        try {
            // Restore URL-safe characters
            $id = str_replace(['-', '_'], ['+', '/'], $encryptedId);
            return \Illuminate\Support\Facades\Crypt::decryptString($id);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Scope a query to only include active products.
     * Generate by Antigravity
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Relationship with Customer
     * Generate by Antigravity
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Relationship with ProductImage
     * Generate by Antigravity
     */
    public function images()
    {
        return $this->hasMany(ProductImage::class);
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
    public function getTranslatedNameAttribute()
    {
        return $this->getLocalized('name');
    }
    public function getTranslatedDescriptionAttribute()
    {
        return $this->getLocalized('description');
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
     * The accessors to append to the model's array form.
     * Generate by Antigravity
     */
    protected $appends = [
        'encrypted_id',
        'translated_name',
        'translated_description',
        'translated_meta_title',
        'translated_meta_description',
        'translated_meta_keywords'
    ];
}
