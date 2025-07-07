// File path__
import MainLayout from "../Layouts/MainLayout/MainLayout";
import ErrorPage from "../Layouts/Components/ErrorPage/ErrorPage";

// Package(REACT-ROUTER-DOM)__
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {

      }
    ]
  },
]);

export default router;