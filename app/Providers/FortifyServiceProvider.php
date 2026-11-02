<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Http\Responses\PasswordResetLinkSentResponse;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Contracts\FailedPasswordResetLinkRequestResponse;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Routes are registered manually in routes/api.php so that we can
        // apply fine-grained throttling to login and registration.
        Fortify::ignoreRoutes();

        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        // Не подсвечивать посетителям, зарегистрирован ли такой email.
        $this->app->bind(
            FailedPasswordResetLinkRequestResponse::class,
            PasswordResetLinkSentResponse::class,
        );

        // Ссылка в письме ведёт на страницу SPA, а не на серверный view-маршрут
        // Fortify (views у нас отключены). Панель Filament переопределяет
        // resetUrl() сама, поэтому на /admin эта настройка не влияет.
        // Тексты письма переводятся через resources/lang/ru.json.
        ResetPassword::createUrlUsing(
            fn (object $notifiable, string $token): string => url('/reset-password')
                .'?token='.rawurlencode($token)
                .'&email='.rawurlencode((string) $notifiable->getEmailForPasswordReset()),
        );
    }
}
