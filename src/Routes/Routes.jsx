// File path__
import MainLayout from "../Layouts/MainLayout/MainLayout";
import AboutUs from "../Layouts/Pages/Global/AboutUs/AboutUs";
import ErrorPage from "../Layouts/Components/ErrorPage/ErrorPage";
import SignIn from "../Layouts/Pages/Authentication/SignIn/SignIn";
import SignUp from "../Layouts/Pages/Authentication/SignUp/SignUp";
import HomePageLayout from "../Layouts/Pages/Global/HomePage/HomePageLayout/HomePageLayout";

// Package(REACT-ROUTER-DOM)__
import { createBrowserRouter } from "react-router";
import Profile from "../Layouts/Pages/Global/Profile/Profile";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import AddPackage from "../Layouts/Pages/Admin/AddPackage/AddPackage";

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
        path: "/about",
        Component: AboutUs,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
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
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    Component: DashboardLayout,
    children: [
      {
        path: "/dashboard/admin-add-package",
        element: <AddPackage></AddPackage>,
      },
    ],
  },
]);

export default router;
