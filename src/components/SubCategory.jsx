import React, { useState } from "react";
import "./SubCategory.css"; // Import CSS file
import { categories } from "../../src/image/data";

const SubCategory = () => {
  const c = categories.map((c) => c.subCategory.flat()).flat();

  console.log(c);

  const [selectedOption, setSelectedOption] = useState(""); // State to manage the selected option

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    // if (onChange) {
    //   onChange(event.target.value); // Call onChange prop if provided
    // }
  };

  return (
    <div className="sub-category">
      <select
        className="custom-select"
        aria-label="Subcategory Selection"
        value={selectedOption} // Set selected value from state
        onChange={handleSelectChange}
      >
        <option value="">Seç</option>
        {c.map((option, index) => (
          <option key={index} value={option.subCategory}>
            {option.subCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubCategory;
