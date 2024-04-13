import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import selectId from "./generateId";
import useCart from "./carts";

function usePayment() {
    const generateIdentifier = selectId();
    const userContract = useSelector(state => state.addContract.userContract);
    const { deleteCart } = useCart();

    async function orderProduct(item) {
        try {
            const identifiers = [];
            const data = await userContract.getAllOrderIds();
            if (data.length !== 0) {
                data.map((element) => {
                    identifiers.push(element);
                });
            }
            const price = BigInt(item.price * 1e18);

            const oid = generateIdentifier(identifiers);
            const time = new Date().toLocaleString();
            await userContract.orderProduct(item.id, price, item.ETHAddress, time, item.quantity, oid, { value: price });
            userContract.once("orderProductEvent", async() => {
                await deleteCart(item);
                toast.success("Payment success");
            })
        } catch (error) {
            toast.error("An Error occured");
        }
    }

    return { orderProduct };
}

export default usePayment;