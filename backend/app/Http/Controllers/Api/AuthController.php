<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        protected AuthService $authService
    ) {}

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'nullable|string|max:255',
        ]);

        $result = $this->authService->login(
            $request->only(['email', 'password']),
            $request->input('device_name')
        );

        return response()->json($result);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    public function logoutFromAllDevices(Request $request): JsonResponse
    {
        $count = $this->authService->logoutFromAllDevices($request->user());

        return response()->json([
            'message' => "Logged out from {$count} device(s) successfully",
            'tokens_revoked' => $count,
        ]);
    }

    public function tokens(Request $request): JsonResponse
    {
        $tokens = $this->authService->getActiveTokens($request->user());

        return response()->json([
            'tokens' => $tokens->map(function ($token) {
                return [
                    'id' => $token->id,
                    'name' => $token->name,
                    'created_at' => $token->created_at,
                    'last_used_at' => $token->last_used_at,
                    'expires_at' => $token->expires_at,
                ];
            }),
        ]);
    }
}
