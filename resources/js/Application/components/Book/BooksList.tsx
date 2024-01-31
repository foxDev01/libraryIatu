import { SettingsRemoteOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import IIdeasListProps from '../../interfaces/BooksListProps';
import ScrollableBox, { useDefaultLipClassNames } from 'react-scrollable-box';
import 'react-scrollable-box/lib/default.css';
import Book from './Book';

export default function BooksList(props:IIdeasListProps){    
    const lipClassNames = useDefaultLipClassNames();
    console.log(props)
    return (
        <ScrollableBox
            {...lipClassNames}
            style={{ maxHeight: '100%', overflow: 'auto', flexGrow:1 }}
        >
            {
                // props.books.map((books) => (
                //     <Book
                //         id = {books.id}
                //         bookname = {books.bookname}
                //         link = {books.link}
                //     />
                // ))
                props.books.map(({ id, bookname, link }) => (<Book key={id} id={id} bookname={bookname} link={link}/>))

            }
        </ScrollableBox>
    );
}
