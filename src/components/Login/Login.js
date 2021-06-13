import {useRef, useState} from 'react';
import { useHistory } from 'react-router';
import { useAuth } from "../../Contexts/AuthContext" 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Button } from "react-bootstrap"
import { Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';

function Login()
{
    let password = useRef();
let email = useRef();
const { login } = useAuth();
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);
const history = useHistory();

async function handleSubmit(e)
{
    e.preventDefault();

        setError("");
        setLoading(true);
         await login(email.current.value,password.current.value)
         .then((value)=>{
             console.log("professor added" + value.professor)
             if(value.admin)
             {
                history.push("/admin")
             }
             if(value.professor)
             {
                history.push("/professor")
             }

             if(value.student)
             {
                 history.push("/student")
             }
              
         })
         .catch((err)=>{
             console.log(err)
             setError(err)
             setLoading(false)
         })


 
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

        <Button disabled={loading} type="submit">Login</Button>
        <br></br><br></br>

        {
           error? <h1> {error.error.message}</h1>: <h1></h1>
        }   
        
        </form>
        <p>Don't have an account <Link href="/signup">Sign Up</Link></p>
        </Paper>  
   </Grid>
    </article>
    )
}

export default Login;