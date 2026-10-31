<?php

namespace App\Console\Commands;

use App\User;
use Illuminate\Console\Command;

class MakeAdmin extends Command
{
    protected $signature = 'app:make-admin {email : Email существующего пользователя}';

    protected $description = 'Выдать пользователю права администратора (доступ к панели /admin)';

    public function handle(): int
    {
        $user = User::query()->where('email', $this->argument('email'))->first();

        if ($user === null) {
            $this->error('Пользователь с таким email не найден.');

            return self::FAILURE;
        }

        $user->forceFill(['is_admin' => true])->save();
        $this->info("Пользователь {$user->email} теперь администратор.");

        return self::SUCCESS;
    }
}
