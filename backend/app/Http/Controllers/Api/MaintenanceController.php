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

    public function overdue(Vehicle $vehicle): AnonymousResourceCollection
    {
        $maintenances = $this->maintenanceService->getOverdueMaintenances($vehicle);

        return MaintenanceResource::collection($maintenances);
    }

    public function stats(Vehicle $vehicle): JsonResponse
    {
        $stats = $this->maintenanceService->getMaintenanceStats($vehicle);

        return response()->json([
            'data' => $stats,
        ]);
    }

    public function store(StoreMaintenanceRequest $request, Vehicle $vehicle): JsonResponse
    {
        $maintenance = $this->maintenanceService->createMaintenance($vehicle, $request->validated());

        return response()->json([
            'message' => 'Maintenance record created successfully',
            'data' => new MaintenanceResource($maintenance),
        ], 201);
    }

    public function show(Vehicle $vehicle, Maintenance $maintenance): JsonResponse
    {
        if ($maintenance->vehicle_id !== $vehicle->id) {
            return response()->json([
                'message' => 'This maintenance record does not belong to the specified vehicle',
            ], 404);
        }

        return response()->json([
            'data' => new MaintenanceResource($maintenance->load('vehicle')),
        ]);
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

    public function allOverdue(): AnonymousResourceCollection
    {
        $maintenances = $this->maintenanceService->getAllOverdueMaintenances();

        return MaintenanceResource::collection($maintenances);
    }

    public function alertsSummary(): JsonResponse
    {
        $overdueCount = $this->maintenanceService->getOverdueMaintenancesCount();

        return response()->json([
            'data' => [
                'overdue_count' => $overdueCount,
                'has_alerts' => $overdueCount > 0,
            ],
        ]);
    }
}
