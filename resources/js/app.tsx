import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';

import { createAppRouter } from './Application/components/Routes';

/**
 * Configure axios for Laravel Sanctum's cookie based SPA authentication.
 * Axios automatically sends the X-XSRF-TOKEN header based on the
 * XSRF-TOKEN cookie that Laravel sets for stateful requests.
 */
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element #root is missing');
}

createRoot(rootElement).render(<RouterProvider router={createAppRouter()} />);
