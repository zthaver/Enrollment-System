import {useRef, useState} from 'react';
import "./SignUp.css";
import { useAuth } from "../../Contexts/AuthContext";
import emailjs from 'emailjs-com';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';

function SignUp()
{

let password = useRef();
let firstName = useRef();
let lastName = useRef();
let email = useRef();
const { signup } = useAuth();
const [error,setError] = useState("");

function handleSubmit(e)
{
    e.preventDefault();
    try
    {
        signup(email.current.value,password.current.value)
        emailjs.sendForm('service_39awvvo','template_gkw4bkq',e.target,"user_oGearzYTZGyhVqlL710SX")
        
    }
    catch
    {
        setError("Failed to sign up");
    }
    
}
const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
 return(
 <article>
   <Grid>
     <Paper elavation="20" style={paperStyle}>
     <Grid >
         <h2>Sign Up</h2>
     </Grid>
     <form onSubmit={handleSubmit}>
        <label>
         First Name
        </label>
        <br></br>        
        <input 
        ref={firstName}/>
        <br></br>
        <label>
         Last Name
        </label>
        <br></br>        
        <TextField 
        ref={lastName}/>
        <br></br>
        <label>
         Email
        </label>
        <br></br>        
        <input 
        ref={email} name="email"/>
        <br></br>
        <label>
         Password
        </label>
        <br></br>        
        <TextField 
        ref={password}
        type="password"/>
        <br></br>
        <br></br>
        <button>Sign Up</button>
        <br></br>
        <br></br>
        <h1>{error}</h1>
     </form>  
     </Paper>  
   </Grid>
 </article>
 )
}

export default SignUp;
