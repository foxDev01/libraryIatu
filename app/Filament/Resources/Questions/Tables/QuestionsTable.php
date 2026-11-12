<?php

namespace App\Filament\Resources\Questions\Tables;

use App\Question;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class QuestionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->label('Пользователь')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('title')
                    ->label('Тема вопроса')
                    ->searchable()
                    ->sortable()
                    ->limit(60),
                TextColumn::make('content')
                    ->label('Вопрос')
                    ->limit(60)
                    ->toggleable(),
                TextColumn::make('answer')
                    ->label('Ответ')
                    ->badge()
                    ->formatStateUsing(fn (?string $state): string => filled($state) ? 'есть' : 'нет')
                    ->color(fn (?string $state): string => filled($state) ? 'success' : 'gray'),
                TextColumn::make('created_at')
                    ->label('Создан')
                    ->dateTime('d.m.Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Filter::make('unanswered')
                    ->label('Без ответа')
                    ->query(self::unanswered(...)),
            ])
            ->recordActions([
                ViewAction::make(),
                DeleteAction::make(),
            ]);
    }

    /**
     * @param  Builder<Question>  $query
     * @return Builder<Question>
     */
    private static function unanswered(Builder $query): Builder
    {
        return $query->whereNull('answer');
    }
}
