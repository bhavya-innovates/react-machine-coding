import React from "react";
import ReactDOM from "react-dom/client";
import JobsBoard from "./components/JobsBoard";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Header />,
      },
      {
        path: "/jobs",
        element: <JobsBoard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
