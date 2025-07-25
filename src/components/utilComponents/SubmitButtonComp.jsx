// src/components/common/SubmitButton.jsx

import React from "react";

const SubmitButtonComp = ({
    label = "Submit",
    isLoading = false,
    disabled = false,
    onClick = null,
    className = "",
    type = "submit",
}) => {
    return (
        <button
            type={type}
            disabled={isLoading || disabled}
            onClick={onClick}
            className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200
        ${isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""}
        ${className}`}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                        ></path>
                    </svg>
                    Processing...
                </div>
            ) : (
                label
            )}
        </button>
    );
};

export default SubmitButtonComp;
