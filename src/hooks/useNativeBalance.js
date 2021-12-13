import { getNativeByChain } from "helpers/networks";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useMemo, useState } from "react";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";

export const useNativeBalance = (options) => {
  const { account } = useMoralisWeb3Api();
  const { Moralis } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();
  const [balance, setBalance] = useState({ inWei: 0, formatted: 0 });

  const nativeName = useMemo(() => getNativeByChain(options?.chain || chainId), [options, chainId]);

  useEffect(() => {
    if(chainId && walletAddress) {
      account.getNativeBalance({
        chain: chainId,
        address: walletAddress
      })
      .then((result) => {
        const balances = {
          inWei: result.balance,
          formatted: Moralis.Units.FromWei(result.balance),
        };
        setBalance(balances)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, walletAddress]) 

  return { balance, nativeName };
};
