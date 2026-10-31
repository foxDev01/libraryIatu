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

    public function test_group_endpoint_reports_the_users_group_name_or_null(): void
    {
        $user = User::factory()->create();
        $groupName = GroupName::create(['groupname' => 'АИСТбд-21']);
        $direction = Direction::create(['directionname' => 'Информационные технологии']);

        $this->actingAs($user)
            ->getJson('/api/groups')
            ->assertOk()
            ->assertExactJson(['groupname' => null]);

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
