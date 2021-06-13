import React, { useState } from 'react'
// import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
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
  }));
  
 function Home() {
    const classes = useStyles();
  
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>

            </Avatar> */}
            <Typography component="h1" variant="h2">
              Welcome
            </Typography>
            <br/> 
            <Typography component="h2" variant="h4">
                Sign Up or Log In to access <br/> 
                Seneca's Enrollment System
            </Typography>

              <Grid container>
                <Grid item  md={6}>
                  <Link href="/signup" variant="body1">
                    {"Sign Up"}
                  </Link>
                </Grid>

                <Grid item md={6}>
                  <Link href="/login" variant="body1">
                    {"Log In"}
                  </Link>
                </Grid>

              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
          </div>
        </Grid>
      </Grid>
    );
  }



// function Home(){
//     const [error, setError] = useState("");
//     const {currentUser, logout} = useAuth();
//     const history = useHistory();

//     async function handleLogout(){

//         setError('');
    
//         try {

//             await logout()
//             history.push('/signup')
//         } catch {
//             setError('Failed to logout');
//         }
//     };


//     return (
        

//         <Grid container component="main" className={classes.root}>

//         </Grid>
//         <div className="container_home">
//             <section>
//                 <h1>HomePage</h1>
//                 <button onClick={handleLogout}> 
//                     Log Out
//                 </button>
//             </section>
//             <section>
            
//             </section>

//         </div>
//     )
// }

export default Home;