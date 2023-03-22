import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import QRSelect, {loader as qrsLoader} from "./components/QRSelect/QRSelect";
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import QRView, {loader as qrLoader} from "./components/QRView/QRView";
import Index from '../src/components/Index/Index';
import {createAction} from "./components/QRCreate/QRCreate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <QRSelect/>,
        loader: qrsLoader,
        children: [
            { index: true, element:  <Index/>},
            {
                path: "/tag/:qrId",
                element: <QRView/>,
                loader: qrLoader
            },
            {
                path: '/create',
                action: createAction
            }
        ]
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
