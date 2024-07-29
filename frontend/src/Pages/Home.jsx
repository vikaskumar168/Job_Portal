import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import AllJobs from "../Components/AllJobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../Components/Newsletter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
    console.log(event.target.value);
  };

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  };
  //function for next page

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //function for previous page

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredItems;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
    }
    //slice data based on page

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);
  console.log(result); // Debugging line

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isloading ? (
            <p className="font-medium">Loading...</p>
          ) : result.length > 0 ? (
            <AllJobs result={result} />
          ) : (
            <>
              <h3>{result.length} Jobs</h3>
              <h3 className="text-lg font-bold">No Jobs found</h3>
            </>
          )}

          {/* //pagination */}
          {result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-5">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems.length / itemPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems.length / itemPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Home;
