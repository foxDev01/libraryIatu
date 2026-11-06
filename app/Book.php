<?php

namespace App;

use Database\Factories\BookFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

/**
 * Учебная книга: файл в приватном диске либо ссылка на внешний ресурс,
 * плюс необязательная обложка рядом с файлом.
 *
 * @property int $id
 * @property string $bookname
 * @property string|null $link
 * @property string|null $file_path путь к файлу книги внутри диска {@see self::FILE_DISK}
 * @property string|null $cover_path путь к обложке внутри диска {@see self::FILE_DISK}
 * @property int $type_id
 */
class Book extends Model
{
    /** @use HasFactory<BookFactory> */
    use HasFactory;

    /**
     * Файлы лежат на приватном диске: наружу они отдаются только через
     * BookController::download() и BookController::cover() после
     * проверки группы пользователя.
     */
    public const FILE_DISK = 'local';

    public const FILE_DIRECTORY = 'books';

    public const COVER_DIRECTORY = 'covers';

    /**
     * Атрибуты с файлами на диске: при замене старые удаляются,
     * при удалении книги удаляются вместе с ней.
     *
     * @var list<string>
     */
    private const FILE_ATTRIBUTES = ['file_path', 'cover_path'];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'bookname',
        'link',
        'file_path',
        'cover_path',
        'type_id',
    ];

    /** @return BelongsTo<Type, $this> */
    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class, 'type_id');
    }

    /** @return BelongsToMany<Discipline, $this> */
    public function disciplines(): BelongsToMany
    {
        return $this->belongsToMany(Discipline::class, 'discipline_books', 'book_id', 'discipline_id')
            ->withTimestamps();
    }

    /** @return BelongsToMany<GroupName, $this> */
    public function groupNames(): BelongsToMany
    {
        return $this->belongsToMany(GroupName::class, 'group_books', 'book_id', 'groupname_id')
            ->withTimestamps();
    }

    public function hasFile(): bool
    {
        return $this->file_path !== null && $this->file_path !== '';
    }

    public function hasCover(): bool
    {
        return $this->cover_path !== null && $this->cover_path !== '';
    }

    /**
     * Имя файла, которое получит студент при скачивании: название книги
     * (без символов, запрещённых в файловых системах) и исходное расширение.
     */
    public function downloadFileName(): string
    {
        return $this->safeFileName(
            $this->file_path === null ? '' : pathinfo($this->file_path, PATHINFO_EXTENSION)
        );
    }

    /**
     * Похожее имя для обложки (приходит в Content-Disposition ответа).
     */
    public function coverFileName(): string
    {
        return $this->safeFileName(
            $this->cover_path === null ? '' : pathinfo($this->cover_path, PATHINFO_EXTENSION)
        );
    }

    private function safeFileName(string $extension): string
    {
        $safe = trim((string) preg_replace('/[^\p{L}\p{N}._-]+/u', '-', $this->bookname), ' -');

        if ($safe === '') {
            $safe = 'book-'.$this->id;
        }

        return $extension === '' ? $safe : $safe.'.'.$extension;
    }

    protected static function booted(): void
    {
        // Файл (книга или обложка) больше не нужен, если его заменили другим.
        static::updated(static function (Book $book): void {
            foreach (self::FILE_ATTRIBUTES as $attribute) {
                /** @var string|null $previous */
                $previous = $book->getOriginal($attribute);

                if ($previous !== null && $previous !== '' && $previous !== $book->{$attribute}) {
                    $book->deleteStoredFile($previous);
                }
            }
        });

        static::deleting(static function (Book $book): void {
            // Иначе ссылки из pivot-таблиц не дадут удалить книгу.
            $book->groupNames()->detach();
            $book->disciplines()->detach();

            foreach (self::FILE_ATTRIBUTES as $attribute) {
                /** @var string|null $path */
                $path = $book->{$attribute};

                if ($path !== null && $path !== '') {
                    $book->deleteStoredFile($path);
                }
            }
        });
    }

    protected function deleteStoredFile(string $path): void
    {
        $disk = Storage::disk(self::FILE_DISK);

        if ($disk->exists($path)) {
            $disk->delete($path);
        }
    }
}
