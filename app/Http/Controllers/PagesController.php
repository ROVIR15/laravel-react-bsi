<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\General\Pages;

class PagesController extends Controller
{
    //
    public function index() {
        $data = Pages::orderBy('id', 'asc')->get();

        return response()->json($data);
    }

    public function store(Request $request){
        $params = $request->all()['payload'];

        try {
            Pages::create([
                'name' => $params['name'],
                'description' => $params['description']
            ]);
        } catch (Throwable $th) {
            //throw $th;
            return response()-json([
                'success' => false,
                'error' => $th->getMessage()
            ]);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
