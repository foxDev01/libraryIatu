<?php

namespace Tests\Feature;

use App\Book;
use App\Filament\Resources\Books\Pages\CreateBook;
use App\Type;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class BookUploadTest extends TestCase
{
    use RefreshDatabase;

    public function test_an_admin_can_create_a_book_with_an_uploaded_file(): void
    {
        Storage::fake('local');

        $this->actingAs(User::factory()->create(['is_admin' => true]));

        Livewire::test(CreateBook::class)
            ->fillForm([
                'bookname' => 'Тестовая книга',
                'file_path' => [UploadedFile::fake()->create('test-book.pdf', 12, 'application/pdf')],
                'type_id' => Type::create(['typenames' => 'учебное пособие'])->id,
            ])
            ->call('create')
            ->assertHasNoFormErrors();

        $book = Book::query()->firstOrFail();

        $this->assertNotNull($book->file_path, 'Файл книги должен сохраниться в базе.');
        $this->assertTrue($book->hasFile());
        $this->assertStringStartsWith('books/', $book->file_path);
        Storage::disk('local')->assertExists($book->file_path);

        // Студент получит понятное имя файла вместо хеша из файлового хранилища.
        $this->assertSame('Тестовая-книга.pdf', $book->downloadFileName());

        // Ссылка не обязательна, если есть файл.
        $this->assertNull($book->link);
    }

    public function test_a_book_requires_either_a_file_or_an_external_link(): void
    {
        Storage::fake('local');

        $this->actingAs(User::factory()->create(['is_admin' => true]));

        Livewire::test(CreateBook::class)
            ->fillForm([
                'bookname' => 'Книга без источника',
                'type_id' => Type::create(['typenames' => 'учебное пособие'])->id,
            ])
            ->call('create')
            ->assertHasFormErrors(['link', 'file_path']);
    }
}
