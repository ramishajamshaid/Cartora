import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './layout/AppLayout.jsx'
import HomePage from './pages/general/HomePage.jsx'
import AuthLayout from './layout/AuthLayout.jsx'
import SignUpPage from './pages/auth/SignupPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import AuthContextProvider from './context/auth/AuthContext.jsx'
import ProfilePage from './pages/general/ProfilePage.jsx'
import { Toaster } from 'sonner'
import BecomeSellerPage from './pages/becomeSeller/BecomeSellerPage.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AdminLayout from './layout/AdminLayout.jsx'
import AdminDashboard from './pages/adminPages/AdminDashboard.jsx'
import AdminSellers from './pages/adminPages/AdminSellers.jsx'
import AdminUsers from './pages/adminPages/AdminUsers.jsx'
import AdminSellerDetail from './pages/adminPages/AdminSellerDetail.jsx'
import SellerRoute from './routes/SellerRoute.jsx'
import SellerLayout from './layout/SellerLayout.jsx'
import SellerDashboard from './pages/sellerPages/SellerDashboard.jsx'
import SellerProducts from './pages/sellerPages/SellerProducts.jsx'
import SellerAddProduct from './pages/sellerPages/SellerAddProduct.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminProducts from './pages/adminPages/AdminProducts.jsx'
import SellerStore from './pages/sellerPages/SellerStore.jsx'
import SellerProductDetail from './pages/sellerPages/SellerProductDetail.jsx'
import AdminProductDetail from './pages/adminPages/AdminProductDetail.jsx'
import AdminUserDetail from './pages/adminPages/AdminUserDetail.jsx'
import ProductDetailPage from './pages/general/ProductDetailPage.jsx'
import CartPage from './pages/general/CartPage.jsx'


const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<AppLayout />}>
        <Route index path='' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product-detail/:id' element={<ProductDetailPage />} />
        <Route path='/become-seller' element={<BecomeSellerPage />} />
      </Route>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path='sellers' element={<AdminSellers />} />
          <Route path='seller-detail/:id' element={<AdminSellerDetail />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='user-detail/:id' element={<AdminUserDetail />} />
          <Route path='products' element={<AdminProducts />} />
          <Route path='product-detail/:id' element={<AdminProductDetail />} />
        </Route>
      </Route>
      <Route element={<SellerRoute />}>
        <Route path='/seller' element={<SellerLayout />}>
          <Route index element={<SellerDashboard />} />
          <Route path='products' element={<SellerProducts />} />
          <Route path='add-product' element={<SellerAddProduct />} />
          <Route path='product-detail/:id' element={<SellerProductDetail />} />
          <Route path='store' element={<SellerStore />} />
        </Route>
      </Route>

    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <Toaster position='top-right' />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
