// File path__
import Banner from "../Banner/Banner";
import Package from "../Package/Package";
import Stories from "../Stories/Stories";
import Overview from "../Overview/Overview";
import Newsletter from "../Newsletter/Newsletter";
import useUserData from "../../../../Hooks/useUserData";
import DiscoverGlobeTaek from "../DiscoverGlobeTaek/DiscoverGlobeTaek";
import LetAdventureBegin from "../LetAdventureBegin/LetAdventureBegin";
import ScrollToTop from "../../../../Components/ScrollToTop/ScrollToTop";
import UserDataLoading from "../../../../Components/UserDataLoading/UserDataLoading";

// From react__

const HomePageLayout = () => {
  const { userDataLoading } = useUserData();

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
      <Newsletter></Newsletter>
    </>
  );
};

export default HomePageLayout;
