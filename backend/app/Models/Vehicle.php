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

    public function maintenances(): HasMany
    {
        return $this->hasMany(Maintenance::class);
    }

    public function latestMaintenance(): HasOne
    {
        return $this->hasOne(Maintenance::class)->latestOfMany();
    }

    public function hasOverdueMaintenance(): bool
    {
        return $this->maintenances()
            ->whereNotNull('next_maintenance_date')
            ->whereDate('next_maintenance_date', '<', Carbon::today())
            ->exists();
    }

    public function overdueMaintenances()
    {
        return $this->maintenances()
            ->whereNotNull('next_maintenance_date')
            ->whereDate('next_maintenance_date', '<', Carbon::today())
            ->orderBy('next_maintenance_date', 'asc')
            ->get();
    }

    public function overdueMaintenancesCount(): int
    {
        return $this->maintenances()
            ->whereNotNull('next_maintenance_date')
            ->whereDate('next_maintenance_date', '<', Carbon::today())
            ->count();
    }
}
