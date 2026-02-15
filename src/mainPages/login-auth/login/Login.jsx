import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LoginOrSignupSchema } from '../../../validationSchema/ValidationSchema';
import { useFormik } from 'formik';
import { API } from '../../../services/apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { PopupAlertBox } from '../../../components/sweetAlertBox/CustomAlert';
import { useLoginMutation } from '../authApi';
import { setUser } from '../AuthSlice';
import { useSyncCartMutation } from '../../../components/features/cart/cartApi';
import { addItemIntoCart, clearCart } from '../../../components/features/cart/CartSlice';
import { getAddress } from '../../../services/addressApi';
import { setAddress } from '../../../stateStore/storeSlices/AddressSlice';
import store from '../../../stateStore/MainStore';
const Login = () => {
    const [formData, setFormData] = useState({ password: "", email: "", isUserSignup: false });
    const [submitBtnValue, setSubmitBtnValue] = useState('Log in');
    const [login, { isLoading, error }] = useLoginMutation();
    const [syncCart, { isLoading: cartLoading }] = useSyncCartMutation();

    const { cartItems } = useSelector(state => state.CartSlice);
    const user = useSelector(state => state.AuthSlice.user);


    const dispatch = useDispatch();
    const navigate = useNavigate();




    const { values, handleChange, handleBlur, handleSubmit, errors, touched, isValid, isSubmitting } = useFormik({
        initialValues: formData,
        validationSchema: LoginOrSignupSchema(formData.isUserSignup),
        validationOnMount: true,
        validationOnChange: true,
        validationOnBlur: true,
        onSubmit: (values, props) => {
            props.setSubmitting(false);
            handleLogin(values);
        }
    });

    const handleLogin = async (formData) => {
        const { email, password } = formData;
        setSubmitBtnValue('Wait...')
        try {
            //const loginApiResponse = await API.loginUser({ email, password });
            const loginApiResponse = await login(formData);
            const { data } = loginApiResponse;
            if (data.statusCode === 200) {
                const alertData = { isShowAlert: true, isSuccess: true, message: data.message, timer: 1500 }
                dispatch(setUser(data.Data));
                const syncedCart = await syncCart({ cart: cartItems });
                if (syncedCart.data.statusCode === 200) {
                    dispatch(clearCart());
                    const totalCartItems = syncedCart.data.response;
                    for (let i = 0; i < totalCartItems.length; i++) {
                        dispatch(addItemIntoCart(totalCartItems[i]));
                    }
                }
                // ✅ Login ke baad address fetch karcna
                store.dispatch(getAddress.initiate());

                PopupAlertBox(alertData)
                navigate({
                    pathname: '/',
                    state: data?.Data
                });


            } else {
                navigate('/login');
                const alertData = { isShowAlert: true, isSuccess: false, message: data.message, timer: 1500 }
                PopupAlertBox(alertData);
                setSubmitBtnValue('Log in');
            }
        } catch (error) {
            console.log(error);
            const alertData = { isShowAlert: true, isSuccess: false, message: error.message, timer: 1500 }
            PopupAlertBox(alertData);
            setSubmitBtnValue('Log in');
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
            <div className="custom-loader">LOGIN</div>

            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.email && touched.email && <small className='text-red-700'>{errors.email}</small>}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errors.password && touched.password && <small className='text-red-700'>{errors.password}</small>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-gradient-to-br from-emerald-600 to-teal-600 "
                            onClick={handleSubmit} disabled={(!isValid || isSubmitting)}
                        >
                            {submitBtnValue}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create an Account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login