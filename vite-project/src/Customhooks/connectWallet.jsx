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
                    const userContract = new Contract("0x88180D4acAb672B1B84861D65C017e56E347DdD4", userAbi, signer);
                    const productContract = new Contract("0x40f0C02Fb9BCaE0C7F5400f4a6f8583cDd2eD0Cb", productAbi, signer);
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