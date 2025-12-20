<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaintenanceRequest;
use App\Http\Requests\UpdateMaintenanceRequest;
use App\Http\Resources\MaintenanceResource;
use App\Models\Maintenance;
use App\Models\Vehicle;
use App\Services\MaintenanceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MaintenanceController extends Controller
{
    public function __construct(
        protected MaintenanceService $maintenanceService
    ) {}

    public function index(Vehicle $vehicle): AnonymousResourceCollection
    {
        $maintenances = $this->maintenanceService->getVehicleMaintenances($vehicle);

        return MaintenanceResource::collection($maintenances);
    }

    public function store(StoreMaintenanceRequest $request, Vehicle $vehicle): JsonResponse
    {
        $maintenance = $this->maintenanceService->createMaintenance($vehicle, $request->validated());

        return response()->json([
            'message' => 'Maintenance record created successfully',
            'data' => new MaintenanceResource($maintenance),
        ], 201);
    }

    public function update(UpdateMaintenanceRequest $request, Maintenance $maintenance): JsonResponse
    {
        $maintenance = $this->maintenanceService->updateMaintenance($maintenance, $request->validated());

        return response()->json([
            'message' => 'Maintenance record updated successfully',
            'data' => new MaintenanceResource($maintenance),
        ]);
    }

    public function destroy(Maintenance $maintenance): JsonResponse
    {
        $this->maintenanceService->deleteMaintenance($maintenance);

        return response()->json([
            'message' => 'Maintenance record deleted successfully',
        ]);
    }
}
