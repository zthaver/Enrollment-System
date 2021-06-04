import { useAuth } from "../../Contexts/AuthContext";
import { useHistory } from 'react-router';


function ProfessorTestingPage()
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
            <h1>professor page</h1>
            <button onClick={handleLogout}> logout</button>
        </div>

        )
}

export default ProfessorTestingPage;