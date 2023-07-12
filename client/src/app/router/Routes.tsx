import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import CartPage from "../../features/cart/CartPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import Checkout from "../../features/orders/Checkout";
import ContactPage from "../../features/contacts/ContactPage";
import HomePage from "../../features/home/HomePage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import Orders from "../../features/orders/Orders";
import OrderDetails from "../../features/orders/OrderDetails";
import Inventory from "../../features/admin/Inventory";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                element: <RequireAuth />, children: [
                    { path: 'checkout', element: <Checkout /> },
                    { path: 'orders', element: <Orders /> },
                    { path: 'orders/:id', element: <OrderDetails /> },
                ]
            },
            {
                element: <RequireAuth roles={['Admin']} />, children: [
                    { path: 'inventory', element: <Inventory /> },
                ]
            },
            { path: '', element: <Navigate to="catalog" /> },
            { path: 'home', element: <HomePage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'cart', element: <CartPage /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },

            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])