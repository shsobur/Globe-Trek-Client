// File path__
import Banner from "../Banner/Banner";
import Package from "../Package/Package";
import Stories from "../Stories/Stories";
import Overview from "../Overview/Overview";
import DiscoverGlobeTaek from "../DiscoverGlobeTaek/DiscoverGlobeTaek";
import LetAdventureBegin from "../LetAdventureBegin/LetAdventureBegin";
import ScrollToTop from "../../../../Components/ScrollToTop/ScrollToTop";

const HomePageLayout = () => {
  return (
    <>
      <ScrollToTop></ScrollToTop>
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