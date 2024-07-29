import React from "react";
import InputField from "../Components/InputField";

const EmploymentType = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div className="flex flex-col gap-2">
        <label className="sidebar-label-container">
          <input type="radio" name="test" value="" onChange={handleChange} />
          <span className="checkmark"></span>
          Any Type
        </label>

        <InputField
          handleChange={handleChange}
          value="Part-time"
          title="Part-time"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Full-time"
          title="Full-time"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Temporary"
          title="Temporary"
          name="test"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
