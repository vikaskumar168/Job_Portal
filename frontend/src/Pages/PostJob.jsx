import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const PostJob = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOptions.map((option) => option.value); // Ensure skills are set correctly
    console.log("Submitting data:", data); // Log the data being sent

    fetch("http://localhost:4000/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Response from server:", result); // Log the server response
        if (result.acknowledged === true) {
          alert("job posted successfully");
        }
        reset();
      })
      .catch((error) => {
        console.error("Error submitting data:", error); // Log any errors
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#FAFAFA] py-10px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* first row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={"Web Developer"}
                {...register("jobTitle")}
                placeholder="Web Developer"
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                {...register("companyName")}
                placeholder="Ex: Microsoft"
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* second row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                {...register("minPrice")}
                placeholder="$20k"
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                {...register("maxPrice")}
                placeholder="$30k"
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* third row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                {...register("salaryType")}
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your Salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                {...register("jobLocation")}
                placeholder="Ex:London"
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* fourth row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                {...register("postingDate")}
                placeholder="Ex:2024-07-02"
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your Experience level</option>
                <option value="No experience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
            </div>
          </div>
          {/* fifth row */}
          <div>
            <label className="block mb-2 text-lg">Required Skills</label>
            <CreatableSelect
              defaultValue={selectedOptions}
              onChange={setSelectedOptions}
              options={options}
              isMulti
              className="block w-full flex-1
              border-1 bg-white  pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6 py-4"
            />
          </div>
          {/* sixth row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                {...register("companyLogo")}
                placeholder="Paste your logo"
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
              >
                <option value="">Choose your Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>
          {/* seventh row */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Descriptions</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700"
              rows={6}
              defaultValue={"Write Job Descriptions"}
              placeholder="Job desc"
              {...register("description")}
            />
          </div>

          {/* last */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("postedBy")}
              className="block w-full flex-1
              border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus: outline-none sm:text-sm sm:leading-6"
            />
          </div>
          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm"
          />
        </form>
      </div>
    </div>
  );
};

export default PostJob;
