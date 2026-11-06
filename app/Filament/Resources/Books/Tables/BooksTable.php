<?php

namespace App\Filament\Resources\Books\Tables;

use App\Book;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class BooksTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('cover_path')
                    ->label('Обложка')
                    ->disk(Book::FILE_DISK)
                    ->visibility('private')
                    ->square()
                    ->defaultImageUrl(null),
                TextColumn::make('bookname')
                    ->label('Название')
                    ->searchable()
                    ->sortable()
                    ->limit(60),
                TextColumn::make('type.typenames')
                    ->label('Тип')
                    ->sortable(),
                TextColumn::make('file_path')
                    ->label('Хранение')
                    ->formatStateUsing(fn (?string $state): string => filled($state) ? 'файл на сервере' : 'внешняя ссылка')
                    ->sortable(),
                TextColumn::make('link')
                    ->label('Ссылка')
                    ->placeholder('—')
                    ->limit(40),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
