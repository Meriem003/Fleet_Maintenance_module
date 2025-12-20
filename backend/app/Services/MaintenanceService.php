<?php

namespace App\Services;

use App\Models\Maintenance;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Collection;

class MaintenanceService
{
    /**
     * Get all maintenances for a specific vehicle.
     *
     * @param Vehicle $vehicle
     * @return Collection
     */
    public function getVehicleMaintenances(Vehicle $vehicle): Collection
    {
        return $vehicle->maintenances()
            ->orderBy('maintenance_date', 'desc')
            ->get();
    }

    /**
     * Create a new maintenance record for a vehicle.
     *
     * @param Vehicle $vehicle
     * @param array $data
     * @return Maintenance
     */
    public function createMaintenance(Vehicle $vehicle, array $data): Maintenance
    {
        return $vehicle->maintenances()->create($data);
    }

    /**
     * Update a maintenance record.
     *
     * @param Maintenance $maintenance
     * @param array $data
     * @return Maintenance
     */
    public function updateMaintenance(Maintenance $maintenance, array $data): Maintenance
    {
        $maintenance->update($data);
        return $maintenance->fresh();
    }

    /**
     * Delete a maintenance record.
     *
     * @param Maintenance $maintenance
     * @return bool
     */
    public function deleteMaintenance(Maintenance $maintenance): bool
    {
        return $maintenance->delete();
    }
}
