import {React, useRef, useState, useEffect} from 'react';
import { generateUsername } from './utils';
import { useAuth } from '../Authentication/Auth'
import firebase from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { Link, useHistory } from 'react-router-dom';
import './signup.css';


function Signup(){

    const c_fName = useRef();
    const c_lName = useRef();
    const c_email = useRef();
    const c_password = useRef();
    const c_passwordConfirm = useRef();
    const history = useHistory();

    const { signup } = useAuth();

    const studentUser = firebase.firestore().collection("student");
    const [loading, setLoading] = useState(false);

        //error messages state
        const [errorMsg, setMsg] = useState("");

        //other states
        const [student, setStudent] = useState([]);
        const [userFirstName, setFirstName] = useState("");
        const [userLastName, setLastName] = useState("");
        const [userEmail, setEmail] = useState("");

    //Funtions
    function getUser(){
        setLoading(true);
        studentUser.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setStudent(items);
            setLoading(false);
        });
    }
    
    useEffect(() => {
        getUser();
    }, []);

    //loading 
    if(loading) {
        return <h1>Loading</h1> 
    }


    function addUser(newStudent){
        studentUser
        //create new document with id
            .doc(newStudent.id)
            .set(newStudent)
            .catch((err) => {
                console.error(err);
            })
    }

    console.log(studentUser);

    //submit form
  async function submit(e)
    {

    //    if (c_password.current.value !== c_passwordConfirm.current.value){
    //     setMsg("Passwords do not match");
    //    }
        if (c_fName.current.value === ""){
            alert('first name is empty');
            setMsg("first Name is empty");
            
            e.preventDefault();
        } else if (c_lName.current.value === ""){
            alert('last name is empty');
            setMsg("last name is empty");

            e.preventDefault();
        } 

        try{
            setMsg("");
            setLoading(true);

            await signup(c_email.current.value, c_password.current.value)
            history.push('/');
            
            let firstName = c_fName.current.value;
            let lastName = c_lName.current.value;
            let email = c_email.current.value;

            alert(email);


            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);

            addUser({userFirstName, userLastName, userEmail, studentId: uuidv4});

            generateUsername(firstName, lastName);


        } catch {
            console.log("Submission error");
        }

        setLoading(false);

    } return(
        <div className="formContainer">
            <form onSubmit={submit}>
                <h1>Sign Up</h1>

                <div>
                    <label>First Name:</label>
                    <input ref={c_fName} type="text"/>
                    <br/ >
                </div>

                <div>
                    <label>Last Name:</label>
                    <input ref={c_lName} type="text"/>
                    <br/ >
                </div>

                <div>
                    <label>Email:</label>
                    <input ref={c_email} type="email"/>
                    <br/ >
                </div>

                <div>
                    <label>Password:</label>
                    <input ref={c_password} type="password"/>
                    <br/ >
                </div>

                <div>
                    <label>Confirm Password:</label>
                    <input ref={c_passwordConfirm} type="password"/>
                    <br/ >
                </div>

                <input type="submit"/>
                
                <p className="errorMsg">{errorMsg}</p>

                <p className="text_logIn">Already Have an Account? <Link className="btn_logIn" to="#">Log In</Link></p>

    {/* 
                <div>
                    {student.map((user) => ( 
                        <div key={user.studentId}> 
                            <p>{user.firstName}</p> 
                            <p>{user.lastName}</p>
                            <p>{user.email}</p>    
                        </div>
                    ))}
                </div> */}
            </form>
        </div>

    )
}

export default Signup;
