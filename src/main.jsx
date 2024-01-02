import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import Episode from "./components/Episode";
import Preload from "./components/Preload";


const router = createBrowserRouter([
  {
    path: "/app",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "?season=seasonNumber",
        element: <Preload />,
        children: [
          {
            path: "episode=episodeid",
            element: <Episode />,
          },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);