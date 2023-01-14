import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Root, {loader as rootLoader, action as rootAction} from "./routes/route";
import Error from  "./error-page";
import Contact,{loader as contactLoader} from "./routes/contact";
import Edit, {action as editAction} from "./routes/edit";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root />,
        errorElement:<Error />,
        loader:rootLoader,
        action:rootAction,
        children:[
            {
                path: "contacts/:contactId",
                element: <Contact />,
                loader:contactLoader,
            },
            {
                path:"contacts/:contactId/edit",
                element:<Edit />,
                loader:contactLoader,
                action:editAction
            }
        ]
    },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


