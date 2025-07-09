// File path__
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";

// From react__
import { useContext, useEffect, useState } from "react";

const useUserData = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const handleCurrentUserData = async () => {
      if (user) {
        setUserDataLoading(true);

        try {
          const res = await axiosPublic.get(`/current-user-data/${user.email}`);

          if (isMounted) {
            setCurrentUserData(res.data);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setUserDataLoading(false);
        }
      } else if (!user) {
        setCurrentUserData([]);
      }
    };

    handleCurrentUserData();

    return () => {
      isMounted = false;
    };
  }, [user, axiosPublic]);
  return { currentUserData, userDataLoading };
};

export default useUserData;