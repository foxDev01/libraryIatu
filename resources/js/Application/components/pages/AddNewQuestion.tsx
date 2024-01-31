import React from 'react';
import { Route, Redirect } from 'react-router';

export default function AddNewQuestion() {        

    const CreateNewRootIdea = () => {
        fetch(
            process.env.MIX_APP_URL +
                '/api/questions/create'
        )
        console.log('новый вопрос')
    }

    return (
        <>
            {CreateNewRootIdea()}
            <Redirect to="/support"/>
        </>
    );
}
