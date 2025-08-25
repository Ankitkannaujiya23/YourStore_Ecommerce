import React from "react";

const AddressesTab = ({ addresses, setAddresses }) => {
    const handleRemove = (id) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };

    const handleSetDefault = (id) => {
        setAddresses(
            addresses.map((addr) =>
                addr.id === id ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
            )
        );
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Saved Addresses</h3>

            <div className="space-y-4">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center"
                    >
                        <div>
                            <h4 className="font-semibold">{addr.type} Address</h4>
                            <p className="text-sm text-gray-600">{addr.name}</p>
                            <p className="text-sm text-gray-600">{addr.address}</p>
                            <p className="text-sm text-gray-600">{addr.city}</p>
                            {addr.isDefault && (
                                <span className="text-xs text-green-600 font-medium">Default</span>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            {!addr.isDefault && (
                                <button
                                    onClick={() => handleSetDefault(addr.id)}
                                    className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg"
                                >
                                    Set Default
                                </button>
                            )}
                            <button
                                onClick={() => handleRemove(addr.id)}
                                className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-lg"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddressesTab;
