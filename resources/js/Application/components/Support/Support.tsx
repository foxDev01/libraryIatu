import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

import ISupportProps from '../../interfaces/SupportProps';
import apiErrorMessage from '../../apiError';

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
    modal_paper: {
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

const Support: React.FC<ISupportProps> = (props) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isRedact, setIsRedact] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>(props.title);
    const [content, setContent] = useState<string>(props.content);

    useEffect(() => {
        setTitle(props.title);
        setContent(props.content);
    }, [props.title, props.content]);

    const acceptDeletion = () => {
        setError(null);
        setSaving(true);

        axios.delete(`/api/questions/${props.id}`)
            .then(() => {
                setModalOpen(false);
                props.onChanged();
            })
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(requestError, 'Не удалось удалить вопрос.'));
            })
            .finally(() => {
                setSaving(false);
            });
    };

    const cancelRedact = () => {
        setIsRedact(false);
        setTitle(props.title);
        setContent(props.content);
        setError(null);
    };

    const submitRedact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setSaving(true);

        axios.put(`/api/questions/${props.id}`, {
            title: title,
            content: content,
        })
            .then(() => {
                setIsRedact(false);
                props.onChanged();
            })
            .catch((requestError: unknown) => {
                setError(apiErrorMessage(requestError, 'Не удалось сохранить вопрос.'));
            })
            .finally(() => {
                setSaving(false);
            });
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                {isRedact ? (
                    <form className={classes.form} noValidate autoComplete="off" onSubmit={submitRedact}>
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
                        <div style={{ margin: 10 }}>
                            <Tooltip title="Отмена" arrow>
                                <Button size="small" onClick={cancelRedact} disabled={saving}>
                                    <Icon>clear_outlined</Icon>
                                </Button>
                            </Tooltip>
                            <Tooltip title="Редактировать" arrow>
                                <Button size="small" type="submit" disabled={saving}>
                                    <Icon>check_outlined</Icon>
                                </Button>
                            </Tooltip>
                        </div>
                    </form>
                ) : (
                    <>
                        <Typography className={classes.title} color="textPrimary" variant="h3">
                            {title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {content}
                        </Typography>
                    </>
                )}
                {error ? (
                    <Typography color="error" variant="body2" role="alert">
                        {error}
                    </Typography>
                ) : null}
            </CardContent>

            <CardActions style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <div>
                    <Button size="small" onClick={() => setIsRedact(true)} aria-label="Редактировать вопрос">
                        <Icon>edit</Icon>
                    </Button>
                    <Button size="small" onClick={() => setModalOpen(true)} aria-label="Удалить вопрос">
                        <Icon>delete_outline</Icon>
                    </Button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{ timeout: 500 }}
                    >
                        <Fade in={modalOpen}>
                            <div className={classes.modal_paper}>
                                <h2 id="transition-modal-title">Подтвердить удаление</h2>
                                <p id="transition-modal-description">
                                    Вы уверены, что хотите удалить этот вопрос?
                                </p>

                                <Tooltip title="Нет, я не хочу" arrow>
                                    <Button size="small" onClick={() => setModalOpen(false)} disabled={saving}>
                                        <Icon>clear_outlined</Icon>
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Да, удалить" arrow>
                                    <Button size="small" onClick={acceptDeletion} disabled={saving}>
                                        <Icon>check_outlined</Icon>
                                    </Button>
                                </Tooltip>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </CardActions>
        </Card>
    );
};

export default Support;
