import React, { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import { useNavigate } from "react-router-dom";
import usePayment from "../../Customhooks/usePayment.jsx";
import { useSelector } from "react-redux";

const Orders = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const address = useSelector((state) => state.addContract.address);
  const [orders, setOrders] = useState([]);
  const { getOrders } = usePayment();
  const navigate = useNavigate();

  const fetchData = async function () {
    const orders = await getOrders();
    setOrders(orders);
  };

  const konsa = (data) => {
    navigate(`/OrderDetails/${data.order.orderId}`, { state: data });
  };

  const filteredOrders = orders.filter((order) => order.customer === address);

  if (filteredOrders.length === 0)
    return (
      <>
        <Header />
        <div className="h-3/4 overflow-y-hidden z-10 relative shadow-sm shadow-black">
          <img
            src="images/Products.jpg"
            alt="BG"
            className="z-10 absolute blur-sm"
          />
          <div className="absolute z-30 font-bold text-8xl flex w-full h-full justify-center items-center text-white">
            No Orders Found
          </div>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <div className="min-h-52 overflow-y-hidden z-10 relative shadow-sm shadow-black">
        <img
          src="images/Products.jpg"
          alt="BG"
          className="z-10 absolute  blur-sm"
        />
        <div className="absolute z-30 font-bold text-9xl flex w-full h-full justify-center items-center text-white ">
          Orders
        </div>
      </div>
      <div className="flex bg-[#D8F3DC] flex-col place-items-center p-8 z-10 relative ">
        <table className=" gap-2 w-full mx-2  h-auto rounded-lg overflow-hidden">
          <thead className="text-white text-md bg-blue-800 border-green-800 border-1 ">
            <tr>
              <th>Index</th>
              <th>OID</th>
              <th>PID</th>
              <th>Farmer</th>
              <th>Price</th>
              <th>Time of Ordered</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="text-center font-semibold bg-white">
            {filteredOrders.map((order, index) => (
              <tr
                onClick={() => konsa({ order: order })}
                key={order.id}
                className={`hover:bg-blue-100  ${
                  index === filteredOrders.length - 1
                    ? " "
                    : "border-b-2 border-blue-500"
                } `}
              >
                <td>{index}</td>
                <td>{order.orderId}</td>
                <td>{order.productId}</td>
                <td>{`${order.farmer.substring(
                  0,
                  7
                )}...${order.farmer.substring(37, 42)}`}</td>
                <td>{Number(order.price) / 1e18} ETH</td>
                <td>{order.timeofOrdered}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
