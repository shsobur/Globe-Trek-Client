import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext, useEffect, useState } from "react";

const useUserData = () => {
  const axiosPublic = useAxiosPublic();
  const { user, userLoading } = useContext(AuthContext);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const handleCurrentUserData = async () => {
      if (!userLoading) {
        if (user?.email) {
          setUserDataLoading(true);

          try {
            const res = await axiosPublic.get(
              `/current-user-data/${user.email}`
            );

            if (isMounted) {
              setCurrentUserData(res.data);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            if (isMounted) setCurrentUserData(null);
          } finally {
            if (isMounted) setUserDataLoading(false);
          }
        } else {
          if (isMounted) {
            setCurrentUserData(null);
            setUserDataLoading(false);
          }
        }
      }
    };

    handleCurrentUserData();

    return () => {
      isMounted = false;
    };
  }, [user, axiosPublic, userLoading]);

  return { currentUserData, userDataLoading };
};

export default useUserData;