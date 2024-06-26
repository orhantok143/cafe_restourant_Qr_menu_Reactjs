import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./productlist.css"; // CSS dosyasını import ediyoruz
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveProducts } from "../../redux/selectors";
import {
  deleteProduct,
  getAllProducts,
} from "../../redux/products/productSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductList = ({ param }) => {
  const dispatch = useDispatch();
  const addingProduct = useSelector((state) => state.products.loading);
  const activeProducts = useSelector(selectActiveProducts);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(activeProducts?.products);
  }, [activeProducts?.products]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setProducts(products?.filter((p) => p._id !== id));
  };

  console.log("Products::", products);

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
            {products?.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className="sub">{product.subCategory}</td>
                <td>{product.price}</td>
                <td>
                  <div className="action">
                    <NavLink
                      to={`/${param.id}/admin/add-product/${product._id}`}
                    >
                      <CiEdit className="action-button" />
                    </NavLink>
                    <MdDelete
                      onClick={() => handleDelete(product._id)}
                      className="action-button"
                    />
                  </div>
                </td>
              </tr>
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
        <NavLink to="../add-product" className="add-item-button add-product">
          <IoAddCircle />
          {addingProduct ? "Ürün Ekleniyor" : "Ekle"}
        </NavLink>
      </div>
    </div>
  );
};

export default ProductList;
