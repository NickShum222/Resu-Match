import React, {useEffect, useState} from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { Button } from '@material-tailwind/react'
import Sidebar from '../components/Sidebar'
export default function Dashboard () {
  const navigate = useNavigate();

  useEffect(() => {

  },[])

  const { currentUser } = useAuth();
  const logout = () => {
    auth.signOut().then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }
  return (
    <div className='bg-black w-full h-[100dvh] relative pl-[200px] py-10'>
      <Sidebar/>
      <div className="text-white">Welcome {currentUser.email}</div>
      {/* <Button onClick={logout}>Logout</Button> */}
      <h1 className='text-black'>Welcome {currentUser.email}</h1>
    </div>
  )
}
