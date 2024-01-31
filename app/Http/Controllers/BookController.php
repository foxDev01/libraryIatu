<?php

namespace App\Http\Controllers;

use App\Book;
use App\Http\Resources\BookResource;
use App\Nova\Group;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
class BookController extends Controller
{
    public function book_by_group_id(Request $request):JsonResponse
    {
        // $group_id_for_user = ( DB::table('groups')
        
        // ->where('user_id', '=', $request->user()->id)
        // ->value('id'));

        $groupname_id_for_user = ( 
                DB::table('groups')
                ->where('user_id', '=', $request->user()->id) 
                ->value('groupname_id'));

        $groupname_id_for_book[] =(
                DB::table ('group_books')
                ->where('groupname_id','=', $groupname_id_for_user )
                ->value('book_id')
        );


        foreach($groupname_id_for_book as $groupname_id_for_book ){
                $bookId= DB::table ('group_books')
                ->where('groupname_id','=', $groupname_id_for_user )
                ->pluck('book_id');   // все id книг у выбранной группы 
                $bookSId[] = $bookId;
                
            }

        foreach ($bookId as $bookId){
                $books= DB::table('books')
                ->where('id', '=', $bookId)
                 // ->pluck('bookname') 
                ->get();
                $book[] = $books;
                  
            }

        return (response()->json($book));
        
        // return response()->json( 
        //     DB::table('books')
        //         ->where('id', '=',  $groupname_id_for_book ) 
        //         ->get()
        //     );  

    }

    public function book_by_discipline(Request $request):JsonResponse
    {
        $group_id = ( DB::table('groups')
        
        ->where('users_id', '=', $request->user()->id)
        ->value('id'));

        // $discipline_id =( DB:: table('disciplines')
        //                 ->value('id'));

        $discipline_id_by_group = (DB:: table('group_disciplines')
        ->where('group_id','=', $group_id)
        ->pluck('discipline_id'));
        
        $discipline_id_by_group_by_book = (DB:: table('discipline_book')
        ->where('discipline_id','=', $group_id)
        ->pluck('discipline_id'));


        return response()->json( 
            DB::table('books')
                ->where('group_id', '=', $group_id ) 
                ->get()
            );  

    }


}
