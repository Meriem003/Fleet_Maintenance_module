<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{

    public function login(array $credentials, ?string $deviceName = null): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (!$user->isAdmin()) {
            throw ValidationException::withMessages([
                'role' => ['Unauthorized. Admin access only.'],
            ]);
        }

        $tokenName = $deviceName ?? request()->userAgent() ?? 'api-token';
        $token = $user->createToken($tokenName, ['*'], now()->addDays(30))->plainTextToken;

        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
            'expires_at' => now()->addDays(30)->toDateTimeString(),
        ];
    }

    public function logout(User $user): void
    {
        // Bonnes pratiques : supprimer uniquement le token actuel
        /** @var \Laravel\Sanctum\PersonalAccessToken|null $token */
        $token = $user->currentAccessToken();
        if ($token) {
            $token->delete();
        }
    }

    public function logoutFromAllDevices(User $user): int
    {
        return $user->tokens()->delete();
    }

    public function getActiveTokens(User $user)
    {
        return $user->tokens()->get();
    }
}
