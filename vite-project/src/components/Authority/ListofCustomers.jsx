import React, { useEffect, useState } from "react";
import { Header, Footer } from "../index.js";
import { SideBar } from "./index.js";
import ManageUsers from "../../Customhooks/manageUsers.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ListofCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const { getAllCustomers } = ManageUsers();
  const userContract = useSelector(state => state.addContract.userContract);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const customers = await getAllCustomers();
    setCustomers(customers);
  }

  const handleApproval = async (ETHAddress) => {
    await userContract.deleteCustomer(ETHAddress);
    let updated = [];
    userContract.once("deleteCustomerEvent", () => {
      updated = customers.filter((customer) => {
        if (customer.ETHAddress != ETHAddress) {
          return customer;
        }
      });
      setCustomers(updated);
      toast.success("Deleted");
    })
  };

  if (!customers) {
    return <>Loading...</>
  }

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
            <div className="font-bold text-6xl">Customers</div>
            <table className="w-full h-auto rounded-lg overflow-hidden gap-2">
              <thead className="text-white text-md bg-blue-800 border-green-800 border-1 ">
                <tr>
                  <th>SL No</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>ETH Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center font-semibold bg-white">
                {customers.map((customer) => (
                  <tr
                    key={customer.key}
                    className="border-1 border-green-800 hover:bg-blue-100"
                  >
                    <td>{customer.key + 1}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.ETHAddress}</td>
                    <td>
                      <button
                        onClick={() => handleApproval(customer.ETHAddress)}
                      >
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
