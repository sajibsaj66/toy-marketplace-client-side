import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import useTitle from "../../../hooks/useTitle";
import CategoryTabs from "../CategoryTabs/CategoryTabs";
import Gallery from "../Gallery/Gallery";
import SubscribeNewsletter from "../SubscribeNewsletter/SubscribeNewsletter";
import Trusted from "../Trusted/Trusted";
import Banner from "./Banner/Banner";
const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useTitle("Home");

  return (
    <div>
      <div
        data-aos="flip-right"
        data-aos-offset="200"
        data-aos-delay="1250"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <Banner></Banner>
      </div>
      <Gallery />
      <CategoryTabs />
      <div
        data-aos="fade-right"
        data-aos-offset="200"
        data-aos-delay="1250"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <Trusted />
      </div>
      <SubscribeNewsletter />
    </div>
  );
};

export default Home;
