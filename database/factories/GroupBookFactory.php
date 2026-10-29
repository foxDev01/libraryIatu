<?php

namespace Database\Factories;

use App\Book;
use App\GroupBook;
use App\GroupName;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GroupBook>
 */
class GroupBookFactory extends Factory
{
    protected $model = GroupBook::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'groupname_id' => GroupName::factory(),
            'book_id' => Book::factory(),
        ];
    }
}
