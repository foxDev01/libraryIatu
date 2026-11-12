<?php

namespace App\Filament\Resources\Questions\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class QuestionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user.name')
                    ->label('Пользователь'),
                TextEntry::make('title')
                    ->label('Тема вопроса'),
                TextEntry::make('content')
                    ->label('Вопрос')
                    ->columnSpanFull(),
                TextEntry::make('answer')
                    ->label('Ответ поддержки')
                    ->placeholder('Пока нет ответа')
                    ->columnSpanFull(),
                TextEntry::make('answered_at')
                    ->label('Отвечено')
                    ->dateTime('d.m.Y H:i')
                    ->placeholder('—'),
                TextEntry::make('created_at')
                    ->label('Создан')
                    ->dateTime('d.m.Y H:i'),
                TextEntry::make('updated_at')
                    ->label('Обновлён')
                    ->dateTime('d.m.Y H:i'),
            ]);
    }
}
