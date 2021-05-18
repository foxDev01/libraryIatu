import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Buttons from '../Buttons';
import Book from './Book';
import BooksList from './BooksList';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position:'relative', 
      height:'500px',
      padding:'10px', 
      margin:'3px', 
      backgroundColor:'#91CEEE'
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      position:'relative',
      height:'100%',
      backgroundColor:'#DDDDFF'
    
    },
    grid: {
        position:'relative', 
        height:'100%'
    },
  }),
);


export default function BookPage() {
    const classes = useStyles();     
    console.log("RETURNING")
    
// BOOKS
    const [books, setBooks] = useState([])
    useEffect (
      () => {
      fetch(process.env.MIX_APP_URL + '/api/books')
        .then(res => res.json() )
        .then(data => setBooks(data) )
    }, [])
    console.log("КНИГИ",":",books)

    


    return (
    
    <div className={classes.root} >
      <Grid className={classes.grid} container spacing={3}>

{/* КНИГИ */}
        <Grid className={classes.grid} item xs>
          <Paper  className={classes.paper}>
            {
              books
              ?<BooksList 
                  books={Array.prototype.concat.apply([], books)} 
                />
              : <span>...</span>
            }
          </Paper>
        </Grid>

      
      </Grid>
      
    </div>
    
    );
}
function books(books: any) {
  throw new Error('Function not implemented.');
}

