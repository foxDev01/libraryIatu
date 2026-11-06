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

class BookCoverTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_student_sees_the_cover_of_their_group(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('covers/cover.png', self::pngByte());

        [$user, $groupName] = $this->studentInGroup('АИСТбд-21');
        $book = $this->bookWithCover('Основы баз данных', 'covers/cover.png');
        $groupName->books()->attach($book);

        $response = $this->actingAs($user)
            ->getJson('/api/books/'.$book->id.'/cover')
            ->assertOk();

        $this->assertSame(self::pngByte(), $response->streamedContent());
        $this->assertSame('image/png', (string) $response->headers->get('content-type'));
        $this->assertStringContainsString('inline', (string) $response->headers->get('content-disposition'));
    }

    public function test_a_student_cannot_see_a_cover_of_another_group(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('covers/other.png', self::pngByte());

        [$user] = $this->studentInGroup('АИСТбд-21');
        [, $otherGroup] = $this->studentInGroup('ИВТбд-11');

        $book = $this->bookWithCover('Математический анализ', 'covers/other.png');
        $otherGroup->books()->attach($book);

        $this->actingAs($user)
            ->getJson('/api/books/'.$book->id.'/cover')
            ->assertForbidden();
    }

    public function test_the_cover_endpoint_requires_authentication(): void
    {
        $book = $this->bookWithCover('Основы баз данных', 'covers/cover.png');

        $this->getJson('/api/books/'.$book->id.'/cover')->assertUnauthorized();
    }

    public function test_a_book_without_a_cover_is_not_found(): void
    {
        Storage::fake('local');

        [$user, $groupName] = $this->studentInGroup('АИСТбд-21');

        // Обложка записана в базу, но файла нет на диске.
        $missing = $this->bookWithCover('Удалённая обложка', 'covers/gone.png');
        $groupName->books()->attach($missing);

        $this->actingAs($user)
            ->getJson('/api/books/'.$missing->id.'/cover')
            ->assertNotFound();

        // Обложки нет вообще.
        $bare = Book::create([
            'bookname' => 'Книга без обложки',
            'type_id' => Type::create(['typenames' => 'учебное пособие'])->id,
        ]);
        $groupName->books()->attach($bare);

        $this->actingAs($user)
            ->getJson('/api/books/'.$bare->id.'/cover')
            ->assertNotFound();
    }

    public function test_the_cover_is_removed_when_replaced_and_with_the_book(): void
    {
        Storage::fake('local');
        Storage::disk('local')->put('covers/first.png', self::pngByte());
        Storage::disk('local')->put('covers/second.png', self::pngByte());

        $book = $this->bookWithCover('Книга', 'covers/first.png');

        $book->update(['cover_path' => 'covers/second.png']);
        Storage::disk('local')->assertMissing('covers/first.png');
        Storage::disk('local')->assertExists('covers/second.png');

        $book->delete();
        Storage::disk('local')->assertMissing('covers/second.png');
    }

    /**
     * Минимальный валидный PNG, чтобы mime-детектор и валидатор Filament
     * не отличали его от настоящей картинки.
     */
    private static function pngByte(): string
    {
        return (string) base64_decode(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
            true,
        );
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

    private function bookWithCover(string $bookname, string $path): Book
    {
        return Book::create([
            'bookname' => $bookname,
            'cover_path' => $path,
            'type_id' => Type::create(['typenames' => 'учебное пособие'])->id,
        ]);
    }
}
