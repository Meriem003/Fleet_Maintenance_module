<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Exécuter les seeds de la base de données.
     */
    public function run(): void
    {
        $vehicles = [
            [
                'plate_number' => 'A-12345-20',
                'model' => 'Toyota Corolla',
                'year' => 2022,
                'status' => 'active',
            ],
            [
                'plate_number' => 'B-67890-19',
                'model' => 'Renault Clio',
                'year' => 2020,
                'status' => 'active',
            ],
            [
                'plate_number' => 'C-54321-21',
                'model' => 'Peugeot 208',
                'year' => 2021,
                'status' => 'inactive',
            ],
            [
                'plate_number' => 'D-11223-18',
                'model' => 'Dacia Logan',
                'year' => 2019,
                'status' => 'active',
            ],
            [
                'plate_number' => 'E-99887-24',
                'model' => 'Hyundai Tucson',
                'year' => 2024,
                'status' => 'active',
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}
