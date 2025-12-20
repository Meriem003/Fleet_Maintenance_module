<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\VehicleResource;
use App\Http\Resources\VehicleDetailResource;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class VehicleController extends Controller
{
    public function __construct(
        protected VehicleService $vehicleService
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $vehicles = $this->vehicleService->getAllVehicles();
        
        return VehicleResource::collection($vehicles);
    }

    public function store(StoreVehicleRequest $request): JsonResponse
    {
        $vehicle = $this->vehicleService->createVehicle($request->validated());

        return response()->json([
            'message' => 'Vehicle created successfully',
            'data' => new VehicleResource($vehicle),
        ], 201);
    }

    public function show(Vehicle $vehicle): JsonResponse
    {
        $vehicle = $this->vehicleService->getVehicle($vehicle);

        return response()->json([
            'data' => new VehicleDetailResource($vehicle),
        ]);
    }

    public function update(UpdateVehicleRequest $request, Vehicle $vehicle): JsonResponse
    {
        $vehicle = $this->vehicleService->updateVehicle($vehicle, $request->validated());

        return response()->json([
            'message' => 'Vehicle updated successfully',
            'data' => new VehicleResource($vehicle),
        ]);
    }

    public function destroy(Vehicle $vehicle): JsonResponse
    {
        $this->vehicleService->deleteVehicle($vehicle);

        return response()->json([
            'message' => 'Vehicle deleted successfully',
        ]);
    }
}
