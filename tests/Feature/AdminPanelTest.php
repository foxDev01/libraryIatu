<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_panel_is_restricted_to_administrators(): void
    {
        $user = User::factory()->create();
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($user)->get('/admin')->assertForbidden();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertOk()
            ->assertSee('Инфопанель');
    }

    public function test_regular_user_cannot_access_filament_resources(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/admin/users')
            ->assertForbidden();
    }
}
