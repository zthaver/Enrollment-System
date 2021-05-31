import React, { useContext, useState, useEffect } from "react"
import { auth,firestore,functions } from "../firebase"



const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    const addAdminRole = functions.httpsCallable("addAdminRole");
    return auth.createUserWithEmailAndPassword(email, password).then((user)=>{
     addAdminRole({email:email}).then(result =>{
       console.log(result)
     }).catch((err)=>{
       console.log(err);
     })
    })
  }

  function logout()
  {
    auth.signOut();
  }

  function login(email,password)
  {
    return auth.signInWithEmailAndPassword(email,password);
  }


  auth.onAuthStateChanged( user =>{
    if(user)
    {
      user.getIdTokenResult().then((val)=>{
        console.log(val.claims)
      })
    }
  })


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
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}