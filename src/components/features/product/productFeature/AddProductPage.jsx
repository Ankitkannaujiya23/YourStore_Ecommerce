import { useFormik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddProductMutation } from "./productsApi";
import ProductLoader from "../../../loaders/ProductLoader";
import { PopupAlertBox } from "../../../sweetAlertBox/CustomAlert";

const AddProductPage = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const [addProduct, {isLoading=true, error}] = useAddProductMutation();
  console.log(addProduct);
  

let initialValues={
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
  image: null,
  featured: false,
}
const validateForm=(values) => {
  const errors = {};
  if (!values.name) errors.name = "Product name is required";
  if (!values.price) errors.price = "Price is required";
  if (!values.stock) errors.stock = "Stock quantity is required";
  if (!values.category) errors.category = "Category is required";
  return errors;
}

  const {id}=useParams();

  const {values,handleBlur,handleSubmit,handleChange,errors,touched,setFieldValue} = useFormik({
    initialValues,
    validate: validateForm,
    onSubmit: (values) => {
      addOrUpdateProduct();
    },
  });

  const addOrUpdateProduct=async()=>{
    const model=values;
    model.image=imagePreview;
    try {
      const res= await addProduct(model);
      const statusCode=res.data.statuCode
      if( statusCode===200 || statusCode===201){
        console.log({res});
      }
      
      PopupAlertBox({isShowAlert:true,isSuccess:statusCode===200 || statusCode===201 ?true:false,message:res.data.message, timer:3000});
      
    } catch (error) {
      console.log({error});
    }
  }

 if (isLoading) return <ProductLoader/>
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-purple-600 mb-4">{id?"Update":"Add New"} Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name </label>
          <input
            name="name"
            placeholder="Enter product name"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($) </label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.price}
            />
            {errors.price && touched.price &&<p className="text-red-500 text-xs">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Quantity </label>
            <input
              name="stock"
              type="number"
              placeholder="0"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.stock}
            />
            {errors.stock && touched.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category </label>
          <select
            name="category"
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.category}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
          {errors.category && touched.category && <p className="text-red-500 text-xs">{errors.category}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter product description"
            maxLength={500}
            className="w-full p-2 border border-gray-300 rounded-lg"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        </div>
        <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded-lg">
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <label className="cursor-pointer flex items-center justify-center">
          
            <span className="text-sm text-purple-600 ml-2">Upload a file</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
                setImagePreview(URL.createObjectURL(event.currentTarget.files[0]));
              }}
            />
          </label>
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Uploaded Preview" className="w-24 h-24 object-cover rounded-lg" />
            </div>
          )}
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            className="w-4 h-4 border-gray-300 rounded"
            onChange={handleChange}
            checked={values.featured}
          />
          <label className="text-sm font-medium text-gray-700">Mark as featured product</label>
        </div>
        <div className="flex justify-between mt-4">
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">{id?"Update":"Add"} Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
