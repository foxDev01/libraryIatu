<?php

namespace Database\Factories;

use App\Book;
use App\Type;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bookname' => fake()->sentence(3),
            'link' => fake()->url(),
            'type_id' => Type::factory(),
        ];
    }
}
