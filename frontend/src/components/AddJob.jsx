import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";

const jobStatus = [
  {
    value: "applied",
    label: "Applied",
  },
  {
    value: "interview",
    label: "Interview",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
  {
    value: "offer",
    label: "Offer",
  },
];

const AddJob = ({ userId, setActive }) => {
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      status: "",
      date: new Date(),
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Job title is required"),
      company: Yup.string().required("Company is required"),
      status: Yup.string().required("Job Status is required"),
      date: Yup.string().required("Date is required"),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      fetch("http://127.0.0.1:8000/api/add-job/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_uid: userId,
          title: values.title,
          company: values.company,
          status: values.status,
          date_applied: values.date.toISOString(),
        }),
      })
        .then((res) => {
          console.log(res);
          setSubmitting(false);
          resetForm();
          setActive(false);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const handleChange = (e) => {
    setStatus(e);
    formik.setFieldValue("status", e);
  };
  const handleDateChange = (e) => {
    setDate(e);
    formik.setFieldValue("date", e);
  };
  return (
    <div
      className="w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-10 backdrop-blur-sm z-[100]"
      // onClick={() => {
      //   setActive(false);
      // }}
    >
      <Card className="w-[550px] bg-[#1a1a1a] px-4 shadow-l z-[200]">
        <CardHeader
          floated={false}
          className="place-items-center bg-transparent shadow-none"
        >
          <h3 className="text-white font-bold text-[24px] text-center">
            Add Job
          </h3>
        </CardHeader>
        <CardBody className="flex flex-col w-full justify-center items-center">
          <form
            onSubmit={formik.handleSubmit}
            className="w-full flex flex-col justify-center items-center gap-6"
          >
            <Input
              label="Job Title"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              color="white"
              className="w-full"
              size="lg"
              autoComplete="off"
            />
            <Input
              label="Company Name"
              id="company"
              name="company"
              onChange={formik.handleChange}
              value={formik.values.company}
              color="white"
              className="w-full"
              size="lg"
              autoComplete="off"
            />
            <Select
              id="status"
              name="status"
              label="Job Status"
              color="white"
              size="lg"
              onChange={handleChange}
              labelProps={{
                className: "text-white",
              }}
              containerProps={{
                className: "text-white",
              }}
              className="text-white"
            >
              {jobStatus.map((option) => (
                <Option
                  key={option.value}
                  value={option.value}
                  selected={status}
                >
                  {option.label}
                </Option>
              ))}
            </Select>
            <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  id="date"
                  name="date"
                  label="Select a Date"
                  onChange={handleDateChange}
                  value={date ? format(date, "PPP") : ""}
                  color="white"
                  className="w-full"
                  size="lg"
                />
              </PopoverHandler>
              <PopoverContent className="z-[120]">
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={handleDateChange}
                  onChange={handleDateChange}
                  showOutsideDays
                  className="border-0 z-[120]"
                  classNames={{
                    caption:
                      "flex justify-center py-2 mb-4 relative items-center",
                    caption_label: "text-sm font-medium text-gray-900",
                    nav: "flex items-center",
                    nav_button:
                      "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                    nav_button_previous: "absolute left-1.5",
                    nav_button_next: "absolute right-1.5",
                    table: "w-full border-collapse",
                    head_row: "flex font-medium text-gray-900",
                    head_cell: "m-0.5 w-9 font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal",
                    day_range_end: "day-range-end",
                    day_selected:
                      "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                    day_today: "rounded-md bg-gray-200 text-gray-900",
                    day_outside:
                      "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                    day_disabled: "text-gray-500 opacity-50",
                    day_hidden: "invisible",
                  }}
                  // components={{
                  //   IconLeft: ({ ...props }) => (
                  //     <ChevronLeftIcon
                  //       {...props}
                  //       className="h-4 w-4 stroke-2"
                  //     />
                  //   ),
                  //   IconRight: ({ ...props }) => (
                  //     <ChevronRightIcon
                  //       {...props}
                  //       className="h-4 w-4 stroke-2"
                  //     />
                  //   ),
                  // }}
                />
              </PopoverContent>
            </Popover>
            <div className="flex justify-between items-center w-full">
              <Button
                onClick={() => {
                  setActive(false);
                }}
                className="w-[200px] bg-tertiary text-[16px]"
              >
                Cancel
              </Button>
              <Button
                disabled={formik.isSubmitting}
                type="submit"
                className="w-[200px] bg-tertiary text-[16px]"
              >
                Add Job
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddJob;
