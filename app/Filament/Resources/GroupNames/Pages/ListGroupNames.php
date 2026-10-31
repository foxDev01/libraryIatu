<?php

namespace App\Filament\Resources\GroupNames\Pages;

use App\Filament\Resources\GroupNames\GroupNameResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListGroupNames extends ListRecords
{
    protected static string $resource = GroupNameResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
