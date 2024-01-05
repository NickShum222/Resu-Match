import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Button } from "@material-tailwind/react";
import Sidebar from "../components/Sidebar";
import AddJob from "../components/AddJob";
export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get-user/${currentUser.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  console.log(userData);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AddJob />
      <div className="bg-black w-full h-[100dvh] relative pl-[200px] py-10">
        <Sidebar />
        <div className="text-white text-[44px] font-bold">
          Welcome {userData.first_name}
        </div>
        {/* <Button onClick={logout}>Logout</Button> */}
        <h1 className="text-black">Welcome {currentUser.email}</h1>
      </div>
    </>
  );
}
