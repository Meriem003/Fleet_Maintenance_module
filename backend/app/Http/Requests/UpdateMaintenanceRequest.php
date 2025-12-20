<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMaintenanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'maintenance_type' => 'sometimes|string|in:oil_change,tires,inspection,brake_service,battery_replacement,other',
            'maintenance_date' => 'sometimes|date|before_or_equal:today',
            'next_maintenance_date' => 'nullable|date|after:maintenance_date',
            'cost' => 'sometimes|numeric|min:0|max:999999.99',
            'notes' => 'nullable|string|max:1000',
        ];
    }
}
