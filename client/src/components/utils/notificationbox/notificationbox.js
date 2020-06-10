import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector ,useDispatch } from "react-redux";


import { closeNotificationAction } from "./notificationAction";




function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export  function CustomizedSnackbars(props) {

    let { handleactionClick, message ,severity ="info",duration=6000 } =useSelector(state => state.notificationReducer.notification_config);
    const{ vertical= "right" ,horizontal ="bottom", } =props;
    const dispatch = useDispatch();
    console.log(message,vertical,horizontal,severity,duration)
   
    const notificationOpen =useSelector(state=>state.notificationReducer.notification_status)

  const classes = useStyles();

    const open =useSelector(state=>state.notificationReducer.notification_status) 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeNotificationAction());


  };

  return (
    <div className={classes.root}>
      <Snackbar 
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
  );
}