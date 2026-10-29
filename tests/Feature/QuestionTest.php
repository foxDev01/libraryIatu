<?php

namespace Tests\Feature;

use App\Question;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QuestionTest extends TestCase
{
    use RefreshDatabase;

    public function test_questions_require_authentication(): void
    {
        $this->getJson('/api/questions')->assertUnauthorized();
        $this->postJson('/api/questions')->assertUnauthorized();
    }

    public function test_a_user_can_create_a_question(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/questions')
            ->assertCreated()
            ->assertJsonPath('title', 'Новый вопрос');

        $this->assertDatabaseCount('questions', 1);
    }

    public function test_a_user_sees_only_own_questions(): void
    {
        $user = User::factory()->create();
        $other = User::factory()->create();

        Question::create([
            'title' => 'Свой вопрос',
            'content' => 'Мой текст',
            'user_id' => $user->id,
        ]);

        Question::create([
            'title' => 'Чужой вопрос',
            'content' => 'Чужой текст',
            'user_id' => $other->id,
        ]);

        $this->actingAs($user)
            ->getJson('/api/questions')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonPath('0.title', 'Свой вопрос');
    }

    public function test_a_user_can_update_own_question(): void
    {
        $user = User::factory()->create();
        $question = Question::create([
            'title' => 'Старый заголовок',
            'content' => 'Старый текст',
            'user_id' => $user->id,
        ]);

        $this->actingAs($user)
            ->putJson("/api/questions/{$question->id}", [
                'title' => 'Новый заголовок',
                'content' => 'Новый текст',
            ])
            ->assertOk()
            ->assertJsonPath('title', 'Новый заголовок');

        $this->assertDatabaseHas('questions', [
            'id' => $question->id,
            'title' => 'Новый заголовок',
            'content' => 'Новый текст',
        ]);
    }

    public function test_a_user_cannot_update_a_question_of_another_user(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();

        $question = Question::create([
            'title' => 'Чужой вопрос',
            'content' => 'Чужой текст',
            'user_id' => $owner->id,
        ]);

        $this->actingAs($other)
            ->putJson("/api/questions/{$question->id}", [
                'title' => 'Взлом',
                'content' => 'Взлом',
            ])
            ->assertNotFound();

        $this->assertDatabaseHas('questions', [
            'id' => $question->id,
            'title' => 'Чужой вопрос',
        ]);
    }

    public function test_update_validates_the_payload(): void
    {
        $user = User::factory()->create();
        $question = Question::create([
            'title' => 'Заголовок',
            'content' => 'Текст',
            'user_id' => $user->id,
        ]);

        $this->actingAs($user)
            ->putJson("/api/questions/{$question->id}", ['title' => ''])
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['title', 'content']);
    }

    public function test_a_user_can_delete_own_question(): void
    {
        $user = User::factory()->create();
        $question = Question::create([
            'title' => 'Заголовок',
            'content' => 'Текст',
            'user_id' => $user->id,
        ]);

        $this->actingAs($user)
            ->deleteJson("/api/questions/{$question->id}")
            ->assertNoContent();

        $this->assertDatabaseMissing('questions', ['id' => $question->id]);
    }

    public function test_a_user_cannot_delete_a_question_of_another_user(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();

        $question = Question::create([
            'title' => 'Чужой вопрос',
            'content' => 'Чужой текст',
            'user_id' => $owner->id,
        ]);

        $this->actingAs($other)
            ->deleteJson("/api/questions/{$question->id}")
            ->assertNotFound();

        $this->assertDatabaseHas('questions', ['id' => $question->id]);
    }

    public function test_questions_cannot_be_created_with_a_get_request(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/questions/create')
            ->assertNotFound();

        $this->assertDatabaseCount('questions', 0);
    }
}
