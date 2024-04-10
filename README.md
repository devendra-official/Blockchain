# Hardhat Configuration guide.

> [!NOTE]
> run these below commands at ` .../Blockchain ` directry.

#### Installation of node modules.
```
npm i 
```

> [!CAUTION]
> Make sure to change the private key in ` hardhat.config.js ` file at ` accounts:["REPLACE WITH PRIVATE KEY OF METAMASK ACCOUNT"] ` and the account should be any one from ` GANACHE ` only.

#### Compiling solidity contract.
```
npx hardhat compile
```

#### To deploy the contract run.
```
npx hardhat ignition deploy ignition/modules/Supply.js
```
