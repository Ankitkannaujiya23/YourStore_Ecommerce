import React from "react";
import { userProfileMenuItems } from "../../../utilityFunction/constant";

const Sidebar = ({ user, activeTab, setActiveTab }) => {


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* User Info */}
            <div className="p-6 text-center border-b border-gray-200">
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mb-3">
                    {user?.avatar}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </div>

            {/* Menu */}
            <nav className="p-2">
                {userProfileMenuItems.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium mb-1 ${activeTab === item.key
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        <i className={`${item.icon} mr-3`}></i>
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
