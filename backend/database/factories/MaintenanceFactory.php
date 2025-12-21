<?php

namespace Database\Factories;

use App\Models\Maintenance;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Maintenance>
 */
class MaintenanceFactory extends Factory
{
    protected $model = Maintenance::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $maintenanceDate = $this->faker->dateTimeBetween('-1 year', 'now');
        
        return [
            'vehicle_id' => Vehicle::factory(),
            'maintenance_type' => $this->faker->randomElement([
                'oil_change',
                'tires',
                'inspection',
                'brake_service',
                'battery_replacement',
                'other',
            ]),
            'maintenance_date' => $maintenanceDate,
            'next_maintenance_date' => $this->faker->optional(0.8)->dateTimeBetween(
                $maintenanceDate,
                '+6 months'
            ),
            'cost' => $this->faker->randomFloat(2, 50, 1000),
            'notes' => $this->faker->optional(0.6)->sentence(),
        ];
    }

    public function overdue(): static
    {
        return $this->state(fn (array $attributes) => [
            'next_maintenance_date' => $this->faker->dateTimeBetween('-30 days', '-1 day'),
        ]);
    }

    public function upcoming(): static
    {
        return $this->state(fn (array $attributes) => [
            'next_maintenance_date' => $this->faker->dateTimeBetween('+1 day', '+60 days'),
        ]);
    }

    public function noNextDate(): static
    {
        return $this->state(fn (array $attributes) => [
            'next_maintenance_date' => null,
        ]);
    }
}
