import Axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required('Please enter your name'),
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().min(6).required('Please enter your password'),
    cpassword: Yup.string()
      .min(6)
      .oneOf([Yup.ref('password'), null], 'Password must match'),
  });
  const initialValues = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
  };
  const { values, errors, handleSubmit, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {
        await Axios.post(
          'https://movieapi-ka6t.onrender.com/api/register',
          values
        )
          .then((res) => {
            alert(res.data.message);
            navigate('/login');
          })
          .catch((err) => {
            alert(err.response.data.message);
          });

        action.resetForm();
      },
    });

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-lg-4">
            <form onSubmit={handleSubmit} id="signup">
              <div className="form-group">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {values.name && touched.name ? <p>{errors.name}</p> : null}
              </div>
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {values.email && touched.email ? <p>{errors.email}</p> : null}
              </div>
              <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                {values.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  className="form-control"
                  name="cpassword"
                  value={values.cpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {values.cpassword && touched.cpassword ? (
                  <p>{errors.cpassword}</p>
                ) : null}
              </div>
              <button className="btn btn-primary w-100 mt-3" type="Submit">
                SignUp
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
