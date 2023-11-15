import React from 'react'
import { useEffect, useState, createContext, useContext } from 'react'
import { auth } from './firebase'


const AuthContext = createContext()

export function userAuth() {
  return useContext(AuthContext)
}

export function AuthContext({ children}) {
  const [user, setUser] = useState(null)

  function signup(email, password){
    return auth.createUserWithEmailAndPassword(email, password)
  }

  auth.onAuthStateChanged(user => {
    setUser(user)
  })

  const value = {
    user
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}