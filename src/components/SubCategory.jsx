import React from "react";
import "./SubCategory.css"; // Import CSS file
import { useDispatch, useSelector } from "react-redux";
import { currentSubCategory } from "../redux/category/categorySlice";

const SubCategory = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const currentsubCategory = useSelector(
    (state) => state.categories.currentSubCategory
  );
  const subCategory = categories
    ?.map((category) => category.subCategory)
    ?.flat();

  const handleSelectChange = (event) => {
    dispatch(currentSubCategory(event.target.value));
  };

  return (
    <div className="sub-category">
      <select
        className="custom-select"
        aria-label="Subcategory Selection"
        onChange={handleSelectChange}
      >
        <option value=""> {currentsubCategory} </option>
        {subCategory?.map((option, index) => (
          <option key={index} value={option.label}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubCategory;
