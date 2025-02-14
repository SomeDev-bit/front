import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './ui/RootLayout'
import Login from './features/auth/Login'
import ProdutList from './features/product/ProdutList'
import AllProducts from './features/admin/AllProducts'
import ProductForm from './features/admin/ProductForm'
import ProductEdit from './features/admin/ProductEdit'
import ProductDetail from './features/product/ProductDetail'
import Register from './features/auth/Register'
import CartPage from './features/cart/CartPage'
import UserProfile from './features/user/UserProfile'
import OrderDetail from './features/order/OrderDetail'
import AdminRoute from './ui/AdminRoute'
import UserRoute from './ui/UserRoute'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <ProdutList />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },

        {
          element: <UserRoute />,
          children: [
            {
              path: 'user-profile',
              element: <UserProfile />
            },

            {
              path: 'cart-page',
              element: <CartPage />
            },
          ]
        },



        {
          path: 'product/:id',
          element: <ProductDetail />
        },
        {
          path: 'order/:id',
          element: <OrderDetail />
        },

        {
          element: <AdminRoute />,
          children: [
            {
              path: 'admin-products',
              element: <AllProducts />
            },
            {
              path: 'add-product',
              element: <ProductForm />
            },
            {
              path: 'edit-product/:id',
              element: <ProductEdit />
            },

          ]
        },



      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
