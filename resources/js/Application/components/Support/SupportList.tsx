import React from 'react';
import Box from '@mui/material/Box';
import { Question } from '../../types';
import Support from './Support';

const SupportList: React.FC<{ questions: Question[]; onChanged: () => void }> = ({ questions, onChanged }) => {
    return (
        <Box sx={{ maxHeight: '100%', overflow: 'auto', flexGrow: 1 }}>
            {questions.map((question) => (
                <Support
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    content={question.content}
                    onChanged={onChanged}
                />
            ))}
        </Box>
    );
};

export default SupportList;
