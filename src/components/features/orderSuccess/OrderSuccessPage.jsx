import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

const OrderSuccessPage = () => {
const params=useParams();
    return (
        <>
        {!params?.id && <Navigate to='/' replace={true} />}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-10 rounded shadow-md text-center">
                    <div className="text-green-500 text-6xl mb-5">
                        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                            <path fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                            </path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h1>
                    <p className="text-gray-700 mb-4">Thank you for your order. Your order number is #{params?.id}.</p>
                    <Link to="/" className="text-white bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </>
    )
}

export default OrderSuccessPage
