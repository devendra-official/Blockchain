import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useCreate = () => {
    const userContract = useSelector(state => state.addContract.userContract);
    const navigate = useNavigate();

    async function createCustomer(role, name, email, password) {
        await userContract.createCustomer(name, email, password, role);
        userContract.on("createCustomerEvent", (name, email, role) => {
            window.localStorage.setItem("userData", JSON.stringify({ name, email, role }));
            toast.success(`Customer ${name} created successfully`);
            navigate("/");
        });
    }

    async function createFarmer(role, name, email, password) {
        await userContract.createFarmer(name, email, password, role);
        userContract.on("createFarmerEvent", (name, email, role) => {
            window.localStorage.setItem("userData", JSON.stringify({ name, email, role }));
            toast.success(`Farmer ${name} created successfully`);
            navigate("/farmer");
        });
    }

    async function createAuthority(role, name, email, password) {
        await userContract.createAuthority(name, email, password, role)
        userContract.on("createAuthorityEvent", (name, email, role) => {
            window.localStorage.setItem("userData", JSON.stringify({ name, email, role }));
            toast.success(`Authority ${name} created successfully`);
            navigate("/authority");
        });
    }

    return [createCustomer, createFarmer, createAuthority];
}


export default useCreate;