<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('plate_number')->unique()->comment('Numéro d\'immatriculation unique');
            $table->string('model')->comment('Modèle du véhicule');
            $table->year('year')->comment('Année de fabrication');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Statut du véhicule');
            $table->timestamps();
            $table->softDeletes()->comment('Suppression douce pour archivage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
