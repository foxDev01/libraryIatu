<?php

namespace Tests\Feature;

use App\Book;
use App\Direction;
use App\Group;
use App\GroupName;
use App\Type;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BookTest extends TestCase
{
    use RefreshDatabase;

    public function test_books_endpoint_requires_authentication(): void
    {
        $this->getJson('/api/books')->assertUnauthorized();
    }

    public function test_books_endpoint_returns_books_of_the_users_group(): void
    {
        $user = User::factory()->create();

        $direction = Direction::create(['directionname' => 'Информационные технологии']);
        $groupName = GroupName::create(['groupname' => 'АИСТбд-21']);
        Group::create([
            'user_id' => $user->id,
            'groupname_id' => $groupName->id,
            'direction_id' => $direction->id,
        ]);

        $type = Type::create(['typenames' => 'Учебник']);
        $book = Book::create([
            'bookname' => 'Базы данных',
            'link' => 'https://example.com/db.pdf',
            'type_id' => $type->id,
        ]);
        $groupName->books()->attach($book);

        $this->actingAs($user)
            ->getJson('/api/books')
            ->assertOk()
            ->assertJsonCount(1)
            ->assertJsonFragment(['bookname' => 'Базы данных']);
    }

    public function test_books_endpoint_returns_empty_list_without_a_group(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/books')
            ->assertOk()
            ->assertExactJson([]);
    }
}
