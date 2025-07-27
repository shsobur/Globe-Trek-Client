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
import TouristManageStory from "../Layouts/Pages/Tourist/TouristManageStory/TouristManageStory";
import GuideManageStory from "../Layouts/Pages/Guide/GuideManageStory/GuideManageStory";
import RequestToGuide from "../Layouts/Pages/Tourist/RequestToGuide/RequestToGuide";
import AdminVerify from "../VerifyUser/AdminVerify/AdminVerify";
import GuideVerify from "../VerifyUser/GuideVerify/GuideVerify";
import TouristVerify from "../VerifyUser/TouristVerify/TouristVerify";
import LoginVerify from "../VerifyUser/LoginVerify/LoginVerify";

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
        element: (
          <LoginVerify>
            <Trips></Trips>,
          </LoginVerify>
        ),
      },
      {
        path: "/package-details/:id",
        element: (
          <LoginVerify>
            <PackageDetails></PackageDetails>,
          </LoginVerify>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:8000/get-package-details/${params.id}`),
      },
      {
        path: "/profile/:id",
        element: (
          <LoginVerify>
            <Profile></Profile>,
          </LoginVerify>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:8000/get-profile-data/${params.id}`),
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
        element: (
          <LoginVerify>
            <Payment></Payment>,
          </LoginVerify>
        ),
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
        element: (
          <AdminVerify>
            <ManageProfile></ManageProfile>,
          </AdminVerify>
        ),
      },
      {
        path: "/dashboard/admin-add-package",
        element: (
          <AdminVerify>
            <AddPackage></AddPackage>,
          </AdminVerify>
        ),
      },
      {
        path: "/dashboard/admin-manage-user",
        element: (
          <AdminVerify>
            <ManageUser></ManageUser>
          </AdminVerify>
        ),
      },
      {
        path: "/dashboard/admin-manage-candidates",
        element: (
          <AdminVerify>
            <Candidates></Candidates>
          </AdminVerify>
        ),
      },
      // Tour Guide Routes__
      {
        path: "/dashboard/guide-manage-profile",
        element: (
          <GuideVerify>
            <GuideManageProfile></GuideManageProfile>,
          </GuideVerify>
        ),
      },
      {
        path: "/dashboard/guide-package-booking",
        element: (
          <GuideVerify>
            <GuideBooking></GuideBooking>,
          </GuideVerify>
        ),
      },
      {
        path: "/dashboard/guide-add-stories",
        element: (
          <GuideVerify>
            <GuideAddStories></GuideAddStories>,
          </GuideVerify>
        ),
      },
      {
        path: "/dashboard/guide-manage-stories",
        element: (
          <GuideVerify>
            <GuideManageStory></GuideManageStory>,
          </GuideVerify>
        ),
      },

      // Tourist Routes__
      {
        path: "/dashboard/tourist-manage-profile",
        element: (
          <TouristVerify>
            <TouristManageProfile></TouristManageProfile>,
          </TouristVerify>
        ),
      },
      {
        path: "/dashboard/tourist-manage-booking",
        element: (
          <TouristVerify>
            <MyBooking></MyBooking>,
          </TouristVerify>
        ),
      },
      {
        path: "/dashboard/tourist-add-stories",
        element: (
          <TouristVerify>
            <TouristAddStories></TouristAddStories>,
          </TouristVerify>
        ),
      },
      {
        path: "/dashboard/tourist-manage-story",
        element: (
          <TouristVerify>
            <TouristManageStory></TouristManageStory>,
          </TouristVerify>
        ),
      },
      {
        path: "/dashboard/tourist-guide-request",
        element: (
          <TouristVerify>
            <RequestToGuide></RequestToGuide>,
          </TouristVerify>
        ),
      },
    ],
  },
]);

export default router;