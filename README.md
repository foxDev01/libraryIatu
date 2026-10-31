# Библиотека для вуза

Книги распределены по дисциплинам, а дисциплины — по группам.
Каждому пользователю присваивается его группа, поэтому он видит только книги, которые нужны ему в процессе обучения.

Дорожная карта работы: [TODO.md](TODO.md).

## Скриншоты

Список книг группы:

![Книги группы](docs/screenshots/books.png)

Навигация по разделам и дисциплинам:

![Навигация](docs/screenshots/navigation.png)

## Стек

- PHP 8.5, Laravel 13
- SQLite (файл `database/database.sqlite`)
- Laravel Fortify + Sanctum (аутентификация SPA)
- React 19 + TypeScript + Material UI 9 (`@mui/material`)
- React Router 7 (`createBrowserRouter`, code splitting страниц)
- Vite 7
- PHPUnit 12, Laravel Pint

## Запуск

```bash
composer install
npm install

copy .env.example .env
php artisan key:generate

# SQLite-база создаётся автоматически при миграции
php artisan migrate --seed

npm run dev        # или npm run build для production-сборки
php artisan serve
```

Приложение откроется по адресу `http://localhost:8000`.

> Для dev-режима нужны одновременно `npm run dev` и `php artisan serve`.

## Локальные проверки

CI на GitHub Actions отключён: все проверки запускаются **локально перед каждым пушем в main**.
Хук `pre-push` делает это автоматически:

```bash
git config core.hooksPath .githooks   # один раз после клонирования
```

Набор перед пушем: `composer lint` (Pint + PHPStan, уровень 6), `php artisan test`,
`npm run lint`, `npm run typecheck`, `npm run build`.

Вручную то же самое:

```bash
npm run build          # production-сборка фронтенда
npm run typecheck      # проверка TypeScript
npm run lint           # ESLint (JS/TS)
php artisan test       # тесты
composer lint          # Pint (стиль PHP) + PHPStan (статический анализ)
vendor/bin/pint        # авто-форматирование PHP
php artisan route:list
```

## API

Все изменения данных выполняются через `POST`, `PUT` и `DELETE`; GET-запросы ничего не меняют.
Аутентификация — сессионная (Sanctum), поэтому запросы из SPA отправляются с cookie и CSRF-токеном.

| Метод | URL | Назначение |
|-------|-----|------------|
| `GET` | `/api/session` | Проверка статуса сессии |
| `GET` | `/api/group-names` | Список групп для формы регистрации |
| `POST` | `/api/login` | Вход |
| `POST` | `/api/register` | Регистрация (требует `group_name_id`) |
| `POST` | `/api/logout` | Выход |
| `GET` | `/api/user` | Имя текущего пользователя |
| `GET` | `/api/groups` | Группа пользователя |
| `GET` | `/api/disciplines` | Дисциплины группы |
| `GET` | `/api/books` | Книги группы |
| `GET` | `/api/questions` | Вопросы пользователя |
| `POST` | `/api/questions` | Создать вопрос |
| `PUT` | `/api/questions/{id}` | Обновить свой вопрос |
| `DELETE` | `/api/questions/{id}` | Удалить свой вопрос |

## Импорт данных

Демо-данные создаются сидером по умолчанию. Чтобы импортировать реальные данные из
MySQL-дампа `libraryiatu.sql`, выполните:

```bash
php artisan migrate:fresh --seed
```

`LibraryImportSeeder` автоматически разбирает дамп и наполняет таблицы `users`,
`directions`, `group_names`, `types`, `disciplines`, `books`, `groups`,
`group_books`, `group_disciplines` и `questions`.

Дамп содержит реальные имена и email, поэтому `libraryiatu.sql` добавлен в `.gitignore`
и хранится только локально. Если файла нет, сидер создаёт демонстрационные данные.
В репозиторий также не попадают SQLite-база, `.env` и каталог `public/build`.

## Администрирование

Laravel Nova удалена. Админ-панель — **Filament v5** (`/admin`):

- Адрес: `http://localhost:8000/admin` (только для пользователей с `is_admin = 1`).
- Разделы: Книги (типы, направления), Группы (названия групп, дисциплины, привязка книг к группе,
  дисциплины к группе пользователя), Поддержка (просмотр вопросов студентов), Пользователи (назначение роли).
- Выдать права администратора: `php artisan app:make-admin email@example.com`
- Доступ жёстко ограничен: `User::canAccessPanel()` возвращает `is_admin`;
  проверено тестами (`AdminPanelTest`): обычный пользователь получает 403.

## Задача

Электронная библиотека — система, предназначенная для обеспечения учебного процесса необходимой
литературой (информацией), а также оказания содействия повышению уровня развития студентов и
преподавателей вуза. Пользователь взаимодействует с системой через браузер.
