import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import ToysByCategory from "./ToysByCategory";
const CategoryTabs = () => {
  const [toys, setToys] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    const newSubCategories = [];
    fetch(`https://kiddo-zone-1.vercel.app/toys`)
      .then((res) => res.json())
      .then((data) => {
        setToys(data);
        data.forEach((toy) => {
          if (!newSubCategories.includes(toy.subCategory)) {
            newSubCategories.push(toy.subCategory);
          }
        });
        setSubCategory(newSubCategories);
      })
      
  }, []);
  if (toys.length == 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <HashLoader color="#36d7b7" />
      </div>
    );
  }
  return (
    <div className="space-y-10 my-10">
      <h2 className="mb-6 font-sans text-3xl md:text-6xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        Shop by category
      </h2>
      <Tabs>
        <TabList>
          {subCategory.map((category, idx) => (
            <Tab key={idx}>{category}</Tab>
          ))}
        </TabList>
        {subCategory.map((category, idx) => (
          <TabPanel key={idx}>
            <ToysByCategory categoryName={category} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
