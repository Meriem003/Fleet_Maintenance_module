<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Authenticate a user and generate an API token.
     *
     * @param array $credentials
     * @param string|null $deviceName
     * @return array
     * @throws ValidationException
     */
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

        // Bonnes pratiques Sanctum : nom descriptif et abilities
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

    /**
     * Logout the authenticated user (delete current token).
     *
     * @param User $user
     * @return void
     */
    public function logout(User $user): void
    {
        // Bonnes pratiques : supprimer uniquement le token actuel
        /** @var \Laravel\Sanctum\PersonalAccessToken|null $token */
        $token = $user->currentAccessToken();
        if ($token) {
            $token->delete();
        }
    }

    /**
     * Logout from all devices (revoke all tokens).
     *
     * @param User $user
     * @return int Number of tokens revoked
     */
    public function logoutFromAllDevices(User $user): int
    {
        return $user->tokens()->delete();
    }

    /**
     * Get all active tokens for a user.
     *
     * @param User $user
     * @return \Illuminate\Support\Collection
     */
    public function getActiveTokens(User $user)
    {
        return $user->tokens()->get();
    }
}
