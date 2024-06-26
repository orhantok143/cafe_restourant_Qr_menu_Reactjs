import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./categorylist.css"; // CSS dosyasını import ediyoruz
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveCategories } from "../../redux/selectors";

import {
  deleteCategory,
  getAllCategories,
} from "../../redux/category/categorySlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CategoryList = ({ param }) => {
  const dispatch = useDispatch();
  const addingProduct = useSelector((state) => state.products.loading);
  const activeCategory = useSelector(selectActiveCategories);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setCategories(activeCategory?.categories);
  }, [activeCategory?.categories]);

  const handleDelete = (id) => {
    console.log(id);
    const updatedCategories = categories.map((category) => ({
      ...category,
      subCategory: category.subCategory?.filter((sub) => sub._id !== id),
    }));
    setCategories(updatedCategories);
    dispatch(deleteCategory(id));
  };

  return (
    <div className="list">
      <div className="list-container">
        <table className="glass-table">
          <thead>
            <tr>
              <th>Kategori İsim</th>
              <th>Alt Kategoriler</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <React.Fragment key={category._id}>
                {category.subCategory.map((subCategory) => (
                  <tr key={subCategory._id}>
                    <td>{category.title}</td>
                    <td>{subCategory.title}</td>
                    <td>
                      <div className="action">
                        <NavLink
                          to={`/${param.id}/admin/add-category/${category._id}`}
                        >
                          <CiEdit className="action-button" />
                        </NavLink>
                        <MdDelete
                          onClick={() => handleDelete(subCategory._id)}
                          className="action-button"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <IoIosArrowBack
            className="pagination-button"
            // onClick={() => handlePrevious(category._id)}
          />

          <IoIosArrowForward
            className="pagination-button"
            // onClick={() =>
            //   handleNext(
            //     category._id,
            //     Math.ceil(category.subCategory.length / itemsPerPage)
            //   )
            // }
          />
        </div>
      </div>

      <NavLink to="../add-category" className="add-item-button add-product">
        <IoAddCircle />
        {addingProduct ? "Kategori Ekleniyor" : "Ekle"}
      </NavLink>
    </div>
  );
};

export default CategoryList;
