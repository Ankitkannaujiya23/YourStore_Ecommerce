
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './layouts/navbar/Navbar';
import Footer from './layouts/footer/Footer';
import PrivateRoute from './privateRoute/PrivateRoute';
import UnAuthorize from './components/utilComponents/UnAuthorize';

// 🌀 Lazy Loading (Better performance)
import { lazy, Suspense } from 'react';

// Public Pages
const HomePage = lazy(() => import('./mainPages/homepage/HomePage'));
const LoginPage = lazy(() => import('./mainPages/login-auth/login/LoginPage'));
const SignupPage = lazy(() => import('./mainPages/login-auth/signup/SignupPage'));
const ResetPasswordForm = lazy(() => import('./components/resetPassword/ResetPasswordForm'));
const NewPasswordForm = lazy(() => import('./components/resetPassword/NewPasswordForm'));
const ProductDetailPage = lazy(() => import('./components/features/product/productDetailsPage/ProductDetailPage'));
const Cart = lazy(() => import('./components/features/cart/Cart'));
const OrderSuccessPage = lazy(() => import('./components/features/orderSuccess/OrderSuccessPage'));

// Admin Protected Pages
const AdminPanel = lazy(() => import('./adminDashboard/AdminPanel'));
const AddProductPage = lazy(() => import('./components/features/product/productFeature/AddProductPage'));
const AddUpdateColorPage = lazy(() => import('./components/features/colors/AddUpdateColorPage'));
const AddUpdateSizePage = lazy(() => import('./components/features/sizes/AddUpdateSizePage'));
const AddUpdateCategoryPage = lazy(() => import('./components/features/category/AddUpdateCategoryPage'));
const CheckoutPage = lazy(() => import('./components/features/checkout/CheckoutPage'));
const SidebarMenu = lazy(() => import('./layouts/sidebarMenu/SidebarMenu'));
const UserProfile = lazy(() => import('./components/features/userProfile/UserProfile'));

function App() {
  return (
    <div className="App">
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

        {/* 🧩 Suspense will show fallback while components load */}
        <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
          <Routes>

            {/* 🌐 Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ResetPasswordForm />} />
            <Route path="/reset-password" element={<NewPasswordForm />} />
            <Route path="/productDetails/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderSuccess" element={<OrderSuccessPage />} />

            {/* 🔒 Protected Routes */}
            <Route path="/sidebarMenu" element={<PrivateRoute><SidebarMenu /></PrivateRoute>} />

            {/* 👑 Admin Only Routes */}
            <Route element={<PrivateRoute allowedRoles={['admin']} />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/addProduct" element={<AddProductPage />} />
              <Route path="/addProduct/:id" element={<AddProductPage />} />
              <Route path="/addColor" element={<AddUpdateColorPage />} />
              <Route path="/updateColor/:id" element={<AddUpdateColorPage />} />
              <Route path="/addSize" element={<AddUpdateSizePage />} />
              <Route path="/updateSize/:id" element={<AddUpdateSizePage />} />
              <Route path="/addCategory" element={<AddUpdateCategoryPage />} />
              <Route path="/updateCategory/:id" element={<AddUpdateCategoryPage />} />
              <Route path="/account" element={<UserProfile />} />
            </Route>

            {/* 🚫 Unauthorized */}
            <Route path="/unauthorize" element={<UnAuthorize />} />
          </Routes>
        </Suspense>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
