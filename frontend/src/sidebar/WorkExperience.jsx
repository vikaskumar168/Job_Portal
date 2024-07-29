import React from "react";
import InputField from "../Components/InputField";

const WorkExperience = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Work Experience</h4>
      <div className="flex flex-col gap-2">
        <label className="sidebar-label-container">
          <input type="radio" name="test" value="" onChange={handleChange} />
          <span className="checkmark"></span>
          Any Experience
        </label>

        <InputField
          handleChange={handleChange}
          value="Work remotely"
          title="Work remotely"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Intership"
          title="Intership"
          name="test"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
