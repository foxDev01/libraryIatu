<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class GroupController extends Controller
{
    public function group_by_id(Request $request): JsonResponse
    {
        $grupname_id = ( 
            DB::table('groups')
                ->where('user_id', '=', $request->user()->id) 
                ->value('groupname_id')
                
            );  
        return response()->json( 
            DB::table('group_names')
                ->where('id', '=',  $grupname_id) 
                ->value('groupname')
                
            );            
    }
}
    
