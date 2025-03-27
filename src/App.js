import './App.css';
import Cart from './components/features/cart/Cart';
import Footer from './layouts/footer/Footer';
import HomePage from './mainPages/homepage/HomePage';
import LoginPage from './mainPages/login-auth/login/LoginPage';
import SignupPage from './mainPages/login-auth/signup/SignupPage';
import ProductDetailsPage from './components/features/product/productDetailsPage/ProductDetailsPage';
import Navbar from './layouts/navbar/Navbar';
import SidebarMenu from './layouts/sidebarMenu/SidebarMenu';
import {createBrowserRouter,RouterProvider, BrowserRouter as Router, Routes, Route}from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import CheckoutPage from './components/features/checkout/CheckoutPage';
import OrderSuccessPage from './components/features/orderSuccess/OrderSuccessPage';
import AddProductPage from './components/features/product/productFeature/AddProductPage';
import AdminPanel from './adminDashboard/AdminPanel';

function App() {
// const router=createBrowserRouter([
//   {
//   path:'/',
//   element:<HomePage/>,
// },
// {
//   path:'/login',
//   element:<LoginPage />
// },
// {
//   path:'/signup',
//   element:<SignupPage />
// },
// {
//   path:'/cart',
//   element:(<PrivateRoute>
//     <Cart />
//     </PrivateRoute>)
// },
// {
//   path:'/sidebarMenu',
//   element:(<PrivateRoute>
//   <SidebarMenu />
//   </PrivateRoute>
//   )
// },
// {
//   path:'/checkout',
//   element:(<PrivateRoute><Checkout /></PrivateRoute>)
// },
// {
//   path:'/productDetails/:id',
//   element:(<PrivateRoute><ProductDetailsPage /></PrivateRoute>)
// },
// ])
  return (
    <div className="App  ">
<Router>
      <Navbar/>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/signup'element={<SignupPage/>}/>
    <Route path='/admin'element={<AdminPanel/>}/>
    <Route path='/sidebarMenu' element={<PrivateRoute><SidebarMenu/></PrivateRoute>}/>
    <Route path='/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
    <Route path='/checkout' element={<PrivateRoute><CheckoutPage/></PrivateRoute>}/>
    <Route path='/orderSuccess' element={<PrivateRoute><OrderSuccessPage/></PrivateRoute>} />
    <Route path='/productDetails/:id' element={<PrivateRoute><ProductDetailsPage/></PrivateRoute>}/>
    <Route path='/addProduct' element={<PrivateRoute allowedRoles={['admin']}>
      <AddProductPage/>
    </PrivateRoute>}/>
    </Routes>
     <Footer/>
</Router>




     {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;
