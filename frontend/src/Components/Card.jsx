import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Card = ({ data }) => {
  const {
    companyName,
    jobTitle,
    companyLogo,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    description,
  } = data;
  return (
    <section className="card">
      <Link
        to={"/"}
        className="flex gap-4 flex-col sm:flex-row items-start p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <img
          src={companyLogo}
          alt="Company Logo"
          className="w-16 h-16 object-cover rounded-sm"
        />
        <div>
          <h4 className="text-primary mb-1 text-xl font-medium">
            {companyName}
          </h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>

          <div className="text-primary/70 text-base flex flex-wrap gap-4 mb-4">
            <span className="flex items-center gap-2">
              <FiMapPin />
              {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock />
              {employmentType}
            </span>
            <span className="flex items-center gap-2">
              <FiDollarSign />
              {minPrice}-{maxPrice}k
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar />
              {postingDate}
            </span>
          </div>
          <p className="text-base text-primary/70 leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </section>
  );
};

export default Card;

// const Card = ({ data }) => {
//   return (
//     <div className="card">
//       <h2>{data.jobTitle}</h2>
//       <p>{data.jobLocation}</p>
//       <p>{data.maxPrice}</p>
//       <p>{data.salaryType}</p>
//       <p>{data.employmentType}</p>
//       <p>{data.postingDate}</p>
//     </div>
//   );
// };

// export default Card;
