<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVehicleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $vehicleId = $this->route('vehicle');

        return [
            'plate_number' => [
                'sometimes',
                'string',
                'max:20',
                Rule::unique('vehicles', 'plate_number')->ignore($vehicleId),
            ],
            'model' => 'sometimes|string|max:100',
            'year' => 'sometimes|integer|min:1900|max:' . (date('Y') + 1),
            'status' => 'sometimes|in:active,inactive',
        ];
    }
}
