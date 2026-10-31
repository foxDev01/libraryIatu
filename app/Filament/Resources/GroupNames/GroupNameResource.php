<?php

namespace App\Filament\Resources\GroupNames;

use App\Filament\Resources\GroupNames\Pages\CreateGroupName;
use App\Filament\Resources\GroupNames\Pages\EditGroupName;
use App\Filament\Resources\GroupNames\Pages\ListGroupNames;
use App\Filament\Resources\GroupNames\RelationManagers\BooksRelationManager;
use App\Filament\Resources\GroupNames\Schemas\GroupNameForm;
use App\Filament\Resources\GroupNames\Tables\GroupNamesTable;
use App\GroupName;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class GroupNameResource extends Resource
{
    protected static ?string $model = GroupName::class;

    protected static ?string $navigationLabel = 'Учебные группы';

    protected static ?string $modelLabel = 'учебная группа';

    protected static ?string $pluralModelLabel = 'учебные группы';

    protected static \UnitEnum|string|null $navigationGroup = 'Группы';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;

    public static function form(Schema $schema): Schema
    {
        return GroupNameForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return GroupNamesTable::configure($table);
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
            'index' => ListGroupNames::route('/'),
            'create' => CreateGroupName::route('/create'),
            'edit' => EditGroupName::route('/{record}/edit'),
        ];
    }
}
