import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { categoryValidationSchema } from "../../../validationSchema/ValidationSchema";
import { useAddCategoryMutation } from "./categoryApi";
import CategoryLoader from "../../loaders/CategoryLoader";
import { PopupAlertBox } from "../../sweetAlertBox/CustomAlert";
import { useSearchParams } from "react-router-dom";

const AddUpdateCategoryPage = () => {
  const [preview, setPreview] = useState(null);
  const [addCategory, { isLoading, isError }] = useAddCategoryMutation();
  const { id } = useSearchParams();

  const initialValues = {
    name: "",
    image: null,
  }

  const formik = useFormik({
    initialValues,
    validationSchema: categoryValidationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async (values) => {
    try {


      //const formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("image", values.image);
      const model = { name: values.name };
      const response = await addCategory(model);
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        const alertData = { isShowAlert: true, isSuccess: true, message: response.data.message, timer: 1500 }
        PopupAlertBox(alertData);
        formik.setValues({ name: '', image: null });
      } else {
        const alertData = { isShowAlert: true, isSuccess: false, message: response.data.message, timer: 1500 }
        PopupAlertBox(alertData);
      }
    } catch (error) {
      console.log({ error });
      const alertData = { isShowAlert: true, isSuccess: false, message: error.message, timer: 1500 }
      PopupAlertBox(alertData);
    }
  }

  return (
    <>
      {(isLoading || isError) && <CategoryLoader isError={isError} isLoading={isLoading} />}
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mt-5 mx-auto p-4 bg-white rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600">
          Add Category
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <div className="relative flex items-center justify-between border border-dashed border-purple-500 rounded-lg p-4 cursor-pointer bg-purple-50 hover:bg-purple-100">
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <span className="text-purple-600 font-medium">Choose Image</span>
          </div>
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
          )}
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-48 object-contain rounded-lg shadow border"
          />
        )}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold"
        >
          Add Category
        </button>
      </form>

    </>);
}

export default AddUpdateCategoryPage
