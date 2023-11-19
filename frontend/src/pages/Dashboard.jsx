import React, {useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { Button } from '@material-tailwind/react'
import Sidebar from '../components/Sidebar'
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
    <div className='bg-black w-full h-[100dvh]'>
      <Sidebar/>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
