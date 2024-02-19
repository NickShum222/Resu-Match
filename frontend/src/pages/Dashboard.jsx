import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Button } from "@material-tailwind/react";
import Sidebar from "../components/Sidebar";
import AddJob from "../components/AddJob";
import Dropzone from "../components/Dropzone";
import JobStatusPieChart from "../components/JobStatusPieChart";
import TimelineChart from "../components/TimelineChart";
import ResumeUsageChart from "../components/ResumeUsageChart";

export default function Dashboard() {
  const navigate = useNavigate();
  const [addJob, setAddJob] = useState(false);
  const [jobs, setJobs] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jobLoading, setJobLoading] = useState(true);

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
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get-jobs/${currentUser.uid}`, {
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
        const top5Jobs = data
          .sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied))
          .slice(0, 5);
        setJobs(top5Jobs);
        console.log(top5Jobs);
        setJobLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setJobLoading(false);
      });
  }, []);

  console.log(userData);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {/* {addJob && <AddJob setActive={setAddJob} userId={currentUser.uid} />} */}
      <div className="bg-primary w-full h-[100dvh] relative pl-[350px] pr-[50px] py-24">
        {/* <Sidebar /> */}
        <div className="text-white text-[64px] font-[500]">
          Welcome <span className="italic">{userData.first_name}</span>
        </div>
        <div className="flex flex-col justify-start items-center w-full">
          <div className="flex justify-center items-start w-full gap-6">
            <div className="w-[70%] bg-card rounded-md flex flex-col justify-center items-start">
              <div className="text-white font-bold px-4 py-2 w-full">
                Job Application Timeline
              </div>
              <div className="w-full">
                <TimelineChart />
              </div>
            </div>
            <div className="w-[30%] bg-card rounded-md flex flex-col justify-center items-start">
              <div className="text-white font-bold px-4 py-2">Job Status</div>
              {/* Use function from jobs page to get data for this chart */}
              <JobStatusPieChart
                applied={69}
                interview={7}
                offer={10}
                rejected={40}
              />
            </div>
          </div>
          <div className="flex justify-center items-start w-full gap-6 mt-6">
            {/* <ResumeUsageChart/> */}
            <div className="w-[30%] bg-card rounded-md flex flex-col justify-center items-start">
              <div className="text-white font-bold px-4 py-2">
                Frequently Used Resumes
              </div>
              {/* Use function from jobs page to get data for this chart */}
              <ResumeUsageChart />
            </div>
            <div className="bg-card rounded-md w-[70%] flex flex-col justify-start items-center ">
              <div className="w-full flex justify-between items-center text-white font-medium rounded-t-md text-[18px] px-6 py-5 bg-[#9a9a9a] h-[32px]">
                <h4 className="">Recently Applied Jobs</h4>
                <div>+</div>
              </div>
              <div className="flex w-full justify-start items-between text-white border-b-[1px] border-solid px-6 border-white py-2">
                <p className="w-[25%]">Title</p>
                <p className="w-[20%]">Company</p>
                <p className="w-[20%]">Status</p>
                <p className="w-[20%]">Date Applied</p>
              </div>
              <div className="w-full flex flex-col justify-start items-start">
                {!jobLoading &&
                  jobs.map((job, index) => {
                    return <JobItem key={job.id} job={job} index={index} />;
                  })}
              </div>
            </div>
          </div>
        </div>
        {/* <Button onClick={logout}>Logout</Button>
        <Button
          onClick={() => {
            setAddJob(true);
          }}
        >
          Add Job
        </Button>
        <Dropzone /> */}
      </div>
    </>
  );
}

const JobItem = ({ job, index }) => {
  const { id, title, company, status, date_applied } = job;
  const formatDate = new Date(date_applied).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      className={`w-full text-white py-2 flex justify-start items-center px-6
        ${index % 2 === 0 ? "bg-white bg-opacity-5" : ""}
      
      `}
    >
      <p className="w-[25%]">{title}</p>
      <p className="w-[20%]">{company}</p>
      <p className="w-[20%] capitalize">{status}</p>
      <p className="w-[20%]">{formatDate}</p>
    </div>
  );
};
