<?php

namespace App\Filament\Resources\Books\RelationManagers;

use App\Discipline;
use Filament\Actions\AttachAction;
use Filament\Actions\DetachAction;
use Filament\Forms\Components\Select;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DisciplinesRelationManager extends RelationManager
{
    protected static string $relationship = 'disciplines';

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('disciplinename')
            ->columns([
                TextColumn::make('disciplinename')->label('Дисциплина'),
            ])
            ->recordActions([
                DetachAction::make(),
            ])
            ->headerActions([
                AttachAction::make()
                    ->recordSelect(
                        fn (Select $select) => $select
                            ->options(Discipline::query()->orderBy('disciplinename')->pluck('disciplinename', 'id'))
                            ->label('Дисциплина'),
                    ),
            ]);
    }
}
