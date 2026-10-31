<?php

namespace App\Filament\Resources\Directions\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DirectionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('directionname')
                    ->label('Название направления')
                    ->required()
                    ->maxLength(255),
            ]);
    }
}
