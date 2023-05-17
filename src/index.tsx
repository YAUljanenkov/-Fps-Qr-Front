import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import QRSelect, {loader as qrsLoader} from "./components/QRs/QRSelect/QRSelect";
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import QRView, {loader as qrLoader, stopAction} from "./components/QRs/QRView/QRView";
import {addAction, createAction} from "./components/QRs/QRCreate/QRCreate";
import App from "./components/App/App";
import Index from './components/QRs/Index/Index';
import OrderSelect, {loader as ordersLoader} from "./components/Orders/OrderSelect/OrderSelect";
import OrderIndex from "./components/Orders/OrderIndex/OrderIndex";
import OrderView, {loader as orderLoader} from "./components/Orders/OrderView/OrderView";
import ReceiptsFinder from "./components/ReceiptsFinder/ReceiptsFinder";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: '/qrs',
                element: <QRSelect/>,
                loader: qrsLoader,
                children: [
                    { index: true, element:  <Index/>},
                    {
                        path: "tag/:qrId",
                        element: <QRView/>,
                        loader: qrLoader,
                        children: [
                            {
                                path: 'stop/:qrId',
                                action: stopAction
                            }
                        ]
                    },
                    {
                        path: 'create',
                        action: createAction
                    },
                    {
                        path: 'add',
                        action: addAction
                    }
                ]
            },
            {
                path: '/orders',
                element: <OrderSelect/>,
                loader: ordersLoader,
                children: [
                    { index: true, element: <OrderIndex/> },
                    {
                        path: 'order/:orderId',
                        element: <OrderView/>,
                        loader: orderLoader,
                    }
                ]
            }
        ]
    },
    {
        path: '/receipt',
        element: <ReceiptsFinder/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Registration/>
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
