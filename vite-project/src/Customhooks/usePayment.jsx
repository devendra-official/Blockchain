import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import selectId from "./generateId";

function usePayment() {
    const generateIdentifier = selectId();
    const userContract = useSelector(state => state.addContract.userContract);
    const address = useSelector(state => state.addContract.address);

    async function orderProduct(items, totalAmount) {
        try {
            const identifiers = [];
            const data = await userContract.getAllOrderIds();
            
            if (data.length !== 0) {
                data.map((element) => {
                    identifiers.push(element);
                });
            }

            const oid = generateIdentifier(identifiers);
            const time = new Date().toLocaleString();
            let orders = [];

            items.map((item) => {
                const price = BigInt(item.price * 1e18);
                orders.push({ 
                    status: 0, 
                    productId: item.id, 
                    productName: item.productName, 
                    farmer: item.ETHAddress, 
                    customer: address, 
                    totalPrice: price, 
                    totalQuantity: item.quantity, 
                    timeofOrdered: time, 
                    timeofPicked: time, 
                    timeofDelivered: time 
                });
            });

            await userContract.orderProduct(orders, oid, totalAmount, { value: totalAmount });
            userContract.once("orderProductEvent", async () => {
                toast.success("Payment success");
            });

        } catch (error) {
            toast.error("An Error occured");
        }
    }

    async function getOrders() {
        const orders = await userContract.getOrders();
        return orders;
    }

    async function getOrderBySender() {
        const myOrders = await userContract.getOrderBySender();
        return myOrders;
    }

    return { orderProduct, getOrders, getOrderBySender };
}

export default usePayment;