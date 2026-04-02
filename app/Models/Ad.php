<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'image',
        'target_url',
        'is_active',
        'start_at',
        'end_at',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'start_at' => 'datetime',
        'end_at' => 'datetime',
    ];

    protected $appends = [
        'display_status',
    ];

    public function scopeCurrentlyActive($query)
    {
        return $query
            ->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('start_at')->orWhere('start_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('end_at')->orWhere('end_at', '>=', now());
            });
    }

    public function getDisplayStatusAttribute(): string
    {
        if (!$this->is_active) {
            return 'inactive';
        }

        $now = now();

        if ($this->start_at && $this->start_at->gt($now)) {
            return 'scheduled';
        }

        if ($this->end_at && $this->end_at->lt($now)) {
            return 'expired';
        }

        return 'active';
    }
}
