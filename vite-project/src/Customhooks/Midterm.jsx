import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Midterm() {
    const productContract = useSelector(state => state.addContract.productContract);

    async function modifier(id) {
        // FIXME: Write Modifier for midTermRegister
        const crops = await productContract.getCrops();
        const filterCrop = crops.filter((crop) => crop.id == id);
    }

    async function midTermRegister(id, progress, months) {
        try {
            const date = new Date();
            const timeofApplied = date.toLocaleString();
            await productContract.midTermRegister(id, progress, months, timeofApplied);
            productContract.once("midTermRegisterEvent", (id) => {
                toast.success("MidTerm Registration success");
            })
        } catch (error) {
            toast.error(error);
        }
    }

    async function getMidTerms() {
        const midTermList = await productContract.getMidTerm();
        return midTermList;
    }

    return { midTermRegister, getMidTerms }
}

export default Midterm;