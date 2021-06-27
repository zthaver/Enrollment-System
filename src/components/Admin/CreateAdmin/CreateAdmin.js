import { TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
import './CreateAdmin.css'
import {useRef, useState} from 'react';
import { firestore } from '../../../firebase';
import { useAuth } from "../../../Contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';
import emailjs from "emailjs-com";
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

function CreateAdmin()
 {
    let [loading,setLoading] = useState(false);
    let [error,setError] = useState("");
    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    const { signupAdmin } = useAuth();
    const classes = useStyles();

    function handleSubmit(e)
    {
        e.preventDefault();
        setLoading(true)
        console.log("form submitted");
        if(/\S+@\S+\.\S+/.test(email.current.value))
        {
          let generatedPassword = uuidv4();
          signupAdmin(email.current.value, generatedPassword)
          .then((val)=>{
            firestore.collection("admin").add({
              "email": email.current.value,
              "firstName": firstName.current.value,
              "lastName": lastName.current.value,
              "isDepartmentHead" : false
            }).then((val)=>{
    console.log("Admin Created. Password: " + generatedPassword)
              var adminDetails = {email:email.current.value, password: generatedPassword}
              alert('successful  sign up')
              emailjs.send('service_39awvvo','template_gkw4bkq',adminDetails,"user_oGearzYTZGyhVqlL710SX")
            })
          })
          .catch((error)=>{
            setError(error)
          })
          setLoading(false);
          setError("")
        }
        else
        {
          setError("Error: Please enter a valid email address")
          setLoading(false);
        }
    }

    return(
      <div className={classes.root}>
        <AdminNav/>
        <main className={classes.content}>
          <form onSubmit={handleSubmit}>
            <h2>Admin Creation</h2>

            <label id="label">First Name </label>
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

           <input name="email" ref={email}>
           </input>
           <br></br><br></br>

           <h1> {error}</h1>
           <Button type="submit" disabled={loading}> Create Admin </Button>

         </form>
       </main>
       </div>
       
         
     )
 }

 export default CreateAdmin;