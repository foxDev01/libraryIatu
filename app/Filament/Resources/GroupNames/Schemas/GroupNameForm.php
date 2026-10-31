<?php

namespace App\Filament\Resources\GroupNames\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class GroupNameForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('groupname')
                    ->label('Название группы')
                    ->required()
                    ->maxLength(255),
            ]);
    }
}
