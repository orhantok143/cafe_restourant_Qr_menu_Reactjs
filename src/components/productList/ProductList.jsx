import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./productlist.css"; // CSS dosyamızı import ediyoruz
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";

const ProductList = ({ param }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Ürün 1",
      category: "Kategori 1",
      subCategory: "Alt Kategori 1",
      price: "100 TL",
    },
    {
      id: 2,
      title: "Ürün 2",
      category: "Kategori 2",
      subCategory: "Alt Kategori 1",
      price: "200 TL",
    },
    // Daha fazla ürün ekleyin
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="list">
      <div className="list-container">
        <table className="glass-table">
          <thead>
            <tr>
              <th>Ürün İsim</th>
              <th>Ana Kategori</th>
              <th className="sub">Alt Kategori</th>
              <th>Fiyat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td className="sub">{product.subCategory}</td>
                <td>{product.price}</td>
                <td>
                  <NavLink to={`/${param.id}/admin/edit/${product.id}`}>
                    <CiEdit className="action-button" />
                  </NavLink>
                  <MdDelete
                    onClick={() => handleDelete(product.id)}
                    className="action-button"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <NavLink to="../add-product" className="add-item-button add-product">
          <IoAddCircle />
          Ekle
        </NavLink>
      </div>
    </div>
  );
};

export default ProductList;
