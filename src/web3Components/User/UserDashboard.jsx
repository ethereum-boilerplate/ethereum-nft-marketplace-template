
import Marketplace from "../../views/Admin/components/NFT/Marketplace";
import { getEllipsisTxt } from "../../helpers/formatters";

export default function UserDashboard({ web3, address, marketplace }) {

        
    return (
        <div>
            <p style={{fontWeight: 600}}>Your Listings {getEllipsisTxt(address)}</p>
            <Marketplace ownListings={true} address={marketplace} />
        </div>
    )
}

