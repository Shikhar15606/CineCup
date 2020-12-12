import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Hidden} from '@material-ui/core'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';



function HeaderComponent(){
  
        const useStyles = makeStyles((theme) => ({
          list: {
            width: 300,
          },
          fullList: {
            width: 'auto',
          },
            root: {
              flexGrow: 1,
              display:'flex'
              
            },
            menuButton: {
              marginRight: theme.spacing(2),
              
              color:'black'
            },
            title: {
                marginRight: theme.spacing(2),
                fontWeight:'bold',
                color:'black',
            },
            Button1:{
                marginRight: theme.spacing(2),
            },
            navText:{
              fontSize:20,
              marginLeft:5
            }
          }));
          const [state, setState] = React.useState(
            false
          );
        
          const toggleDrawer = ( open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
              return;
            }
        
            setState(open);
          };


          function TemporaryDrawer() {
            const classes = useStyles();
            
          
            
          
            return (
              <div>
                
                  <React.Fragment >
                    
                    <SwipeableDrawer anchor="left" open={state} onClose={toggleDrawer( false)} variant="temporary"  transitionDuration={ 10 }	>
                      <div style={{height:200,width:300,background:'red'}}>
                        <span style={{fontSize:30,fontWeight:'bold',color:'white',}}>
                          HEY USER
                        </span>
                       
                      </div>
                      <List className={classes.list}>
                      <Link to="/"> 
                      <ListItem button key="Home">
                      <ListItemIcon> <HomeRoundedIcon /> </ListItemIcon>
                      <ListItemText primary="Home" />
                      </ListItem>
                      </Link>

                      <Link to="/Search"> 
                      <ListItem button key="Search">
                      <ListItemIcon> <SearchRoundedIcon /> </ListItemIcon>
                      <ListItemText primary="Search" />
                      </ListItem>
                      </Link>

                      <Link to="/dashboard"> 
                      <ListItem button key="Dashboard">
                      <ListItemIcon> <DashboardRoundedIcon /> </ListItemIcon>
                      <ListItemText primary="Dashboard" />
                      </ListItem>
                      </Link>
                      <ListItem button key="Login">
                      <Button variant="contained" color="secondary" href="/login" className={classes.Button1}> Login</Button>
                      </ListItem>
                      <ListItem button key="Signup">
                      <Button variant="contained" color="primary" href="/signup" className={classes.Button1}> Signup</Button>
                      </ListItem>
                    
                    
                      </List>
                    </SwipeableDrawer>
                  </React.Fragment>
                
              </div>
            );
          }




          
           function ButtonAppBar() {
            const classes = useStyles();
          
            return (
              <div className={classes.root}>
                <AppBar position="sticky" color="transparent">
                  <Toolbar>
                    
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                     CINECUP
                    </Typography>

                    <Hidden smDown>
                    <div style={{position:"absolute",right:0}}>
                    <Link to="/"> 
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <HomeRoundedIcon fontSize="small"/>
                      <span className={classes.navText}>Home</span>
                    </IconButton>
                    </Link>
                    <Link to="/search">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <SearchRoundedIcon fontSize="small"/>
                      <span className={classes.navText}>Search</span>
                    </IconButton>
                    </Link>
                    <Link to="/dashboard">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                      <DashboardRoundedIcon fontSize="small"/>
                      <span className={classes.navText}>Dashboard</span>
                    </IconButton>
                    </Link>
                    
                   
                    <Button variant="contained" color="secondary" href="/login" className={classes.Button1}> Login</Button>
                    
                    <Button variant="contained" color="primary" href="/signup" className={classes.Button1}> Signup</Button>
                    </div>
                    </Hidden>
                    
                  </Toolbar>
                    
                   
                </AppBar>
              </div>
            );
          }
       
        return (
          <>
          <TemporaryDrawer />
          <ButtonAppBar />
          
          </>
        );
    
  }

export default HeaderComponent;

/*

  <div>
                // <Link to="/">CineCup</Link><br/>
                // <Link to="/login">Login</Link><br/>
                // <Link to="/signup">Signup</Link><br/>
                // <Link to="/dashboard">DashBoard</Link><br/>
                // <Link to="/search">Search</Link><br/>
            </div>
            */