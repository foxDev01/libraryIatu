import React from 'react';
import IIdeasListProps from '../../interfaces/BooksListProps';
import Book from './Book';

export default function BooksList(props: IIdeasListProps) {
    return (
        <div style={{ maxHeight: '100%', overflow: 'auto', flexGrow: 1 }}>
            {props.books.map(({ id, bookname, link }) => (
                <Book key={id} id={id} bookname={bookname} link={link} />
            ))}
        </div>
    );
}
