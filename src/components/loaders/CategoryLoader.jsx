
import React from "react";

const CategoryLoader = ({isLoading=true, isError=false }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-b-4 mb-4"></div>
          <p className="text-lg text-blue-600 font-semibold">Loading Categories...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
            alt="Error"
            className="h-24 w-24 mb-4"
          />
          <p className="text-red-500 text-xl font-bold">Failed to load categories</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CategoryLoader;
