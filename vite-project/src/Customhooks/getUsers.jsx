import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useGetusers = () => {
    const userContract = useSelector(state => state.addContract.userContract);
    const navigate = useNavigate();

    function getCustomer(password) {
        return new Promise((resolve, reject) => {
            userContract.getCustomer(password)
                .then((data) => {
                    window.localStorage.setItem("userData", JSON.stringify({ name: data["name"], email: data["email"], role: data["role"] }));
                    toast.success("Login success");
                    navigate("/")
                    resolve();
                })
                .catch(error => {
                    toast.error(error.reason);
                    reject(error);
                });
        });
    }

    function getFarmer(password) {
        return new Promise((resolve, reject) => {
            userContract.getFarmer(password)
                .then((data) => {
                    window.localStorage.setItem("userData", JSON.stringify({ name: data["name"], email: data["email"], role: data["role"] }));
                    toast.success("Login success");
                    navigate("/farmer");
                    resolve();
                })
                .catch(error => {
                    toast.error(error.reason);
                    reject(error);
                });
        });
    }

    function getAuthority(password) {
        return new Promise((resolve, reject) => {
            userContract.getAuthority(password)
                .then((data) => {
                    window.localStorage.setItem("userData", JSON.stringify({ name: data["name"], email: data["email"], role: data["role"] }));
                    toast.success("Login success");
                    navigate("/authority")
                    resolve();
                })
                .catch(error => {
                    toast.error(error.reason);
                    reject(error);
                });
        });
    }
    return [getCustomer, getFarmer, getAuthority];
}


export default useGetusers;