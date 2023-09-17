<?php

namespace App\Http\Middleware;

use Closure;
use App\LogTable;
use App\Models\General\PagesAccess;
use App\Notification;
use Illuminate\Support\Facades\Auth;

class NotificationLogger
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Reponse from next
        $response = $next($request);

        // Get the route name
        $routeName = (string)$request->route()->getName();

        $routePart = explode('.', $routeName)[0];

        // Check if the request method is POST, DELETE, or PUT (UPDATE)
        if (in_array($request->method(), ['POST'])) {
            if (in_array($routePart, ['sales-order', 'purchase-order'])) {
                if ($response->status() === 200) {
                    $responseBody = $response->getContent();
                    $responseData = json_decode($responseBody);

                    $user_list = PagesAccess::whereIn('pages_id', [1, 8])
                        ->groupBy('users_id')
                        ->get()
                        ->map(function ($item) {
                            return $item->users_id;
                        });

                    foreach ($user_list as $user_id) {
                        Notification::create([
                            'user_id' => $user_id,
                            'title' => $responseData->title,
                            'message' => $responseData->message,
                            'is_read' => false,
                            'link' => $responseData->link
                        ]);
                    }
                }
            } else if (in_array($routePart, ['quote', 'request-for-quotation'])) {
                if ($response->status() === 200) {
                    $param = $request->all()['payload'];

                    $responseBody = $response->getContent();
                    $responseData = json_decode($responseBody);

                    $user_list = [];

                    if ($param['quote_type'] === 'PO') {
                        $user_list = PagesAccess::where('pages_id', 8)
                            ->groupBy('users_id')
                            ->get()
                            ->map(function ($item) {
                                return $item->users_id;
                            });
                    } else if ($param['quote_type'] === 'SO') {
                        $user_list = PagesAccess::where('pages_id', 1)
                            ->groupBy('users_id')
                            ->get()
                            ->map(function ($item) {
                                return $item->users_id;
                            });
                    } else {
                        $user_list = [];
                    }

                    if (count($user_list)) {
                        foreach ($user_list as $user_id) {
                            Notification::create([
                                'user_id' => $user_id,
                                'title' => $responseData->title,
                                'message' => $responseData->message,
                                'is_read' => false,
                                'link' => $responseData->link
                            ]);
                        }
                    }
                }
            } else if (in_array($routePart, ['material-transfer', 'material-transfer-realisation'])) {
                if ($response->status() === 200) {
                    $responseBody = $response->getContent();
                    $responseData = json_decode($responseBody);

                    $user_list = PagesAccess::where('pages_id', 4)
                        ->groupBy('users_id')
                        ->get()
                        ->map(function ($item) {
                            return $item->users_id;
                        });

                    foreach ($user_list as $user_id) {
                        Notification::create([
                            'user_id' => $user_id,
                            'title' => $responseData->title,
                            'message' => $responseData->message,
                            'is_read' => false,
                            'link' => $responseData->link
                        ]);
                    }
                }
            } else if (in_array($routePart, ['shipment'])) {
                if ($response->status() === 200) {
                    $responseBody = $response->getContent();
                    $responseData = json_decode($responseBody);

                    $user_list = PagesAccess::whereIn('pages_id', [4, 19])
                        ->groupBy('users_id')
                        ->get()
                        ->map(function ($item) {
                            return $item->users_id;
                        });

                    foreach ($user_list as $user_id) {
                        Notification::create([
                            'user_id' => $user_id,
                            'title' => $responseData->title,
                            'message' => $responseData->message,
                            'is_read' => false,
                            'link' => $responseData->link
                        ]);
                    }
                }
            } else if (in_array($routePart, ['kite-export', 'kite-import', 'scrap', 'costing', 'bom'])) {
                if ($response->status() === 200) {
                    $responseBody = $response->getContent();
                    $responseData = json_decode($responseBody);

                    $user_list = PagesAccess::whereIn('pages_id', [4, 19])
                        ->groupBy('users_id')
                        ->get()
                        ->map(function ($item) {
                            return $item->users_id;
                        });

                    foreach ($user_list as $user_id) {
                        Notification::create([
                            'user_id' => $user_id,
                            'title' => $responseData->title,
                            'message' => $responseData->message,
                            'is_read' => false,
                            'link' => $responseData->link
                        ]);
                    }
                }
            } else if (in_array($routePart, ['costing', 'bom'])) {
                if ($response->status() === 200) {
                    $responseBody = $response->getContent();
                    $responseData = json_decode($responseBody);

                    $user_list = PagesAccess::where('pages_id', 3)
                        ->groupBy('users_id')
                        ->get()
                        ->map(function ($item) {
                            return $item->users_id;
                        });

                    foreach ($user_list as $user_id) {
                        Notification::create([
                            'user_id' => $user_id,
                            'title' => $responseData->title,
                            'message' => $responseData->message,
                            'is_read' => false,
                            'link' => $responseData->link
                        ]);
                    }
                }
            } else {
                if ($response->status() === 200) {
                    $responseBody = $response->getContent();
                    $responseData = json_decode($responseBody);

                    $user_list = PagesAccess::where('pages_id', 4)
                        ->groupBy('users_id')
                        ->get()
                        ->map(function ($item) {
                            return $item->users_id;
                        });

                    foreach ($user_list as $user_id) {
                        Notification::create([
                            'user_id' => $user_id,
                            'title' => $routeName,
                            'message' => strval($request->route()->getName()),
                            'is_read' => false,
                            'link' => '$responseData->link'
                        ]);
                    }
                }
            }
        }

        return $response;
    }
}
