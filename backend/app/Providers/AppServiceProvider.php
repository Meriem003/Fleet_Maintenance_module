<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\VehicleService;
use App\Services\MaintenanceService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(AuthService::class, function () {
            return new AuthService();
        });

        $this->app->singleton(VehicleService::class, function () {
            return new VehicleService();
        });

        $this->app->singleton(MaintenanceService::class, function () {
            return new MaintenanceService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
