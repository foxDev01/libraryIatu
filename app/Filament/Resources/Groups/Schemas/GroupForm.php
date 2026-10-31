<?php

namespace App\Filament\Resources\Groups\Schemas;

use App\Direction;
use App\GroupName;
use App\User;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class GroupForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Пользователь')
                    ->options(User::orderBy('name')->pluck('name', 'id'))
                    ->searchable()
                    ->required(),
                Select::make('groupname_id')
                    ->label('Учебная группа')
                    ->options(GroupName::orderBy('groupname')->whereNotNull('groupname')->pluck('groupname', 'id'))
                    ->searchable()
                    ->required(),
                Select::make('direction_id')
                    ->label('Направление')
                    ->options(Direction::orderBy('directionname')->pluck('directionname', 'id'))
                    ->searchable(),
            ]);
    }
}
