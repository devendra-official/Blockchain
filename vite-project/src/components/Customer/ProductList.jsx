import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header, Footer } from "../index.js";
import FinalProduct from "../../Customhooks/finalProducts.jsx";
import { toast } from "react-toastify";
import { FaEthereum } from "react-icons/fa";

function ProductList() {
  useEffect(() => {
    fetchData();
  }, []);

  const { fetchProducts } = FinalProduct();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const result = await fetchProducts();
      let filterProduct = result.filter((product) => product.show == true);
      setProducts(filterProduct);
    } catch (error) {
      toast.error("An error occured");
    }
  };

  return (
    <>
      <div className="bg-[#D8F3DC]">
        <Header />

        <div className="h-96 overflow-y-hidden z-10 relative shadow-lg shadow-black">
          <img
            src="images/Products.jpg"
            alt="BG"
            className="z-10 absolute blur-sm"
          />
          <div className="absolute z-30 font-bold text-9xl flex w-full h-full justify-center items-center text-white -mt-8">
            Products
          </div>
        </div>
        <div className="columns-4 gap-5 p-6 -mt-24 z-20 relative">
          {/* here starts the products */}
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white overflow-hidden break-inside-avoid h-fit hover:shadow-xl hover:shadow-green-400 flex flex-col border-2 border-black rounded-3xl my-4"
            >
              <Link to={`/productDetails/${product.id}`}>
                <div className="h-1/2 w-full overflow-hidden">
                  <img
                    src={`/crops/${product.productName}.jpg`}
                    alt="image"
                    className="bg-cover hover:scale-110 transition "
                  />
                </div>

                <div className=" h-fit w-full flex flex-col m-1">
                  <div className="font-bold p-1">{product.productName}</div>
                  <div className="p-1"> {product.description}</div>
                  <div className="p-1">
                    Quantity left: {product.quantity.toString()} KG
                  </div>
                  <div className="p-1 flex items-center flex-row">
                    <div className="text-lg flex flex-row">
                      Price: {product.price.toString()} ETH
                      <FaEthereum className="text-sm relative top-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductList;
