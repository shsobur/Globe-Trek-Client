// File path__
import MainLayout from "../Layouts/MainLayout/MainLayout";
import ErrorPage from "../Layouts/Components/ErrorPage/ErrorPage";
import SignIn from "../Layouts/Pages/Authentication/SignIn/SignIn";
import SignUp from "../Layouts/Pages/Authentication/SignUp/SignUp";

// Package(REACT-ROUTER-DOM)__
import { createBrowserRouter } from "react-router";
import HomePageLayout from "../Layouts/Pages/Global/HomePage/HomePageLayout/HomePageLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: HomePageLayout,
      },
      {
        path: "/sign-in",
        Component: SignIn,
      },
      {
        path: "/sign-up",
        Component: SignUp,
      },
    ],
  },
]);

export default router;
