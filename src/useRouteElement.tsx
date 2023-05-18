import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constant/path'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
// import Login from './pages/Login'
// import ProductDetail from './pages/ProductDetail'
// import ProductList from './pages/ProductList'
// import Register from './pages/Register'
// import Cart from './pages/Cart'
// import CartLayout from './layouts/CartLayout'
// import UserLayout from './pages/User/layouts/UserLayout'
// import ChangePassword from './pages/User/pages/ChangePassword'
// import HistoryPurchase from './pages/User/pages/HistoryPurchase'
// import Profile from './pages/User/pages/Profile'

const Login = lazy(() => import('./pages/Login'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const ProductList = lazy(() => import('./pages/ProductList'))
const Register = lazy(() => import('./pages/Register'))
const Cart = lazy(() => import('./pages/Cart'))
const CartLayout = lazy(() => import('./layouts/CartLayout'))
const UserLayout = lazy(() => import('./pages/User/layouts/UserLayout'))
const ChangePassword = lazy(() => import('./pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('./pages/User/pages/HistoryPurchase'))
const Profile = lazy(() => import('./pages/User/pages/Profile'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: (
            <MainLayout>
              <Suspense>
                <UserLayout />
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile></Profile>
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElements
}
