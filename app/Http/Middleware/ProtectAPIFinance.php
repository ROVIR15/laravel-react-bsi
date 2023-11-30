<?php

namespace App\Http\Middleware;

use Closure;

class ProtectAPIFinance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    // private $keys = "syscmr5J7Igy4FbEFrQMy7Al.M9JJrp32hwvpYYFuqxcim9D8.MU2QR8dPDTWSPRsekVOHbLEF.J3SNKHGcSEphtxiVAAx5GKz1.U7YqjfrW0INzTBjVzgNqhg6X.TfAyDzzx9LOz2F53yiMrx2hR.foBjGjA7B3nkwOChLiTkfQEC.AZOWAzJdW06Cu7rN54Ii0B9I.k4wlqY9ceX7CNKU4zajhridh.eUSW77BlUq1TIaJM5YFZPcsm";    
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');

        if (!$token || !($this->isValidToken($token))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }

    private function isValidToken($token)
    {
        // Your token validation logic here
        // Verify the token against your authentication service/database
        // Example: check if the token is valid in your database or using JWT validation

        // Replace this with your actual token validation logic
        // For example, using JWT
        // $decodedToken = JWTAuth::parseToken()->authenticate();

        // For demonstration, assuming the token is valid
        $keys = env('KEYS_API_FINANCE');

        if ($token === ('Bearer ' . $keys)){
            return true;
        } else {
            return false;
        }
    }
}
