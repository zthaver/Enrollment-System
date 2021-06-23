
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth }  from '../../Contexts/AuthContext';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'


// material ui

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 240;

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
      },

      appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor:'blue',
      },
      drawerPaper: {
        width: drawerWidth,
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        marginLeft:'240px',
      },
}))


export default function AdminNav(){
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
                <div className={classes.root}>
                <CssBaseline />

                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <ListItem button component={Link} to="/admin">
                    <h2 align="center">Seneca College</h2>
                    </ListItem>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/createAdmin">
                            <ListItemText primary="Create Admin" />
                        </ListItem>
                        <ListItem button component={Link} to="/createDepartment">
                            <ListItemText primary="Create Department" />
                        </ListItem>
                        <ListItem button component={Link} to="/createCourse">
                            <ListItemText primary="Create Course" />
                        </ListItem>
                        <ListItem button component={Link} to="/createProgram">
                            <ListItemText primary="Create Program" />
                        </ListItem>
                        <ListItem button component={Link} to="/createProfessor">
                            <ListItemText primary="Create Prof" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to="/viewCourse">
                            <ListItemText primary="Manage Course" />
                        </ListItem>
                        <ListItem button component={Link} to="/viewDepartment">
                            <ListItemText primary="Manage Department" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageProgram">
                            <ListItemText primary="Manage Program" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageStudent">
                            <ListItemText primary="Manage Student" />
                        </ListItem>
                        <ListItem button component={Link} to="/manageProfessor">
                            <ListItemText primary="Manage Professor" />
                        </ListItem>
                    </List>
                    <Divider />
                    <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                    </ListItem>
                </Drawer>
                
                </div>            
        </div>

    )
}