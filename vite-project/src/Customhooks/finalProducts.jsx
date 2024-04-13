import { useSelector } from "react-redux";

function FinalProduct() {

    const productContract = useSelector(state => state.addContract.productContract);

    async function fetchProducts() {
        const products = await productContract.fetchProduct();
        let Items = [];
        products.map((product) => {
            Items.push({
                id: product.id,
                productName: product.productName,
                category: product.category,
                price: Number(product.price) / 1e18,
                quantity: product.quantity,
                ETHAddress: product.ETHAddress,
                description: product.description,
                cropRegistered: product.cropRegistered,
                cropApproved: product.cropApproved,
                midTermRegistered: product.midTermRegistered,
                midTermApproved: product.midTermApproved,
                certRegistered: product.certRegistered,
                certApproved: product.certApproved
            });
        })
        console.log(Items);
        return Items;
    }

    return { fetchProducts };
}

export default FinalProduct;