import React, { Suspense } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

import { useSession } from '../session';

import App from '../App';

const LoginView = React.lazy(() => import('./Auth/LoginView'));
const RegisterView = React.lazy(() => import('./Auth/RegisterView'));
const ForgotPasswordView = React.lazy(() => import('./Auth/ForgotPasswordView'));
const ResetPasswordView = React.lazy(() => import('./Auth/ResetPasswordView'));
const BooksPage = React.lazy(() => import('./Book/BooksPage'));
const DisciplineBooksPage = React.lazy(() => import('./Discipline/DisciplineBooksPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const AddNewQuestion = React.lazy(() => import('./pages/AddNewQuestion'));
const SupportPage = React.lazy(() => import('./Support/SupportPage'));

/** Shared placeholder while a page chunk is loading. */
const PageFallback: React.FC = () => <p aria-live="polite">Загрузка…</p>;

/** Redirects authenticated users away from guest-only pages (login, register). */
const GuestOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { auth } = useSession();

    if (auth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

/** Redirects guests away from the pages behind the session. */
const RequireAuth: React.FC = () => {
    const { auth } = useSession();

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

/**
 * The router is created once by the entry point. All pages are rendered
 * inside the App layout (NavBar + content area). Pages are lazy loaded,
 * so the login page does not ship the whole application bundle.
 */
export function createAppRouter() {
    const withFallback = (element: React.ReactNode) => (
        <Suspense fallback={<PageFallback />}>{element}</Suspense>
    );

    return createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                { path: 'login', element: withFallback(<GuestOnly><LoginView /></GuestOnly>) },
                { path: 'register', element: withFallback(<GuestOnly><RegisterView /></GuestOnly>) },
                { path: 'forgot-password', element: withFallback(<GuestOnly><ForgotPasswordView /></GuestOnly>) },
                { path: 'reset-password', element: withFallback(<GuestOnly><ResetPasswordView /></GuestOnly>) },
                {
                    element: <RequireAuth />,
                    children: [
                        { index: true, element: withFallback(<BooksPage />) },
                        { path: 'disciplines/:id', element: withFallback(<DisciplineBooksPage />) },
                        { path: 'about', element: withFallback(<AboutPage />) },
                        { path: 'support', element: withFallback(<SupportPage />) },
                        { path: 'add_new', element: withFallback(<AddNewQuestion />) },
                    ],
                },
                { path: '*', element: <Navigate to="/" replace /> },
            ],
        },
    ]);
}
