import { Container, TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import './CreateProfessor.css'
import { useAuth } from "../../../Contexts/AuthContext";
import {useRef, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { firestore } from '../../../firebase';
import firebase from '../../../firebase';
import emailjs from 'emailjs-com';
import AdminNav from '../AdminNavbar/AdminNav';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      marginLeft:'240px',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        marginLeft:'240px',
      },
      formLabel:{
        display:'block',
        marginTop:'20px',
    },
    inputBox2:{
        width:'100%',
        border:"none",
        borderBottom:"1px solid black",
        fontSize:'1.1em',
        padding:"10px 0",
        '&:focus':{
            borderBottom:"1px solid #90CAF9",
            outline:"none"
        },
    }
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
                    "availability": [],
                    "isDepartmentHead":false,
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

    const paperStyle={padding:20,height:'70vh',width:280, margin:"40px auto"}
     return(
         <article className={classes.root}>
             <AdminNav/>
             <main className={classes.content}>
                <Paper elavation="20" style={paperStyle}>
                    <Container>
                    <h2>Create Professor</h2>
                        <form onSubmit={handleSubmit}>
                        <label className={classes.formLabel} id="label">
                        First Name 
                        </label>

                    <input className={classes.inputBox2} name="firstName" ref={firstName}>
                    </input>

                    <br></br><br></br> 
                    <label className={classes.formLabel} id="label">
                        Last name   
                        </label>

                    <input  className={classes.inputBox2} name="lastName" ref={lastName}>
                    </input>

                    <br></br><br></br> 
                    <label className={classes.formLabel} id="label">
                        Email   
                        </label>

                    <input  className={classes.inputBox2} name="email" ref={email}>
                    </input>
                    <br></br><br></br>

                    <h1> {error.message}</h1>
                    <Button color="primary" variant="outlined" type="submit" disabled={loading}> Create Professor </Button>

                    </form>
                    </Container>
                </Paper>
                
        </main>
             
         </article>
         
     )
 }

 export default CreateProfessor;