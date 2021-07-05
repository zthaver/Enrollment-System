import { useAuth } from "../../../Contexts/AuthContext"
import { useHistory } from 'react-router';
import './AdminHomePage.css';
import { useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import AdminNav from '../AdminNavbar/AdminNav';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    },
  }))

function AdminHomePage()
{
    const { currentUser,logout } = useAuth();
    const history = useHistory();
    const classes = useStyles();


    function handleLogout()
    {
        logout();
        history.push("/login");
        
    }
    
    return(
    <div className={classes.root}>
        <AdminNav />
        <main className={classes.content}>
            <h1>Admin Homepage</h1>
        </main>
    </div>
    )
}

export default AdminHomePage;