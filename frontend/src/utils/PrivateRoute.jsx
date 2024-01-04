import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  if(loading){
    return <div>Loading...</div>
  }
  return currentUser ? children : <Navigate to="/" />;
};

export default PrivateRoute;
