// File path__

import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <section>
        <Outlet></Outlet>
      </section>
    </>
  )
};

export default MainLayout;
