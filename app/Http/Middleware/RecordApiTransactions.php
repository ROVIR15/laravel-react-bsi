<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use App\LogTable;
use Illuminate\Support\Facades\Auth;

class RecordApiTransactions
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Check if the request method is POST, DELETE, or PUT (UPDATE)
        if (in_array($request->method(), ['POST', 'DELETE', 'PUT'])) {
            $user = Auth::guard('api')->user();
            $level = 'info'; // Set the log level

            $requestData = [
                'level' => $level,
                'method' => strval($request->method()),
                'url' => strval($request->fullUrl()),
                'context' => json_encode($request->all()),
                'user_id' => $user ? $user->id : null,
                'message' => strval($response->status())
            ];

            // Log the API transaction data
            LogTable::create($requestData);
            Log::info('API Transaction', $requestData);
        }

        return $response;
    }
}