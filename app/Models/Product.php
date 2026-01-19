<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'customer_id',
        'main_image',
        'is_active',
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
