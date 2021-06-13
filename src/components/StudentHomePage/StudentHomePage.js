import { useAuth } from "../../Contexts/AuthContext";
import { useHistory } from 'react-router';
import StudentNav from '../StudentNavbar/StudentNav'

function StudentHomePage()
{
    const { currentUser,logout } = useAuth();
    const history = useHistory();


    function handleLogout()
    {
        logout();
        history.push("/login");
        
    }

    return(
        <div style={{paddingTop: "100px"}}>
            <StudentNav/>
            <h1>student page</h1>
            <button onClick={handleLogout}> logout</button>
        </div>

        )
}

export default StudentHomePage;

//Need to add more content