import { useDispatch } from "react-redux";
import { ethers, Contract } from "ethers";
import { setWallet } from "../store/walletSlice";
import { abi as userAbi } from "../assets/UserManager.json";
import {abi as productAbi } from "../assets/ProductManager.json";
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
                    const userContract = new Contract("0xFd840ee907F71A265f133a0Ef220688e28b66321", userAbi, signer);
                    const productContract = new Contract("0xaA46Fb9BF64F9518d1df450274faA5bB6Ead8287", productAbi, signer);
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