<?php

namespace App\Http\Controllers;



use Exception;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Party\Address;
use App\Models\Party\Person;
use App\Models\Party\Organization;
use App\Models\Party\Party;
use App\Models\Party\PartyRoles;
use App\Models\Party\Relationship;

use App\Http\Resources\Party\BuyerCollection;

class BuyerController extends Controller
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
      $query = PartyRoles::with('party', 'role_type', 'relationship')->where('relationship_id', 1)->get();

      return response()->json($query);
    //   return new BuyerCollection($query);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $param = $request->all()['payload'];
      
      try {

        $parties;
        $type;

        if ($param['type'] === "Person") {
          $type = Person::create([
            'description' => ''            
          ]);
          
          if(!$type['id']) return response()->json(['here' => 'not found id']);

          $parties = Party::create([
            'name' => $param['name'],
            'email' => $param['email'],
            'npwp' => $param['npwp'],
            'person_party_id' => $type['id']
          ]);
        } 

        if ($param['type'] === "Organization") {
          $type = Organization::create([
            'description' => ''
          ]);

          if(!$type['id']) return response()->json(['here' => 'not found id']);

          $parties = Party::create([
            'name' => $param['name'],
            'email' => $param['email'],
            'npwp' => $param['npwp'],
            'organization_party_id' => $type->id
          ]);
        }

        $_pr = PartyRoles::create([
          'party_id' => $parties['id'],
          'role_type_id' => $param['role_type_id'],
          'relationship_id' => 1
        ]);

        $_addr = Address::create([
          'party_id' => $parties['id'],
          'street' => $param['address']['street'],
          'city' => $param['address']['city'],
          'province' => $param['address']['province'],
          'country' => $param['address']['country'],
          'postal_code' => $param['address']['postal_code']
        ]);

        return response()->json([
          'success' => true,
          'type' => $type['id']
        ], 200);
      } catch (Exception $th) {

        return response()->json([
          'success' => false,
          'errors' => $th->getMessage()
        ]);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      try {
        $data = Party::where('id', $id)->with('party_roles', 'address', 'organization', 'person')->get()[0];

        return response()->json([
          "success" => true,
          "data" => $data
        ]);

      } catch (Exception $th) {
        return response()->json([
          "success" => false,
          "error" => $th->getMessage()
        ], 500);
      }
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
        try {
            //code...
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\X  $X
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
      $param = $request->all()['payload'];
      try {
        $party = $param['party_info'];
        $address = $param['address'];
        $roles = $param['roles'];

        Party::find($id)->update($party);
        Address::where('party_id', $id)->update($address);
        PartyRoles::where('party_id', $id)->update($roles);

        return response()->json([
          'success' => true
        ]);
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'err' => $th->getMessage()
        ], 500);
      }
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
        $existingData = Party::find($id);

        // Turn organization and person id on Party table into NULL
        $existingData->update([
          'organization_party_id' => NULL,
          'person_party_id' => NULL
        ]);

        // Turn party_id on Address Table into NULL
        $selectedAddressByPartyId = Address::where('party_id', $id);
        $selectedAddressByPartyId->update([
          'party_id' => NULL
        ]);

        // Delete Address
        $selectedAddressByPartyId->delete();

        // Drop Party Roles records by party_id
        $selectedPartyRolesByPartyId = PartyRoles::where('party_id', $id);
        $selectedPartyRolesByPartyId->update([
          'party_id' => NULL
        ]);
        
        $selectedPartyRolesByPartyId->delete();

        $existingData->delete();
      } catch (Exception $th) {
        return response()->json([
          'success' => false,
          'err' => $th->getMessage()
        ], 500);
      }
      
      return response()->json([
        'success' => true
      ]);
    }
}
