<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'plate_number',
        'model',
        'year',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'year' => 'integer',
        ];
    }

    /**
     * Récupérer toutes les maintenances du véhicule.
     *
     * @return HasMany
     */
    public function maintenances(): HasMany
    {
        return $this->hasMany(Maintenance::class);
    }

    /**
     * Récupérer la dernière maintenance effectuée.
     *
     * @return HasOne
     */
    public function latestMaintenance(): HasOne
    {
        return $this->hasOne(Maintenance::class)->latestOfMany();
    }

    /**
     * Vérifier si le véhicule a des maintenances en retard.
     *
     * @return bool
     */
    public function hasOverdueMaintenance(): bool
    {
        return $this->maintenances()
            ->whereNotNull('next_maintenance_date')
            ->where('next_maintenance_date', '<', Carbon::today())
            ->exists();
    }
}
