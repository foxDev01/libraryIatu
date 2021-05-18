<?php

namespace App\Http\Controllers;

use App\Discipline;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DisciplineController extends Controller
{
    public function disciplines(Request $request): JsonResponse
    {
        $group_id = ( 
            DB::table('groups')
                ->where('user_id', '=', $request->user()->id)
                ->value('id'));

        $discipline_id_by_group = (
            DB:: table('group_disciplines')
                ->where('group_id','=', $group_id)
                ->pluck('discipline_id'));


            foreach($discipline_id_by_group as $discipline_id_by_group){
                $disNam = 
                DB::table('disciplines')
                ->where('id', '=', $discipline_id_by_group)
                ->pluck('disciplinename');  //все названия книг у выбранной группы
                // ->get();
                 $discipline_names[] = $disNam;

            }
                 
            return (response()->json($discipline_names));
         
        // return response()->json(Discipline::all());
        // return DisciplineResource::collection(Discipline::get());


    }
}
