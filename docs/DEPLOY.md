# Деплой

Чек-лист production-развёртывания. Локальный запуск и проверки описаны в
[README](../README.md), защитные заголовки — в разделе «Безопасность» там же.

## Требования

- PHP 8.5 с расширениями `pdo_sqlite`, `mbstring`, `intl`, `gd`/`imagick` (обложки),
  `fileinfo`.
- Composer и Node.js 22+ — только на этапе сборки.
- nginx (или другой reverse-proxy) + PHP-FPM.
- Свободное место под `storage/app/private` (файлы книг до 50 МБ) и бэкапы.

## Переменные окружения

`.env` на сервере не коммитится. Обязательные отличия от `.env.example`:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://library.example.ru

APP_KEY=base64:...            # php artisan key:generate --show

DB_CONNECTION=sqlite
DB_DATABASE=/var/www/libraryiatu/database/database.sqlite

SESSION_DRIVER=database
SESSION_SECURE_COOKIE=true
SESSION_DOMAIN=library.example.ru

SANCTUM_STATEFUL_DOMAINS=library.example.ru

MAIL_MAILER=smtp
MAIL_HOST=smtp.example.ru
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=noreply@library.example.ru
MAIL_FROM_NAME="${APP_NAME}"

LOG_LEVEL=warning
```

- `APP_URL` должен совпадать с реальным доменом: на нём строятся ссылки в письмах
  восстановления пароля и список доверенных хостов (`TrustHosts`). Запрос с чужим
  заголовком `Host` получает `400`, так что подменить домен в письме нельзя.
  Поддомены указанного хоста тоже считаются доверенными.
- `SANCTUM_STATEFUL_DOMAINS` — домен SPA без схемы. Если оставить `localhost`,
  браузер не отправит сессионные cookie и вход будет «теряться».
- `SESSION_SECURE_COOKIE=true` работает только по HTTPS.

## Первый деплой

```bash
composer install --no-dev --optimize-autoloader
npm ci
npm run build

php artisan migrate --force
php artisan optimize          # config + routes + views + events
php artisan filament:optimize # кеш компонентов Filament

php artisan app:make-admin admin@example.ru
```

`php artisan storage:link` выполнять нельзя: файлы книг и обложки лежат на приватном
диске и отдаются только через API с проверкой группы.

## Права доступа

Владелец — пользователь PHP-FPM (`www-data`):

```bash
chown -R www-data:www-data storage bootstrap/cache database
chmod -R ug+rwX storage bootstrap/cache database
```

`database/` нужен на запись: SQLite создаёт рядом с файлом БД журналы `-wal` и `-shm`
(режим WAL включён в `config/database.php`).

## nginx

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name library.example.ru;
    root /var/www/libraryiatu/public;

    index index.php;
    client_max_body_size 55m;   # книги до 50 МБ

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php8.5-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
    }

    location ~ /\.(?!well-known) {
        deny all;
    }
}
```

Документ-рут — только `public/`, поэтому `.env`, `database/` и `storage/` снаружи
недоступны. Если TLS завершается на балансировщике, включите доверие к прокси
(`$middleware->trustProxies(at: ['10.0.0.0/8'])` в `bootstrap/app.php`), иначе Laravel
считает запросы HTTP и не отдаст `Strict-Transport-Security`; альтернатива — HSTS на
самом прокси.

## Бэкапы

Нужны и база, и файлы: книги хранятся только на сервере. Ежедневный cron (03:00):

```cron
0 3 * * * cd /var/www/libraryiatu && sqlite3 database/database.sqlite ".backup '/var/backups/libraryiatu/db-$(date +\%F).sqlite'" && tar -czf /var/backups/libraryiatu/files-$(date +\%F).tar.gz storage/app/private && find /var/backups/libraryiatu -type f -mtime +30 -delete
```

- `.backup` делает согласованный снимок на работающей базе; копировать файл `cp` при
  включённом WAL нельзя.
- Если `sqlite3` нет, используйте `VACUUM INTO '/var/backups/libraryiatu/db.sqlite'`
  через `php artisan tinker` или установите CLI.
- Бэкапы складывайте на другой диск/в объектное хранилище и проверяйте восстановление.

Восстановление:

```bash
systemctl stop php8.5-fpm
rm -f database/database.sqlite-wal database/database.sqlite-shm
cp /var/backups/libraryiatu/db-2026-11-15.sqlite database/database.sqlite
tar -xzf /var/backups/libraryiatu/files-2026-11-15.tar.gz -C /var/www/libraryiatu
chown -R www-data:www-data database storage
systemctl start php8.5-fpm
```

## Обновление версии

```bash
git pull
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan optimize
php artisan filament:optimize
```

## После деплоя

- `GET /up` отвечает `200` — приложение и БД живы.
- Вход студента и администратора, скачивание книги, обложка, ответ на вопрос.
- Тестовому аккаунту `test@example.com` забрать права администратора
  (`is_admin = 0`) или удалить его — на production он не нужен.
