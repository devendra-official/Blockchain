import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Certificate() {
    const productContract = useSelector(state => state.addContract.productContract);

    async function reqCertificate(id,quality,quantity,category,price,description) {
        try {
            console.log(id,quality,quantity,category,price,description);
            const date = new Date();
            const timeofApplied = date.toLocaleString();
            await productContract.reqCertificate(id,quality,quantity,category,price,description,timeofApplied);
            productContract.once("reqCertificateEvent", () => {
                toast.success(`Your request of issue for Certificate has submitted successfully`);
            });
        } catch (e) {
            alert(e)
        }
    }

    async function getCertificate() {
        const certificateList = await productContract.getCertificate();
        return certificateList;
    }

    return { reqCertificate ,getCertificate};
}

export default Certificate;