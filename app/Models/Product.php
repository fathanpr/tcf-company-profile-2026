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
        });

        static::updating(function ($product) {
            if ($product->isDirty('name') && empty($product->slug)) {
                $product->slug = static::generateUniqueSlug($product->name);
            }
        });
    }

    /**
     * Generate a unique slug for the product.
     * Generate by Antigravity
     */
    public static function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $originalSlug = $slug;
        $count = 1;

        while (static::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }

    protected $fillable = [
        'name',
        'slug',
        'description',
        'customer_id',
        'main_image',
        'is_active',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];

    /**
     * The accessors to append to the model's array form.
     * Generate by Antigravity
     */
    protected $appends = ['encrypted_id'];

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
}
