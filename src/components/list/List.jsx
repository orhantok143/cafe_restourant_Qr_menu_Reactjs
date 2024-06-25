import React, { useState } from "react";
import "./list.css";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

const List = ({ headers, itemsPerPage }) => {
  const items = [
    { Ad: "Ürün 1", Soyad: "Detay 1", Yaş: "20", Meslek: "Kategori 1" },
    { Ad: "Ürün 2", Soyad: "Detay 2", Yaş: "30", Meslek: "Kategori 2" },
    // Daha fazla öğe ekleyin
  ];
  const addingProduct = useSelector((state) => state.products.loading);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * itemsPerPage;

  const displayItems = items
    .slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((item, index) => (
      <tr key={index}>
        {headers.map((header, colIndex) => (
          <td key={colIndex}>{item[header]}</td>
        ))}
      </tr>
    ));

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePrevious = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

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
        <tbody>{displayItems}</tbody>
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
        {addingProduct ? "ürün Ekleniyor" : "Ekle"}
      </NavLink>
    </div>
  );
};

export default List;
