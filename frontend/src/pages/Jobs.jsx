import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
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
        console.log(data);
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
      <div className="bg-primary w-full h-[100dvh] relative pl-[350px] pr-[50px] pb-24 pt-8">
        <Sidebar />
        <div className="w-full flex flex-col justify-start gap-4">
          {!loading && (
            <div className="w-full flex justify-between items-center">
              {statusTotal.map((status) => (
                <div
                  className="w-[24%] flex flex-col justify-center items-center border-[1px] border-solid shadow-inner text-white rounded-lg py-4 text-[20px]"
                  key={status.status}
                >
                  <div className="capitalize">{status.status}</div>
                  <div className="">{status.count}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-full flex justify-end">
          <Button
            onClick={() => {
              setAddJob(true);
            }}
          >
            Add Job
          </Button>
        </div>
        {!loading && (
          <div className="w-full flex flex-col justify-start items-center">
            <div className="w-full flex justify-start items-center text-white text-[20px] px-8 py-2 border-b-[1px] border-[#bfbfbf] border-solid">
              <p className="w-[20%]">Title</p>
              <p className="w-[20%]">Company</p>
              <p className="w-[20%]">Status</p>
              <p className="w-[20%]">Date Applied</p>
            </div>
            {jobs.map((job) => {
              return (
                <JobItem
                  key={job.id}
                  jobEntry={job}
                  setJobs={setJobs}
                  jobs={jobs}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

const JobItem = ({ jobEntry, setJobs, jobs }) => {
  const { id, title, company, status, date_applied, resume_id } = jobEntry;
  const deleteJobById = (idToDelete) => {
    fetch(`http://127.0.0.1:8000/api/delete-job/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const updatedJobs = jobs.filter((job) => job.id !== idToDelete);
        setJobs(updatedJobs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  return (
    <>
      <div className="w-full flex justify-start items-center text-white px-8 py-2">
        <p className="w-[20%]">{title}</p>
        <p className="w-[20%]">{company}</p>
        <p className="w-[20%] capitalize">{status}</p>
        <p className="w-[20%]">{date_applied}</p>
        <div className="flex justify-end items-center w-[20%] gap-6">
          <button className="text-blue-400">Edit</button>
          <button
            onClick={() => {
              deleteJobById(id);
            }}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Jobs;
