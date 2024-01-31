<?php

namespace Database\Factories;

use App\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'bookname' => $this->faker->name,
            'link'=> $this->faker->imageUrl(),
            'type_id'=>$this->faker->numberBetween(1, 6)
        ];
    }
}
