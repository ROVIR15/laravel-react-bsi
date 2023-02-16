<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\User;

class AuthController extends Controller
{
    /**
     * Login and request access token
     */
    public function login(Request $request)
    {
        $loginValidator = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($loginValidator)) {
            return response()->json([
                'success' => false,
                'error' => 'Invalid credentials'
            ], 401);
        }

        $accessToken = Auth::user()->createToken('auth-token')->accessToken;
        $user = User::where('id', Auth::user()->id)->with('pages', 'role')->first();

        return response()->json([
            'data' => [
              'success' => true,
              'access_token' => $accessToken,
              'user' => $user  
            ]
        ], 200);
    }

    public function register(Request $request){
        $payload = $request->all()['payload'];

        try {
            //code...
            Validator::make($payload, [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);

            User::create([
                'name' => $payload['name'],
                'email' => $payload['email'],
                'password' => Hash::make($payload['password']),
            ]);
        } catch (Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }
        
        return response()->json([
            'success' => true
        ]);
    }

    public function reset($id, Request $request){
        $password = $request->all()['password'];

        try {
            //code...
            User::find($id)->update([
                'password' => Hash::make($password),
            ]);

        } catch (Throwable $th) {
            //throw $th;
            return response()->json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }
        
        return response()->json([
            'success' => true
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->token()->revoke();
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => 'Server problem when trying to revoke token'
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 200);
    }
}
