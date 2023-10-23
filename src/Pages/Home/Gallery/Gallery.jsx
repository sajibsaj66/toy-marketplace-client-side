import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
import GalleryImg from "./GalleryImg";
const Gallery = () => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(`https://kiddo-zone-1.vercel.app/toys`)
      .then((res) => res.json())
      .then((data) => {
        setToys(data.map((element) => element.photoURL));
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong try again later",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, []);
  if (toys?.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div className="mt-8">
      <h2 className="mb-6 font-sans text-3xl md:text-6xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        Our Gallery
      </h2>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {toys?.map((img, idx) => (
          <GalleryImg key={idx} img={img} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
