import React  from 'react';
import {IconButton, Menu, MenuItem, Avatar, Button, Typography, Toolbar, AppBar, makeStyles}  from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import  AccountCircle  from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideNavAction } from './headerAction'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  username:{
    textTransform: 'capitalize'
  }
}));


const Header = (props) => {
  const classes = useStyles();
  let sideNaveFlag = true;
  const userData = localStorage.getItem('username') || null

  const dispatch = useDispatch();
  const toggleSideNavFunction = (data) => dispatch(toggleSideNavAction(data));

  const setDrawer = ()=> {
    console.log('toggling sidenav', sideNaveFlag);
    sideNaveFlag = ! sideNaveFlag
    toggleSideNavFunction(sideNaveFlag)
  }

  console.log("Props inside header", props)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("....")
    setAnchorEl(null);
  };
  const logoutUser = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    props.history.push('/')
  }


  const redirectHome =() =>{
    props.history.push('/project')
  }
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          {props.location.pathname ==='/project' ? null : (
               <IconButton onClick={setDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
               <MenuIcon />
               </IconButton>
          )}

          
          
          <Typography align="center" variant="h6" className={classes.title} onClick={redirectHome}>
            Project List
          </Typography>


          <IconButton><AccountCircle /></IconButton>
          <Typography className={classes.username}>{userData}</Typography>
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}

                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={logoutUser}>Log Out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>

    </div>)
}

export default withRouter(Header);