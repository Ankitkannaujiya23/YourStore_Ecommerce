// import React, { Fragment } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../../mainPages/login-auth/AuthSlice';
// import { clearCart } from '../../components/features/cart/CartSlice';

// const navigation = [
//   { name: 'Dashboard', href: '#', current: true },
//   { name: 'Team', href: '#', current: false },
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Calendar', href: '#', current: false },
// ]

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

// const Navbar = () => {


//   const cartList = useSelector(state => state.CartSlice.cartItems);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isLoggedIn = useSelector(state => state.AuthSlice.isLoggedIn);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     dispatch(clearCart());
//     navigate('/login');
//   }
//   return (
//     <Disclosure as="nav" className="bg-white shadow">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <img
//                     className="h-8 w-auto"
//                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                     alt="Your Company"
//                   />
//                 </div>
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (
//                       <a
//                         key={item.name}
//                         href={item.href}
//                         className={classNames(
//                           item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                           'rounded-md px-3 py-2 text-sm font-medium'
//                         )}
//                         aria-current={item.current ? 'page' : undefined}
//                       >
//                         {item.name}
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 <Link to='/cart'>
//                   <button
//                     type="button"
//                     className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                   >
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">View notifications</span>
//                     <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
//                   </button>
//                 </Link>
//                 <span className="inline-flex items-center rounded-md bg-blue-50 px-1 py-0 mb-7 -ml-3 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 z-40">{cartList.length > 0 ? cartList.length : ''} </span>

//                 {/* Profile dropdown */}
//                 <Menu as="div" className="relative ml-3">
//                   <div>
//                     <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="absolute -inset-1.5" />
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                         alt=""
//                       />
//                     </Menu.Button>
//                   </div>
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       {isLoggedIn &&
//                         <>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <Link
//                                 to="/account"
//                                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                               >
//                                 Your Profile
//                               </Link>
//                             )}
//                           </Menu.Item>

//                           <Menu.Item>
//                             {({ active }) => (
//                               <a
//                                 className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                                 onClick={handleLogout}
//                               >
//                                 Sign out
//                               </a>
//                             )}
//                           </Menu.Item></>}
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                           >
//                             Settings
//                           </a>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                     'block rounded-md px-3 py-2 text-base font-medium'
//                   )}
//                   aria-current={item.current ? 'page' : undefined}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   )
// }

// export default Navbar



import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { logoutUser } from "../../mainPages/login-auth/AuthSlice";
import { clearCart } from "../../components/features/cart/CartSlice";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";


const categories = [
  { icon: "👕", name: "Clothing" },
  { icon: "👟", name: "Footwear" },
  { icon: "👜", name: "Accessories" },
  { icon: "💄", name: "Beauty" },
  { icon: "🏠", name: "Home & Living" }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);

  const cartList = useSelector(state => state.CartSlice.cartItems);
  const isLoggedIn = useSelector(state => state.AuthSlice.isLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    navigate("/login");
  };

  return (
    <div className="w-full sticky top-0 z-50">
      {/* Top Banner */}
      <div className="bg-emerald-600 text-white text-center py-2 text-sm font-medium">
        🎉 Free shipping on orders over ₹999
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <HiOutlineShoppingBag className="text-2xl text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ShopVibe
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className="nav-link text-gray-700 hover:text-emerald-600">Home</Link>

              <div className="relative group">
                <span className="nav-link text-gray-700 hover:text-emerald-600 cursor-pointer flex items-center gap-1">
                  Shop
                </span>
                <div className="absolute left-0 top-4 mt-2 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  {categories.map((c, i) => (
                    <Link key={i} to="#" className="block px-4 py-2 hover:bg-emerald-50">
                      {c.icon} {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/collections" className="nav-link">Collections</Link>
              <Link to="/deals" className="text-emerald-600 font-semibold">Deals</Link>
              <Link to="/about" className="nav-link">About</Link>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 mx-6 max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-4 py-2 bg-gray-100 rounded-full focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <Link to="/cart" className="rounded-full hover:bg-emerald-100 p-2 relative">
                <HiOutlineShoppingCart className="text-2xl" />
                {cartList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
                    {cartList.length}
                  </span>
                )}
              </Link>

              {/* Profile */}
              <Menu as="div" className="relative">
                <Menu.Button className="rounded-full hover:bg-emerald-100 p-2">👤</Menu.Button>
                <Transition as={Fragment}>
                  <Menu.Items className="absolute right-0 mt-2 w-40 bg-white shadow rounded">
                    {isLoggedIn && (
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/account" className={`block px-4 py-2 ${active && "bg-gray-100"}`}>
                              Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button onClick={handleLogout} className={`block w-full text-left px-4 py-2 ${active && "bg-gray-100"}`}>
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>

              {/* Mobile Menu Btn */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2">
              <Link to="/" className="block px-4 py-2">Home</Link>
              <Link to="/shop" className="block px-4 py-2">Shop</Link>
              <Link to="/collections" className="block px-4 py-2">Collections</Link>
              <Link to="/deals" className="block px-4 py-2 text-emerald-600">Deals</Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
