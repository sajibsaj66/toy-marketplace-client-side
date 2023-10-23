import Aos from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
const GalleryImg = ({ img }) => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div data-aos="zoom-in-right" className="border p-5 mx-auto rounded-lg  ">
      <img className="mask w-[240px] h-[320px]" src={img} />
    </div>
  );
};

export default GalleryImg;
