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
                    const userContract = new Contract("0x8E2d7FA0dC0d1DfBF4Cb22781C8efed2E4a0D37A", userAbi, signer);
                    const productContract = new Contract("0xAaed70d8072e8f727ADB6726a70F95f6cA921f8f", productAbi, signer);
                    const address = signer.address;
                    dispatch(setWallet({ userContract, productContract, address, signer }));
                    resolve();
                })
            }
        });
    }

    return connectWallet;
}

export default useWallet;