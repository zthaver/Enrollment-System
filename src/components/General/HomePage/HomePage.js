import React, { useState } from 'react'

import { useAuth } from "../../../Contexts/AuthContext";
import CssBaseline from '@material-ui/core/CssBaseline';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#D92A1D',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '15vh'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      paddingRight:'40px'
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    myBtns:{
      background:"#D92A1D",
      float:"left",
      margin:'60px 20px',
    },
    links: {
      color:'#fff',
      padding:'10px',
      '&:hover':{
        color:'#000',
      },
    }
  }));
  
 function Home() {
    const classes = useStyles();
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>

            <Typography  component="h1" variant="h2">
              Welcome
            </Typography>
            <br/> 
            <br/> 


            <Typography align="center" component="h2" variant="h4">
                Sign Up or Log In  
                <br/> 
                <br/> 
                Seneca's Enrollment System
            </Typography>

            <div>
              <Button className={classes.myBtns}>
                <Link className={classes.links} href="/signup" variant="body1">
                  {"Sign Up"}
                </Link>
              </Button>

              <Button className={classes.myBtns}>
                <Link className={classes.links} href="/login" variant="body1">
                  {"Log In"}
                </Link>
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

export default Home;