// components/EmptyCart.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-[60vh] bg-gray-50 px-4">
            <div className="text-center bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 animate-fade-in-up">
                {/* Cart Icon (SVG) */}
                <div className="mb-4 flex justify-center">
                    <div className="p-4 bg-red-100 rounded-full animate-bounce-slow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"
                            />
                        </svg>
                    </div>
                </div>

                {/* Text */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">You haven’t added anything yet. Start exploring products now!</p>

                {/* Button */}
                <button
                    onClick={() => navigate('/')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full transition duration-300"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default EmptyCart;
