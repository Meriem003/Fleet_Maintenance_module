<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class Maintenance extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'vehicle_id',
        'maintenance_type',
        'maintenance_date',
        'next_maintenance_date',
        'cost',
        'notes',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'maintenance_date' => 'date',
            'next_maintenance_date' => 'date',
            'cost' => 'decimal:2',
        ];
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }


    public function isOverdue(): bool
    {
        if (!$this->next_maintenance_date) {
            return false;
        }

        // next_maintenance_date est automatiquement casté en Carbon par Laravel
        // mais pour être sûr, on utilise une comparaison de date SQL-style
        return $this->next_maintenance_date < Carbon::today();
    }
}
