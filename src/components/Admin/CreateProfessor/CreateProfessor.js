import { TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
import './CreateProfessor.css'
import { useAuth } from "../../../Contexts/AuthContext";
import {useRef, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../../firebase';
import firebase from '../../../firebase';
import emailjs from 'emailjs-com';
import AdminNav from '../AdminNavbar/AdminNav';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    },
  }))
/*
The file to create a professor, add them to the database and then sned their credentials to them via email.
*/


function CreateProfessor()
 {
    let [loading,setLoading] = useState(false);
    let [error,setError] = useState("");
    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    const { signupProfessor } = useAuth();
    const classes = useStyles();
    function handleSubmit(e)
    {
        e.preventDefault();
        setLoading(true)
        //tests if email is a valid email
        if(/\S+@\S+\.\S+/.test(email.current.value))
        {
            //generates a unique password for the professor
            let uniquePassword = uuidv4();
            console.log("the password is"+uniquePassword)
             signupProfessor(email.current.value,uniquePassword)
             .then((value)=>{

                 //get Current user ID
                const user = (firebase.auth().currentUser).uid;

                //adds the professor to the database 
                //match uid with document id
                firestore.collection("professors").doc(user).set({
                    "email": email.current.value,
                    "firstname": firstName.current.value,
                    "lastname": lastName.current.value,
                    id: user
                }).then((val)=>{
                    console.log("user added to db")
                    var professorDetails = {email:email.current.value, password: uniquePassword}
                    alert('successful  sign up')
                    emailjs.send('service_39awvvo','template_gkw4bkq',professorDetails,"user_oGearzYTZGyhVqlL710SX")
                    //todo: send password and username to user
                })
             }).catch((err)=>{
               setError(err)
             })
            setLoading(false);
            setError("")
        }
        else
        {
            setError("email is not valid")
            setLoading(false);
        }
    }



     return(
         <article className={classes.root}>
             <AdminNav/>
             <main className={classes.content}>
                <h2>Create Professor</h2>
                <form onSubmit={handleSubmit}>
                <label id="label">
                First Name 
                </label>
                <br></br><br></br>

            <input  name="firstName" ref={firstName}>
            </input>

            <br></br><br></br> 
            <label id="label">
                Last name   
                </label>
                <br></br><br></br>

            <input  name="lastName" ref={lastName}>
            </input>

            <br></br><br></br> 
            <label id="label">
                Email   
                </label>
                <br></br><br></br>

            <input  name="email" ref={email}>
            </input>
            <br></br><br></br>

            <h1> {error.message}</h1>
            <Button type="submit" disabled={loading}> Create Professor </Button>

            </form>
        </main>
             
         </article>
         
     )
 }

 export default CreateProfessor;