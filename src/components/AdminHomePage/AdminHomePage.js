import { useAuth } from "../../Contexts/AuthContext";
import { useHistory } from 'react-router';
import './AdminHomePage.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";

function AdminHomePage()
{
    const { currentUser,logout } = useAuth();
    const history = useHistory();


    function handleLogout()
    {
        logout();
        history.push("/login");
        
    }
return(
    <div>
     <AppBar>
        <Toolbar>
         <Link> Home </Link>
         <Link to="/createAdmin" > Create Admin </Link>
         <Link to="/createProfessor" > Create Professor </Link>
         <Link to="/createDepartment"> Create Department </Link>
         <Link to="/createCourse"> Create Course </Link>
         <Link to="/viewCourse"> Manage Course </Link>
         <Link to="/createProgram"> Create Program </Link>
         <Link to="/manageProgram"> Manage </Link>
         <button onClick={handleLogout}> logout</button>
        </Toolbar>     
    </AppBar>   
    
    </div>

)
}

export default AdminHomePage;