import React, { useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import "./productlist.css"; // CSS dosyasını import ediyoruz
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveProducts } from "../../redux/selectors";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../../redux/products/productSlice";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductList = ({ param }) => {
  const dispatch = useDispatch();
  const activeProducts = useSelector(selectActiveProducts);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 12;
  const pagesVisited = pageNumber * itemsPerPage;

  const displayItems =
    activeProducts.products?.length > 5
      ? activeProducts.products.slice(pagesVisited, pagesVisited + itemsPerPage)
      : activeProducts.products;

  const pageCount = Math.ceil(activeProducts?.products?.length / itemsPerPage);

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

  useEffect(() => {
    if (!activeProducts.products) {
      dispatch(getAllProducts(param.id));
    }
  }, [dispatch, activeProducts.products,param.id]);

  useEffect(() => {
    setProducts(activeProducts?.products);
  }, [activeProducts?.products]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    setProducts(products?.filter((p) => p._id !== id));
  };

  const handleEdit = (product) => {
    dispatch(editProduct(product));
  };

  return (
    <div className="list">
      <h1>Ürünler</h1>
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
            {displayItems?.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td className="sub">{product.subCategory}</td>
                <td>{product.price}</td>
                <td>
                  <div className="action">
                    <NavLink to={`/${param.id}/admin/edit-product`}>
                      <CiEdit
                        className="action-button"
                        onClick={() => handleEdit(product)}
                      />
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
            onClick={handlePrevious}
          />

          <IoIosArrowForward
            className="pagination-button"
            onClick={handleNext}
          />
        </div>
        <NavLink to="../add-product" className="add-item-button add-product">
          <IoAddCircle />
          Ekle
        </NavLink>
      </div>
    </div>
  );
};

export default ProductList;
