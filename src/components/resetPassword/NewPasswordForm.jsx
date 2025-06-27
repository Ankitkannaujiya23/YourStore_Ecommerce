import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { newPasswordFormSchema } from "../../validationSchema/ValidationSchema";
import { PopupAlertBox } from "../sweetAlertBox/CustomAlert";
import { useResetPasswordMutation } from "./forgotPasswordApi";


export const NewPasswordForm = () => {
    const [resetPassword, { isLoading, isError }] = useResetPasswordMutation();
    const location = useLocation();

    const formik = useFormik({
        initialValues: { newPassword: "", confirmPassword: "" },
        validationSchema: newPasswordFormSchema,
        onSubmit: (values) => {
            submitForm();
        },
    });

    const submitForm = async () => {
        const prm = new URLSearchParams(location.search);
        const token = prm.get('token');
        try {
            const model = {
                token,
                password: formik.values.newPassword
            }
            const res = await resetPassword(model);
            if (res.data.statusCode === 200) {
                const alertData = { isShowAlert: true, isSuccess: true, message: res.data.message, timer: 1500 }
                PopupAlertBox(alertData);
            }
        } catch (error) {
            console.log({ error });
            const alertData = { isShowAlert: true, isSuccess: false, message: error.message, timer: 1500 }
            PopupAlertBox(alertData);

        }


    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={formik.handleSubmit} className="bg-white shadow-md p-8 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Set New Password</h2>
                <label className="block text-gray-700 mb-2">New Password</label>
                <input
                    type="password"
                    name="newPassword"
                    className="w-full border border-gray-300 p-2 rounded mb-1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                    <p className="text-sm text-red-500">{formik.errors.newPassword}</p>
                )}

                <label className="block text-gray-700 mb-2 mt-4">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    className="w-full border border-gray-300 p-2 rounded mb-1"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
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
                        "Update Password"
                    )}
                </button>
            </form>
        </div>
    );
};