<?php

namespace Tests\Feature;

use App\GroupName;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_register_with_a_study_group(): void
    {
        $groupName = GroupName::create(['groupname' => 'АИСТбд-21']);

        $this->postJson('/api/register', [
            'name' => 'Иванов Иван',
            'email' => 'student@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'group_name_id' => $groupName->id,
        ])->assertSuccessful();

        $this->assertDatabaseHas('users', ['email' => 'student@example.com']);

        $user = User::query()->where('email', 'student@example.com')->firstOrFail();

        $this->assertDatabaseHas('groups', [
            'user_id' => $user->id,
            'groupname_id' => $groupName->id,
        ]);

        $this->assertSame('АИСТбд-21', $user->group()->with('groupname')->first()->groupname->groupname);
    }

    public function test_registration_requires_an_existing_group(): void
    {
        GroupName::create(['groupname' => 'АИСТбд-21']);

        $this->postJson('/api/register', [
            'name' => 'Иванов Иван',
            'email' => 'student@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'group_name_id' => 999,
        ])->assertStatus(422);

        $this->assertDatabaseMissing('groups', ['user_id' => null]);
        $this->assertDatabaseCount('groups', 0);
    }

    public function test_registration_is_throttled(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/register', [
                'name' => 'Иванов Иван',
            ])->assertStatus(422);
        }

        $this->postJson('/api/register', [
            'name' => 'Иванов Иван',
        ])->assertStatus(429);
    }

    public function test_group_names_are_listed_for_visitors(): void
    {
        $short = GroupName::create(['groupname' => 'ИВТбд-11']);
        $early = GroupName::create(['groupname' => 'АИСТбд-21']);
        GroupName::create(['groupname' => null]);

        $this->getJson('/api/group-names')->assertOk()->assertExactJson([
            ['id' => $early->id, 'groupname' => 'АИСТбд-21'],
            ['id' => $short->id, 'groupname' => 'ИВТбд-11'],
        ]);
    }

    public function test_a_user_can_log_in_and_log_out(): void
    {
        $user = User::factory()->create([
            'email' => 'student@example.com',
            'password' => 'password',
        ]);

        $this->postJson('/api/login', [
            'email' => 'student@example.com',
            'password' => 'password',
        ], ['Referer' => 'http://localhost/'])->assertSuccessful();

        $this->assertAuthenticatedAs($user);

        $this->postJson('/api/logout', [], ['Referer' => 'http://localhost/'])->assertSuccessful();

        // The auth guard caches its resolved user within a single test run,
        // so assertGuest() may see stale state. The real effect of the
        // logout is a session without the authentication identifier.
        $this->assertNull(
            $this->app->make('session.store')->get(auth()->guard('web')->getName()),
            'The user should no longer be authenticated after logout.'
        );
    }

    public function test_session_endpoint_reports_the_state_of_authentication(): void
    {
        $this->getJson('/api/session')
            ->assertOk()
            ->assertExactJson(['authenticated' => false]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/session')
            ->assertOk()
            ->assertExactJson(['authenticated' => true]);
    }
}
