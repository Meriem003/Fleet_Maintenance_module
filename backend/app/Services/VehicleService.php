<?php

namespace App\Services;

use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Collection;

class VehicleService
{
    public function getAllVehicles(): Collection
    {
        return Vehicle::with('maintenances')->get();
    }
    public function createVehicle(array $data): Vehicle
    {
        return Vehicle::create($data);
    }
    public function getVehicle(Vehicle $vehicle): Vehicle
    {
        return $vehicle->load('maintenances');
    }
    public function updateVehicle(Vehicle $vehicle, array $data): Vehicle
    {
        $vehicle->update($data);
        return $vehicle->fresh();
    }
    public function deleteVehicle(Vehicle $vehicle): bool
    {
        return $vehicle->delete();
    }
}
