import { useSelector } from "react-redux";
import selecctId from "./generateId";
import { toast } from "react-toastify";

const useCrop = () => {
    const productContract = useSelector(state => state.addContract.productContract);
    const generateIdentifier = selecctId();

    async function cropRegister(cropname, area, cultivation, timeforharvest, yieldperacre) {
        try {
            const identifiers = [];
            console.log(cropname);
            const data = await productContract.getAllCropIds();
            console.log(data);
            if (data.length !== 0) {
                data.map((element)=>{
                    identifiers.push(element);
                });
            }
            const id = generateIdentifier(identifiers);
            const date = new Date();
            const applied = date.toLocaleString();
            await productContract.cropRegister(id, cropname, area, cultivation, timeforharvest, yieldperacre,applied);
            productContract.once("cropRegisterEvent", (id) => {
                toast.success(`Your crop registered successfully of Crop ID ${id}`);
            });
        } catch (e) {
            toast.error(e);
        }
    }

    async function getCrops() {
        const cropList = await productContract.getCrops();
        console.log("LENGTH",cropList.length);
        return cropList;
    }

    return { cropRegister, getCrops };
}

export default useCrop;