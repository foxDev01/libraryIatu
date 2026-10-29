<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateQuestionRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Return the questions created by the authenticated user.
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()
                ->questions()
                ->latest('updated_at')
                ->get()
        );
    }

    /**
     * Create an empty question for the authenticated user.
     */
    public function store(Request $request): JsonResponse
    {
        $question = $request->user()->questions()->create([
            'title' => 'Новый вопрос',
            'content' => '-',
        ]);

        return response()->json($question, 201);
    }

    /**
     * Update a question that belongs to the authenticated user.
     */
    public function update(UpdateQuestionRequest $request, int $id): JsonResponse
    {
        $question = $request->user()
            ->questions()
            ->findOrFail($id);

        $question->update($request->validated());

        return response()->json($question);
    }

    /**
     * Delete a question that belongs to the authenticated user.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $question = $request->user()
            ->questions()
            ->findOrFail($id);

        $question->delete();

        return response()->json(null, 204);
    }
}
