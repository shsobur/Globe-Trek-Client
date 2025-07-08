// File path__
import Banner from "../Banner/Banner";
import Package from "../Package/Package";
import Overview from "../Overview/Overview";

const HomePageLayout = () => {
  return (
    <>
      <Banner></Banner>
      <Overview></Overview>
      <Package></Package>
    </>
  );
};

export default HomePageLayout;