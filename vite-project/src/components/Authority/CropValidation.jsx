import React, { useEffect, useState } from "react";
import useCrop from "../../Customhooks/crops.jsx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CropValidation = () => {
  const [crops, setCrops] = useState([]);
  const { getCrops } = useCrop();
  const [state, setState] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const crops = await getCrops();
      setCrops(crops);
    }

    fetchData();
  }, []);
  const productContract = useSelector(state => state.addContract.productContract);
  return (
    <>
      <img
        src="/images/Bg.jpg"
        className="w-screen h-screen blur-lg opacity-60 fixed z-0"
        alt=""
      ></img>
      <div className="flex flex-col place-items-center gap-4 p-8 z-10 relative ">
        <div className="font-bold text-6xl">Crop Validation</div>
        <table className=" w-full mx-2  h-auto rounded-lg overflow-hidden">
          <thead className=" text-white text-xl bg-black border-green-800 border-2">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>From</th>
              <th>Applied</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center font-semibold bg-white">
            {crops.map((crop) => (
              <tr key={crop.id} className="border-2 border-green-800">
                <td>{crop.id}</td>
                <td>{crop.cropName}</td>
                <td>{crop.ETHAddress}</td>
                <td>{crop.timeofApplied}</td>
                <td>
                  {crop.isApproved ? (
                    <button disabled>Approved</button>
                  ) : (
                    <button onClick={async () => {
                      const date = new Date();
                      const time = date.toLocaleString();
                      await productContract.approveCrop(crop.id, time);
                      productContract.once("approveCropEvent", () => {
                        setState("Approved")
                        toast.success("Crop approved successfully");
                      });
                    }}>{state}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CropValidation;