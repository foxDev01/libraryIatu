<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


use App\Question;
use Illuminate\Http\JsonResponse;

class QuestionController extends Controller
{
     
    public function childrens_by_id(Request $request): JsonResponse
    {        
        
            return response()->json(
                DB::table('questions')
                    ->where('user_id', '=', $request->user()->id)
                    ->orderBy('title', 'ASC')
                    ->get()
            );
        
    }

    public function create(Request $request)
    {
        $idea = new Question;
       
            $id = $idea->create([
                'title' => '- Новый вопрос',
                'content' => '-',
                'user_id' => $request->user()->id,
            ])->id;
        
        return $id;
    }

    public function update(Request $request)
    {
        Question::where([
            ['id','=', $request->id],
            ['user_id', '=', $request->user()->id]
        ])->update([
            'title' => ($request->title),
            'content' => ($request->content),
        ]);
        return ;
    }

    public function destroy(Request $request)
    {        
        DB::delete('delete from questions where id = ?',[$request->id]);
        $id = DB::table('questions')
            ->where([
                ['id', '=', $request->id],
                ['user_id', '=', $request->user()->id]
            ])
            ->first()
            ->id;
        if(!is_null($id))
        {
            return $id;
        }
        else
        {
            return 0;
        }
    }
}
