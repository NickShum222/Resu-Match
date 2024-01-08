import React, { useState, useEffect } from "react";
import AddJob from "../components/AddJob";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../utils/AuthContext";

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState(null);
  const [statusTotal, setStatusTotal] = useState(null);
  const [addJob, setAddJob] = useState(false);
  const { currentUser } = useAuth();
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
        setJobs(data);
        setStatusTotal(countJobsByStatus(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [addJob]);

  function countJobsByStatus(jobApplications) {
    const sortedJobApplications = jobApplications.sort((a, b) =>
      a.status.localeCompare(b.status)
    );

    const statusCount = {};

    sortedJobApplications.forEach((application) => {
      const { status } = application;
      statusCount[status] = (statusCount[status] || 0) + 1;
    });

    const defaultStatuses = ["applied", "interview", "rejected", "offer"];

    const result = defaultStatuses.map((status) => ({
      status,
      count: statusCount[status] || 0,
    }));

    return result;
  }
  return (
    <>
      {addJob && <AddJob setActive={setAddJob} userId={currentUser.uid} />}
      <div className="bg-black w-full h-[100dvh] relative pl-[15%] pr-[5%] pb-24 pt-8">
        <Sidebar />
        <div className="w-full flex flex-col justify-start gap-4">
          {!loading && (
            <div className="w-full flex justify-between items-center">
              {statusTotal.map((status) => (
                <div
                  className="w-[23%] flex flex-col justify-center items-center border-[1px] border-solid border-white text-white"
                  key={status.status}
                >
                  <div>{status.count}</div>
                  <div>{status.status}</div>
                </div>
              ))}
            </div>
          )}
          <div >

          </div>
        </div>
      </div>
    </>
  );
};

const StatusBar = ({ name, data }) => {
  <div className="w-full border-[1px] border-white border-solid flex flex-col justify-center items-center text-white font-medium">
    <div>{data}</div>
    <div>{name}</div>
  </div>;
};

export default Jobs;
