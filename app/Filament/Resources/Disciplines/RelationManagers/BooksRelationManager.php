<?php

namespace App\Filament\Resources\Disciplines\RelationManagers;

use App\Book;
use Filament\Actions\AttachAction;
use Filament\Actions\DetachAction;
use Filament\Forms\Components\Select;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BooksRelationManager extends RelationManager
{
    protected static string $relationship = 'books';

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('bookname')
            ->columns([
                TextColumn::make('bookname')->label('Название'),
                TextColumn::make('type.typenames')->label('Тип'),
            ])
            ->recordActions([
                DetachAction::make(),
            ])
            ->headerActions([
                AttachAction::make()
                    ->recordSelect(
                        fn (Select $select) => $select
                            ->options(Book::query()->orderBy('bookname')->limit(1000)->pluck('bookname', 'id'))
                            ->label('Книга')
                            ->searchable(),
                    ),
            ]);
    }
}
