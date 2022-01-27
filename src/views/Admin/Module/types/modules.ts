export const collectionModule: IModule = {
    title: 'NFT Collection',
    desc: 'ERC721 Standard',
    tooltipText: 'Create a Collection and Mint NFTs',
    key: 'erc721module',
    logo: "chest"
}

export const bundleModule: IModule = {
    title: 'Bundle',
    desc: 'Bundle of many grouped NFTs',
    tooltipText: 'Coming soon',
    key: 'bundleModule',
    logo: "bundle",
}

export const dropModule: IModule = {
    title: 'Lazy NFT',
    desc: 'ERC721 Lazy Mint',
    tooltipText: 'Coming Soon',
    key: 'lazyMintModule',
    logo: "lazyNft",
}

export const marketplaceModule: IModule = {
    title: 'NFT Marketplace',
    desc: 'Whitelabel marketplace for digital assets',
    tooltipText: 'Create your own NFT MarketplaceForm',
    key: 'marketPlaceModule',
    logo: 'marketplace'
}
export const tokenModule: IModule = {
    title: 'Token',
    desc: 'Standard crypto token or currency',
    tooltipText: 'Create a standard ERC20 Token/Crypto Currency',
    key: 'tokenModule',
    logo: 'token'
}
export const packModule: IModule = {
    title: 'Pack',
    desc: 'Lootbox of NFTs',
    tooltipText: 'Coming soon',
    key: 'packModule',
    logo: 'pack'
}

export interface IModule {
    title: string;
    desc: string;
    tooltipText: string;
    key: moduleTypes;
    logo: logoTypes;
}

export type logoTypes = "chest" | "bundle" | "token" | "pack" | "marketplace" | "lazyNft";
export type moduleTypes = "erc721module" | "bundleModule" | "lazyMintModule" | "marketPlaceModule" | "tokenModule" | "packModule";