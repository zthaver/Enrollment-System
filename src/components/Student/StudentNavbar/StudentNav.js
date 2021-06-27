
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from "../../../Contexts/AuthContext";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'


// material ui

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
      },
      navBar:{
        background : '#D92A1D',
        minHeight: '84px',
        paddingTop: '10px',
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
      }
}))


export default function StudentNav(){
    const classes = useStyles();
    const { logout } = useAuth();
    const history = useHistory();

    function handleLogout()
    {
        logout();
        history.push("/login");
    }

    return(
        <div className={classes.root}>
            {/* NAVBAR */}  
            <AppBar position="fixed" className={classes.navBar} >
                <Toolbar>
        
                <Typography variant="h6" className={classes.title}>
                    Seneca College
                </Typography>
                
                <Button component={Link} to="/viewStudent" color="inherit">Account</Button>
                <Button component={Link} to="searchCourses" color="inherit"> Search Courses</Button>
                <Button color="inherit">Enrollment</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>

    )
}