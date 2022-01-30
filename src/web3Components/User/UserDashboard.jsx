import Marketplace from '../../views/Admin/components/NFT/Marketplace';
import { getEllipsisTxt } from '../../helpers/formatters';

export default function UserDashboard({ address, marketplace, admin }) {
    return (
        <div>
            <p style={{ fontWeight: 600 }}>Your Listings {getEllipsisTxt(address)}</p>
            <Marketplace ownListings={true} admin={admin} address={marketplace} />
        </div>
    );
}
