<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMaintenanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'maintenance_type' => 'required|string|in:oil_change,tires,inspection,brake_service,battery_replacement,other',
            'maintenance_date' => 'required|date|before_or_equal:today',
            'next_maintenance_date' => 'nullable|date|after:maintenance_date',
            'cost' => 'required|numeric|min:0|max:999999.99',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'maintenance_date.before_or_equal' => 'Maintenance date cannot be in the future.',
            'next_maintenance_date.after' => 'Next maintenance must be after the maintenance date.',
            'cost.min' => 'Cost cannot be negative.',
        ];
    }
}
