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
                    const userContract = new Contract("0x9A42C98EFFeEa38c8D232c7043a191593FB99c4e", userAbi, signer);
                    const productContract = new Contract("0x3D6A9339aC656172b2389E39551538Cb18Ea7666", productAbi, signer);
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