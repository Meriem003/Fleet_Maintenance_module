<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\MaintenanceController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout-all', [AuthController::class, 'logoutFromAllDevices']);
    Route::get('/tokens', [AuthController::class, 'tokens']);
    
    Route::apiResource('vehicles', VehicleController::class);
    
    Route::get('/vehicles/{vehicle}/maintenance', [MaintenanceController::class, 'index']);
    Route::post('/vehicles/{vehicle}/maintenance', [MaintenanceController::class, 'store']);
    
    Route::put('/maintenance/{maintenance}', [MaintenanceController::class, 'update']);
    Route::delete('/maintenance/{maintenance}', [MaintenanceController::class, 'destroy']);
});
