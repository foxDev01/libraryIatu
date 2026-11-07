<?php

namespace Tests\Feature;

use App\Book;
use App\Discipline;
use App\Group;
use App\GroupName;
use App\Type;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DisciplineTest extends TestCase
{
    use RefreshDatabase;

    public function test_disciplines_endpoint_returns_disciplines_of_the_users_group(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $groupName = GroupName::create(['groupname' => 'АИСТбд-21']);
        $group = Group::create(['user_id' => $user->id, 'groupname_id' => $groupName->id]);

        $otherGroupName = GroupName::create(['groupname' => 'ПИбд-22']);
        $otherGroup = Group::create(['user_id' => $otherUser->id, 'groupname_id' => $otherGroupName->id]);

        $own = Discipline::create(['disciplinename' => 'Базы данных']);
        $foreign = Discipline::create(['disciplinename' => 'Экономика']);

        $group->disciplines()->attach($own);
        $otherGroup->disciplines()->attach($foreign);

        $this->getJson('/api/disciplines')->assertUnauthorized();

        $this->actingAs($user)
            ->getJson('/api/disciplines')
            ->assertOk()
            ->assertExactJson([[
                'id' => $own->id,
                'disciplinename' => 'Базы данных',
            ]]);
    }

    public function test_disciplines_endpoint_returns_empty_list_without_a_group(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/disciplines')
            ->assertOk()
            ->assertExactJson([]);
    }

    public function test_discipline_books_endpoint_returns_only_books_available_to_the_users_group(): void
    {
        $user = User::factory()->create();

        $groupName = GroupName::create(['groupname' => 'АИСТбд-21']);
        $group = Group::create(['user_id' => $user->id, 'groupname_id' => $groupName->id]);

        $discipline = Discipline::create(['disciplinename' => 'Базы данных']);
        $otherDiscipline = Discipline::create(['disciplinename' => 'Экономика']);
        $group->disciplines()->attach([$discipline->id, $otherDiscipline->id]);

        $type = Type::create(['typenames' => 'Учебник']);

        $own = Book::create([
            'bookname' => 'Базы данных. Учебник',
            'link' => 'https://example.com/db.pdf',
            'type_id' => $type->id,
        ]);
        $bookOfDisciplineOnly = Book::create([
            'bookname' => 'Другая книга дисциплины',
            'link' => 'https://example.com/other.pdf',
            'type_id' => $type->id,
        ]);
        $bookOfGroupOnly = Book::create([
            'bookname' => 'Книга группы по другой дисциплине',
            'link' => 'https://example.com/group.pdf',
            'type_id' => $type->id,
        ]);

        $groupName->books()->attach([$own->id, $bookOfGroupOnly->id]);
        $discipline->books()->attach([$own->id, $bookOfDisciplineOnly->id]);
        $otherDiscipline->books()->attach($bookOfGroupOnly->id);

        $this->getJson("/api/disciplines/{$discipline->id}/books")->assertUnauthorized();

        $this->actingAs($user)
            ->getJson("/api/disciplines/{$discipline->id}/books")
            ->assertOk()
            ->assertExactJson([
                'discipline' => [
                    'id' => $discipline->id,
                    'disciplinename' => 'Базы данных',
                ],
                'books' => [[
                    'id' => $own->id,
                    'bookname' => 'Базы данных. Учебник',
                    'link' => 'https://example.com/db.pdf',
                    'type_id' => $type->id,
                    'has_file' => false,
                    'has_cover' => false,
                ]],
            ]);
    }

    public function test_discipline_books_endpoint_hides_disciplines_of_other_groups(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $group = Group::create([
            'user_id' => $user->id,
            'groupname_id' => GroupName::create(['groupname' => 'АИСТбд-21'])->id,
        ]);
        $group->disciplines()->attach(Discipline::create(['disciplinename' => 'Базы данных']));

        $otherGroup = Group::create([
            'user_id' => $otherUser->id,
            'groupname_id' => GroupName::create(['groupname' => 'ПИбд-22'])->id,
        ]);
        $foreign = Discipline::create(['disciplinename' => 'Экономика']);
        $otherGroup->disciplines()->attach($foreign);

        $this->getJson("/api/disciplines/{$foreign->id}/books")->assertUnauthorized();

        $this->actingAs($user)
            ->getJson("/api/disciplines/{$foreign->id}/books")
            ->assertNotFound();
    }
}
