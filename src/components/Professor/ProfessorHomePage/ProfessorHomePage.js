import { useAuth } from "../../../Contexts/AuthContext";
import { useHistory } from 'react-router';
import ProfNav from '../ProfessorNavbar/ProfNav'
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import { firestore }  from "../../../firebase";
import firebase from "../../../firebase";


function ProfessorHomePage()
{
    const location = useLocation();
    const { currentUser,logout } = useAuth();
    let [departmentHead,setDepartmentHead] = useState(false);
    const history = useHistory();
    console.log((firebase.auth().currentUser).uid)

    useEffect(() => {
        console.log("in use effect");
        firestore.collection("professors").doc((firebase.auth().currentUser).uid).get().then((val)=>{
            setDepartmentHead(val.data().isDepartmentHead);
        })
        }, [])
    function handleLogout()
    {
        logout();
        history.push("/login");
        
    }
    return(
        <div style={{paddingTop: "100px"}}>
            <ProfNav isDepartmentHead={departmentHead}/>
            <h1>professor page</h1>
            <button onClick={handleLogout}> logout</button>
        </div>

        )
}

export default ProfessorHomePage;