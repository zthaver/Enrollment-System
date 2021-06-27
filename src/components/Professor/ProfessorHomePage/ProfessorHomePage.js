import { useAuth } from "../../../Contexts/AuthContext";
import { useHistory } from 'react-router';
import ProfNav from '../ProfessorNavbar/ProfNav'


function ProfessorHomePage()
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
            <ProfNav/>
            <h1>professor page</h1>
            <button onClick={handleLogout}> logout</button>
        </div>

        )
}

export default ProfessorHomePage;