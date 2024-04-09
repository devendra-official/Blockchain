import { useDispatch, useSelector } from "react-redux";
import FinalProduct from "./finalProducts";
import { addItem } from "../store/cartSlice";

function useCart() {
    const dispatch = useDispatch();
    const userContract = useSelector(state => state.addContract.userContract);

    const { fetchProducts } = FinalProduct();

    async function addCart(id, quantity) {
        await userContract.addCart(product.id, 1);
        userContract.once("addCartEvent", () => {
            toast.success("Added to Cart");
        });
    }

    async function getCarts() {
        const cartData = await userContract.getCart();
        const items = cartData.items;
        items.map(async (item) => {
            const products = await fetchProducts();
            products.map((product) => {
                if (product.id == item.id) {
                    const newData = {
                        id: product.id,
                        productName: product.productName,
                        category: product.category,
                        price: product.price,
                        quantity: item.quantity,
                        ETHAddress: product.ETHAddress,
                        description: product.description,
                        cropRegistered: product.cropRegistered,
                        cropApproved: product.cropApproved,
                        midTermRegistered: product.midTermRegistered,
                        midTermApproved: product.midTermApproved,
                        certRegistered: product.certRegistered,
                        certApproved: product.certApproved
                    };
                    dispatch(addItem(newData));
                }
            })
        });
    }

    async function updateCart(id, quantity) {
        await userContract.updateCart(id, quantity);
        userContract.once("updateCartEvent", () => {
            toast.success("updated success");
        })
    }

    async function removeCart(){
        
    }

    return { addCart, getCarts, updateCart };
}

export default useCart;