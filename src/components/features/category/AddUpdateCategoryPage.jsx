import { useState } from "react";

 const AddUpdateCategoryPage=()=> {

  const [formData, setFormData]=useState({
    categoryName:'',
    image:null,
    preview:null
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image:file, preview:URL.createObjectURL(file)})
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryName);
    if (image) formData.append("image", image);

    // Submit logic
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">Add New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Category Image</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-lg border"
              />
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddUpdateCategoryPage;