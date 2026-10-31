<?php

namespace App\Filament\Resources\Questions;

use App\Filament\Resources\Questions\Pages\ListQuestions;
use App\Filament\Resources\Questions\Pages\ViewQuestion;
use App\Filament\Resources\Questions\Schemas\QuestionInfolist;
use App\Filament\Resources\Questions\Tables\QuestionsTable;
use App\Question;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class QuestionResource extends Resource
{
    protected static ?string $model = Question::class;

    protected static ?string $navigationLabel = 'Вопросы';

    protected static ?string $modelLabel = 'вопрос';

    protected static ?string $pluralModelLabel = 'вопросы';

    protected static \UnitEnum|string|null $navigationGroup = 'Поддержка';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedChatBubbleLeftRight;

    public static function infolist(Schema $schema): Schema
    {
        return QuestionInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return QuestionsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListQuestions::route('/'),
            'view' => ViewQuestion::route('/{record}'),
        ];
    }
}
