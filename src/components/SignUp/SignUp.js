import {useRef, useState} from 'react';
import "./SignUp.css";
import { useAuth } from "../../Contexts/AuthContext" 

function SignUp()
{

let password = useRef();
let email = useRef();
const { signup } = useAuth();
const [error,setError] = useState("");

function handleSubmit(e)
{
    e.preventDefault();
    try
    {
        signup(email.current.value,password.current.value)
    }
    catch
    {
        setError("Failed to sign up");
    }
    
}
 return(
 <article>
     <h2>Sign Up</h2>
     <form onSubmit={handleSubmit}>
        <label>
         Email
        </label>
        <br></br>        
        <input 
        ref={email}/>
        <br></br>
        <label>
         Password
        </label>
        <br></br>        
        <input 
        ref={password}
        type="password"/>
        <br></br>
        <br></br>
        <button>Sign Up</button>
        <br></br>
        <br></br>
        <h1>{error}</h1>
     </form>
 </article>
 )
}

export default SignUp;