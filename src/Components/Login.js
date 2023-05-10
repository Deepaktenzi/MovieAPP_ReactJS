import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './utils/authSlice';
function Login() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
  });
  const initialValues = {
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const { values, errors, handleSubmit, handleBlur, touched, handleChange } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values, action) => {
        await Axios.post('https://movieapi-ka6t.onrender.com/api/login', values)
          .then((res) => {
            alert(res.data.message);
            localStorage.setItem('token', res.data.token);
            dispatch(
              loginSuccess({
                token: res.data.token,
                rootId: res.data.rootId,
                rootUser: res.data.rootUser,
              })
            );
            navigate('/dashboard');
          })
          .catch((err) => {
            alert(err.message);
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

              <button className="btn btn-primary w-100 mt-3" type="Submit">
                Signin
              </button>
              <Link to={'/signup'}>
                <button className="btn btn-primary w-100 mt-3" type="Submit">
                  SignUp
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
