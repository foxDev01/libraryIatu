<?php

namespace Tests\Feature;

use App\Book;
use App\Group;
use App\GroupName;
use App\Type;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BookDownloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_student_can_download_a_file_of_their_own_group(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('books/db.pdf', 'pdf-bytes');

        [$user, $groupName] = $this->studentInGroup('АИСТбд-21');
        $book = $this->bookWithFile('Основы баз данных', 'books/db.pdf');
        $groupName->books()->attach($book);

        $response = $this->actingAs($user)
            ->getJson('/api/books/'.$book->id.'/download')
            ->assertOk();

        $this->assertSame('pdf-bytes', $response->streamedContent());

        $disposition = (string) $response->headers->get('content-disposition');
        $this->assertStringContainsString('attachment', $disposition);
        $this->assertStringContainsString(rawurlencode('Основы-баз-данных.pdf'), $disposition);
    }

    public function test_a_student_cannot_download_a_book_of_another_group(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('books/other.pdf', 'x');

        [$user] = $this->studentInGroup('АИСТбд-21');
        [, $otherGroup] = $this->studentInGroup('ИВТбд-11');

        $book = $this->bookWithFile('Математический анализ', 'books/other.pdf');
        $otherGroup->books()->attach($book);

        $this->actingAs($user)
            ->getJson('/api/books/'.$book->id.'/download')
            ->assertForbidden();

        $this->actingAs($user)->getJson('/api/books')->assertOk()->assertJsonCount(0);
    }

    public function test_the_download_endpoint_requires_authentication(): void
    {
        $book = $this->bookWithFile('Основы баз данных', 'books/db.pdf');

        $this->getJson('/api/books/'.$book->id.'/download')->assertUnauthorized();
    }

    public function test_a_book_with_an_external_link_redirects_to_it(): void
    {
        [$user, $groupName] = $this->studentInGroup('АИСТбд-21');

        $book = Book::create([
            'bookname' => 'ООП и наследование',
            'link' => 'https://example.com/oop.pdf',
            'type_id' => Type::create(['typenames' => 'учебное пособие'])->id,
        ]);
        $groupName->books()->attach($book);

        $this->actingAs($user)
            ->get('/api/books/'.$book->id.'/download')
            ->assertRedirect('https://example.com/oop.pdf');
    }

    public function test_a_book_without_a_file_and_a_link_is_not_found(): void
    {
        Storage::fake('local');

        [$user, $groupName] = $this->studentInGroup('АИСТбд-21');

        // Файл записан в базу, но отсутствует на диске.
        $missing = $this->bookWithFile('Удалённый файл', 'books/gone.pdf');
        $groupName->books()->attach($missing);

        $this->actingAs($user)
            ->getJson('/api/books/'.$missing->id.'/download')
            ->assertNotFound();

        // Ни файла, ни ссылки.
        $empty = Book::create([
            'bookname' => 'Пустышка',
            'type_id' => Type::create(['typenames' => 'учебное пособие'])->id,
        ]);
        $groupName->books()->attach($empty);

        $this->actingAs($user)
            ->getJson('/api/books/'.$empty->id.'/download')
            ->assertNotFound();
    }

    public function test_stored_files_are_removed_with_the_book_and_when_replaced(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('books/first.pdf', 'first');
        Storage::disk('local')->put('books/second.pdf', 'second');

        $book = $this->bookWithFile('Книга', 'books/first.pdf');

        $book->update(['file_path' => 'books/second.pdf']);
        Storage::disk('local')->assertMissing('books/first.pdf');
        Storage::disk('local')->assertExists('books/second.pdf');

        $book->delete();
        Storage::disk('local')->assertMissing('books/second.pdf');
    }

    public function test_a_book_attached_to_a_group_can_be_deleted(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('books/db.pdf', 'x');

        [, $groupName] = $this->studentInGroup('АИСТбд-21');
        $book = $this->bookWithFile('Основы баз данных', 'books/db.pdf');
        $groupName->books()->attach($book);

        $book->delete();

        $this->assertDatabaseCount('group_books', 0);
        Storage::disk('local')->assertMissing('books/db.pdf');
    }

    /**
     * @return array{0: User, 1: GroupName}
     */
    private function studentInGroup(string $groupname): array
    {
        $user = User::factory()->create();
        $groupName = GroupName::create(['groupname' => $groupname]);

        Group::create([
            'user_id' => $user->id,
            'groupname_id' => $groupName->id,
        ]);

        return [$user, $groupName];
    }

    private function bookWithFile(string $bookname, string $path): Book
    {
        return Book::create([
            'bookname' => $bookname,
            'file_path' => $path,
            'type_id' => Type::create(['typenames' => 'учебное пособие'])->id,
        ]);
    }
}
