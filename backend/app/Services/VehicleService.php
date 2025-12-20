<?php

namespace App\Services;

use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Collection;

class VehicleService
{
    /**
     * Get all vehicles with their maintenances.
     *
     * @return Collection
     */
    public function getAllVehicles(): Collection
    {
        return Vehicle::with('maintenances')->get();
    }

    /**
     * Create a new vehicle.
     *
     * @param array $data
     * @return Vehicle
     */
    public function createVehicle(array $data): Vehicle
    {
        return Vehicle::create($data);
    }

    /**
     * Get a specific vehicle with its maintenances.
     *
     * @param Vehicle $vehicle
     * @return Vehicle
     */
    public function getVehicle(Vehicle $vehicle): Vehicle
    {
        return $vehicle->load('maintenances');
    }

    /**
     * Update a vehicle.
     *
     * @param Vehicle $vehicle
     * @param array $data
     * @return Vehicle
     */
    public function updateVehicle(Vehicle $vehicle, array $data): Vehicle
    {
        $vehicle->update($data);
        return $vehicle->fresh();
    }

    /**
     * Delete a vehicle.
     *
     * @param Vehicle $vehicle
     * @return bool
     */
    public function deleteVehicle(Vehicle $vehicle): bool
    {
        return $vehicle->delete();
    }
}
