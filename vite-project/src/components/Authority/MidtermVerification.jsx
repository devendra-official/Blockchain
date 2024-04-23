import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Midterm from "../../Customhooks/Midterm";
import { toast } from "react-toastify";
import Header from "../Header/Header";
import SideBar from "./SideBar";
import Footer from "../Footer/Footer";

const MidtermVerification = () => {
  const [midTerms, setMidTerms] = useState([]);
  const { getMidTerms } = Midterm();
  const productContract = useSelector((state) => state.addContract.productContract);

  useEffect(() => {
    const fetchData = async () => {
      const midTermsData = await getMidTerms();
      setMidTerms(midTermsData);
    };

    fetchData();
  }, []);

  const handleApproveMidTerm = async (midTermId) => {
    const date = new Date();
    const time = date.toLocaleString();
    await productContract.approveMidTerm(midTermId, time);
    productContract.once("approveMidTermEvent", () => {
      toast.success("MidTerm approved successfully");
      setMidTerms((prevMidTerms) =>
        prevMidTerms.map((midTerm) =>
          midTerm.id === midTermId ? { ...midTerm, isApproved: true } : midTerm
        )
      );
    });
  };

  return (
    <>
      <Header />
      <main className="h-auto grid grid-cols-8">
        <SideBar className="col-span-2 z-10" />
        <div className="col-span-6">
          <img src="/images/Bg.jpg" className="w-screen h-screen blur-lg opacity-60 fixed z-0" alt="" />
          <div className="flex flex-col place-items-center gap-4 p-8 z-10 relative ">
            <div className="font-bold text-6xl">Midterm verification</div>
            <table className="w-full mx-2 h-auto rounded-lg overflow-hidden">
              <thead className="text-white text-xl bg-black border-green-800 border-2">
                <tr>
                  <th>ID</th>
                  <th>Crop Name</th>
                  <th>Time Till Harvest</th>
                  <th>Time of Applied</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-center font-semibold bg-white">
                {midTerms.map((midTerm) => (
                  <tr key={midTerm.id} className="border-2 border-green-800">
                    <td>{midTerm.id}</td>
                    <td>{midTerm.cropName}</td>
                    <td>{`${midTerm.months} months`}</td>
                    <td>{midTerm.timeofApplied}</td>
                    <td>
                      {midTerm.isApproved ? (
                        <button className="bg-green-500 rounded-lg my-2 p-2" disabled>
                          Approved
                        </button>
                      ) : (
                        <button
                          onClick={() => handleApproveMidTerm(midTerm.id)}
                          className="bg-red-500 rounded-lg my-2 p-2"
                        >
                          Approve
                        </button>
                      )}
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

export default MidtermVerification;
