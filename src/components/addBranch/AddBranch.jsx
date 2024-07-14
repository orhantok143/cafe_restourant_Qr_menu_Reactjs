import { Field, Form, Formik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup"
import { addBusiness } from '../../redux/businesses/businessesSlice';

const AddBranch = () => {
  const dispatch = useDispatch();

    const addingBusiness = useSelector((state) => state.businesses.loading);

    const businessValidationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        logo: Yup.string()
    
      });

      const initialValues = {
        name: "",
        logo:""
      };

      const handleSubmit = (values, { resetForm }) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
        dispatch(addBusiness(formData))
       
        resetForm();
      };
    

  return (
    <div className="form-container">
      <h1>Add Business</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={businessValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, touched, errors, handleBlur }) => (
          <Form className="list-container">
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <Field id="name" name="name" type="text" />
              {touched.name && errors.name ? (
                <div className="__error">{errors.name}</div>
              ) : null}
            </div>

            <div className="form-field">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                name="logo"
                type="file"
                onChange={(event) => {
                  setFieldValue("logo", event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
              />
              {touched.logo && errors.logo ? (
                <div className="__error">{errors.logo}</div>
              ) : null}
            </div>

         

            <button className="add-item-button" type="submit">
              {addingBusiness ? "Adding Business..." : "Add Business"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default AddBranch
