import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import useTitle from "../../hooks/useTitle";
import ToyRow from "./ToyRow";

const AllToys = () => {
  useTitle("All Toys");

  const allToys = useLoaderData();
  const [toys, setToys] = useState([]);
  const [searchTex, setSearchText] = useState("");

  useEffect(() => {
    fetch(`https://kiddo-zone-1.vercel.app/toys?search=${searchTex}`)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Something went wrong try again later",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }, [searchTex]);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target.searchTextElement.value);
  };
  if (toys.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div>
      <div className="form-control my-10">
        <form onSubmit={handleSearch} className="input-group justify-center">
          <input
            name="searchTextElement"
            type="text"
            placeholder="Search…"
            className="input input-bordered"
          />
          <button type="submit" className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Seller Name</th>
              <th>Toy Name</th>
              <th>Sub-category</th>
              <th>Price</th>
              <th>Available Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {toys.map((toy) => (
              <ToyRow key={toy._id} toy={toy} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllToys;
