export interface Book {
    id: number;
    bookname: string;
    /** Внешняя ссылка (если книга хранится не у нас). */
    link: string | null;
    /** Есть ли файл на сервере — тогда качаем через /api/books/{id}/download. */
    has_file?: boolean;
    /** Есть ли обложка — тогда рисуем её через /api/books/{id}/cover. */
    has_cover?: boolean;
    type_id?: number;
    /** Название типа книги (для фильтра и подписей). */
    type_name?: string | null;
}

export interface Discipline {
    id: number;
    disciplinename: string;
}

/** Ответ GET /api/disciplines/{id}/books. */
export interface DisciplineBooks {
    discipline: Discipline;
    books: Book[];
}

export interface Question {
    id: number;
    title: string;
    content: string;
    user_id?: number;
    created_at?: string;
    updated_at?: string;
}

export interface GroupNameOption {
    id: number;
    groupname: string;
}
