// File path__
import Banner from "../Banner/Banner";
import Package from "../Package/Package";
import Overview from "../Overview/Overview";
import Stories from "../Stories/Stories";

const HomePageLayout = () => {
  return (
    <>
      <Banner></Banner>
      <Overview></Overview>
      <Package></Package>
      <Stories></Stories>
    </>
  );
};

export default HomePageLayout;