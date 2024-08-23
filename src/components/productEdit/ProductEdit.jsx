import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  selectActiveCategories,
  selecteditProduct,
} from "../../redux/selectors";
import { getAllCategories } from "../../redux/category/categorySlice";
import { updateProduct } from "../../redux/products/productSlice";
import { useNavigate } from "react-router-dom";

const ProductEdit = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectActiveCategories);
  const editP = useSelector(selecteditProduct);
  const editProduct = useSelector((state) => state.products.loading);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string(), // Not required
    description: Yup.string(), // Not required
    price: Yup.number().positive("Price must be a positive number"), // Not required
    image: Yup.mixed(), // Not required
    category: Yup.string(), // Not required
    subCategory: Yup.string(), // Not required
  });

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    dispatch(updateProduct({ id: editP._id, values }));
    resetForm();
  };

  useEffect(() => {
    if (!categories?.categories) {
      dispatch(getAllCategories());
    }
  }, [dispatch, categories.categories]);

  useEffect(() => {
    if (!editP) {
      navigate("../products");
    }
  }, [navigate, editP]);

  return (
    <div className="form-container">
      <h1>Ürün Düzenle</h1>
      <Formik
        initialValues={editP}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, touched, errors, handleBlur }) => (
          <Form className="list-container">
            <div className="form-field">
              <label htmlFor="name">Ürün ismi</label>
              <Field id="name" name="name" type="text" />
              {touched.name && errors.name ? (
                <div className="__error">{errors.name}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="description">Açıklama</label>
              <Field as="textarea" id="description" name="description" />
              {touched.description && errors.description ? (
                <div className="__error">{errors.description}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="price">Fiyat</label>
              <Field id="price" name="price" type="number" />
              {touched.price && errors.price ? (
                <div className="__error">{errors.price}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="image">Resim</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
              />
              {touched.image && errors.image ? (
                <div className="__error">{errors.image}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="category">Ana Kategori</label>
              <Field
                as="select"
                name="category"
                id="category"
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setFieldValue("category", selectedCategory);
                  setFieldValue("subCategory", ""); // Reset subcategory when category changes
                }}
              >
                <option value="" label="Kategori seç" />
                {categories?.categories?.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </Field>
              {touched.category && errors.category ? (
                <div className="__error">{errors.category}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="subCategory">Alt kategori</label>
              <Field
                as="select"
                name="subCategory"
                id="subCategory"
                disabled={!values?.category} // Disable subcategory if no category is selected
              >
                <option value="" label="Atl kategori seç" />
                {categories?.categories
                  ?.find((cat) => cat.title === values?.category)
                  ?.subCategory?.map((subCategory, index) => (
                    <option key={index} value={subCategory.title}>
                      {subCategory.title}
                    </option>
                  ))}
              </Field>
              {touched.subCategory && errors.subCategory ? (
                <div className="__error">{errors.subCategory}</div>
              ) : null}
            </div>

            <button className="add-item-button" type="submit">
              {editProduct ? "Ürün kaydediliyor..." : "Kaydet"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductEdit;
