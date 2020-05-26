import React from 'react';
import { Paper, Grid, makeStyles, Link, CssBaseline } from '@material-ui/core';
import Login from '../components/login/login'



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  }
}));

export default function Landing(props) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}  >

        
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Login {...props}></Login>
      </Grid>
    </Grid>
  );
}