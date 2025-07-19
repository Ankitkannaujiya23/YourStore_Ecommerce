import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation, useResetPasswordMutation } from "./forgotPasswordApi";
import { PopupAlertBox } from "../sweetAlertBox/CustomAlert";

export const ResetPasswordForm = () => {
    const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();
    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
        }),
        onSubmit: (values) => {
            console.log("Reset link sent to:", values.email);
            submitForm();
        },
    });

    const submitForm = async () => {
        try {
            const model = { email: formik.values.email };
            const res = await forgotPassword(model);

            const alertData = { isShowAlert: true, isSuccess: res.data.statusCode === 200 ? true : false, message: res.data.message, timer: 1500 }
            PopupAlertBox(alertData);

        } catch (error) {
            console.log({ error });
            const alertData = { isShowAlert: true, isSuccess: false, message: error.message, timer: 1500 }
            PopupAlertBox(alertData);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={formik.handleSubmit} className="bg-white shadow-lg p-8 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 p-2 rounded mb-1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">{formik.errors.email}</p>
                )}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-4 w-full flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                ></path>
                            </svg>
                            <span>Sending...</span>
                        </div>
                    ) : (
                        "Send Reset Link"
                    )}
                </button>

            </form>
        </div>
    );
};