

import React from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-purple-700">Admin Dashboard</h1>
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 min-w-[150px] p-2 rounded-md border border-gray-300 focus:outline-none"
            />
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full px-1">3</span>
              <button className="bg-purple-700 p-2 rounded-full text-white">🔔</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 text-white rounded-full px-3 py-1">AU</span>
              <span className="text-sm sm:text-base">Admin User</span>
            </div>
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          {[
            { title: "Total Products", value: 256, change: "12% from last month", color: "green" },
            { title: "Active Categories", value: 18, change: "5% from last month", color: "green" },
            { title: "Total Sales", value: "$24,568", change: "3% from last month", color: "red" },
            { title: "New Orders", value: 43, change: "8% from last month", color: "green" },
          ].map((card, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-gray-500">{card.title}</h3>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className={`text-${card.color}-500 text-sm`}>{card.change}</p>
            </div>
          ))}
        </div>

        {/* Product and Categories Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Table */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <h2 className="text-lg font-semibold">Products</h2>
              <Link to="/addProduct" className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">
                + Add Product
              </Link>
            </div>
            <table className="min-w-[600px] w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">Product</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Premium Headphones", category: "Electronics", price: "$299.99", stock: 45, status: "Active" },
                  { name: "Smart Watch X1", category: "Wearables", price: "$199.99", stock: 18, status: "Low Stock" },
                  { name: "Wireless Mouse", category: "Accessories", price: "$49.99", stock: 120, status: "Active" },
                ].map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{product.price}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs bg-${
                          product.status === "Active" ? "green" : "yellow"
                        }-200 text-${product.status === "Active" ? "green" : "yellow"}-800`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button className="text-red-500">🗑️</button>
                      <button className="text-blue-500">✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Categories */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm">+ Add</button>
            </div>
            <ul>
              {[
                { name: "Electronics", count: 84 },
                { name: "Wearables", count: 36 },
                { name: "Audio", count: 29 },
                { name: "Accessories", count: 50 },
              ].map((category, index) => (
                <li key={index} className="flex justify-between items-center p-2 border-b">
                  <span>{category.name}</span>
                  <span className="text-gray-500 text-sm">{category.count} products</span>
                  <div className="flex gap-2">
                    <button className="text-blue-500">✏️</button>
                    <button className="text-red-500">🗑️</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
