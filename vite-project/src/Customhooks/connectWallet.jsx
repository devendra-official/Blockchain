import { useDispatch } from "react-redux";
import { ethers, Contract } from "ethers";
import { setWallet } from "../store/walletSlice";
import { abi as userAbi } from "../assets/UserManager.json";
import { abi as productAbi } from "../assets/ProductManager.json";
import { toast } from "react-toastify";

function useWallet() {
    const dispatch = useDispatch();
    window.ethereum.on("accountsChanged", connectWallet);

    function connectWallet() {
        return new Promise((resolve, reject) => {
            let signer = null;
            let provider;
            if (window.ethereum === null) {
                toast.warn("MetaMask not installed; using read-only defaults")
                provider = ethers.getDefaultProvider();
                reject();
            } else {
                provider = new ethers.BrowserProvider(window.ethereum)
                provider.getSigner().then((data) => {
                    signer = data;
                    const userContract = new Contract("0xcC068a290B64c723B9EE6313B784221Bc19C2D0C", userAbi, signer);
                    const productContract = new Contract("0x4a3bf4e75f713F577fc02C290e904a1099088E1d", productAbi, signer);
                    const address = signer.address;
                    dispatch(setWallet({ userContract, productContract, address }));
                    resolve();
                })
            }
        });
    }

    return connectWallet;
}

export default useWallet;