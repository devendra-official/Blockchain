import React, { useEffect, useState } from "react";
import { Header, Footer } from "../index.js";
import { SideBar } from "./index.js";
import ManageUsers from "../../Customhooks/manageUsers.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ListofCustomers = () => {
  const [farmers, setFarmers] = useState([]);
  const { getAllFarmers } = ManageUsers();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const farmers = await getAllFarmers();
    setFarmers(farmers);
  };

  const userContract = useSelector((state) => state.addContract.userContract);
  const product = useSelector((state) => state.addContract.product);

  const handleApproval = async (ETHAddress) => {
    await userContract.deleteFarmer(ETHAddress);
    await product.hideProduct(ETHAddress);
    let updated = [];
    userContract.once("deleteFarmerEvent", () => {
      updated = farmers.filter((farmer) => {
        if (farmer.ETHAddress != ETHAddress) {
          return farmer;
        }
      });
      setFarmers(updated);
      toast.success("Deleted");
    });
  };

  if (!farmers) {
    return <>Loading...</>;
  }

  if (farmers.length === 0)
    return (
      <>
        <Header />
        <main className="min-h-96 grid grid-cols-8">
          <SideBar className="col-span-2 z-10" />
          <div className="col-span-6">
            <img
              src="/images/Bg.jpg"
              className="w-screen h-screen blur-lg opacity-60 fixed z-0"
              alt=""
            ></img>
            <div className="flex flex-col h-full justify-center items-center gap-4 p-8 z-10 relative ">
              <div className="font-bold text-6xl">No Farmers Found</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <main className="h-auto grid grid-cols-8">
        <SideBar className="col-span-2 z-10" />
        <div className="col-span-6">
          <img
            src="/images/Bg.jpg"
            className="w-full h-full blur-lg opacity-60 fixed z-0"
            alt=""
          ></img>
          <div className="flex flex-col place-items-center gap-4 p-8 z-10 relative ">
            <div className="font-bold text-6xl">Farmers</div>
            <table className="w-full h-auto rounded-lg overflow-hidden gap-2">
              <thead className="text-white text-md bg-blue-800 border-green-800 border-1 ">
                <tr>
                  <th>SL No</th>
                  <th>Farmer Name</th>
                  <th>Email</th>
                  <th>ETH Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center font-semibold bg-white">
                {farmers.map((farmer) => (
                  <tr
                    key={farmer.key}
                    className="border-1 border-green-800 hover:bg-blue-100"
                  >
                    <td>{farmer.key + 1}</td>
                    <td>{farmer.name}</td>
                    <td>{farmer.email}</td>
                    <td>{farmer.ETHAddress}</td>
                    <td>
                      <button onClick={() => handleApproval(farmer.ETHAddress)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ListofCustomers;