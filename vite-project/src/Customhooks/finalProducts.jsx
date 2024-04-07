import { useSelector } from "react-redux";

function FinalProduct() {
    const productContract = useSelector(state => state.addContract.productContract);

    async function fetchProducts() {
        const product = await productContract.fetchProduct();
        return product;
    }

    return { fetchProducts };
}

export default FinalProduct;