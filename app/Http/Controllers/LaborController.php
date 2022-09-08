<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Party\Labor;
use App\Models\Party\Address;
use App\Models\Party\Person;
use App\Models\Party\Organization;
use App\Models\Party\Party;
use App\Models\Party\PartyRoles;
use App\Models\Party\Relationship;

class LaborController extends Controller
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
      $query = PartyRoles::with('role_type','party')->where('relationship_id', 3)->get();

      return response()->json($query);
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

        $type = Person::create([
          'description' => ''
        ]);

        $parties = Party::create([
          'name' => $param['name'],
          'email' => $param['email'],
          'npwp' => $param['npwp'],
          'person_party_id' => $type['id']
        ]);

        $_pr = PartyRoles::create([
          'party_id' => $parties->id,
          'role_type_id' => $param['role_type_id'],
          'relationship_id' => 3
        ]);

        return response()->json([
          'success' => true,
        ], 200);
      } catch (Exception $th) {

        return response()->json([
          'success' => false,
          'error' => $th
        ]);
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Party  $id -> party_id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      try {
        $data = Party::whereId($id)->with('person', 'organization', 'party_roles', 'address')->get();

        if(!is_array($data) && count($data) === 0) {
            throw new Exception("Not found");
        }

        return response()->json([
          "success" => true,
          "data" => $data[0]
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
        $roles = $param['roles'];

        Party::find($id)->update($party);
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
