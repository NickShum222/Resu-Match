import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Alert,
  Button,
} from "@material-tailwind/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuth } from "../../utils/AuthContext";

export default function Signup() {
  const {state} = useLocation();
  const email = state;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);
  const { currentUser, loading } = useAuth();
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, []);
  const formik = useFormik({
    initialValues: {
      email: email || "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          console.log("User created", auth.currentUser);
          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setError("Email is already in use");
          } else if (error.code === "auth/invalid-email") {
            setError("Email is invalid");
          } else if (error.code === "auth/weak-password") {
            setError("Password is too weak");
          } else {
            console.log(error);
            setError("Something went wrong");
          }
          setAlert(true);
        })
        .finally(() => {
          setSubmitting(false);
          resetForm();
        });
    },
  });
  return (
    <section className="bg-black w-100 flex justify-center items-center h-[100dvh] relative overflow-hidden">
      <Card className="w-[550px] bg-[#1a1a1a] px-4">
        <CardHeader
          floated={false}
          className="place-items-center bg-transparent shadow-none"
        >
          <h3 className="text-white font-bold text-[24px] text-center">
            Sign up with
          </h3>
        </CardHeader>
        <CardBody className="flex flex-col w-full justify-center items-center">
          {alert && (
            <Alert
              open="alert"
              onClose={() => setAlert(false)}
              className="mb-2 py-4 flex items-center bg-red-400"
            >
              {error}
            </Alert>
          )}
          <Button
            size="lg"
            variant="outlined"
            color="white"
            className="flex items-center justify-center gap-3 w-full"
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
          <p className="text-[#ffffff] my-3">or</p>
          <form
            className="w-full flex flex-col justify-center items-center gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex w-full items-center gap-2 mb-3">
              <Input
                label="First Name"
                id="firstName"
                name="firstName"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                color="white"
                className=""
                size="lg"
                autoComplete="off"
              />
              <Input
                label="Last Name"
                id="lastName"
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                color="white"
                className="w-full"
                size="lg"
                autoComplete="off"
              />
            </div>
            <Input
              label="Email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              color="white"
              className="w-full"
              size="lg"
              autoComplete="off"
            />
            <div className="w-full text-start text-[15px]">
              {formik.errors.email}
            </div>
            <Input
              id="password"
              name="password"
              label="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              color="white"
              className="w-full"
              size="lg"
              autoComplete="off"
              type="password"
            />
            <div className="w-full text-start text-[15px]">
              {formik.errors.password}
            </div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              color="white"
              className="w-full"
              size="lg"
              autoComplete="off"
              type="password"
            />
            <div className="w-full text-start text-[15px]">
              {formik.errors.confirmPassword}
            </div>
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              className="w-full bg-primary text-[16px]"
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-between items-center w-full">
          <div className="text-white font-bold text-[15px]">
            Already have an account?
          </div>
          <Link
            className=" font-semibold text-[15px] text-[#44a0e6] hover:text-primary transition-all duration-150"
            to="/login"
          >
            Login
          </Link>
        </CardFooter>
      </Card>
      <div className="bg-primary blur-[750px] w-[75%] h-[75%] absolute -left-1/2 -bottom-1/3"/>
      <div className="bg-primary blur-[750px] w-[75%] h-[75%] absolute -right-1/2 -bottom-1/3"/>
    </section>
    // <div className="w-100 flex flex-col justify-center items-center h-[100vh]">
    //   <h3>Sign Up</h3>
    //   <form onSubmit={formik.handleSubmit}>
    //     <Input
    //     label='Email'
    //     id='email'
    //     name='email'
    //     onChange={formik.handleChange}
    //     value={formik.values.email}
    //     />
    //    <div className="">{formik.errors.email}</div>

    //     <Input
    //       id='password'
    //       name='password'
    //       label="Password"
    //       onChange={formik.handleChange}
    //       value={formik.values.password}
    //     />
    //     <div className="">{formik.errors.password}</div>

    //     <Input
    //       id='confirmPassword'
    //       name='confirmPassword'
    //       label="Confirm Password"
    //       onChange={formik.handleChange}
    //       value={formik.values.confirmPassword}
    //     />
    //   <div className="">{formik.errors.confirmPassword}</div>

    //     <button
    //     disabled={formik.isSubmitting}
    //     type="submit">Submit</button>
    //   </form>
    // </div>
  );
}
