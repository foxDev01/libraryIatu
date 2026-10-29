<?php

namespace Database\Seeders;

use App\Book;
use App\Direction;
use App\Discipline;
use App\Group;
use App\GroupName;
use App\Type;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LibraryDemoSeeder extends Seeder
{
    /**
     * Seed a small demo dataset for local development.
     */
    public function run(): void
    {
        $direction = Direction::firstOrCreate(['directionname' => 'Информационные технологии']);
        $groupName = GroupName::firstOrCreate(['groupname' => 'АИСТбд-21']);
        $type = Type::firstOrCreate(['typenames' => 'Учебник']);

        $user = User::firstOrCreate(
            ['email' => 'student@example.com'],
            ['name' => 'Иванов Иван', 'password' => Hash::make('password')]
        );

        Group::firstOrCreate([
            'user_id' => $user->id,
        ], [
            'groupname_id' => $groupName->id,
            'direction_id' => $direction->id,
        ]);

        $discipline = Discipline::firstOrCreate(['disciplinename' => 'Базы данных']);
        $group = $user->group()->first();
        $group->disciplines()->syncWithoutDetaching([$discipline->id]);

        $books = collect([
            ['bookname' => 'Базы данных. Учебник', 'link' => 'https://example.com/db.pdf'],
            ['bookname' => 'Проектирование информационных систем', 'link' => 'https://example.com/is.pdf'],
        ])->map(fn (array $attributes) => Book::firstOrCreate(
            ['bookname' => $attributes['bookname']],
            ['link' => $attributes['link'], 'type_id' => $type->id]
        ));

        $groupName->books()->syncWithoutDetaching($books->pluck('id'));
        $discipline->books()->syncWithoutDetaching($books->pluck('id'));
    }
}
