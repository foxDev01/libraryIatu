import React, { useEffect, useState } from 'react';

import SupportList from './SupportList';

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



export default function SupportPage() {
    const classes = useStyles();     
    const [question, setQuestion] = useState([])
    const [current_id, setCurrentId] = useState<number>(0)

    useEffect(
      () => {
      fetch(process.env.MIX_APP_URL + '/api/questions')
        .then(response => response.json() )
        .then(data => setQuestion(data) )
    }, [])

    // console.log("RETURNING")
    console.log("QUESTION",question)

    return (
    
    <div className={classes.root} >
      <Grid className={classes.grid} container spacing={3}>
        <Grid className={classes.grid} item xs>
          <Paper  className={classes.paper}>
            {
              question
              ?<SupportList 
              currentId={current_id}
              question={question}
              setCurrentId={setCurrentId}
                />
              : <span>...</span>
            }
          </Paper>
        </Grid>
      </Grid>
      
    </div>
    
    );
}
