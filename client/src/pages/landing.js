import React from 'react';
import { Paper, Grid, makeStyles, Link, CssBaseline } from '@material-ui/core';
import Login from '../components/auth/login'



const useStyles = makeStyles((theme) => ({
  root: {
    margin:'5vh',
    height: '80vh',
  }
}));

export default function Landing(props) {
  const classes = useStyles();

  return (
    <Grid container justify="center" component="main" className={classes.root} >
      <CssBaseline />
      <Grid item xs={12} sm={5} md={5} component={Paper} elevation={6}  square>
        <Login {...props}></Login>
      </Grid>
    </Grid>
  );
}