import { useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import path from "./constant/path";
import { AppContext } from "./contexts/app.context";
import MainLayout from "./layouts/MainLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import ProductList from "./pages/ProductList";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
      ],
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
      ],
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
