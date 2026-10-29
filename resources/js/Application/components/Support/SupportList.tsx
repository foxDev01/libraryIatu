import React from 'react';
import IIdeasListProps from '../../interfaces/SupportListProps';
import Support from './Support';

const SupportList: React.FC<IIdeasListProps> = ({ questions, onChanged }) => {
    return (
        <div style={{ maxHeight: '100%', overflow: 'auto', flexGrow: 1 }}>
            {questions.map((question) => (
                <Support
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    content={question.content}
                    onChanged={onChanged}
                />
            ))}
        </div>
    );
};

export default SupportList;
