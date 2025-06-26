import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";


export const NewPasswordForm = () => {

    const location=useLocation();

    const formik = useFormik({
        initialValues: { newPassword: "", confirmPassword: "" },
        validationSchema: Yup.object({
            newPassword: Yup.string().min(6, "At least 6 characters").required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: (values) => {
            console.log("New password set:", values.newPassword);
        },
    });

    const resetPassword=()=>{
        const prm= new URLSearchParams(location.search);
        const token= prm.get('token');
        
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
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};