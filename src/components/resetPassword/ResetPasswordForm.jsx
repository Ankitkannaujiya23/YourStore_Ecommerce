import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ResetPasswordForm = () => {
    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
        }),
        onSubmit: (values) => {
            console.log("Reset link sent to:", values.email);
        },
    });

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
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    );
};