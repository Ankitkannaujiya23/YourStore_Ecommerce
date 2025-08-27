import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUpdateUserDetailsMutation } from "../../../services/usersApi";
import { toast } from "react-toastify";

const ProfileTab = ({ user, setUser }) => {
    const [formData, setFormData] = useState(user);
    const [wantEdit, setWantEdit] = useState(false);
    const [errors, setErrors] = useState({});
    const [updateUser, { isLoading }] = useUpdateUserDetailsMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // reset error on change
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.name || formData.name.trim().length < 3) {
            newErrors.name = "Full name must be at least 3 characters";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!formData.mobile || !phoneRegex.test(formData.mobile)) {
            newErrors.mobile = "Phone number must be 10 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) return;
        try {

            setUser(formData);
            setWantEdit(false);
            const res = await updateUser(formData);
            if (res.data.statusCode === 200) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log({ error });
            toast.error(error.message);
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-2">
                <div>
                    <p className="text-xl font-semibold text-gray-900 mb-6  ">Profile Information</p>
                </div>
                {!wantEdit && <div className="text-indigo-600 flex justify-end hover:cursor-pointer" onClick={() => setWantEdit(true)}>
                    <FaEdit />
                </div>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!wantEdit}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!wantEdit}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        disabled={!wantEdit}
                        className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                </div>
            </div>

            {wantEdit && <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </div>}
        </div>
    );
};

export default ProfileTab;
