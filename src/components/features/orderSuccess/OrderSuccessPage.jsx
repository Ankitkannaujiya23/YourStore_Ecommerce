// import React from 'react';
// import { Link, Navigate, useParams } from 'react-router-dom';

// const OrderSuccessPage = () => {
//     const params = useParams();
//     return (
//         <>
//             {!params?.id && <Navigate to='/' replace={true} />}
//             <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//                 <div className="bg-white p-10 rounded shadow-md text-center">
//                     <div className="text-green-500 text-6xl mb-5">
//                         <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
//                             <path fill="currentColor"
//                                 d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
//                             </path>
//                         </svg>
//                     </div>
//                     <h1 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h1>
//                     <p className="text-gray-700 mb-4">Thank you for your order. Your order number is #{params?.id}.</p>
//                     <Link to="/" className="text-white bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600 transition">
//                         Continue Shopping
//                     </Link>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default OrderSuccessPage
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderSuccessPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();

    // format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // estimated delivery (5 days)
    const today = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 5);

    // confetti effect
    useEffect(() => {
        createConfetti();
    }, []);

    const createConfetti = () => {
        const container = document.getElementById("confetti-container");
        if (!container) return;

        const colors = [
            "#22c55e",
            "#16a34a",
            "#4ade80",
            "#15803d",
            "#86efac",
        ];

        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const confetti = document.createElement("div");

                confetti.className =
                    "absolute w-2 h-2 rounded-sm animate-bounce";

                confetti.style.left = Math.random() * 100 + "%";
                confetti.style.top = Math.random() * 100 + "%";
                confetti.style.backgroundColor =
                    colors[Math.floor(Math.random() * colors.length)];

                container.appendChild(confetti);

                setTimeout(() => confetti.remove(), 2000);
            }, i * 40);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">

            {/* Confetti */}
            <div
                id="confetti-container"
                className="absolute inset-0 pointer-events-none"
            />

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-scaleIn">

                        <svg
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>

                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Order Placed Successfully 🎉
                </h1>

                <p className="text-gray-500 mb-6">
                    Your order has been confirmed and is being processed.
                </p>

                {/* Order Info */}
                <div className="bg-gray-100 rounded-xl p-4 text-left space-y-2 mb-6">

                    <div className="flex justify-between">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-semibold text-green-600">
                            #{orderId}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Date</span>
                        <span className="font-semibold">
                            {formatDate(today)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Delivery</span>
                        <span className="font-semibold text-green-600">
                            {formatDate(deliveryDate)}
                        </span>
                    </div>

                </div>

                {/* Buttons */}
                <div className="space-y-3">

                    <button
                        onClick={() => navigate(`/orders/${orderId}`)}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition transform hover:scale-105"
                    >
                        Track Order
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full border border-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

            {/* Animations */}
            <style>
                {`
        .animate-scaleIn {
          animation: scaleIn 0.5s ease;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease;
        }

        @keyframes scaleIn {
          0% { transform: scale(0); opacity:0; }
          100% { transform: scale(1); opacity:1; }
        }

        @keyframes fadeIn {
          0% { opacity:0; transform:translateY(20px); }
          100% { opacity:1; transform:translateY(0); }
        }
        `}
            </style>

        </div>
    );
};

export default OrderSuccessPage;