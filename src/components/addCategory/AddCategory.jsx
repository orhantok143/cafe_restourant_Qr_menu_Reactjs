import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./addCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/category/categorySlice";

// Form doğrulama şeması
const CategorySchema = Yup.object().shape({
  title: Yup.string().required("Category name is required"),
  subCategory: Yup.string().required("Alt kategory gereklidir"),
});

const AddCategory = () => {
  const addingProduct = useSelector((state) => state.categories.loading);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (values[key] !== null) {
        formData.append(key, values[key]);
      }
    }
    dispatch(addCategory(formData));
  };

  return (
    <div className="form-container">
      <h1>Add Category</h1>
      <Formik
        initialValues={{
          title: "",
          subCategory: "",
          image: null,
        }}
        validationSchema={CategorySchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="title">Ana Kategori</label>
              <Field name="title" type="text" className="form-control" />
              <ErrorMessage name="title" component="div" className="__error" />
            </div>
            <div className="form-field">
              <label htmlFor="subCategory">Alt Kategori</label>
              <Field name="subCategory" type="text" className="form-control" />
              <ErrorMessage
                name="subCategory"
                component="div"
                className="__error"
              />
            </div>
            <div className="form-field">
              <label htmlFor="image">Resim (Opsiyonel)</label>
              <input
                name="image"
                type="file"
                className="form-control"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file ? file : null);
                }}
              />
              <ErrorMessage name="image" component="div" className="__error" />
            </div>
            <button type="submit" className="add-item-button">
              {addingProduct ? "Kategory Ekleniyor..." : "Kategori Ekle"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategory;
