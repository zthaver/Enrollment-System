import {useRef, useState} from 'react';
import "./SignUp.css";
import { useAuth } from "../../Contexts/AuthContext";
import emailjs from 'emailjs-com';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import { useHistory } from 'react-router';
import firebase from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import Link from '@material-ui/core/Link';


function SignUp()
{
    // reference variables
    const password = useRef();
    const email = useRef();
    const fName = useRef();   
    const lName = useRef();   
    const history = useHistory();

    //use states
    const [userEmail, setEmail] = useState("");
    const [firstName, setfName] = useState("");
    const [lastName, setlName] = useState("");
    const [error,setError] = useState("");

    const { signupStudent } = useAuth();

    // firebase student collection
    const studentUser = firebase.firestore().collection("student");

    async function handleSubmit(e)
    {

        e.preventDefault();
        console.log("here1")

            await signupStudent(userEmail,password.current.value)
            .then((value)=>{
                //add student info to the firestore database
                studentUser.add({
                    firstname: firstName,
                    lastname: lastName,
                    email: userEmail,
                })
                .then(() => {
                    emailjs.sendForm('service_39awvvo','template_gkw4bkq',e.target,"user_oGearzYTZGyhVqlL710SX")
                    alert('successful  sign up')
                    history.push("/login")
                })
                
            }).catch((err)=>{
                console.log("success" +err)
                setError(err)
                
            })
            
    }

    // function addUser(newStudent){

    //     studentUser
    //     //create new document with id
    //         .doc(newStudent.id)
    //         .set(newStudent)
    //         .catch((err) => {
    //             console.error(err);
    //         })
    // }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}

    return(
        <article>
        <Grid>
            <Paper elavation="20" style={paperStyle}>
                <Grid >
                    <h2>Sign Up</h2>
                </Grid>
                <form onSubmit={handleSubmit}>

                    <label>First name:</label>
                    <br />        
                    <input  name="firstName" value={firstName} type="text" onChange={(e)=> setfName(e.target.value) } required/>
                    <br />
                    <br />

                    <label>Last name:</label>
                    <br />        
                    <input  name="lastName" value={lastName} onChange={(e)=> setlName(e.target.value) } type="text" required/>
                    <br />
                    <br />

                    <label>Email</label>
                    <br />        
                    <input  name="email" value={userEmail} onChange={(e)=> setEmail(e.target.value) } type="email"/>
                    <br />
                    <br />

                    <label>Password</label>
                    <br />
                    <input ref={password} type="password" name="password"/>
                    <br />
                    <br />

                    <br></br>

                    <button>Sign Up</button>
                    
                    <br></br>
                    <br></br>
                    {
                        error?<h1>{error.message}</h1>
                        :<h1></h1>
                    }
                    
                </form>  
                <p>Already have an Acoount? <Link href="/login">Log In</Link></p>
            </Paper>  
        </Grid>
        </article>
    )
}

export default SignUp;
