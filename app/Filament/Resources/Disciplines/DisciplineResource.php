<?php

namespace App\Filament\Resources\Disciplines;

use App\Discipline;
use App\Filament\Resources\Disciplines\Pages\CreateDiscipline;
use App\Filament\Resources\Disciplines\Pages\EditDiscipline;
use App\Filament\Resources\Disciplines\Pages\ListDisciplines;
use App\Filament\Resources\Disciplines\RelationManagers\BooksRelationManager;
use App\Filament\Resources\Disciplines\Schemas\DisciplineForm;
use App\Filament\Resources\Disciplines\Tables\DisciplinesTable;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class DisciplineResource extends Resource
{
    protected static ?string $model = Discipline::class;

    protected static ?string $navigationLabel = 'Дисциплины';

    protected static ?string $modelLabel = 'дисциплина';

    protected static ?string $pluralModelLabel = 'дисциплины';

    protected static \UnitEnum|string|null $navigationGroup = 'Группы';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedAcademicCap;

    public static function form(Schema $schema): Schema
    {
        return DisciplineForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DisciplinesTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            BooksRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDisciplines::route('/'),
            'create' => CreateDiscipline::route('/create'),
            'edit' => EditDiscipline::route('/{record}/edit'),
        ];
    }
}
