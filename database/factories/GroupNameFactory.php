<?php

namespace Database\Factories;

use App\GroupName;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GroupName>
 */
class GroupNameFactory extends Factory
{
    protected $model = GroupName::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'groupname' => 'АИСТбд-'.fake()->numberBetween(10, 99),
        ];
    }
}
