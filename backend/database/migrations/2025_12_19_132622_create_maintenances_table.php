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
        Schema::create('maintenances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')
                ->constrained('vehicles')
                ->onDelete('cascade')
                ->comment('Référence vers le véhicule');
            $table->enum('maintenance_type', [
                'oil_change',
                'tires',
                'inspection',
                'brake_service',
                'battery_replacement',
                'other'
            ])->comment('Type de maintenance effectuée');
            $table->date('maintenance_date')->comment('Date de la maintenance');
            $table->date('next_maintenance_date')->nullable()->comment('Date prévue pour la prochaine maintenance');
            $table->decimal('cost', 10, 2)->comment('Coût de la maintenance en dirhams');
            $table->text('notes')->nullable()->comment('Notes et observations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenances');
    }
};
