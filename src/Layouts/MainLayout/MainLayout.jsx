// File path__
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

// Package(REACT-ROUTER-DOM)__
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <section>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </section>
    </>
  );
};

export default MainLayout;