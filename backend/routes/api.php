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
    
    // Routes de maintenance
    Route::get('/vehicles/{vehicle}/maintenance', [MaintenanceController::class, 'index']);
    Route::get('/vehicles/{vehicle}/maintenance/overdue', [MaintenanceController::class, 'overdue']);
    Route::get('/vehicles/{vehicle}/maintenance/stats', [MaintenanceController::class, 'stats']);
    Route::post('/vehicles/{vehicle}/maintenance', [MaintenanceController::class, 'store']);
    Route::get('/vehicles/{vehicle}/maintenance/{maintenance}', [MaintenanceController::class, 'show']);
    
    Route::put('/maintenance/{maintenance}', [MaintenanceController::class, 'update']);
    Route::delete('/maintenance/{maintenance}', [MaintenanceController::class, 'destroy']);
});
