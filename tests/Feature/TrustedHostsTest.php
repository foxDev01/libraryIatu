<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Mail\Transport\ArrayTransport;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class TrustedHostsTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        // Доверенные хосты статичны в Symfony Request: чистим, чтобы запросы
        // следующих тестов не наследовали настройки этого.
        Request::setTrustedHosts([]);

        parent::tearDown();
    }

    public function test_a_password_reset_request_from_a_foreign_host_is_rejected(): void
    {
        // В local и testing Laravel намеренно не включает проверку хостов,
        // поэтому эмулируем production — там middleware работает.
        $this->app['env'] = 'production';

        User::factory()->create(['email' => 'student@example.com']);

        // Absolute URL: Symfony Request::create берёт HTTP_HOST из него, а не
        // из отдельного заголовка Host.
        $this->postJson(
            'http://evil.example.com/api/forgot-password',
            ['email' => 'student@example.com'],
        )->assertStatus(400);

        // Письмо не сформировано: ссылка со злым хостом никуда не ушла.
        $transport = Mail::mailer()->getSymfonyTransport();

        if (! $transport instanceof ArrayTransport) {
            $this->fail('Ожидался array-транспорт почты из phpunit.xml.');
        }

        $this->assertCount(0, $transport->messages());
    }

    public function test_a_password_reset_request_to_the_application_host_still_works(): void
    {
        $this->app['env'] = 'production';

        User::factory()->create(['email' => 'student@example.com']);

        $this->postJson('/api/forgot-password', ['email' => 'student@example.com'])
            ->assertOk()
            ->assertJson(['message' => trans('passwords.sent')]);

        $transport = Mail::mailer()->getSymfonyTransport();

        if (! $transport instanceof ArrayTransport) {
            $this->fail('Ожидался array-транспорт почты из phpunit.xml.');
        }

        $this->assertCount(1, $transport->messages());
        $this->assertStringContainsString(
            'localhost/reset-password?token=',
            (string) $transport->messages()->first()->getOriginalMessage()->getTextBody(),
        );
    }
}
