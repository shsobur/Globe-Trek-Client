import { useContext, useEffect, useState, useCallback } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";

const useUserData = () => {
  const axiosPublic = useAxiosPublic();
  const { user, userLoading } = useContext(AuthContext);

  const [currentUserData, setCurrentUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  const refetchUserData = useCallback(async () => {
    if (user?.email) {
      setUserDataLoading(true);
      try {
        const res = await axiosPublic.get(`/current-user-data/${user.email}`);
        setCurrentUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCurrentUserData(null);
      } finally {
        setUserDataLoading(false);
      }
    }
  }, [user, axiosPublic]);

  // Initial fetch__
  useEffect(() => {
    if (!userLoading && user?.email) {
      refetchUserData();
    } else if (!userLoading && !user?.email) {
      setCurrentUserData(null);
      setUserDataLoading(false);
    }
  }, [user, userLoading, refetchUserData]);

  return { currentUserData, userDataLoading, refetchUserData };
};

export default useUserData;