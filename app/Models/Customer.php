<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'website',
        'logo',
        'is_active',
    ];

    /**
     * Generate by Antigravity
     * Menambahkan scope untuk customer yang aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
