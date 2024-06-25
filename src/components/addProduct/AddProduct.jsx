import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";

const AddProduct = () => {
  const initialValues = {
    title: "",
    desc: "",
    price: "",
    image: null,
    category: "",
    subCategory: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    image: Yup.mixed().required("Image is required"),
    category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("Sub-category is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      // Dizi oluştur ve formdaki alanları döngüye sokarak formData'ya ekle
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      console.log("FormData:", ...formData.entries());
    },
  });

  return (
    <div className="form-container">
      <h1>Add Product</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="__error">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.desc}
          />
          {formik.touched.desc && formik.errors.desc ? (
            <div className="__error">{formik.errors.desc}</div>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="__error">{formik.errors.price}</div>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image ? (
            <div className="__error">{formik.errors.image}</div>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="__error">{formik.errors.category}</div>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="subCategory">Sub-category</label>
          <input
            id="subCategory"
            name="subCategory"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.subCategory}
          />
          {formik.touched.subCategory && formik.errors.subCategory ? (
            <div className="__error">{formik.errors.subCategory}</div>
          ) : null}
        </div>

        <button className="add-item-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
