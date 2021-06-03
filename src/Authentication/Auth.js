import React, { useContext, useState, useEffect } from "react"
import { auth , firebase ,functions } from "../firebase"
// import { useHistory } from "react-router-dom";

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
//   const history = useHistory();

  function signup(email, password) {
    const addStudentRole = functions.httpsCallable("addStudentRole");
    
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      addStudentRole({ email: email }).then(result => {
        console.log(result)
        
      }).catch((err) => {
        console.log(err);
      })
    })
  }

  function logout() {

    setCurrentUser(null)
    setIsAdmin(false)
    return auth.signOut();
  }



  async function login(email, password) {
    let authResult = null;
     await auth.signInWithEmailAndPassword(email, password)
     .then((result)=>{
       authResult = result;
       setIsAdmin(true);
       console.log(authResult)
     }).catch((err)=>{
       authResult = err;
     })
  
   return new Promise((resolve,reject)=>{
     if(authResult) 
     {
       resolve( authResult)
     }
     else
     {
       return reject({error:"broke"})
     }
   })
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}