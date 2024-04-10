# React configuration guide

> [!NOTE]
> run these below commands at ` .../Blockchain/vite-project ` directry.

#### Installing node modules

```
npm i
```

> [!TIP]
> Replace the ` Blockchain/vite-project/src/assets/Supply.json ` file with ` Blockchain/artifacts/contracts/Supply.sol/Supply.json `file.

> [!CAUTION]
> Make sure to replace the deployed address in ` /vite-project/src/Customhooks/connectWallet.jsx ` at ` const contract = new Contract("REPLACE WITH DEPLOYED ADDRESS", abi, signer); `.

> [!IMPORTANT]
> Before running below command make sure that ganache is running in the background.

#### Run react

```
npm run dev
```
