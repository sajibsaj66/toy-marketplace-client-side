import { useContext, useEffect, useRef, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";

import MyToyRow from "./MyToyRow";

const MyToys = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [toys, setToys] = useState([]);
  const descriptionRef = useRef();
  const [editedItem, setEditedItem] = useState("");
  const [sortAccenting, setSortAccenting] = useState("");
  const [query, setQuery] = useState("");

  useTitle("My Toys");

  const acceding = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
      />
    </svg>
  );
  const descending = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
      />
    </svg>
  );
  const [sortIcon, setSortIcon] = useState(acceding);
  const {
    sellerName,
    email,
    productName,
    photoURL,
    subCategory,
    price,
    quantity,
    rating,
    description,
    _id,
  } = editedItem;
  useEffect(() => {
    fetch(`https://kiddo-zone-1.vercel.app/toys/${user?.email}?sort=${query}`)
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
  }, [user, isUpdated, query]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://kiddo-zone-1.vercel.app/toys/${id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount === 1) {
              const unmodified = toys.filter((toy) => toy._id !== id);
              setToys(unmodified);
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
      }
    });
  };
  const handleModal = (id) => {
    setShowModal(true);
    const editedItem = toys.find((toy) => toy._id === id);
    setEditedItem(editedItem);
  };

  const handleEditToys = (e) => {
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
      _id: _id,
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://kiddo-zone-1.vercel.app/toys", {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(toyInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              setIsUpdated(true);
              Swal.fire("Updated!", "Your file has been edited.", "success");
              setShowModal(false);
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
      }
    });
  };

  const handleSort = () => {
    setIsUpdated(true);
    setSortAccenting(!sortAccenting);
    if (sortAccenting) {
      setQuery("ascending");
      setSortIcon(acceding);
    } else {
      setQuery("descending");
      setSortIcon(descending);
    }
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
      {/* Modal for update toys data  */}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto ">
              {/*content*/}
              {/*body*/}
              <>
                <button
                  className="text-red-500 absolute top-0 right-0 background-transparent font-bold outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <div className="mx-auto bg-base-100 rounded-md py-5">
                  <form
                    onSubmit={handleEditToys}
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                  >
                    <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
                      Edit Toy Information!
                    </h1>
                    <p className="mx-auto my-5 text-center text-gray-500">
                      Feel out the from correctly for update toys information.
                    </p>
                    <div className="grid md:grid-cols-2 gap-5 ">
                      <div className="relative">
                        <input
                          name="seller_name"
                          type="text"
                          defaultValue={sellerName}
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter seller full name"
                        />
                      </div>{" "}
                      <div className="relative">
                        <input
                          defaultValue={email}
                          name="seller_email"
                          type="email"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter full name"
                        />
                      </div>
                      <div className="relative">
                        <input
                          defaultValue={productName}
                          name="name"
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter toy name here"
                        />
                      </div>
                      <div className="relative">
                        <input
                          defaultValue={photoURL}
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
                            defaultValue={subCategory}
                          >
                            <option disabled value={1}>
                              Select Sub category
                            </option>
                            <option value="Teddy Bear">Teddy Bear</option>
                            <option value={"Unicorn"}>Unicorn</option>
                            <option value={"Dinosaur"}>Dinosaur</option>
                          </select>
                        </div>
                      </div>
                      <div className="Enter Toy price here">
                        <input
                          name="price"
                          defaultValue={price}
                          required
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter price"
                        />
                      </div>
                      <div className="Enter Rating">
                        <input
                          defaultValue={rating}
                          name="rating"
                          required
                          type="text"
                          className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                          placeholder="Enter Rating here in number"
                        />
                      </div>
                      <div className="Available quantity">
                        <input
                          defaultValue={quantity}
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
                        defaultValue={description}
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
                      Update now
                    </button>
                  </form>
                </div>
              </>
              <div className="relative flex flex-col">{/*footer*/}</div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      {/* table for show user toys data  */}
      <div className="overflow-x-auto w-full mx-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>Seller Name</th>
              <th>Toy Name</th>
              <th>Toy Picture</th>
              <th>Sub-category</th>
              <th className="flex justify-center items-center">
                Price <button onClick={handleSort}>{sortIcon}</button>
              </th>
              <th>Available Quantity</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {toys?.map((toy) => (
              <MyToyRow
                key={toy?._id}
                toy={toy}
                handleModal={handleModal}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyToys;
