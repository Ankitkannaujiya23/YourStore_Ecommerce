import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import SubmitButtonComp from "../../utilComponents/SubmitButtonComp";
import { useAddColorMutation, useUpdateColorMutation } from "./handleColorsApi";
import { toast } from "react-toastify";

const AddUpdateColorPage = () => {
    const defaultValues = {
        name: "",
        code: "#000000",
    }
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [addColor, { isLoading: isAddLoading, isError: isAddError }] = useAddColorMutation();
    const [updateColor, { isLoading: isUpdateLoading, isError: isUpdateError }] = useUpdateColorMutation();

    const { id } = useParams();

    useEffect(() => {

    }, []);

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required("Color name is required"),
            code: Yup.string().required("Color code is required"),
        }),
        onSubmit: (values) => {
            handleAddUpdateColor();
        },
    });

    const handleAddUpdateColor = async () => {
        const { values } = formik;
        try {
            const model = {
                name: values.name,
                hexCode: values.code
            }
            const response = id ? await updateColor(model) : await addColor(model);
            const data = response.data;
            if (data.statusCode === 200 || data.statusCode === 201) {

                toast.success(`Color ${data.statusCode === 200 ? "Added" : "Updated"} Successfully!!`);
            } else {
                toast.error(data?.message);
            }


        } catch (error) {
            console.log({ error });
            toast.error("Some error occured");
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">{id ? "Update" : "Add New"} Color</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Color Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Sky Blue"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        ) : null}
                    </div>

                    <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-600">
                            Color Code
                        </label>
                        <div className="flex items-center space-x-4 mt-1">
                            <input
                                type="color"
                                name="code"
                                id="code"
                                onChange={formik.handleChange}
                                value={formik.values.code}
                                className="w-12 h-10 border border-gray-300 rounded"
                            />
                            <span className="text-gray-700">{formik.values.code}</span>
                        </div>
                        {formik.touched.code && formik.errors.code ? (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.code}</p>
                        ) : null}
                    </div>

                    <SubmitButtonComp
                        label={id ? "Update Color" : "Save Color"}
                        type="submit"
                        isLoading={id ? isUpdateLoading : isAddLoading}
                        onClick={formik.handleSubmit}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddUpdateColorPage;
