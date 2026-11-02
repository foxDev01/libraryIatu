import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import apiErrorMessage from '../../apiError';

interface SupportProps {
    id: number;
    title: string;
    content: string;
    onChanged: () => void;
}

const Support: React.FC<SupportProps> = (props) => {
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
        <Card variant="outlined" sx={{ m: '5px' }}>
            <CardContent>
                {isRedact ? (
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                        noValidate
                        autoComplete="off"
                        onSubmit={submitRedact}
                    >
                        <TextField
                            id="question-title"
                            label="Тема вопроса"
                            variant="outlined"
                            value={title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
                        />
                        <TextField
                            id="question-content"
                            label="Вопрос"
                            multiline
                            value={content}
                            variant="outlined"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value)}
                        />
                        <Box sx={{ m: '10px', display: 'flex', gap: 1 }}>
                            <Tooltip title="Отмена" arrow>
                                <Button size="small" onClick={cancelRedact} disabled={saving} aria-label="Отменить">
                                    <CloseOutlinedIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Редактировать" arrow>
                                <Button size="small" type="submit" disabled={saving} aria-label="Сохранить">
                                    <CheckOutlinedIcon />
                                </Button>
                            </Tooltip>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Typography variant="subtitle1" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
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

            <CardActions sx={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                <Box sx={{ m: '10px', display: 'flex', gap: 1 }}>
                    <Tooltip title="Редактировать" arrow>
                        <Button size="small" onClick={() => setIsRedact(true)} aria-label="Редактировать вопрос">
                            <EditOutlinedIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Удалить" arrow>
                        <Button size="small" onClick={() => setModalOpen(true)} aria-label="Удалить вопрос">
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                    </Tooltip>
                </Box>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{ backdrop: { timeout: 500 } }}
                >
                    <Fade in={modalOpen}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: { xs: 'calc(100% - 32px)', sm: 420 },
                                bgcolor: 'background.paper',
                                color: 'text.primary',
                                borderRadius: 2,
                                border: 1,
                                borderColor: 'divider',
                                boxShadow: 24,
                                p: { xs: 2, sm: 3 },
                            }}
                        >
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                                Подтвердить удаление
                            </Typography>
                            <Typography id="transition-modal-description" component="p">
                                Вы уверены, что хотите удалить этот вопрос?
                            </Typography>

                            <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Tooltip title="Нет, я не хочу" arrow>
                                    <Button
                                        size="small"
                                        onClick={() => setModalOpen(false)}
                                        disabled={saving}
                                        aria-label="Нет, я не хочу"
                                    >
                                        <Box component="span" sx={{ mr: 0.5 }}>Нет, я не хочу</Box>
                                        <CloseOutlinedIcon />
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Да, удалить" arrow>
                                    <Button
                                        size="small"
                                        onClick={acceptDeletion}
                                        disabled={saving}
                                        aria-label="Да, удалить"
                                    >
                                        <Box component="span" sx={{ mr: 0.5 }}>Да, удалить</Box>
                                        <CheckOutlinedIcon />
                                    </Button>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </CardActions>
        </Card>
    );
};

export default Support;
