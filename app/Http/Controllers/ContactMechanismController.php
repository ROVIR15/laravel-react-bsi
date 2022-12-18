<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Party\ContactMechanism;
use App\Models\Party\ContactMechanismType;
use App\Models\Party\ContactMechanismHasPostalAddress;
use App\Models\Party\ContactMechanismHasEmail;
use App\Models\Party\ContactMechanismHasTelecommunicationNumber;
use App\Models\Party\PostalAddress;
use App\Models\Party\Email;
use App\Models\Party\TelecommunicationNumber;
use App\Models\Party\PartyHasContactMechanism;

class ContactMechanismController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
      $param = $request->all();

      try {
          //code...
          $query = ContactMechanism::with('has_postal_address',
          'has_email',
          'has_telecommunication_number')->get();

      } catch (\Throwable $th) {
          //throw $th;
          return response()->json([
            'success' => false,
            'error' => $th->getMessage()
          ]);
      }

      return response()->json([
        'data' => $query
      ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $payload = $request->all()['payload'];

      try {

        // Create Contact Mechanism First
        $_newCM = ContactMechanism::create([
            'contact_mechanism_type_id' => $payload['contact_mechanism_type_id']
        ]);

        PartyHasContactMechanism::create([
            'party_id' => $payload['party_id'],
            'contact_mechanism_id' => $_newCM['id']
        ]);

        // type 1 - postal address
        if($payload['type'] === 1) {
            $_newPA = PostalAddress::create([
                'street' => $payload['street'],
                'contact_mechanism_id' => $_newCM['id'],
                'city' => $payload['city'],
                'province' => $payload['province'],
                'country' => $payload['country'],
                'postal_code' => $payload['postal_code']     
            ]);
        }

        // type 2 - email
        if($payload['type'] === 2) {
            $_newEmail = Email::create([
                'contact_mechanism_id' => $_newCM['id'],
                'name' => $payload['name']
            ]);
        }

        // type 3 - telecommunication number
        if($payload['type'] === 3) {
            $_newTN = TelecommunicationNumber::create([
                'contact_mechanism_id' => $_newCM['id'],
                'number' => $payload['number']
            ]);
        }

        // else {
        //     throw new Error('Please defined the type of contact mechanism');
        // }

      } catch (Exception $th) {
        return response()->json([
          'success'=> false,
          'errors' => $th->getMessage()
        ], 500);
      }

      return response()->json([
        'success'=> true
      ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        try {
            //code...
            $query = ContactMechanism::with('has_postal_address',
            'has_email',
            'has_telecommunication_number')->find(id);
  
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
              'success' => false,
              'error' => $th->getMessage()
            ]);
        }
  
        return response()->json([
          'data' => $query
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function edit(X $x)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, X $x)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
      try {
          //code...
          $query = ContactMechanism::find($id)->delete();

      } catch (\Throwable $th) {
          //throw $th;
          return response()->json([
            'success' => false,
            'error' => $th->getMessage()
          ]);
      }

      return response()->json([
        'data' => $query
      ]);
    }
}
