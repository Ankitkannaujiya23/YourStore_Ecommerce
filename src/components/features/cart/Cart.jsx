import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart, updateQuantity } from './CartSlice'
import { categoryList } from '../../../dummyData'
import { getQuantityDropdownList, quantityDropdownList } from '../../../utilityFunction/utilityFunction'
import EmptyCart from './EmptyCart'
import { useRemoveCartItemMutation, useUpdateCartMutation } from './cartApi'
import { toast } from 'react-toastify'

const Cart = ({ isFromCheckout, handleBuyNow }) => {

    const [products, setProducts] = useState([]);
    const [quantityList, setQuantityList] = useState([]);
    const CartListData = useSelector(state => state.CartSlice.cartItems);
    const [removeCartItem, { isLoading, isError }] = useRemoveCartItemMutation();
    const [updateCart] = useUpdateCartMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const list = getQuantityDropdownList(1000);
        setQuantityList(list);
    }, []);
    useEffect(() => {
        setProducts(CartListData);
    }, [CartListData]);

    const removeProductFromCartList = async (id) => {

        try {
            const res = await removeCartItem({ productId: id });
            if (res.data.statusCode === 200) {
                dispatch(removeItemFromCart(id));
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log({ error });

        }

    }
    const updateCartItem = async (e, item) => {
        const product = { ...item };
        product.quantity = parseInt(e.target.value);
        try {
            dispatch(updateQuantity(product));
            const res = await updateCart({ productId: product.product_id, quantity: product.quantity });
            if (res.data.statusCode === 200) {

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log({ error });

        }
    }


    const handleCheckout = () => {
        navigate('/checkout');
    }

    const totalAmount = CartListData.reduce((amount, item) => parseInt(item.quantity) * Math.round(item.price * (1 - (item.discountPercentage ?? 0) / 100)) + amount, 0)
    const totalItems = CartListData.reduce((total, item) => parseInt(item.quantity) + parseInt(total), 0);

    return (
        <>
            {!CartListData.length ? <EmptyCart />
                : <div className="mx-auto bg-white max-w-7xl mt-5 px-2 sm:px-6 lg:px-8 rounded">
                    <div className=" border-gray-200 px-4 py-6 sm:px-6">
                        <h2 className="text-2xl font-bold my-5">
                            Cart
                        </h2>
                        <div className="flow-root ">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products?.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={product?.image[0]}
                                                alt="product image  "
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={product.href}>{product.name}</a>
                                                    </h3>
                                                    <div>
                                                        <p className="ml-4 text-sm font-medium text-gray-400"><del>₹{product.price}</del></p>
                                                        <p className="ml-4">₹ {Math.round(parseInt(product.price) * (1 - (product.discountPercentage ?? 0) / 100))}</p>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div class="flex align-items-center">
                                                    <p className="text-gray-500 relative">Qty
                                                        <select onChange={(e) => updateCartItem(e, product)} value={product.quantity} className="rounded  border-none  focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base">
                                                            {quantityList.map((qty) => (<option value={qty}>{qty}</option>))}

                                                        </select>
                                                    </p>
                                                </div>
                                                <div className="flex">
                                                    <button
                                                        onClick={() => removeProductFromCartList(product.product_id)}
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>₹{Math.round(totalAmount)}</p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total items in Cart</p>
                            <p>{totalItems} Items</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <button
                                onClick={() => isFromCheckout ? handleBuyNow({ totalAmount, totalItems }) : handleCheckout()}
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                                {isFromCheckout ? "Buy Now" : "Checkout"}
                            </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                    onClick={() => navigate('/')}
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>
                </div>}
        </>)
}

export default Cart