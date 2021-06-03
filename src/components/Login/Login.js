import {useRef, useState} from 'react';
import { useHistory } from 'react-router';
import { useAuth } from "../../Contexts/AuthContext" 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';

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
         login(email.current.value,password.current.value)
         .then((value)=>{
            history.push("/admin")
         })
         .catch((err)=>{
             console.log("broke")
         })
   
    }
    catch
    {
        setError("Failed To Log In")
    }
 
}
const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    return(
        
    <article>
    <Grid>
     <Paper elavation="20" style={paperStyle}>
     <Grid >
         <h2>Login</h2>
     </Grid>
        <form onSubmit={handleSubmit}>
        <label>
           Email
        </label>
        <br></br>

        <input ref={email}/>
        <br></br>

        <label>
           Password
        </label>
        <br></br> 

        <input ref={password} type="password"/>
        <br></br><br></br>

        <button>Login</button>
        <br></br><br></br>

        <h1> {error}</h1>
        </form>
        
        </Paper>  
   </Grid>
    </article>
    )
}

export default Login;