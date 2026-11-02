<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\FailedPasswordResetLinkRequestResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Ответ на запрос ссылки восстановления.
 *
 * Fortify по умолчанию отдаёт 422 «пользователь с таким email не найден»,
 * что позволяет анонимному посетителю проверить, зарегистрирован ли адрес.
 * Вместо этого всегда возвращаем то же нейтральное сообщение, что и при
 * успешной отправке: реальный результат виден только по почте.
 *
 * Статус брокера (INVALID_USER, RESET_LINK_THROTTLED) намеренно не
 * используется, поэтому конструктора нет — Fortify передаёт его в
 * app(... => ['status' => ...]), а контейнер лишние параметры игнорирует.
 */
class PasswordResetLinkSentResponse implements FailedPasswordResetLinkRequestResponse
{
    /**
     * @param  Request  $request
     */
    public function toResponse($request): Response
    {
        return new JsonResponse(['message' => trans('passwords.sent')]);
    }
}
