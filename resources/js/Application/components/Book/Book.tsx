import React, { useEffect, useState } from 'react';
import { makeStyles , Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IIdeaProps from '../../interfaces/BooksProps';


const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
        minWidth: 150,    
        margin: 5,        
    },
    bullet: {        
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
        align: 'left'

    },
    pos: {
        marginBottom: 12,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal_paper:{
        position: 'absolute',
        width: 400,
        backgroundColor: '#CCCCFF',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),        
    },
}));

export default function Book (props:IIdeaProps)  {
    const classes = useStyles();

    // const [bookname, setTitle] = React.useState<string>(props.bookname);
    // const [link, setContent] = React.useState<string>(props.link);

    // useEffect(
    //     () => {
    //         setTitle(props.bookname)
    //         setContent(props.link)
    //     }, 
    //     [props.bookname, props.link]
    // )
    console.log(props)

    return (
        <>
            <Card className={classes.root} style={
                { backgroundColor:'#FFFFFF'}
                }>
                <CardContent>
                    {
                    <>
                        <Typography className={classes.title}  color="textPrimary" variant = 'h3' align="left" >                
                        {props.bookname}  
                        </Typography>
                        <Typography variant="body2" component="p" align="left">
                            <a href={props.link}  target="_blank" > Скачать </a>
                        </Typography>
                    </>
                    }
                </CardContent>
            </Card>
        </>
    );
}

