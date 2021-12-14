import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

export const useNFTBalance = (options) => {
  const { account } = useMoralisWeb3Api();
  const { chainId } = useMoralisDapp();
  const [NFTBalance, setNFTBalance] = useState([]);
  const {
    fetch: getNFTBalance,
    data,
    error,
    isLoading,
  } = useMoralisWeb3ApiCall(account.getNFTs, { chain: chainId, ...options });

  useEffect(() => {
  if(data) {
    console.log(data)
    data.result.forEach((nft) => {
      if(nft.metadata) {
        const metadata = JSON.parse(nft.metadata)
        nft.name = metadata.name
        nft.image = `https://ipfs.io/ipfs/${(metadata.image).split('ipfs://')[1]}`
      }
    })
    setNFTBalance(data.result)
    
  }
  }, [data]);

  useEffect(() => {
      if(chainId) {
        getNFTBalance()
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  return { getNFTBalance, NFTBalance, error, isLoading };
};
