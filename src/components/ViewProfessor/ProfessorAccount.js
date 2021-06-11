import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth }  from '../../Contexts/AuthContext';

import firebase from '../../firebase';

import { useHistory } from 'react-router';


function ProfessorAccount(){

    //get current user UID
    const user = (firebase.auth().currentUser).uid;
    const uid = user;
        
    //manually have to input the uid because they don't match
    //CHANGE TO UID
    const profUser = firebase.firestore().collection("professors").doc('SWbVueeBQER8uonqKIZa');

    console.log(user);
    const { logout } = useAuth();
    const history = useHistory();
    const [userData, setData] = useState();

    const [userFname, setUserFname] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userLname, setUserLname] = useState();
    const [userPhone, setUserPhone] = useState();

    // if user id exists
    if (user !== null) {

        // console.log(email);
        console.log(uid);

        profUser.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setUserFname(doc.data().firstname);
                setUserLname(doc.data().lastname);
                setUserEmail(doc.data().email);
                setUserPhone(doc.data().phone);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }


    function handleLogout()
    {
        logout();
        history.push("/login");
    }

    console.log(userData);

    return(
    
      <div>
            <h1>Professor Account details</h1>
            <p>{userFname} {userLname}</p>
            <p>{userEmail}</p>
            <button color="inherit" onClick={handleLogout}>Logout</button>
      </div>

    )
}

export default ProfessorAccount;