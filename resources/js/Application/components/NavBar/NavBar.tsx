import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTheme } from '@material-ui/core/styles';
import { AppBar, Badge, Divider, Drawer, IconButton, InputBase, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';

import useStyles from './includes/style';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import INavbarProps from '../../interfaces/INavbarProps';
import Icon from '@material-ui/core/Icon';

import Cookies from 'js-cookie';
import axios from 'axios';

const NavBar: React.FC<INavbarProps> = ({open, handleDrawer, auth, setAuth, history}) => {
    const classes = useStyles();
    const theme = useTheme();
    //меню при клике на аватарку

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/logout').then(function (response) {
                //console.log(response)
                // setAnchorEl(null);
                Cookies.remove('user_logged_in');
                setAuth(false);        
                history.push('/login');
            }).catch(function (error) {
                console.log(error);
            });
        });
        
    };
// GROUP USER
const [group,
    setGroup] = useState([])

  useEffect(() => {
    fetch(process.env.MIX_APP_URL + '/api/groups')
      .then(response => response.json())
      .then(data => setGroup(data))
  },[])
  
    // console.log("ГРУППА",":",group)

// NAME USER
    const [user,
        setUser] = useState([])
    
      useEffect(() => {
        fetch(process.env.MIX_APP_URL + '/api/user')
          .then(response => response.json())
          .then(data => setUser(data))
      },[])
    //   console.log(user)

    // DISCIPLINES USER
const [disciplines,setDisciplines] = useState([])
  useEffect(
      () => { 
    fetch(process.env.MIX_APP_URL + '/api/disciplines')
      .then(response => response.json())
      .then(data => setDisciplines(data))
  },[])
//   console.log("ДИСЦИПЛИНЫ",":",disciplines)


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        > 
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
    );


    let listEl = disciplines.map(d => (

       
                <ListItem >
                    <ListItemIcon>
                            <Icon color="primary">book</Icon>
                        </ListItemIcon>
                            <ListItemText primary={d} key={d} />
                </ListItem>
        
    ))

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
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Библиотека института  ГРУППА : {group}
                    </Typography>
                     {/* <div className={classes.search}>
                     <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                            <InputBase
                            placeholder="Поиск…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                    </div> */}
                            
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {
                            auth == true 
                            ?
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            : 
                            <></>
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawer}>
                        {theme.direction === "ltr" ? (
                            <ChevronLeftIcon />
                        ) : (
                                <ChevronRightIcon />
                            )}
                    </IconButton>
                </div>
                <Divider />

                {/* список слева */}
            
                <List>
                    
                    {[
                        {'title': user,'url':'/','icon':'person'} ,
                        {'title':'О сервисе','url':'/about','icon':'info'},
                        {'title':'Помощь','url':'/support','icon':'support'},
                        {'title':'Задать вопрос','url':'/add_new','icon':'help'},
                        
                        
                    ].map((value, index) => (
                        <ListItem button key={index}>
                        <ListItemIcon>
                            <Icon color="primary">{value.icon}</Icon>
                        </ListItemIcon>
                        <NavLink 
                            exact
                            to={value.url} 
                            style={{color:"#05c3fc", fontWeight:"normal"}} 
                            activeStyle={{color:"#0080FF", fontWeight:"bold"}}
                        >
                            <ListItemText primary={value.title} />
                        </NavLink>
                        </ListItem>
                    ))}
                        
                    {listEl} 
                        

                </List>
                <Divider />
            </Drawer>
            {renderMenu}
        </>
    )
}

export default withRouter(NavBar);
