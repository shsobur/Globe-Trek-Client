// File path__
import { AuthContext } from "../../Provider/AuthProvider";

// Package(REACT ROUTER)__
import { Navigate } from "react-router";

// From react__
import { useContext } from "react";

const LoginVerify = ({ children }) => {
  const { user, userLoading } = useContext(AuthContext);

  if (userLoading) {
    return (
      <>
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-blue-300 shadow-xl px-6 py-4 rounded-2xl animate-bounce text-[#2a75b3] text-lg font-semibold">
            Loading...
          </div>
        </div>
      </>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/sign-in" />;
};

export default LoginVerify;