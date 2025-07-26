// File path__
import Banner from "../Banner/Banner";
import Package from "../Package/Package";
import Overview from "../Overview/Overview";
import Stories from "../Stories/Stories";
import DiscoverGlobeTaek from "../DiscoverGlobeTaek/DiscoverGlobeTaek";
import LetAdventureBegin from "../LetAdventureBegin/LetAdventureBegin";

const HomePageLayout = () => {
  return (
    <>
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
