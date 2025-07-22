// File path__
import Trips from "../Layouts/Pages/Global/Trips/Trips";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Payment from "../Layouts/Components/Payment/Payment";
import AboutUs from "../Layouts/Pages/Global/AboutUs/AboutUs";
import Profile from "../Layouts/Pages/Global/Profile/Profile";
import ErrorPage from "../Layouts/Components/ErrorPage/ErrorPage";
import SignIn from "../Layouts/Pages/Authentication/SignIn/SignIn";
import SignUp from "../Layouts/Pages/Authentication/SignUp/SignUp";
import Community from "../Layouts/Pages/Global/Community/Community";
import MyBooking from "../Layouts/Pages/Tourist/MyBooking/MyBooking";
import ManageUser from "../Layouts/Pages/Admin/ManageUser/ManageUser";
import AddPackage from "../Layouts/Pages/Admin/AddPackage/AddPackage";
import Candidates from "../Layouts/Pages/Admin/Candidates/Candidates";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import GuideBooking from "../Layouts/Pages/Guide/GuideBooking/GuideBooking";
import ManageProfile from "../Layouts/Pages/Admin/ManageProfile/ManageProfile";
import PackageDetails from "../Layouts/Components/PackageDetails/PackageDetails";
import GuideAddStories from "../Layouts/Pages/Guide/GuideAddStories/GuideAddStories";
import HomePageLayout from "../Layouts/Pages/Global/HomePage/HomePageLayout/HomePageLayout";
import TouristAddStories from "../Layouts/Pages/Tourist/TouristAddStories/TouristAddStories";
import GuideManageProfile from "../Layouts/Pages/Guide/GuideManageProfile/GuideManageProfile";
import TouristManageProfile from "../Layouts/Pages/Tourist/TouristManageProfile/TouristManageProfile";

// Package(REACT-ROUTER-DOM)__
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomePageLayout></HomePageLayout>,
      },
      {
        path: "/community",
        element: <Community></Community>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/trips",
        element: <Trips></Trips>,
      },
      {
        path: "/package-details/:id",
        element: <PackageDetails></PackageDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/get-package-details/${params.id}`),
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/package-payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/package-price/${params.id}`),
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
        path: "/dashboard/guide-package-booking",
        element: <GuideBooking></GuideBooking>,
      },
      {
        path: "/dashboard/guide-add-stories",
        element: <GuideAddStories></GuideAddStories>,
      },

      // Tourist Routes__
      {
        path: "/dashboard/tourist-manage-profile",
        element: <TouristManageProfile></TouristManageProfile>,
      },
      {
        path: "/dashboard/tourist-manage-booking",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "/dashboard/tourist-add-stories",
        element: <TouristAddStories></TouristAddStories>,
      },
    ],
  },
]);

export default router;