<?php

namespace App\Services;

use App\Models\Maintenance;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Collection;

class MaintenanceService
{
    public function getVehicleMaintenances(Vehicle $vehicle): Collection
    {
        return $vehicle->maintenances()
            ->orderBy('maintenance_date', 'desc')
            ->get();
    }
    public function createMaintenance(Vehicle $vehicle, array $data): Maintenance
    {
        return $vehicle->maintenances()->create($data);
    }
    public function updateMaintenance(Maintenance $maintenance, array $data): Maintenance
    {
        $maintenance->update($data);
        return $maintenance->fresh();
    }
    public function deleteMaintenance(Maintenance $maintenance): bool
    {
        return $maintenance->delete();
    }

    public function getOverdueMaintenances(Vehicle $vehicle): Collection
    {
        return $vehicle->maintenances()
            ->whereNotNull('next_maintenance_date')
            ->whereDate('next_maintenance_date', '<', \Carbon\Carbon::today())
            ->orderBy('next_maintenance_date', 'asc')
            ->get();
    }

    public function getMaintenanceStats(Vehicle $vehicle): array
    {
        $maintenances = $vehicle->maintenances;
        $overdueCount = $vehicle->maintenances()
            ->whereNotNull('next_maintenance_date')
            ->whereDate('next_maintenance_date', '<', \Carbon\Carbon::today())
            ->count();

        return [
            'total_maintenances' => $maintenances->count(),
            'total_cost' => (float) $maintenances->sum('cost'),
            'average_cost' => $maintenances->count() > 0 ? (float) $maintenances->avg('cost') : 0,
            'overdue_count' => $overdueCount,
            'maintenance_by_type' => $maintenances->groupBy('maintenance_type')
                ->map(fn($items) => $items->count())
                ->toArray(),
            'last_maintenance_date' => $maintenances->max('maintenance_date'),
            'next_scheduled_date' => $maintenances
                ->where('next_maintenance_date', '>=', \Carbon\Carbon::today())
                ->min('next_maintenance_date'),
        ];
    }
}
