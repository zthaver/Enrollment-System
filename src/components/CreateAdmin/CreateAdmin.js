import { TextField } from '@material-ui/core';
import { Button } from "react-bootstrap";
import './CreateAdmin.css'
import {useRef, useState} from 'react';
import { firestore } from '../../firebase';
import { useAuth } from "../../Contexts/AuthContext";
import { v4 as uuidv4 } from 'uuid';

function CreateAdmin()
 {
    let [loading,setLoading] = useState(false);
    let [error,setError] = useState("");
    let firstName = useRef();
    let lastName = useRef();
    let email = useRef();
    const { signup } = useAuth();
    function handleSubmit(e)
    {
        e.preventDefault();
        setLoading(true)
        console.log("form submitted");
        if(/\S+@\S+\.\S+/.test(email.current.value))
        {
          let generatePassword = uuidv4();
          signup(email.current.value, generatePassword)
          .then((val)=>{
            firestore.collection("admin").add({
              "email": email.current.value,
              "firstName": firstName.current.value,
              "lastName": lastName.current.value
            }).then((val)=>{
              console.log("Admin Created. Password: " + generatePassword)
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
         <form onSubmit={handleSubmit}>
            <h2>Admin Creation</h2>

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

           <input name="email" ref={email}>
           </input>
           <br></br><br></br>

           <h1> {error}</h1>
           <Button type="submit" disabled={loading}> Create Admin </Button>

         </form>
     )
 }

 export default CreateAdmin;