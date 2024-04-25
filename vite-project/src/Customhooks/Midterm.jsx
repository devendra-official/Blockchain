import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useCrop from "./crops";

function Midterm() {
    const productContract = useSelector(state => state.addContract.productContract);
    const { getCrops } = useCrop();

    async function modifier(id) {
        console.log("Midterm");
        let obj = {
            accept: true,
            msg: "No errors"
        }

        const crops = await getCrops();
        const filterCrop = crops.filter((crop) => crop.id == id);
        const midTermList = await productContract.getMidTerm();

        console.log(filterCrop.length);
        console.log("STTA",filterCrop.isDisapproved);
        if (filterCrop.isDisapproved) {
            obj.accept = false;
            obj.msg = "Your crop Rejected"
        }
        return obj;

    }

    async function midTermRegister(id, progress, months) {
        modifier(id).then(async (accept, msg) => {
            if (accept) {
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
            } else {
                toast.error(msg);
            }
        })
    }

    async function getMidTerms() {
        const midTermList = await productContract.getMidTerm();
        return midTermList;
    }

    return { midTermRegister, getMidTerms }
}

export default Midterm;