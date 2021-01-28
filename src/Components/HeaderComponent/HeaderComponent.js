import React from 'react';
import { Link } from 'react-router-dom';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { lightTheme, darkTheme } from '../../theme';
import { GlobalStyles } from '../../global';

import Toggle from '../Toggle';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Timeline from '@material-ui/icons/Timeline';

import { Hidden } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import List from '@material-ui/core/List';
import './HeaderStyle.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HistoryIcon from '@material-ui/icons/History';

import Switch from '@material-ui/core/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../action/user_actions';

import { ExitToAppRounded } from '@material-ui/icons';
function HeaderComponent({ theme, toggleTheme, componentMounted }) {
  const user = useSelector(state => state.user);
  const User = useSelector(state => state.user.user);

  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
  };

  const useStyles = makeStyles(theme => ({
    list: {
      width: 300,
      alignItems: 'center',
    },

    root: {
      flexGrow: 1,
      display: 'flex',
    },
    menuButton: {
      marginRight: theme.spacing(2),

      color: 'white',
    },
    title: {
      marginRight: theme.spacing(2),
      fontWeight: 'bold',
      color: 'white',
    },
    Button1: {
      marginRight: theme.spacing(2),
    },
    navText: {
      fontSize: 20,
      marginLeft: 5,
    },
  }));
  const [state, setState] = React.useState(false);

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  function TemporaryDrawer() {
    const classes = useStyles();

    return (
      <div>
        <React.Fragment>
          <SwipeableDrawer
            anchor='left'
            open={state}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <div className='drawe'>
              <div style={{ width: '100%', display: 'flex' }}>
                <IconButton
                  style={{ position: 'absolute', right: 0 }}
                  onClick={toggleDrawer(false)}
                >
                  <CancelRoundedIcon color='secondary' />
                </IconButton>
              </div>
              {user.isLoggedIn ? (
                <div className='navbrand'>
                  <img className='rounded' src={User.ProfilePic} />
                  <h2 className='title title-medium'>{User.Name}</h2>
                </div>
              ) : (
                <div className='navbrand'>
                  <img
                    className='rounded'
                    src='https://icons.iconarchive.com/icons/custom-icon-design/flatastic-3/256/user-icon.png'
                  />
                  <h2 className='title title-medium'>Welcome Guest</h2>
                </div>
              )}
              <List className={classes.list}>
                <Link to='/'>
                  <ListItem button key='Home' onClick={toggleDrawer(false)}>
                    <ListItemIcon>
                      {' '}
                      <HomeRoundedIcon color='primary' />{' '}
                    </ListItemIcon>
                    <ListItemText primary='HOME' />
                  </ListItem>
                </Link>

                <Link to='/leaderboard'>
                  <ListItem
                    button
                    key='leaderboard'
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemIcon>
                      {' '}
                      <Timeline color='primary' />{' '}
                    </ListItemIcon>
                    <ListItemText primary='LEADERBOARD' />
                  </ListItem>
                </Link>

                <Link to='/history'>
                  <ListItem button key='history' onClick={toggleDrawer(false)}>
                    <ListItemIcon>
                      {' '}
                      <HistoryIcon color='primary' />{' '}
                    </ListItemIcon>
                    <ListItemText primary='CONTESTS' />
                  </ListItem>
                </Link>

                <Link to='/Search'>
                  <ListItem button key='Search' onClick={toggleDrawer(false)}>
                    <ListItemIcon>
                      {' '}
                      <SearchRoundedIcon color='primary' />{' '}
                    </ListItemIcon>
                    <ListItemText primary='SEARCH' />
                  </ListItem>
                </Link>

                <ListItem key='Dark Mode'>
                  <ListItemIcon>
                    {' '}
                    <Brightness4Icon color='primary' />{' '}
                  </ListItemIcon>
                  <Toggle theme={theme} toggleTheme={toggleTheme} />
                  {theme === 'light' ? 'LIGHT' : 'DARK'}
                </ListItem>

                {user.isLoggedIn ? (
                  <React.Fragment>
                    <Link to='/dashboard'>
                      <ListItem
                        button
                        key='Dashboard'
                        onClick={toggleDrawer(false)}
                      >
                        <ListItemIcon>
                          {' '}
                          <DashboardRoundedIcon color='primary' />{' '}
                        </ListItemIcon>
                        <ListItemText primary='DASHBOARD' />
                      </ListItem>
                    </Link>
                    {user.user.IsAdmin ? (
                      <Link to='/admin'>
                        <ListItem
                          button
                          key='Admin Dashboard'
                          onClick={toggleDrawer(false)}
                        >
                          <ListItemIcon>
                            {' '}
                            <SupervisorAccountIcon color='primary' />{' '}
                          </ListItemIcon>
                          <ListItemText primary='ADMIN DASHBOARD' />
                        </ListItem>
                      </Link>
                    ) : (
                      <Link></Link>
                    )}
                    <ListItem
                      button
                      key='Logout'
                      onClick={() => {
                        toggleDrawer(false);
                        Logout();
                      }}
                    >
                      <ListItemIcon>
                        {' '}
                        <LockOpenRoundedIcon color='primary' />{' '}
                      </ListItemIcon>
                      <ListItemText primary='LOGOUT' />
                    </ListItem>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to='/login'>
                      <ListItem
                        button
                        key='Login'
                        onClick={toggleDrawer(false)}
                      >
                        <ListItemIcon>
                          {' '}
                          <LockOpenRoundedIcon color='primary' />{' '}
                        </ListItemIcon>
                        <ListItemText primary='LOGIN' />
                      </ListItem>
                    </Link>

                    <Link to='/signup'>
                      <ListItem
                        button
                        key='Signup'
                        onClick={toggleDrawer(false)}
                      >
                        <ListItemIcon>
                          {' '}
                          <PersonAddRoundedIcon color='primary' />{' '}
                        </ListItemIcon>
                        <ListItemText primary='SIGNUP' />
                      </ListItem>
                    </Link>
                  </React.Fragment>
                )}
              </List>
            </div>
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    );
  }

  function ButtonAppBar() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position='fixed' className='navbar_h'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              CINECUP
            </Typography>

            <Hidden mdDown>
              <div style={{ position: 'absolute', right: 0 }}>
                <Link to='/'>
                  <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                  >
                    <HomeRoundedIcon fontSize='small' />
                    <span className={classes.navText}>Home</span>
                  </IconButton>
                </Link>
                <Link to='/leaderboard'>
                  <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                  >
                    <Timeline fontSize='small' />
                    <span className={classes.navText}>LeaderBoard</span>
                  </IconButton>
                </Link>

                <Link to='/history'>
                  <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                  >
                    <HistoryIcon fontSize='small' />
                    <span className={classes.navText}>Contests</span>
                  </IconButton>
                </Link>

                <Link to='/search'>
                  <IconButton
                    edge='start'
                    className={classes.menuButton}
                    color='inherit'
                    aria-label='menu'
                  >
                    <SearchRoundedIcon fontSize='small' />
                    <span className={classes.navText}>Search</span>
                  </IconButton>
                </Link>
                {user.isLoggedIn ? (
                  <React.Fragment>
                    <Link to='/dashboard'>
                      <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                      >
                        <DashboardRoundedIcon fontSize='small' />
                        <span className={classes.navText}>Dashboard</span>
                      </IconButton>
                    </Link>
                    {user.user.IsAdmin ? (
                      <Link to='/admin'>
                        <IconButton
                          edge='start'
                          className={classes.menuButton}
                          color='inherit'
                          aria-label='menu'
                        >
                          <SupervisorAccountIcon fontSize='small' />
                          <span className={classes.navText}>
                            Admin Dashboard
                          </span>
                        </IconButton>
                      </Link>
                    ) : (
                      <Link></Link>
                    )}

                    <IconButton
                      edge='start'
                      className={classes.menuButton}
                      color='inherit'
                      aria-label='menu'
                      onClick={Logout}
                    >
                      <ExitToAppRounded fontSize='small' />
                      <span className={classes.navText}>Logout</span>
                    </IconButton>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Link to='/login'>
                      <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                      >
                        <LockOpenRoundedIcon fontSize='small' />
                        <span className={classes.navText}>Login</span>
                      </IconButton>
                    </Link>
                    <Link to='/signup'>
                      <IconButton
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                      >
                        <PersonAddRoundedIcon fontSize='small' />
                        <span className={classes.navText}>Signup</span>
                      </IconButton>
                    </Link>
                  </React.Fragment>
                )}
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  if (user.isLoading) return <></>;
  if (!componentMounted) {
    return <div />;
  }
  return (
    <>
      <TemporaryDrawer />
      <ButtonAppBar />
    </>
  );
}

export default HeaderComponent;
