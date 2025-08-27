import React from "react";
import { useGetAddressQuery, useRemoveAddressMutation } from "../../../services/addressApi";
import { toast } from "react-toastify";

const AddressesTab = ({ addresses, setAddresses }) => {
    const { data: addressData } = useGetAddressQuery();
    const AddressList = addressData?.response;
    const [removeAddress] = useRemoveAddressMutation();

    const handleRemove = async (id) => {
        try {
            const res = await removeAddress({ id });
            if (res.data.statusCode === 200) {
                toast.success(res.data.message);
            } else toast.error(res.data.message);
        } catch (error) {
            console.log({ error });
            toast.error(error.message);
        }
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
                {AddressList?.map((addr) => (
                    <div
                        key={addr.id}
                        className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center"
                    >
                        <div>
                            <h4 className="font-semibold">{addr.type ?? 'Home'} Address</h4>
                            <p className="text-sm text-gray-600">{addr.fullname}</p>
                            <p className="text-sm text-gray-600">{addr.address_line1}, {addr.address_line2}</p>
                            <p className="text-sm text-gray-600">{addr.city}</p>
                            <p className="text-sm text-gray-600">{addr.pincode}</p>
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
