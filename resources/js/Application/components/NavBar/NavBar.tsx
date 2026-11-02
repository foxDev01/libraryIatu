import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonIcon from '@mui/icons-material/Person';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';

import ThemeToggle from '../ThemeToggle';
import { useSession } from '../../session';

interface NavBarProps {
    open: boolean;
    onToggleDrawer: () => void;
}

interface NavItem {
    title: string;
    url?: string;
    icon: React.ReactNode;
}

const drawerWidth = 240;

const NavBar: React.FC<NavBarProps> = ({ open, onToggleDrawer }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { auth, setAuth } = useSession();
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
                navigate('/login');
            });
    };

    const navItems: NavItem[] = [
        { title: user || 'Профиль', url: '/', icon: <PersonIcon /> },
        { title: 'О сервисе', url: '/about', icon: <InfoOutlinedIcon /> },
        { title: 'Помощь', url: '/support', icon: <SupportAgentOutlinedIcon /> },
        { title: 'Задать вопрос', url: '/add_new', icon: <HelpOutlineOutlinedIcon /> },
    ];

    return (
        <>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    borderBottom: 1,
                    borderColor: 'divider',
                    transition: (transitionTheme) => transitionTheme.transitions.create(['margin', 'width'], {
                        easing: open
                            ? transitionTheme.transitions.easing.easeOut
                            : transitionTheme.transitions.easing.sharp,
                        duration: open
                            ? transitionTheme.transitions.duration.enteringScreen
                            : transitionTheme.transitions.duration.leavingScreen,
                    }),
                    ...(open ? {
                        width: `calc(100% - ${drawerWidth}px)`,
                        ml: `${drawerWidth}px`,
                    } : {}),
                }}
            >
                <Toolbar>
                    <IconButton
                        onClick={onToggleDrawer}
                        edge="start"
                        sx={{ mr: 2 }}
                        color="inherit"
                        aria-label="Открыть меню"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant="h6" noWrap>
                        Электронная библиотека ИАТУ
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    <ThemeToggle />

                    {auth ? (
                        <Tooltip title="Меню пользователя" arrow>
                            <IconButton
                                edge="end"
                                aria-label="Меню пользователя"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircleIcon />
                            </IconButton>
                        </Tooltip>
                    ) : null}
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 1,
                        borderColor: 'divider',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        ...theme.mixins.toolbar,
                        justifyContent: 'flex-end',
                    }}
                >
                    <IconButton onClick={onToggleDrawer} aria-label="Закрыть меню">
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </Box>
                <Divider />

                <Box sx={{ px: 2, pt: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Группа
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }} noWrap>
                        {group ?? '—'}
                    </Typography>
                </Box>

                <List sx={{ mt: 1 }}>
                    {navItems.map((item) => (
                        <ListItem key={item.url} disablePadding>
                            <ListItemButton
                                component={NavLink}
                                to={item.url ?? '/'}
                                end={item.url === '/'}
                                sx={{
                                    '&.active': {
                                        bgcolor: 'action.selected',
                                        color: 'primary.main',
                                        '& .MuiListItemIcon-root': { color: 'primary.main' },
                                        '& .MuiListItemText-primary': { fontWeight: 600 },
                                    },
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    {disciplines.length > 0 ? <Divider sx={{ my: 1 }} /> : null}

                    {disciplines.map((discipline) => (
                        <ListItem key={discipline} sx={{ pl: 2 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <MenuBookOutlinedIcon color="primary" fontSize="small" />
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

export default NavBar;
