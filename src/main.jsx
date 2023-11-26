import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import './index.css';
import { FoodItemContextProvider } from './context/FoodItemContext';
import { CartItemContextProvider } from './context/CartItemContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'admin',
        element: <Admin />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CartItemContextProvider>
            <FoodItemContextProvider>
                <RouterProvider router={router} />
            </FoodItemContextProvider>
        </CartItemContextProvider>
    </React.StrictMode>
);
