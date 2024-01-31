
import React from 'react';
import IIdeasListProps from '../../interfaces/SupportListProps';
import ScrollableBox, { useDefaultLipClassNames } from 'react-scrollable-box';
import 'react-scrollable-box/lib/default.css';
import Support from './Support';

const SupportList:React.FC<IIdeasListProps> = (props) => {    
    const lipClassNames = useDefaultLipClassNames();
    return (
        <ScrollableBox
            {...lipClassNames}
            style={{ maxHeight: '100%', overflow: 'auto', flexGrow:1 }}
        >
            {
                props.question!.map((question) => (
                    <Support
                        id = {question.id}
                        title = {question.title}
                        content = {question.content}
                        focused = { (question.id) }
                        setCurrentId = {(question.id) }
                    />
                ))
            }
        </ScrollableBox>
    );
}

export default SupportList;