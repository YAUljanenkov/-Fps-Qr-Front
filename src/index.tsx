import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {loader as qrsLoader} from "./App/App";
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import QRView, {loader as qrLoader} from "./components/QRView/QRView";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        loader: qrsLoader,
        children: [
            {
                path: "/tag/:qrId",
                element: <QRView/>,
                loader: qrLoader
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
