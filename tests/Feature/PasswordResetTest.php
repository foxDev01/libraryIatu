<?php

namespace Tests\Feature;

use App\User;
use Filament\Auth\Notifications\ResetPassword as PanelResetPassword;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_guest_can_request_a_password_reset_link(): void
    {
        Notification::fake();

        $user = User::factory()->create(['email' => 'student@example.com']);

        $this->postJson('/api/forgot-password', ['email' => 'student@example.com'])
            ->assertOk()
            ->assertJson(['message' => trans('passwords.sent')]);

        Notification::assertSentTo($user, ResetPassword::class);
    }

    public function test_the_response_does_not_reveal_whether_an_email_is_registered(): void
    {
        Notification::fake();

        $this->postJson('/api/forgot-password', ['email' => 'nobody@example.com'])
            ->assertOk()
            ->assertJson(['message' => trans('passwords.sent')]);

        Notification::assertNothingSent();
    }

    public function test_the_reset_letter_links_to_the_spa_page(): void
    {
        $user = User::factory()->create(['email' => 'student@example.com']);

        /** @var MailMessage $message */
        $message = (new ResetPassword('secret-token'))->toMail($user);

        $this->assertSame('Восстановление пароля', $message->subject);
        $this->assertSame('Сбросить пароль', $message->actionText);
        $this->assertStringContainsString(
            '/reset-password?token=secret-token&email=student%40example.com',
            (string) $message->actionUrl,
        );
    }

    /**
     * Письмо администратору из панели Filament должно вести на страницу сброса
     * панели, а не на SPA: Filament подставляет собственный url уведомления.
     */
    public function test_the_admin_panel_reset_letter_keeps_the_panel_url(): void
    {
        $user = User::factory()->create(['email' => 'admin@example.com']);

        $notification = new PanelResetPassword('secret-token');
        $notification->url = 'http://localhost/admin/password-reset/reset?token=secret-token';

        /** @var MailMessage $message */
        $message = $notification->toMail($user);

        $this->assertSame(
            'http://localhost/admin/password-reset/reset?token=secret-token',
            $message->actionUrl,
        );
    }

    public function test_a_guest_can_reset_the_password_with_a_valid_token(): void
    {
        $user = User::factory()->create(['email' => 'student@example.com']);
        $token = Password::broker('users')->createToken($user);

        $this->postJson('/api/reset-password', [
            'token' => $token,
            'email' => 'student@example.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])->assertOk()->assertJson(['message' => trans('passwords.reset')]);

        $this->assertTrue(Hash::check('new-password-123', $user->fresh()->password));

        // Ссылка одноразовая: повторный сброс тем же токеном отклоняется.
        $this->postJson('/api/reset-password', [
            'token' => $token,
            'email' => 'student@example.com',
            'password' => 'another-password-123',
            'password_confirmation' => 'another-password-123',
        ])->assertStatus(422)->assertJsonValidationErrors('email');

        $this->assertTrue(Hash::check('new-password-123', $user->fresh()->password));
    }

    public function test_password_reset_rejects_a_broken_request(): void
    {
        $user = User::factory()->create(['email' => 'student@example.com']);
        $originalPassword = $user->password;

        // Токен не найден/просрочен — ошибка на поле email с русским текстом.
        $invalidToken = $this->postJson('/api/reset-password', [
            'token' => 'wrong-token',
            'email' => 'student@example.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ]);

        $invalidToken->assertStatus(422)->assertJsonValidationErrors('email');
        $this->assertSame(trans('passwords.token'), $invalidToken->json('errors.email.0'));

        // Новый пароль короче минимальной длины.
        $token = Password::broker('users')->createToken($user);

        $this->postJson('/api/reset-password', [
            'token' => $token,
            'email' => 'student@example.com',
            'password' => 'short',
            'password_confirmation' => 'short',
        ])->assertStatus(422)->assertJsonValidationErrors('password');

        // Без токена запрос вообще не проходит.
        $this->postJson('/api/reset-password', [
            'email' => 'student@example.com',
            'password' => 'new-password-123',
            'password_confirmation' => 'new-password-123',
        ])->assertStatus(422)->assertJsonValidationErrors('token');

        $this->assertSame($originalPassword, $user->fresh()->password);
    }

    public function test_password_reset_requests_are_throttled(): void
    {
        Notification::fake();

        for ($i = 0; $i < 6; $i++) {
            $this->postJson('/api/forgot-password', ['email' => 'student@example.com'])
                ->assertOk();
        }

        $this->postJson('/api/forgot-password', ['email' => 'student@example.com'])
            ->assertStatus(429);
    }
}
