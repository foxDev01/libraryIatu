import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useTheme } from '@material-ui/core/styles';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';

import useStyles from './includes/style';
import INavbarProps from '../../interfaces/INavbarProps';

const NavBar: React.FC<INavbarProps> = ({ open, handleDrawer, auth, setAuth, history }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [group, setGroup] = useState<string | null>(null);
    const [user, setUser] = useState<string>('');
    const [disciplines, setDisciplines] = useState<string[]>([]);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        let cancelled = false;

        axios.get<string>('/api/user')
            .then((response) => {
                if (!cancelled) {
                    setUser(response.data);
                }
            })
            .catch(() => undefined);

        axios.get<{ groupname: string | null }>('/api/groups')
            .then((response) => {
                if (!cancelled) {
                    setGroup(response.data.groupname);
                }
            })
            .catch(() => undefined);

        axios.get<string[]>('/api/disciplines')
            .then((response) => {
                if (!cancelled) {
                    setDisciplines(response.data);
                }
            })
            .catch(() => undefined);

        return () => {
            cancelled = true;
        };
    }, []);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        setAnchorEl(null);

        axios.get('/sanctum/csrf-cookie')
            .then(() => axios.post('/api/logout'))
            .catch(() => undefined)
            .finally(() => {
                setAuth(false);
                history.push('/login');
            });
    };

    const navItems = [
        { title: user || 'Профиль', url: '/', icon: 'person' },
        { title: 'О сервисе', url: '/about', icon: 'info' },
        { title: 'Помощь', url: '/support', icon: 'support' },
        { title: 'Задать вопрос', url: '/add_new', icon: 'help' },
    ];

    return (
        <>
            <AppBar
                position="static"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        onClick={handleDrawer}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Открыть меню"
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Библиотека института ГРУППА : {group ?? '—'}
                    </Typography>

                    <div className={classes.grow} />

                    <div className={classes.sectionDesktop}>
                        {auth ? (
                            <IconButton
                                edge="end"
                                aria-label="Меню пользователя"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        ) : null}
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawer} aria-label="Закрыть меню">
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />

                <List>
                    {navItems.map((item) => (
                        <ListItem button key={item.url}>
                            <ListItemIcon>
                                <Icon color="primary">{item.icon}</Icon>
                            </ListItemIcon>
                            <NavLink
                                exact
                                to={item.url}
                                style={{ color: '#05c3fc', fontWeight: 'normal' }}
                                activeStyle={{ color: '#0080FF', fontWeight: 'bold' }}
                            >
                                <ListItemText primary={item.title} />
                            </NavLink>
                        </ListItem>
                    ))}

                    {disciplines.map((discipline) => (
                        <ListItem key={discipline}>
                            <ListItemIcon>
                                <Icon color="primary">book</Icon>
                            </ListItemIcon>
                            <ListItemText primary={discipline} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>

            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
            </Menu>
        </>
    );
};

export default withRouter(NavBar);
