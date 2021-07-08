import {useRef, useState} from 'react';
import { useHistory } from 'react-router';
import { useAuth } from "../../../Contexts/AuthContext" 
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    myBtns:{
      background:"#D92A1D",
      marginTop:'10px',
      color:'#fff',
      '&:hover':{
          color:'#D92A1D',
      }
    },
    error:{
        color:'#D92A1D',
    },
    // formCotainer:{
    //     margin:'0 auto',
    //     textAlign:'center',
    // },
    formInput:{
        border:'none',
        borderBottom:'1px solid black',
        padding:'10px 5px',
        // fontSize:'1.1em',
        '&:focus':{
            outline:'none',
        }
    },
    formLabel:{
        display:'block',
        marginTop:'20px',
    }
  }));

function Login()
{
    let password = useRef();
let email = useRef();
const { login } = useAuth();
const [error,setError] = useState("");
const [loading,setLoading] = useState(false);
const history = useHistory();
const classes = useStyles();

async function handleSubmit(e)
{
    e.preventDefault();

        setError("");
        setLoading(true);
         await login(email.current.value,password.current.value)
         .then((value)=>{
             if(value.admin)
             {
                history.push("/admin",value.user_id)
             }
             if(value.professor)
             {
                history.push("/professor",value.user_id)
             }

             if(value.student)
             {
                 history.push("/student",value.user_id)
             }
              
         })
         .catch((err)=>{
             console.log(err)
             setError(err)
             setLoading(false)
         })


 
}
const paperStyle={padding:20,height:'70vh',width:280, margin:"20px auto"}
    return(
        
    <article>
    <Grid>
     <Paper elavation="20" style={paperStyle}>
        <Grid >
            <h2 align="center">Login</h2>
        </Grid>
        <form className={classes.formCotainer} onSubmit={handleSubmit}>

            <label className={classes.formLabel}>Email</label>
            <input ref={email} className={classes.formInput} />
            <br></br>

            <label  className={classes.formLabel}>Password</label>
            <input  className={classes.formInput} 
                    ref={password} 
                    type="password"/>
            <br></br><br></br>

            <Button disabled={loading} type="submit" className={classes.myBtns}>Login</Button>
            <br></br><br></br>

            {
            error? <h4 className={classes.error}> {error.error.message}</h4>: <h1></h1>
            }   
        </form>

        <p align="center">Don't have an account <Link href="/signup">Sign Up</Link></p>
    </Paper>  
   </Grid>
    </article>
    )
}

export default Login;