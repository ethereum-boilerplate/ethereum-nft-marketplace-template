import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { Modal, Input, Spin } from "antd";
import { useNFTBalance } from "hooks/useNFTBalance";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "helpers/networks";
import  { NFT } from "web3uikit"
import { useMarketplace } from "./Admin/Module/contracts/NFT/useMarketplace";

const styles = {
  NFTs: {
    display: "flex",
    flexWrap: "wrap",
    WebkitBoxPack: "start",
    justifyContent: "flex-start",
    margin: "0 auto",
    maxWidth: "1000px",
    gap: "10px",
  },
};

function NFTBalance({ marketplace }) {
  const { NFTBalance } = useNFTBalance();
  const { chainId, walletAddress } = useMoralisDapp();
  const { Moralis, web3 } = useMoralis();
  const [visible, setVisibility] = useState(false);
  const [nftToSend] = useState(null);
  const [tokenToBuy, setTokenToBuy] = useState("0x00000000000000000000000000");
  const [price, setPrice] = useState(1);
  const { listNFT, isListing } = useMarketplace(web3, marketplace)

  //
  // const handleSellClick = (nft) => {
  //   setNftToSend(nft);
  //   setVisibility(true);
  // };
  

  return (
    <>
      <div style={styles.NFTs}>
        {NFTBalance &&
          NFTBalance.map((nft) => {
            const metadata = JSON.parse(nft?.metadata)
            const description = metadata && metadata?.description ? metadata.description : "Empty Desription"
            return (
            <NFT 
              view="Card"
              key={`${nft.token_address}#${nft.token_id}`}
              address={nft.token_address}
              imgUrl={nft.image}
              tokenId={nft.token_id}
              description={description}
              type={nft.contract_type || "NFT"}
              name={nft.name}
              explorerUrl={getExplorer(chainId)}
            />
            )
          })}
          {NFTBalance && NFTBalance.length === 0 &&
            <p style={{fontWeight: 600}}>You don't own any NFTs. Buy some from the Market</p>
          }
      </div>
      
      <Modal
        title={`List ${nftToSend?.name} #${nftToSend?.token_id} For Sale`}
        visible={visible}
        confirmLoading={isListing}
        onCancel={() => setVisibility(false)}
        onOk={() => {
          console.log(nftToSend)
          let formattedPrice = Moralis.Units.ETH(price)
          listNFT(nftToSend?.token_address, nftToSend?.token_id, tokenToBuy, formattedPrice, 1, 0, 0, 0, walletAddress)
        }}
        okText="List"
      >
        <Spin spinning={isListing}>
        <img src={`${nftToSend?.image}`} alt="" style={{width:"250px", margin:"auto", borderRadius:"10px", marginBottom:"15px"}} />
        <p>Currency Address </p>
        <Input placeholder={tokenToBuy} onChange={(e) => setTokenToBuy(e.target.value)} />
        <p>Price</p>
        <Input autoFocus type="number" placeholder="Listing Price" onChange={(e) => setPrice(e.target.value)} />
        </Spin>
      </Modal>
      
    </>
  );
}

export default NFTBalance;
