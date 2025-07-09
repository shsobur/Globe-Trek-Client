// File path__
import Banner from "../Banner/Banner";
import Package from "../Package/Package";
import Overview from "../Overview/Overview";
import useUserData from "../../../../Hooks/useUserData";
import UserDataLoading from "../../../../Components/UserDataLoading/UserDataLoading";

const HomePageLayout = () => {
  const { userDataLoading } = useUserData();
  return (
    <>
      {userDataLoading && <UserDataLoading></UserDataLoading>}
      <Banner></Banner>
      <Overview></Overview>
      <Package></Package>
    </>
  );
};

export default HomePageLayout;