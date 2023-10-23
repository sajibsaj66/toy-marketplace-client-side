import { Rating } from "@smastrom/react-rating";
import React from "react";
import ReactImageMagnify from "react-image-magnify";
import { useLoaderData } from "react-router-dom";
const ToyDetails = () => {
  const toyDetails = useLoaderData();
  const {
    productName,
    sellerName,
    photoURL,
    description,
    quantity,
    rating,
    price,
    email,
  } = toyDetails;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl my-10 p-10">
      <div className="justify-around flex flex-col">
        <figure className="w-[390px] h-[490px]">
          {/* <img src={photoURL} alt="Album" /> */}
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: false,
                src: photoURL,
                width: 390,
                height: 490,
              },
              enlargedImagePosition: "over",
              largeImage: {
                src: photoURL,
                width: 590,
                height: 690,
              },
            }}
          />
        </figure>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
      <div className="card-body text-left space-y-4">
        <h2 className="card-title">{productName}</h2>
        <h2>
          <span className="text-3xl font-semibold"> ${price}</span>
        </h2>
        <div>
          <Rating style={{ maxWidth: 180 }} value={rating} readOnly />
        </div>
        <p>In Stock: {quantity}</p>
        <div className="flex justify-around">
          <p className=" font-bold">
            Seller:
            <span className="link text-blue-300 font-normal">{sellerName}</span>
          </p>
          <p className="font-bold">
            Seller Email:
            <span className="link text-blue-300 font-normal">{email}</span>
          </p>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ToyDetails;
