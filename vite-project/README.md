# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
