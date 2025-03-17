import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LoginOrSignupSchema } from '../../../validationSchema/ValidationSchema';
import { useFormik } from 'formik';
import { API } from '../../../services/apiConfig';
import { useDispatch } from 'react-redux';
import { PopupAlertBox } from '../../../components/sweetAlertBox/CustomAlert';
import { useLoginMutation } from '../authApi';
import { setUser } from '../AuthSlice';
const Login = () => {
    const [formData, setFormData] = useState({ password: "", email: "", isUserSignup: false });
    const[submitBtnValue, setSubmitBtnValue]=useState('Log in');
    const[login,{isLoading,error}]= useLoginMutation();
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
                dispatch(setUser(data?.Data));
                PopupAlertBox(alertData)
                localStorage.setItem('token', data?.Data?.token);

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
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </h2>
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
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
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
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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