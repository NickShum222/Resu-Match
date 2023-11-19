import React from 'react'
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from "@material-tailwind/react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export default function Signup () {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: (values, { resetForm, setSubmitting}) => {
      console.log(values);
      createUserWithEmailAndPassword(auth, values.email, values.password).then(() => {
        console.log("User created", auth.currentUser);
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        setSubmitting(false);
        resetForm();
      })
    }
    
  })
  return (
    <div className="w-100 flex flex-col justify-center items-center h-[100vh]">
      <h3>Sign Up</h3>
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

        <Input
          id='confirmPassword'
          name='confirmPassword'
          label="Confirm Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
      <div className="">{formik.errors.confirmPassword}</div>

        <button 
        disabled={formik.isSubmitting}
        type="submit">Submit</button>
      </form>
    </div>
  )
}
