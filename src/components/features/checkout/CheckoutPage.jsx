import React, { useState } from 'react'
import Cart from '../cart/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { addressDetailsValidation } from '../../../validationSchema/ValidationSchema'
import { addAddressDetails } from './CheckoutSlice'
import { PopupAlertBox } from '../../sweetAlertBox/CustomAlert'
import { addOrder } from '../orders/OrderSlice'
import { getAddress, useAddAddressMutation, useGetAddressQuery, useRemoveAddressMutation, useUpdateAddressMutation } from '../../../services/addressApi'
import { toast } from 'react-toastify'
import { getAddressPayload } from '../../../utilityFunction/payloadBuilder'
import store from '../../../stateStore/MainStore'
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDeleteCategoryMutation } from '../category/categoryApi'
import { useCreateOrderMutation } from '../orders/orderApi'
import { clearCart, setCartItemsFromBackend } from '../cart/CartSlice'
import { useFetchCartQuery } from '../cart/cartApi'

const CheckoutPage = () => {

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [isAddOrUpdate, setIsAddOrUpdate] = useState(false);
    const [id, setId] = useState(null);
    const [addAddress, { isLoading: addLoding }] = useAddAddressMutation();
    const [updateAddress, { isLoading: updateLoding }] = useUpdateAddressMutation();
    const [createOrder, { isLoading: orderCreating }] = useCreateOrderMutation();
    const { fetchCart, isLoading: fetchingCart } = useFetchCartQuery();
    const [removeAddress] = useRemoveAddressMutation();
    const { data: addressData } = useGetAddressQuery();
    const AddressList = addressData?.response;
    const cartItems = useSelector(state => state.CartSlice.cartItems);
    const currentOrder = useSelector(state => state.OrderSlice.currentOrderPlaced)

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const initialValues = {
        fullName: "",
        email: "",
        address1: "",
        address2: "",
        city: "",
        mobileNo: "",
        state: "",
        pincode: ""

    }
    const { values, errors, handleBlur, handleChange, handleSubmit, touched, isSubmitting, isValid, setValues, setErrors } = useFormik({
        initialValues,
        validationSchema: addressDetailsValidation,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: (action) => {
            handleAddress();
        }
    });

    const resetAddressForm = () => {
        setId(null);
        setValues({
            fullName: "",
            email: "",
            address1: "",
            address2: "",
            city: "",
            mobileNo: "",
            state: "",
            pincode: ""
        });
        setErrors({});
    }


    const handleBuyNow = async (orderData) => {
        const { totalAmount, totalItems } = orderData;
        let goto = true;
        if (selectedAddress === null) {
            goto = false;
            PopupAlertBox({ isSuccess: false, message: "Please select any address.", timer: 3000 });

        }
        if (paymentMethod === null) {
            goto = false;
            PopupAlertBox({ isSuccess: false, message: "Add any Payment Method.", timer: 3000 });

        }
        if (goto) {
            try {
                const model = {
                    addressId: selectedAddress.id,
                    paymentMethod
                }
                const res = await createOrder(model);
                if (res.data.statusCode === 200) {
                    dispatch(clearCart());
                    const resCartData = await fetchCart();
                    dispatch(setCartItemsFromBackend(resCartData.data.response || []));
                    navigate(`/orderSuccess/${res.data?.response[0]?.id}`);
                    PopupAlertBox({ isSuccess: true, message: "Your order successfully placed.", timer: 3000 });
                } else toast.error(res.data.message);
            } catch (error) {
                console.log({ error });
                toast.error(error.message);
            }

        }
    };


    const handleAddress = async () => {
        try {
            const model = getAddressPayload({ values, id });
            const res = id ? await updateAddress(model) : await addAddress(model);
            setIsAddOrUpdate(false);
            if (res.data.statusCode === 200) {
                store.dispatch(getAddress.initiate());
                toast.success(res.data.message);
                resetAddressForm();
            } else toast.error(res.data.message)
        } catch (error) {
            console.log({ error });
            toast.error(error.message);
        }
    };
    const editAddress = (address) => {
        setId(address.id);
        setValues({
            fullName: address.fullname,
            email: address.email,
            address1: address.address_line1,
            address2: address.address_line2,
            city: address.city,
            mobileNo: address.mobileno,
            state: address.state,
            pincode: address.pincode
        });
    }
    const deleteAddress = async (id) => {
        try {
            const res = await removeAddress({ id });
            if (res.data.statusCode === 200) {
                toast.success(res.data.message);
            } else toast.error(res.data.message);
        } catch (error) {
            console.log({ error });
            toast.error(error.message);
        }
    }


    return (
        <>
            {!cartItems.length && <Navigate to="/" />}
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8'>
                    <div className="lg:col-span-3 mt-5  ">
                        <form className='px-5 py-12 bg-white rounded'>
                            <div className="space-y-12">
                                <div className=" border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-bold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
                                    {isAddOrUpdate &&
                                        <>
                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Name
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="fullName"
                                                            id="fullName"
                                                            autoComplete="given-name"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.fullName}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.fullName && touched.fullName && <span className='text-red-600 text-sm'>{errors.fullName}</span>}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Email address
                                                    </label>
                                                    <div >
                                                        <input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.email}
                                                            autoComplete="email"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.email && touched.email && <span className='text-red-600 text-sm'>{errors.email}</span>}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Address 1
                                                    </label>
                                                    <div >
                                                        <input
                                                            type="text"
                                                            name="address1"
                                                            id="address1"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.address1}
                                                            autoComplete="street-address"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.address1 && touched.address1 && <span className='text-red-600 text-sm'>{errors.address1}</span>}
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-3">
                                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Address 2
                                                    </label>
                                                    <div >
                                                        <input
                                                            type="text"
                                                            name="address2"
                                                            id="address2"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.address2}
                                                            autoComplete="address2"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.address2 && touched.address2 && <span className='text-red-600 text-sm'>{errors.address2}</span>}
                                                    </div>
                                                </div>



                                                <div className="sm:col-span-3">
                                                    <label htmlFor="mobileNo" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Mobile No.
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="mobileNo"
                                                            id="mobileNo"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.mobileNo}
                                                            autoComplete="address-level1"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.mobileNo && touched.mobileNo && <span className='text-red-600 text-sm'>{errors.mobileNo}</span>}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Pincode
                                                    </label>
                                                    <div >
                                                        <input
                                                            type="text"
                                                            name="pincode"
                                                            id="pincode"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.pincode}
                                                            autoComplete="address-level1"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.pincode && touched.pincode && <span className='text-red-600 text-sm'>{errors.pincode}</span>}

                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                        City
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.city}
                                                            autoComplete="address-level2"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.city && touched.city && <span className='text-red-600 text-sm'>{errors.city}</span>}
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                        State
                                                    </label>
                                                    <div >
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            id="state"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.state}
                                                            autoComplete="postal-code"
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        />
                                                        {errors.state && touched.state && <span className='text-red-600 text-sm'>{errors.state}</span>}
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    }
                                </div>

                                <div className="mt-2 flex items-center justify-end gap-x-6">
                                    {/* <button type="button" onClick={resetAddressForm} className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button> */}
                                    <div className="mt-2 flex items-center justify-end gap-x-6">
                                        {/* <button type="button" onClick={resetAddressForm} className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button> */}
                                        {!isAddOrUpdate ? <button
                                            type="button"
                                            onClick={() => setIsAddOrUpdate(true)}
                                            className={`${!isValid ? "bg-indigo-200" : "hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"} rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm `}
                                        >
                                            Add Address
                                        </button>
                                            : <button
                                                type="submit"
                                                disabled={!isValid}
                                                onClick={handleSubmit}
                                                className={`${!isValid ? "bg-indigo-200" : "hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"} rounded-md mt-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm `}
                                            >
                                                {id ? "Update" : "Add"} Address
                                            </button>
                                        }
                                    </div>

                                </div>


                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from Existing Addresses
                                    </p>


                                    <ul role="list" className="divide-y divide-gray-100 ">
                                        {AddressList?.map((address) => (
                                            <li key={address.fullname} className="flex justify-between gap-x-6 py-5 bg-gray-100 mt-2 p-4 rounded position-relative" >

                                                <div className="flex min-w-0 gap-x-4">
                                                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address.imageUrl} alt="" /> */}
                                                    <input
                                                        name='address'
                                                        type="radio"
                                                        onChange={() => setSelectedAddress(address)}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />

                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.fullname}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.address_line1} , {address.address_line2} , {address.city}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">Mobile No : {address.mobileno}</p>
                                                    <p className="text-sm leading-6 text-gray-900">Pincode : {address.pincode}</p>
                                                </div>
                                                <div className='position-absolute flex gap-1 text-lg'>
                                                    <MdEdit className='text-indigo-600 cursor-pointer' onClick={() => editAddress(address)} />
                                                    <MdOutlineDeleteOutline className='text-red-500 cursor-pointer' onClick={() => deleteAddress(address.id)} />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>


                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose anyone Payment Option</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cashOnDelivery"
                                                        name="paymentMethod"
                                                        type="radio"
                                                        checked={paymentMethod === "COD"}
                                                        value="COD"
                                                        onChange={e => setPaymentMethod(e.target.value)}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cashOnDelivery" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash on Delivery
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cardPayment"
                                                        name="paymentMethod"
                                                        type="radio"
                                                        checked={paymentMethod === "ONLINE"}
                                                        value="ONLINE"
                                                        onChange={e => setPaymentMethod(e.target.value)}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cardPayment" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card Payment
                                                    </label>
                                                </div>
                                                {/* <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="push-nothing"
                                                        name="push-notifications"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                                        No push notifications
                                                    </label>
                                                </div> */}
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>

                    <div className='lg:col-span-2'>
                        {/* <CheckoutItemSummary /> */}
                        <Cart isFromCheckout={true} handleBuyNow={handleBuyNow} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;