import { useAuth } from "../../../Contexts/AuthContext";
import { useHistory } from 'react-router';
import StudentNav from '../StudentNavbar/StudentNav'
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { firestore } from "../../../firebase";
import { useEffect } from "react";

function StudentHomePage()
{
    const { currentUser,logout } = useAuth();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
    console.log("in use effect");
   
    }, [])

    function handleLogout()
    {
        logout();
        history.push("/login");
        
    }
    console.log("state the obvious" + location.state)
 


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