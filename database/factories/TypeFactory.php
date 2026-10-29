<?php

namespace Database\Factories;

use App\Type;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Type>
 */
class TypeFactory extends Factory
{
    protected $model = Type::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'typenames' => fake()->randomElement(['Учебник', 'Учебное пособие', 'Методические указания']),
        ];
    }
}
