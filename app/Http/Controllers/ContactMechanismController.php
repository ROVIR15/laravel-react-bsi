<?php

namespace App\Http\Controllers;

use Exception;

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
            'contact_mechanism_type_id' => $payload['type']
        ]);

        $haha = PartyHasContactMechanism::create([
            'party_id' => $payload['party_id'],
            'contact_mechanism_id' => $_newCM['id']
        ]);

        // type 1 - postal address
        if($payload['type'] === 3) {
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
        if($payload['type'] === 1) {
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
        'success'=> $haha
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
     * Update the specified resource in storage
     */
    public function update_postal_address($id, Request $request)
    {
      $param = $request->all()['payload'];

      try {
        PostalAddress::find($id)->update($param);
      } catch (\Throwable $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
      ]);
    }

    /**
     * Update the specified resource in storage
     */
    public function update_email($id, Request $request)
    {
      $param = $request->all()['payload'];

      try {
        Email::find($id)->update($param);
      } catch (\Throwable $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
      ]);
    }

    //
    public function update_flag_contact_mechanism($id, Request $request)
    {
      $param = $request->all()['payload'];
      $contact_mechanism = $request->query('contact_mechanism');
      $type = $request->query('type');
      $party = $request->query('party');

      try {
        //code...
        if($type === "1")
        {
          // Update data related with id;
          TelecommunicationNumber::find($id)->update($param);

          // if there is update on flag
          if(isset($param['flag']))
          {
            $phcm = PartyHasContactMechanism::select('contact_mechanism_id')
                    ->whereHas('contact_mechanism', function ($query) use ($type){
                      $query->where('contact_mechanism_type_id', $type);
                    })
                    ->where('party_id', $party)
                    ->get();
            
            return response()->json($phcm);
            // TelecommunicationNumber::whereIn('contact_mechanism_id' $phcm);
          }
        }

        if($type === "2")
        {
          Email::find($id)->update($param);
        }

        if($type === "3")
        {
          PostalAddress::find($id)->update($param);
        }
        
        else {
          throw new Exception("Error Processing Request", 500);
        }

      } catch (\Throwable $th) {
        //throw $th;

        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }
    }

    /**
     * Update the specified resource in storage
     */
    public function update_telecommunication_number($id, Request $request)
    {
      $param = $request->all()['payload'];

      try {
        TelecommunicationNumber::find($id)->update($param);
      } catch (\Throwable $th) {
        return response()->json([
          'success' => false,
          'error' => $th->getMessage()
        ]);
      }

      return response()->json([
        'success' => true,
      ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
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
