<?php

namespace Tests\Unit;

use App\Models\Maintenance;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MaintenanceOverdueTest extends TestCase
{
    use RefreshDatabase;

    private Vehicle $vehicle;

    protected function setUp(): void
    {
        parent::setUp();
        $this->vehicle = Vehicle::factory()->create();
    }

    /** @test */
    public function maintenance_is_not_overdue_when_no_next_maintenance_date()
    {
        $maintenance = Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => null,
        ]);

        $this->assertFalse($maintenance->isOverdue());
    }

    /** @test */
    public function maintenance_is_overdue_when_next_date_is_in_past()
    {
        $maintenance = Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::yesterday(),
        ]);

        $this->assertTrue($maintenance->isOverdue());
    }

    /** @test */
    public function maintenance_is_not_overdue_when_next_date_is_today()
    {
        $maintenance = Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::today(),
        ]);

        $this->assertFalse($maintenance->isOverdue());
    }

    /** @test */
    public function maintenance_is_not_overdue_when_next_date_is_in_future()
    {
        $maintenance = Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::tomorrow(),
        ]);

        $this->assertFalse($maintenance->isOverdue());
    }

    /** @test */
    public function vehicle_has_overdue_maintenance_when_one_maintenance_is_overdue()
    {
        Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::yesterday(),
        ]);

        $this->assertTrue($this->vehicle->hasOverdueMaintenance());
    }

    /** @test */
    public function vehicle_does_not_have_overdue_maintenance_when_all_are_future()
    {
        Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::tomorrow(),
        ]);

        $this->assertFalse($this->vehicle->hasOverdueMaintenance());
    }

    /** @test */
    public function vehicle_overdue_maintenances_returns_only_overdue_ones()
    {
        // En retard
        Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::yesterday(),
        ]);

        Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::now()->subDays(5),
        ]);

        // Non en retard
        Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::tomorrow(),
        ]);

        Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => null,
        ]);

        $overdueMaintenances = $this->vehicle->overdueMaintenances();

        $this->assertCount(2, $overdueMaintenances);
    }

    /** @test */
    public function vehicle_overdue_maintenances_count_returns_correct_number()
    {
        Maintenance::factory()->count(3)->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::yesterday(),
        ]);

        Maintenance::factory()->count(2)->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::tomorrow(),
        ]);

        $this->assertEquals(3, $this->vehicle->overdueMaintenancesCount());
    }

    /** @test */
    public function maintenance_stats_shows_correct_overdue_count()
    {
        $service = app(\App\Services\MaintenanceService::class);

        Maintenance::factory()->count(2)->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::yesterday(),
        ]);

        Maintenance::factory()->count(3)->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::tomorrow(),
        ]);

        $stats = $service->getMaintenanceStats($this->vehicle);

        $this->assertEquals(5, $stats['total_maintenances']);
        $this->assertEquals(2, $stats['overdue_count']);
    }

    /** @test */
    public function get_overdue_maintenances_service_returns_correct_maintenances()
    {
        $service = app(\App\Services\MaintenanceService::class);

        $overdue1 = Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::now()->subDays(10),
        ]);

        $overdue2 = Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::yesterday(),
        ]);

        Maintenance::factory()->create([
            'vehicle_id' => $this->vehicle->id,
            'next_maintenance_date' => Carbon::tomorrow(),
        ]);

        $overdueMaintenances = $service->getOverdueMaintenances($this->vehicle);

        $this->assertCount(2, $overdueMaintenances);
        // Vérifie que les maintenances sont triées par date (plus anciennes en premier)
        $this->assertEquals($overdue1->id, $overdueMaintenances->first()->id);
        $this->assertEquals($overdue2->id, $overdueMaintenances->last()->id);
    }
}
