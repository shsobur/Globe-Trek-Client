// File path__
import useUserData from "../../Layouts/Hooks/useUserData";
import { AuthContext } from "../../Provider/AuthProvider";

// Package(REACT ROUTER)__
import { Navigate } from "react-router";

// From react__
import { useContext } from "react";

const AdminVerify = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);
  const { currentUserData, userDataLoading } = useUserData();
  console.log(currentUserData);

  if (userLoading) {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white shadow-xl px-6 py-4 rounded-2xl animate-bounce text-[#2a75b3] text-lg font-semibold">
            Loading Dashboard...
          </div>
        </div>
      </>
    );
  }

  if (user) {
    if (userDataLoading) {
      return (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
            <div className="bg-white shadow-xl px-6 py-4 rounded-2xl animate-bounce text-[#2a75b3] text-lg font-semibold">
              Loading Dashboard...
            </div>
          </div>
          ;
        </>
      );
    }

    if (currentUserData && currentUserData.userRole === "Admin") {
      return children;
    }
  }

  return <Navigate to="/sign-in" />;
};

export default AdminVerify;