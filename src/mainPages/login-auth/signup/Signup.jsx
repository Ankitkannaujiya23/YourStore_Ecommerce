import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginOrSignupSchema } from "../../../validationSchema/ValidationSchema";
import { useFormik } from "formik";
import { API } from "../../../services/apiConfig";
import { PopupAlertBox } from "../../../components/sweetAlertBox/CustomAlert";
import { useSignupMutation } from "../authApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
    isUserSignup: true,
  });
  const [submitBtnValue, setSubmitBtnValue] = useState("Sign Up");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isValid,
    isSubmitting,
  } = useFormik({
    initialValues: formData,
    validationSchema: LoginOrSignupSchema(formData.isUserSignup),
    validationOnMount: true,
    validationOnChange: true,
    validationOnBlur: true,
    onSubmit: (values, props) => {
      props.setSubmitting(false);
      getUserSignup(values);
      setFormData({
        name: "",
        password: "",
        email: "",
        confirmPassword: "",
        isUserSignup: true,
      });
    },
  });

  const getUserSignup = async (formData) => {
    setSubmitBtnValue("Wait...");
    try {
      // let signupApiResponse = await API.userSignup(formData);
      let res = await signup(formData);
      console.log({ res });
      const alertData = {
        isShowAlert: true,
        isSuccess: res.data.statusCode === 201 ? true : false,
        message: res.data.message,
        timer: 3000,
      };
      PopupAlertBox(alertData);
      if (res.data.statusCode === 201) {
        navigate("/login");
      }
    } catch (error) {
      const alertData = {
        isShowAlert: true,
        isSuccess: false,
        message: error.message,
        timer: 3000,
      };
      // dispatch(showAlert(alertData));
      PopupAlertBox(alertData);
      setSubmitBtnValue("Sign Up");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
        <div className="custom-loader">Create Account</div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && touched.name && (
                <small className="text-red-700">{errors.name}</small>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && touched.email && (
                <small className="text-red-700">{errors.email}</small>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && touched.password && (
                <small className="text-red-700">{errors.password}</small>
              )}
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <small className="text-red-700">{errors.confirmPassword}</small>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-gradient-to-br from-emerald-600 to-teal-600 hover:bg-gradient-to-br hover:from-emerald-700 hover:to-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Signing Up.." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a Member?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
