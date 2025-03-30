import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddProductPage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
    featured: false,
  });

  const [errors, setErrors] = useState({});

  const {id}= useParams();

  const validate = () => {
    let newErrors = {};
    if (!product.name) newErrors.name = "Product name is required";
    if (!product.price) newErrors.price = "Price is required";
    if (!product.stock) newErrors.stock = "Stock quantity is required";
    if (!product.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Product submitted:", product);
    }
  };

  useEffect(()=>{

  },[]);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md m-4">
      <h2 className="text-xl font-semibold text-purple-600 mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name </label>
          <input type="text" name="name" placeholder="Enter product name" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($) </label>
            <input type="number" name="price" placeholder="0.00" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Quantity </label>
            <input type="number" name="stock" placeholder="0" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg" />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category </label>
          <select name="category" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg">
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" placeholder="Enter product description" maxLength={500} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg"></textarea>
        </div>
        <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded-lg">
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <label className="cursor-pointer flex items-center justify-center">
            {/* <Upload className="h-6 w-6 text-gray-400" /> */}
            <span className="text-sm text-purple-600 ml-2">Upload a file</span>
            <input type="file" name="image" className="hidden" accept="image/*" onChange={handleChange} />
          </label>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="featured" onChange={handleChange} className="w-4 h-4 border-gray-300 rounded" />
          <label className="text-sm font-medium text-gray-700">Mark as featured product</label>
        </div>
        <div className="flex justify-between mt-4">
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
