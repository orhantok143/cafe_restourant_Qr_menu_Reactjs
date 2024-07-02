import React, { useState } from "react";
import "./list.css";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

const List = ({ headers, itemsPerPage, items, head }) => {
  const addingProduct = useSelector((state) => state.products.loading);
  const [pageNumber, setPageNumber] = useState(0);

  // Sayfada gösterilecek öğeleri hesaplama
  const pagesVisited = pageNumber * itemsPerPage;
  const displayItems =
    items?.length > 5
      ? items.slice(pagesVisited, pagesVisited + itemsPerPage)
      : items;
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  // Önceki sayfaya geçiş
  const handlePrevious = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  // Sonraki sayfaya geçiş
  const handleNext = () => {
    if (pageNumber < pageCount - 1) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="list-container">
      <table className="glass-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {head === "Kategoriler"
            ? displayItems.map((category) => (
                <React.Fragment key={category._id}>
                  {category.subCategory?.map((sub) => (
                    <tr key={sub._id}>
                      <td>{category.title}</td>
                      <td>{sub.title}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            : displayItems?.map((item, key) => (
                <tr key={key}>
                  {head === "Ürünler" ? (
                    <>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price} TL</td>
                    </>
                  ) : head === "Şubeler" ? (
                    <>
                      <td>{item.name}</td>
                      <td>{item.owner}</td>
                    </>
                  ) : null}
                </tr>
              ))}
        </tbody>
      </table>
      <div className="pagination-container">
        <IoIosArrowBack
          className="pagination-button"
          onClick={handlePrevious}
        />
        <IoIosArrowForward className="pagination-button" onClick={handleNext} />
      </div>
      <NavLink to="../add-product" className="add-item-button add-product">
        <IoAddCircle />
        {addingProduct ? "Ürün Ekleniyor" : "Ekle"}
      </NavLink>
    </div>
  );
};

export default List;
