<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MaintenanceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'vehicle_id' => $this->vehicle_id,
            'maintenance_type' => $this->maintenance_type,
            'maintenance_date' => $this->maintenance_date?->format('Y-m-d'),
            'next_maintenance_date' => $this->next_maintenance_date?->format('Y-m-d'),
            'cost' => number_format((float) $this->cost, 2, '.', ''),
            'notes' => $this->notes,
            'is_overdue' => $this->isOverdue(),
            'vehicle' => new VehicleResource($this->whenLoaded('vehicle')),
            'created_at' => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}
