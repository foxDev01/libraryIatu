import axios from 'axios';

interface ApiErrorBody {
    message?: string;
    errors?: Record<string, string[]>;
}

/**
 * Extract a human readable message from a failed API request.
 */
export default function apiErrorMessage(error: unknown, fallback: string): string {
    if (!axios.isAxiosError(error)) {
        return fallback;
    }

    const body = error.response?.data as ApiErrorBody | undefined;
    const validationError = body?.errors ? Object.values(body.errors)[0]?.[0] : undefined;

    return validationError ?? body?.message ?? fallback;
}
