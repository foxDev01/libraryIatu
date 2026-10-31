<?php

namespace App\Filament\Resources\Books\Schemas;

use App\Type;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BookForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('bookname')
                    ->label('Название')
                    ->required()
                    ->maxLength(500),
                TextInput::make('link')
                    ->label('Ссылка на файл книги')
                    ->required()
                    ->url(),
                Select::make('type_id')
                    ->label('Тип')
                    ->options(Type::query()->orderBy('typenames')->pluck('typenames', 'id'))
                    ->searchable()
                    ->required(),
            ]);
    }
}
