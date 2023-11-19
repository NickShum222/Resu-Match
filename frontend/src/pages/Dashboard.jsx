import React, {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { Button } from '@material-tailwind/react'
export default function Dashboard () {
  const navigate = useNavigate();
  const logout = () => {
    auth.signOut().then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div>
      AGHAGAG
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
