import React from "react";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/products/productSlice";
import { selectActiveCategories } from "../../redux/selectors";

const AddProduct = () => {
  const dispatch = useDispatch();
  const addingProduct = useSelector((state) => state.products.loading);
  const categories = useSelector(selectActiveCategories);

  const initialValues = {
    name: "",
    description: "",
    price: "",
    image: null,
    category: "",
    subCategory: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    image: Yup.mixed().required("Image is required"),
    category: Yup.string().required("Category is required"),
    subCategory: Yup.string().required("Sub-category is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    dispatch(addProduct(formData))
    resetForm();
  };

  return (
    <div className="form-container">
      <h1>Add Product</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, touched, errors, handleBlur }) => (
          <Form className="list-container">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" type="text" />
              {touched.name && errors.name ? (
                <div className="__error">{errors.name}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" />
              {touched.description && errors.description ? (
                <div className="__error">{errors.description}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="price">Price</label>
              <Field id="price" name="price" type="number" />
              {touched.price && errors.price ? (
                <div className="__error">{errors.price}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="image">Image</label>
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
              <label htmlFor="category">Category</label>
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
              <label htmlFor="subCategory">Sub-category</label>
              <Field
                as="select"
                name="subCategory"
                id="subCategory"
                disabled={!values.category} // Disable subcategory if no category is selected
              >
                <option value="" label="Atl kategori seç" />
                {categories?.categories
                  ?.find((cat) => cat.title === values.category)
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
              {addingProduct ? "Adding Product..." : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
