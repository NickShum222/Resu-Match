import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from '@material-tailwind/react'
import { auth } from '../../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'



const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting}) => {
      signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
        console.log("Signed in:", auth.currentUser);
      }).catch((error) => {
        console.log(error)
      })
      setSubmitting(false);
      resetForm();
    }
    
  })
  return (
    <div className="w-100 flex flex-col justify-center items-center h-[100vh]">
      <h3>Log In</h3>
      <form onSubmit={formik.handleSubmit}>
        <Input 
        label='Email'
        id='email'
        name='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        />
        <div className="">{formik.errors.email}</div>

        <Input
          id='password'
          name='password'
          label="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className="">{formik.errors.password}</div>
        <button 
        disabled={formik.isSubmitting}
        type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login