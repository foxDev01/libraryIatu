<?php

namespace Tests\Feature;

use App\Direction;
use App\Group;
use App\GroupName;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GroupTest extends TestCase
{
    use RefreshDatabase;

    public function test_group_endpoint_returns_null_without_a_group(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/groups')
            ->assertOk()
            ->assertExactJson(['groupname' => null]);
    }

    public function test_group_endpoint_returns_the_group_name(): void
    {
        $user = User::factory()->create();
        $groupName = GroupName::create(['groupname' => 'АИСТбд-21']);
        $direction = Direction::create(['directionname' => 'Информационные технологии']);

        Group::create([
            'user_id' => $user->id,
            'groupname_id' => $groupName->id,
            'direction_id' => $direction->id,
        ]);

        $this->actingAs($user)
            ->getJson('/api/groups')
            ->assertOk()
            ->assertExactJson(['groupname' => 'АИСТбд-21']);
    }
}
