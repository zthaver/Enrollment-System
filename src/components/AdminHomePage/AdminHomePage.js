import { useAuth } from "../../Contexts/AuthContext";
import { useHistory } from 'react-router';

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
    <h1> {currentUser.email}</h1>
    <button onClick={handleLogout}> logout</button>
    </div>

)
}

export default AdminHomePage;