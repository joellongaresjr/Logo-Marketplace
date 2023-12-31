import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import introJs from 'intro.js';
import 'intro.js/introjs.css';

import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Product from "./pages/Product/Product.jsx";
import SearchedProducts from "./pages/SearchedProducts/SearchedProducts.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import Confirmation from "./pages/Confirmation/Confirmation";
import Stores from "./pages/Stores/Stores";
import Success from "./pages/Success/Success";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/confirmation",
        element: <Confirmation />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/search/:search",
        element: <SearchedProducts />,
      },
      {
        path: "/stores",
        element: <Stores />,
      },
      {
        path: "/products/category/:id",
        element: <CategoryProducts />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/order-history",
        element: <OrderHistory />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);