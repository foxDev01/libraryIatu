import React, { useEffect, useState } from 'react';
import { makeStyles , Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import IIdeaProps from '../../interfaces/SupportProps';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import { SystemUpdateAltOutlined } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

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
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },    
}));

const Support: React.FC<IIdeaProps> = (props) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [modal_open, setModalOpen] = React.useState(false);
    const [is_redact, setIsRedact] = React.useState<boolean>(false);
    const [current_ideas, setCurrentIdeas] = useState<object[]>([])
    const [title, setTitle] = React.useState<string>(props.title);
    const [content, setContent] = React.useState<string>(props.content);

    const ModalOpen = () => {
        setModalOpen(true);
    };
    
    const ModalClose = () => {
        setModalOpen(false);
    };

    const AcceptDeletion = () => {
        ModalClose()
        fetch(
            process.env.MIX_APP_URL +
                '/api/questions/delete/' + props.id 
        )
        .then(function (response) {
            console.log(response);
        })
        .then(data => console.log(data))
        .catch(function (error) {
            console.log(error);
        });

    setIsRedact(false);
    };


    const CancelRedact = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsRedact(false)
        setTitle(props.title)
        setContent(props.content)
    };

    const EnableRedact = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsRedact(true)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;  

    // const updateAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     console.log("CLICK - id:" + props.id)
    //     props.setCurrentId(props.id)
    // }
   

    

    function redactSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        axios.post('api/questions/update', {
                id: props.id,
                title: title,
                content: content
            })
            .then(function (response) {
                console.log(response);
            })
            .then(data => console.log(data))
            .catch(function (error) {
                console.log(error);
            });

        setIsRedact(false);
    }

    const renderCardActions = (
        // props.focused == true && is_redact == false
        // ?
        <CardActions style={{alignItems: 'flex_end', justifyContent:'center'}}>
            <div>
                
                <Button size="small" onClick={EnableRedact}>
                    <Icon>
                        edit
                    </Icon>
                </Button>
                <Button size="small" onClick={ModalOpen}>
                    <Icon>
                        delete_outline
                    </Icon>
                </Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modal_open}
                    onClose={ModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modal_open}>
                        <div className={classes.modal_paper}>
                            <h2 id="transition-modal-title">
                            Подтвердить удаление
                            </h2>
                            <p id="transition-modal-description">
                            Вы уверены, что хотите удалить этот вопрос?
                            </p>

                            <Tooltip title="Нет, я не хочу" arrow>
                                <Button size="small" onClick={ModalClose}>
                                    <Icon>
                                        clear_outlined
                                    </Icon>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Да! я хочу" arrow>
                                <Button size="small" onClick={AcceptDeletion}>
                                    <Icon>
                                        check_outlined
                                    </Icon>
                                </Button>
                            </Tooltip>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </CardActions>
        //  :
        //  <></>

    );

   

    useEffect(
        () => {
            setTitle(props.title)
            setContent(props.content)
        }, 
        [props.title, props.content]
    )
   

    return (
        <>
            <Card className={classes.root} >
                <CardContent>
                    {
                        is_redact == true
                    ?<>
                        <form className={classes.form} noValidate autoComplete="off" onSubmit={redactSubmit}>
                            <TextField 
                                id="outlined-basic"
                                label="Тема вопроса"
                                variant="outlined"
                                value={title}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Вопрос"
                                multiline
                                value={content}
                                variant="outlined"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value)}
                            />
                            <div style={{margin: 10}} >
                                <Tooltip title="Отмена" arrow>
                                    <Button size="small" onClick={CancelRedact}>
                                        <Icon>
                                            clear_outlined
                                        </Icon>
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Редактировать" arrow>
                                    <Button size="small" type="submit">
                                        <Icon>
                                            check_outlined
                                        </Icon>
                                    </Button>
                                </Tooltip>
                            </div>
                        </form>
                    </>
                    :<>
                        <Typography className={classes.title} color="textPrimary" variant = 'h3'>                
                                {title}
                        </Typography>
                        <Typography variant="body2" component="p" >
                            {content}
                        </Typography>
                    </>
                    }
                </CardContent>
                {renderCardActions}
            </Card>
        </>
    );
}

export default Support;