import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { auth } from "../../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../utils/AuthContext";

const Login = () => {
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
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
          console.log("Signed in:", auth.currentUser);
          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-login-credentials") {
            setError("Invalid login credentials.");
          } else {
            console.log(error);
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
            Log in with
          </h3>
        </CardHeader>
        <CardBody className="flex flex-col w-full justify-center items-center">
          {alert && (
            <Alert open="alert" onClose={() => setAlert(false)} className="mb-2 py-4 flex items-center bg-red-400">
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
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col justify-center items-center gap-2"
          >
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
            <div className="w-full flex justify-between items-start">
              <div className="text-start text-[15px]">
                {formik.errors.password}
              </div>
              <div className="font-semibold text-[#44a0e6] text-[15px] hover:text-primary transition-all duration-150">
                Forgot Password?
              </div>
            </div>

            <Button
              disabled={formik.isSubmitting}
              type="submit"
              className="w-full bg-primary text-[16px]"
            >
              Login
            </Button>
          </form>
        </CardBody>
        <CardFooter className="flex justify-between items-center w-full">
          <div className="text-white font-bold text-[15px]">
            Don't have an account?
          </div>
          <Link
            className=" font-semibold text-[15px] text-[#44a0e6] hover:text-primary transition-all duration-150"
            to="/signup"
          >
            Register
          </Link>
        </CardFooter>
      </Card>
      {/* <form onSubmit={formik.handleSubmit}>
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
      </form> */}
      <div className="bg-primary blur-[750px] w-[75%] h-[75%] absolute -left-1/2 -bottom-1/3"/>
      <div className="bg-primary blur-[750px] w-[75%] h-[75%] absolute -right-1/2 -bottom-1/3"/>

    </section>
  );
};

export default Login;
