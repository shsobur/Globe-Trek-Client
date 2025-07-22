// File path__
import Trips from "../Layouts/Pages/Global/Trips/Trips";
import MainLayout from "../Layouts/MainLayout/MainLayout";
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
import packageDetails from "../Layouts/Components/PackageDetails/PackageDetails";
import GuideAddStories from "../Layouts/Pages/Guide/GuideAddStories/GuideAddStories";
import HomePageLayout from "../Layouts/Pages/Global/HomePage/HomePageLayout/HomePageLayout";
import GuideManageProfile from "../Layouts/Pages/Guide/GuideManageProfile/GuideManageProfile";
import TouristManageProfile from "../Layouts/Pages/Tourist/TouristManageProfile/TouristManageProfile";

// Package(REACT-ROUTER-DOM)__
import { createBrowserRouter } from "react-router";
import Payment from "../Layouts/Components/Payment/Payment";
import TouristAddStories from "../Layouts/Pages/Tourist/TouristAddStories/TouristAddStories";

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
        path: "/trips",
        Component: Trips,
      },
      {
        path: "/package-details/:id",
        Component: packageDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/get-package-details/${params.id}`),
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
      {
        path: "/package-payment/:id",
        Component: Payment,
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
