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
            'next_maintenance_date' => [
                'nullable',
                'date',
                function ($attribute, $value, $fail) {
                    if ($value) {
                        $maintenanceDate = $this->input('maintenance_date') ?? $this->route('maintenance')->maintenance_date;
                        if ($value <= $maintenanceDate) {
                            $fail('The next maintenance date must be after the maintenance date.');
                        }
                    }
                },
            ],
            'cost' => 'sometimes|numeric|min:0|max:999999.99',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'maintenance_date.before_or_equal' => 'Maintenance date cannot be in the future.',
            'cost.min' => 'Cost cannot be negative.',
        ];
    }
}
