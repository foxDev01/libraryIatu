<?php

namespace App\Filament\Resources\GroupNames\Pages;

use App\Filament\Resources\GroupNames\GroupNameResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditGroupName extends EditRecord
{
    protected static string $resource = GroupNameResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
