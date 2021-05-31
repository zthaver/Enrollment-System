import {useRef, useState} from 'react';
import { useHistory } from 'react-router';
import { useAuth } from "../../Contexts/AuthContext" 

function Login()
{
    let password = useRef();
let email = useRef();
const { login } = useAuth();
const [error,setError] = useState("");
const history = useHistory();

async function handleSubmit(e)
{
    e.preventDefault();
    try{
        await login(email.current.value,password.current.value)
        history.push("/")
    }
    catch
    {
        setError("Failed To Log In")
    }
 
}
    return(
        <article>
     <h2>Login</h2>
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
        <button>Login</button>
        <br></br>
        <br></br>
        <h1> {error}</h1>
     </form>
 </article>
    )
}

export default Login;