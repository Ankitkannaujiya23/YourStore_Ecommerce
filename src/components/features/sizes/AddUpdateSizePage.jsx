import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import SubmitButtonComp from "../../utilComponents/SubmitButtonComp";
import { toast } from "react-toastify";
import { useAddSizeMutation, useGetSizeByIdQuery, useUpdateSizeMutation } from "./handleSizesApi";

const AddUpdateSizePage = () => {
    const defaultValues = {
        name: "",
    }
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState(defaultValues);
    const [addSize, { isLoading: isAddLoading, isError: isAddError }] = useAddSizeMutation();
    const [updateSize, { isLoading: isUpdateLoading, isError: isUpdateError }] = useUpdateSizeMutation();

    const { data: sizeData, isLoading: colorLoading, isError: colorLoadingError } = useGetSizeByIdQuery(id, { skip: !id });

    useEffect(() => {
        if (id && colorData?.statusCode === 200) {
            const res = colorData.response[0];
            setInitialValues({ name: res.name });
        }
    }, [id, sizeData]);


    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Size is required"),
            // code: Yup.string().required("Color code is required"),
        }),
        onSubmit: (values) => {
            handleAddUpdateSize();
        },
    });

    const handleAddUpdateSize = async () => {
        const { values } = formik;
        try {
            const model = {
                name: values.name,
                // hexCode: values.code
            }
            const response = id ? await updateColor({ id, ...model }) : await addColor(model);
            const data = response.data;
            if (data.statusCode === 200 || data.statusCode === 201) {

                toast.success(`Size ${data.statusCode === 201 ? "Added" : "Updated"} Successfully!!`);
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
                <h2 className="text-2xl font-bold mb-4 text-gray-700">{id ? "Update" : "Add New"} Size</h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                            Size Name
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

                    <SubmitButtonComp
                        label={id ? "Update Size" : "Save Size"}
                        type="submit"
                        isLoading={id ? isUpdateLoading : isAddLoading}
                        onClick={formik.handleSubmit}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddUpdateSizePage;
