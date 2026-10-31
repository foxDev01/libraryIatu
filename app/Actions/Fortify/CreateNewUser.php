<?php

namespace App\Actions\Fortify;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'group_name_id' => [
                'required',
                Rule::exists('group_names', 'id'),
            ],
        ], [
            'group_name_id.required' => 'Выберите группу.',
            'group_name_id.exists' => 'Выбранная группа не найдена.',
        ])->validate();

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);

        // Users can only see the books of their own study group,
        // so a group is assigned during registration.
        $user->group()->create([
            'groupname_id' => $input['group_name_id'],
        ]);

        return $user;
    }
}
