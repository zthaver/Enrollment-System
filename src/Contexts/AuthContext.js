import React, { useContext, useState, useEffect } from "react"
import { auth, firestore, functions } from "../firebase"
import { useHistory } from "react-router-dom";

/*
The file containing the context to deal with all aspects of authentication.
Including login,signup.
*/


const AuthContext = React.createContext()


export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  async function signup(email, password,) {
    //assigns the role to the user (admin in this case)
    
    let signUpResult = null;
    let signUpError = null;
    const addAdminRole = functions.httpsCallable("addAdminRole");
     await auth.createUserWithEmailAndPassword(email, password).then((user) => {
      signUpResult = user;
      console.log("sucess is "+ signUpResult);
      addAdminRole({ email: email }).then(result => {
        
        
      }).catch((err) => {
      })
    }).catch((err)=>{
      signUpError = err;
      console.log("fail is "+ signUpError);
      console.log(err);
    })

    return new Promise((resolve,reject) =>{
       if(signUpResult)
       {
        console.log(signUpResult)
         resolve(signUpResult)
       }
       else
       {
         console.log(signUpError)
         reject(signUpError)
       }
    })
  }


  function signupProfessor(email, password) {
    //assigns the role to the user (professor in this case)
    const addAdminRole = functions.httpsCallable("addAdminRole");
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      addAdminRole({ email: email }).then(result => {
        console.log(result)
        
      }).catch((err) => {
        console.log(err);
      })
    })
  }
  function logout() {
    auth.signOut();
    setCurrentUser(null)
    setIsAdmin(false)
  }



  async function login(email, password) {
    let authResult = null;
    let loginError = null;
     await auth.signInWithEmailAndPassword(email, password)
     .then((result)=>{
       authResult = result;
       setIsAdmin(true);
       console.log(authResult)
     }).catch((err)=>{
       loginError = err;
     })
  
   return new Promise((resolve,reject)=>{
     if(authResult)
     {
       resolve( authResult)
     }
     else
     {
      console.log("reject")
       return reject({error:loginError})
     }
   })
  }

/*
Function called when a user signs in or signs out.
*/



  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    signupProfessor,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}