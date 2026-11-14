<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

/**
 * Защитные HTTP-заголовки.
 *
 * CSP ставится только для SPA и только вне локальной разработки: панель Filament
 * и Livewire исполняют inline-скрипты и eval, а Vite dev-сервер подключает
 * скрипты с другого origin. Для inline-скрипта темы в app.blade.php генерируется
 * nonce — он же попадает в теги @vite.
 */
class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        $isAdmin = $request->is('admin', 'admin/*', 'livewire/*');

        if (! $isAdmin) {
            Vite::useCspNonce();
        }

        $response = $next($request);

        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');

        if ($request->isSecure()) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        if (! $isAdmin && ! app()->environment('local')) {
            $response->headers->set('Content-Security-Policy', $this->contentSecurityPolicy());
        }

        return $response;
    }

    private function contentSecurityPolicy(): string
    {
        $nonce = Vite::cspNonce();
        $scriptSrc = filled($nonce)
            ? "script-src 'self' 'nonce-{$nonce}'"
            : "script-src 'self'";

        return implode('; ', [
            "default-src 'self'",
            $scriptSrc,
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob:",
            "connect-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
        ]);
    }
}
