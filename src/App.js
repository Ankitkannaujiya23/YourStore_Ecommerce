import './App.css';
import Cart from './components/features/cart/Cart';
import Footer from './layouts/footer/Footer';
import HomePage from './mainPages/homepage/HomePage';
import LoginPage from './mainPages/login-auth/login/LoginPage';
import SignupPage from './mainPages/login-auth/signup/SignupPage';
import ProductDetailsPage from './components/features/product/productDetailsPage/ProductDetailsPage';
import Navbar from './layouts/navbar/Navbar';
import SidebarMenu from './layouts/sidebarMenu/SidebarMenu';
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import CheckoutPage from './components/features/checkout/CheckoutPage';
import OrderSuccessPage from './components/features/orderSuccess/OrderSuccessPage';
import AddProductPage from './components/features/product/productFeature/AddProductPage';
import AdminPanel from './adminDashboard/AdminPanel';
import UnAuthorize from './components/utilComponents/UnAuthorize';
import AddUpdateCategoryPage from './components/features/category/AddUpdateCategoryPage';
import { ResetPasswordForm } from './components/resetPassword/ResetPasswordForm';
import { NewPasswordForm } from './components/resetPassword/NewPasswordForm';
import ProductDetailPage from './components/features/product/productDetailsPage/ProductDetailPage';
import AddUpdateColorPage from './components/features/colors/AddUpdateColorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/demo' element={<AddUpdateColorPage />} />
          <Route path='/forgot-password' element={<ResetPasswordForm />} />
          <Route path='/reset-password' element={<NewPasswordForm />} />
          <Route path='/productDetails/:id' element={<ProductDetailPage />} />
          <Route path='/sidebarMenu' element={<PrivateRoute><SidebarMenu /></PrivateRoute>} />
          <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path='/checkout' element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path='/orderSuccess' element={<PrivateRoute><OrderSuccessPage /></PrivateRoute>} />

          <Route path='/addProduct' element={<PrivateRoute allowedRoles={['admin']}>
            <AddProductPage />
          </PrivateRoute>} />
          <Route path='/addProduct/:id' element={<PrivateRoute allowedRoles={['admin']}>
            <AddProductPage />
          </PrivateRoute>} />
          <Route path='/admin' element={<PrivateRoute allowedRoles={['admin']}>
            <AdminPanel />
          </PrivateRoute>} />

          <Route path='/addColor' element={<PrivateRoute allowedRoles={['admin']}>
            <AddUpdateColorPage /></PrivateRoute>} >
          </Route>
          <Route path='/updateColor/:id' element={<PrivateRoute allowedRoles={['admin']}>
            <AddUpdateColorPage /></PrivateRoute>} >
          </Route>
          <Route path='/addCategory' element={<PrivateRoute allowedRoles={['admin']}>
            <AddUpdateCategoryPage />
          </PrivateRoute>} />
          <Route path='/updateCategory/:id' element={<PrivateRoute allowedRoles={['admin']}>
            <AddUpdateCategoryPage />
          </PrivateRoute>} />

          <Route path='/unauthorize' element={<UnAuthorize />} />

        </Routes>
        <Footer />
      </Router>




      {/* <RouterProvider router={router} /> */}
    </div>
  );
}

export default App;
