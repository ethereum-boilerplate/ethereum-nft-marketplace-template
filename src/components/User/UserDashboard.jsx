
import Marketplace from "../../components/Admin/components/NFT/Marketplace";
import { useMarketplace } from "components/Admin/Module/contracts/NFT/useMarketplace";
import { getEllipsisTxt } from "helpers/formatters";

export default function UserDashboard({ web3, address, marketplace }) {

        const { currentUsersListings } = useMarketplace(web3, marketplace, address)
        
    return (
        <div>
            <p style={{fontWeight: 600}}>Your Listings {getEllipsisTxt(address)}</p>
            <Marketplace address={marketplace} />

        </div>
    )
}

