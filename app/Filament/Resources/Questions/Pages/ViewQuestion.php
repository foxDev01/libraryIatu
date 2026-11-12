<?php

namespace App\Filament\Resources\Questions\Pages;

use App\Filament\Resources\Questions\QuestionResource;
use App\Question;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ViewRecord;
use Filament\Support\Icons\Heroicon;

class ViewQuestion extends ViewRecord
{
    protected static string $resource = QuestionResource::class;

    /**
     * Ответ студенту: текст сохраняется в вопросе и сразу виден автору
     * в разделе «Помощь». Заголовок и текст вопроса админ не меняет.
     *
     * @return array<Action>
     */
    protected function getHeaderActions(): array
    {
        return [
            Action::make('answer')
                ->label(fn (Question $record): string => filled($record->answer) ? 'Изменить ответ' : 'Ответить')
                ->icon(Heroicon::OutlinedChatBubbleLeftRight)
                ->modalHeading('Ответ студенту')
                ->modalDescription('Ответ появится в разделе «Помощь» у автора вопроса.')
                ->modalSubmitActionLabel('Сохранить ответ')
                ->schema([
                    Textarea::make('answer')
                        ->label('Текст ответа')
                        ->rows(6)
                        ->required()
                        ->maxLength(5000),
                ])
                ->fillForm(fn (Question $record): array => [
                    'answer' => $record->answer,
                ])
                ->action(function (Question $record, array $data): void {
                    $record->update([
                        'answer' => $data['answer'],
                        'answered_at' => now(),
                    ]);

                    Notification::make()
                        ->title('Ответ сохранён')
                        ->success()
                        ->send();
                }),
        ];
    }
}
