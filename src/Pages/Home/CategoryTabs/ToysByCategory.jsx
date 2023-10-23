import { Rating } from "@smastrom/react-rating";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ToysByCategory = ({ categoryName }) => {
  const [toys, setToys] = useState();
  useEffect(() => {
    fetch(`https://kiddo-zone-1.vercel.app/toys?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => {});
  }, []);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-8">
      {toys?.map((toy) => (
        <div key={toy._id} className="card md:w-96 bg-base-100 shadow-xl">
          <figure className="p-8">
            <img
              className=" w-[280px] h-[350px]"
              src={toy?.photoURL}
              alt="Shoes"
            />
          </figure>
          <div className="card-body text-left justify-evenly space-y-4">
            <h2 className="card-title">{toy.productName}</h2>
            <div className="flex justify-between">
              <p className="text-3xl"> ${toy.price}</p>
              <Rating
                style={{ maxWidth: 180 }}
                value={toy.rating}
                readOnly
              ></Rating>
            </div>
            <div className="card-actions justify-center">
              <Link to={`/toy/${toy._id}`}>
                <button className="inline-flex items-center btn   justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md  focus:shadow-outline focus:outline-none">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToysByCategory;
