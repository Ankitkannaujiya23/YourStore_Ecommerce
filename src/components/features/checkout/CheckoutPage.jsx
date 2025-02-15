import React, { useState } from 'react'
import Cart from '../cart/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { addressDetailsValidation } from '../../../validationSchema/ValidationSchema'
import { addAddressDetails } from './CheckoutSlice'
import { PopupAlertBox } from '../../sweetAlertBox/CustomAlert'
import { addOrder } from '../orders/OrderSlice'

const CheckoutPage = () => {

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
    const cartItems = useSelector(state => state.CartSlice.cartItems);
    const AddressList = useSelector(state => state.CheckoutSlice.AddressDetails);
    const currentOrder= useSelector(state=> state.OrderSlice.currentOrderPlaced)
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const initialValues = {
        fullName: "",
        email: "",
        streetAddress: "",
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
            console.log({ values });

            dispatch(addAddressDetails(values));
            resetAddressForm()
        }
    });

    const resetAddressForm = () => {
        setValues({
            fullName: "",
            email: "",
            streetAddress: "",
            city: "",
            mobileNo: "",
            state: "",
            pincode: ""
        });
        setErrors({});
    }


    const handleBuyNow = (orderData) => {
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
        if (goto && currentOrder) {
                dispatch(addOrder({ cartItems, totalAmount, totalItems, selectedAddress, paymentMethod, orderStatus:'pending' }));
            navigate(`/orderSuccess/${currentOrder.id}`);
            PopupAlertBox({ isSuccess: true, message: "Your order successfully placed.", timer: 3000 });
        }
    };


    return (
        <>
            {!cartItems.length && <Navigate to="/" />}
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8'>
                    <div className="lg:col-span-3 mt-5  ">
                        <form className='px-5 py-12 bg-white rounded'>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-2xl font-bold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
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
                                            <div className="mt-2">
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
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="streetAddress"
                                                    id="streetAddress"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.streetAddress}
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                {errors.streetAddress && touched.streetAddress && <span className='text-red-600 text-sm'>{errors.streetAddress}</span>}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
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

                                        <div className="sm:col-span-2">
                                            <label htmlFor="mobileNo" className="block text-sm font-medium leading-6 text-gray-900">
                                                Mobile No.
                                            </label>
                                            <div className="mt-2">
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

                                        <div className="sm:col-span-2">
                                            <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                                                Pincode
                                            </label>
                                            <div className="mt-2">
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

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <div className="mt-2">
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
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" onClick={resetAddressForm} className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isValid}
                                        onClick={handleSubmit}
                                        className={`${!isValid ? "bg-indigo-400" : ""} rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                        Add Address
                                    </button>
                                </div>


                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from Existing Addresses
                                    </p>


                                    <ul role="list" className="divide-y divide-gray-100">
                                        {AddressList?.map((address) => (
                                            <li key={address.fullName} className="flex justify-between gap-x-6 py-5">
                                                <div className="flex min-w-0 gap-x-4">
                                                    {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={address.imageUrl} alt="" /> */}
                                                    <input
                                                        name='address'
                                                        type="radio"
                                                        onChange={() => setSelectedAddress(address)}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />

                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.fullName}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.streetAddress} , {address.city} , {address.state}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">Mobile No : {address.mobileNo}</p>
                                                    <p className="text-sm leading-6 text-gray-900">Pincode : {address.pincode}</p>
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
                                                        checked={paymentMethod === "cashOnDelivery"}
                                                        value="cashOnDelivery"
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
                                                        checked={paymentMethod === "cardPayment"}
                                                        value="cardPayment"
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
                        <Cart isFromCheckout={true}  handleBuyNow={handleBuyNow}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;