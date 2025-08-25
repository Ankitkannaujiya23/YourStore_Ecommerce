import React from "react";

const WishlistTab = () => {
    const wishlist = [
        { id: 1, name: "Wireless Headphones", price: 129.99 },
        { id: 2, name: "Smart Watch", price: 199.99 },
    ];

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center"
                    >
                        <div>
                            <h4 className="font-semibold">{item.name}</h4>
                            <p className="text-gray-600">${item.price}</p>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistTab;
