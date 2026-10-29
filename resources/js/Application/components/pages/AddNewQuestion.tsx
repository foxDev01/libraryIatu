import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AddNewQuestion() {
    const history = useHistory();
    const started = useRef<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Protect against double invocation (React strict mode, remounts).
        if (started.current) {
            return;
        }
        started.current = true;

        axios.post('/api/questions')
            .then(() => history.replace('/support'))
            .catch(() => setError('Не удалось создать вопрос. Попробуйте ещё раз.'));
    }, [history]);

    if (error) {
        return <p role="alert">{error}</p>;
    }

    return <p>Создание вопроса…</p>;
}
