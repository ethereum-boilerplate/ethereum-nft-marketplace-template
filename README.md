# `ethereum-marketplace-template`


# ⭐️ `Star us`
If this boilerplate helps you build Ethereum dapps faster - please star this project, every star makes us very happy!

# 🚀 Quick Start

📄 Clone or fork `ethereum-nft-marketplace-template`:
```sh
git clone https://github.com/ethereum-boilerplate/ethereum-nft-marketplace-template.git
```
💿 Install all dependencies:
```sh
cd ethereum-nft-marketplace-template
yarn install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis Beta! 
Create a server and select `beta-watch-contract-events-2f5de1e9` as a branch ([Beta Moralis](https://beta.moralis.io/)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

🔎 Locate the Project Settings in `src/components/Admin/index.js` and fill in needed data
```js
export const ProjectChainId = "" // Project Chain Id
export const AdminAddress = "" // CHANGE TO YOUR ADDRESS
export const MasterKey = "" // MORALIS MASTERKEY located in server details (WILL BE REMOVED)
export const StandardCurrency = "" // STANDARD CURRENCY FOR BUYING NFTS
export const RegistryAddress = "" // Registry address
```

🔃 The App automatically syncs all new added modules 


🚴‍♂️ Run your App:
```sh
yarn start
```


