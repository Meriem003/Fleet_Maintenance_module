<?php

namespace Database\Seeders;

use App\Models\Maintenance;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class MaintenanceSeeder extends Seeder
{
    /**
     * Exécuter les seeds de la base de données.
     */
    public function run(): void
    {
        $vehicles = Vehicle::all();

        if ($vehicles->isEmpty()) {
            $this->command->warn('Aucun véhicule trouvé. Veuillez exécuter VehicleSeeder en premier.');
            return;
        }

        $maintenances = [
            [
                'vehicle_id' => $vehicles[0]->id,
                'maintenance_type' => 'oil_change',
                'maintenance_date' => Carbon::now()->subMonths(6),
                'next_maintenance_date' => Carbon::now()->subMonths(1),
                'cost' => 250.00,
                'notes' => 'Changement d\'huile et filtre - À REFAIRE URGENT',
            ],
            [
                'vehicle_id' => $vehicles[1]->id,
                'maintenance_type' => 'tires',
                'maintenance_date' => Carbon::now()->subMonths(8),
                'next_maintenance_date' => Carbon::now()->subWeeks(2),
                'cost' => 450.00,
                'notes' => 'Remplacement des 4 pneus - Contrôle nécessaire',
            ],
            [
                'vehicle_id' => $vehicles[2]->id,
                'maintenance_type' => 'inspection',
                'maintenance_date' => Carbon::now()->subMonths(4),
                'next_maintenance_date' => Carbon::now()->subDays(10),
                'cost' => 150.00,
                'notes' => 'Inspection technique expirée',
            ],

            [
                'vehicle_id' => $vehicles[0]->id,
                'maintenance_type' => 'brake_service',
                'maintenance_date' => Carbon::now()->subMonths(2),
                'next_maintenance_date' => Carbon::now()->addMonths(10),
                'cost' => 380.00,
                'notes' => 'Remplacement plaquettes et disques avant',
            ],
            [
                'vehicle_id' => $vehicles[3]->id,
                'maintenance_type' => 'oil_change',
                'maintenance_date' => Carbon::now()->subMonths(1),
                'next_maintenance_date' => Carbon::now()->addMonths(5),
                'cost' => 200.00,
                'notes' => 'Vidange complète avec filtre',
            ],
            [
                'vehicle_id' => $vehicles[4]->id,
                'maintenance_type' => 'battery_replacement',
                'maintenance_date' => Carbon::now()->subWeeks(3),
                'next_maintenance_date' => Carbon::now()->addYears(3),
                'cost' => 500.00,
                'notes' => 'Nouvelle batterie 70Ah installée',
            ],
            [
                'vehicle_id' => $vehicles[1]->id,
                'maintenance_type' => 'inspection',
                'maintenance_date' => Carbon::now()->subDays(15),
                'next_maintenance_date' => Carbon::now()->addMonths(12),
                'cost' => 120.00,
                'notes' => 'Contrôle technique validé',
            ],

            [
                'vehicle_id' => $vehicles[2]->id,
                'maintenance_type' => 'oil_change',
                'maintenance_date' => Carbon::now()->subMonths(3),
                'next_maintenance_date' => Carbon::now()->addMonths(3),
                'cost' => 220.00,
                'notes' => 'Vidange moteur diesel',
            ],
            [
                'vehicle_id' => $vehicles[3]->id,
                'maintenance_type' => 'tires',
                'maintenance_date' => Carbon::now()->subMonths(5),
                'next_maintenance_date' => Carbon::now()->addMonths(7),
                'cost' => 400.00,
                'notes' => 'Remplacement 2 pneus avant',
            ],
            [
                'vehicle_id' => $vehicles[4]->id,
                'maintenance_type' => 'inspection',
                'maintenance_date' => Carbon::now()->subWeeks(2),
                'next_maintenance_date' => Carbon::now()->addMonths(11),
                'cost' => 100.00,
                'notes' => 'Contrôle périodique OK',
            ],

            [
                'vehicle_id' => $vehicles[0]->id,
                'maintenance_type' => 'other',
                'maintenance_date' => Carbon::now()->subMonths(1),
                'next_maintenance_date' => null,
                'cost' => 75.00,
                'notes' => 'Réparation essuie-glace arrière',
            ],
            [
                'vehicle_id' => $vehicles[1]->id,
                'maintenance_type' => 'other',
                'maintenance_date' => Carbon::now()->subWeeks(4),
                'next_maintenance_date' => null,
                'cost' => 50.00,
                'notes' => 'Remplacement ampoule phare',
            ],

            [
                'vehicle_id' => $vehicles[2]->id,
                'maintenance_type' => 'brake_service',
                'maintenance_date' => Carbon::now()->subMonths(7),
                'next_maintenance_date' => Carbon::now()->addMonths(5),
                'cost' => 320.00,
                'notes' => 'Révision système de freinage complet',
            ],
            [
                'vehicle_id' => $vehicles[3]->id,
                'maintenance_type' => 'other',
                'maintenance_date' => Carbon::now()->subDays(20),
                'next_maintenance_date' => null,
                'cost' => 150.00,
                'notes' => 'Réparation climatisation',
            ],
            [
                'vehicle_id' => $vehicles[4]->id,
                'maintenance_type' => 'oil_change',
                'maintenance_date' => Carbon::now()->subWeeks(1),
                'next_maintenance_date' => Carbon::now()->addMonths(6),
                'cost' => 280.00,
                'notes' => 'Première vidange véhicule neuf',
            ],
        ];

        foreach ($maintenances as $maintenance) {
            Maintenance::create($maintenance);
        }

        $this->command->info('✓ 15 maintenances créées (3 en retard, 12 autres)');
    }
}
