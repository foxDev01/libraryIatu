<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_user_can_register(): void
    {
        $this->postJson('/api/register', [
            'name' => 'Иванов Иван',
            'email' => 'student@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertSuccessful();

        $this->assertDatabaseHas('users', ['email' => 'student@example.com']);
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
        ])->assertSuccessful();

        $this->assertAuthenticatedAs($user);

        $this->postJson('/api/logout')->assertSuccessful();

        $this->assertGuest();
    }

    public function test_user_endpoint_returns_the_authenticated_user_name(): void
    {
        $user = User::factory()->create(['name' => 'Иванов Иван']);

        $response = $this->actingAs($user)->getJson('/api/user')->assertOk();

        $this->assertSame('Иванов Иван', $response->json());
    }

    public function test_session_endpoint_reports_a_guest_as_unauthenticated(): void
    {
        $this->getJson('/api/session')
            ->assertOk()
            ->assertExactJson(['authenticated' => false]);
    }

    public function test_session_endpoint_reports_an_authenticated_user(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/session')
            ->assertOk()
            ->assertExactJson(['authenticated' => true]);
    }
}
