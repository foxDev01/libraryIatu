<?php

namespace App\Filament\Resources\Books\Schemas;

use App\Book;
use App\Type;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
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
                    ->label('Внешняя ссылка')
                    ->url()
                    ->placeholder('https://…')
                    ->helperText('Если книга доступна по ссылке извне (например, на сайте вуза).')
                    ->required(fn (Get $get): bool => blank($get('file_path'))),

                FileUpload::make('file_path')
                    ->label('Файл книги')
                    ->disk(Book::FILE_DISK)
                    ->directory(Book::FILE_DIRECTORY)
                    ->visibility('private')
                    ->acceptedFileTypes([
                        'application/pdf',
                        'application/epub+zip',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'application/rtf',
                        'text/plain',
                        'text/xml',
                        'application/xml',
                        'image/vnd.djvu',
                    ])
                    ->maxSize(51_200)
                    ->downloadable()
                    ->helperText('PDF, EPUB, DOC(X), RTF, TXT, FB2, DJVU — до 50 МБ. Файл приватный: студент получает его через /api/books/{id}/download, только если книга закреплена за его группой.')
                    ->required(fn (Get $get): bool => blank($get('link'))),

                Select::make('type_id')
                    ->label('Тип')
                    ->options(Type::query()->orderBy('typenames')->pluck('typenames', 'id'))
                    ->searchable()
                    ->required(),
            ]);
    }
}
