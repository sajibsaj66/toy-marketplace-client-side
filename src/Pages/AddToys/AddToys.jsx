import Aos from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";
const AddToys = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useTitle("Add Toys");

  const descriptionRef = useRef();
  const { user } = useContext(AuthContext);
  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = user.displayName;
    const email = user.email;
    const productName = form.name.value;
    const photoURL = form.photoUrl.value;
    const sellerName = form.seller_name.value;
    const subCategory = form.subCategory.value;
    const description = descriptionRef.current.value;
    const quantity = form.quantity.value;
    const rating = form.rating.value;
    const price = form.price.value;

    const toyInfo = {
      displayName,
      photoURL,
      email,
      productName,
      sellerName,
      subCategory,
      description,
      quantity,
      rating,
      price,
    };
    fetch("https://kiddo-zone-1.vercel.app/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(toyInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Toy added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "omething went wrong please try again later",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
  };
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl" data-aos="zoom-in-right">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Add New Toy!
          </h1>

          <form
            onSubmit={handleAddProduct}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="mx-auto my-5 max-w-md text-center text-gray-500">
              Feel out the from correctly for add toys.
            </p>
            <div className="grid md:grid-cols-2 gap-5 ">
              <div className="relative">
                <input
                  name="seller_name"
                  type="text"
                  defaultValue={user?.displayName}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter seller full name"
                />
              </div>{" "}
              <div className="relative">
                <input
                  defaultValue={user?.email}
                  name="seller_email"
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter full name"
                />
              </div>
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter toy name here"
                />
              </div>
              <div className="relative">
                <input
                  name="photoUrl"
                  required
                  type="url"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter toy photo url"
                />
              </div>
              <div>
                <div className="relative">
                  <select
                    name="subCategory"
                    className="select w-full max-w-xs"
                    defaultValue={"Select Sub category"}
                  >
                    <option disabled defaultValue={"Select Sub category"}>
                      Select Sub category
                    </option>
                    <option defaultValue={"Teddy Bear"}>Teddy Bear</option>
                    <option defaultValue={"Unicorn"}>Unicorn</option>
                    <option defaultValue={"Dinosaur"}>Dinosaur</option>
                  </select>
                </div>
              </div>
              <div className="Enter Toy price here">
                <input
                  name="price"
                  required
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter price"
                />
              </div>
              <div className="Enter Rating">
                <input
                  name="rating"
                  required
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter Rating here in number"
                />
              </div>
              <div className="Available quantity">
                <input
                  name="quantity"
                  required
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Available quantity in number"
                />
              </div>
            </div>
            <div className="Detail description">
              <textarea
                rows={5}
                ref={descriptionRef}
                required
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter detail description"
              />
            </div>
            <button
              type="submit"
              className="block w-full rounded-lg btn-primary px-5 py-3 text-sm font-medium text-white"
            >
              Add Toy
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddToys;
