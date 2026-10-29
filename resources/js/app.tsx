import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './Application/App';

/**
 * Configure axios for Laravel Sanctum's cookie based SPA authentication.
 * Axios automatically sends the X-XSRF-TOKEN header based on the
 * XSRF-TOKEN cookie that Laravel sets for stateful requests.
 */
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
