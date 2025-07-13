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
import ManageUser from "../Layouts/Pages/Admin/ManageUser/ManageUser";
import ManageProfile from "../Layouts/Pages/Admin/ManageProfile/ManageProfile";
import Candidates from "../Layouts/Pages/Admin/Candidates/Candidates";
import GuideManageProfile from "../Layouts/Pages/Guide/GuideManageProfile/GuideManageProfile";
import GuideAddStories from "../Layouts/Pages/Guide/GuideAddStories/GuideAddStories";
import Community from "../Layouts/Pages/Global/Community/Community";

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
        path: "/community",
        Component: Community,
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
      // Admin Routes__
      {
        path: "/dashboard/admin-manage-profile",
        element: <ManageProfile></ManageProfile>,
      },
      {
        path: "/dashboard/admin-add-package",
        element: <AddPackage></AddPackage>,
      },
      {
        path: "/dashboard/admin-manage-user",
        element: <ManageUser></ManageUser>,
      },
      {
        path: "/dashboard/admin-manage-candidates",
        element: <Candidates></Candidates>,
      },
      // Tour Guide Routes__
      {
        path: "/dashboard/guide-manage-profile",
        element: <GuideManageProfile></GuideManageProfile>,
      },
      {
        path: "/dashboard/guide-add-stories",
        element: <GuideAddStories></GuideAddStories>,
      },
    ],
  },
]);

export default router;
