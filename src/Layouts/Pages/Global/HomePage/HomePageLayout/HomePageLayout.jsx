// File path__
import Banner from "../Banner/Banner";
import Package from "../Package/Package";
import Stories from "../Stories/Stories";
import Overview from "../Overview/Overview";
import useUserData from "../../../../Hooks/useUserData";
import DiscoverGlobeTaek from "../DiscoverGlobeTaek/DiscoverGlobeTaek";
import LetAdventureBegin from "../LetAdventureBegin/LetAdventureBegin";
import ScrollToTop from "../../../../Components/ScrollToTop/ScrollToTop";
import UserDataLoading from "../../../../Components/UserDataLoading/UserDataLoading";

// From react__
import { useEffect } from "react";

const HomePageLayout = () => {
  const { userDataLoading, refetchUserData } = useUserData();

  useEffect(() => {
    refetchUserData();
  }, [refetchUserData]);

  return (
    <>
      <ScrollToTop></ScrollToTop>
      {userDataLoading && <UserDataLoading></UserDataLoading>}
      <Banner></Banner>
      <Overview></Overview>
      <LetAdventureBegin></LetAdventureBegin>
      <Package></Package>
      <DiscoverGlobeTaek></DiscoverGlobeTaek>
      <Stories></Stories>
    </>
  );
};

export default HomePageLayout;
