<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Exécuter tous les seeders de la base de données.
     * Ordre d'exécution important pour respecter les contraintes de clés étrangères.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,      // 1. Créer les utilisateurs
            VehicleSeeder::class,   
            MaintenanceSeeder::class, // 3. Créer les maintenances (dépend des véhicules)
        ]);

        $this->command->info('✓ Toutes les données de test ont été insérées avec succès!');
    }
}
