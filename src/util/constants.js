export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key

export const APP_NAME = "METASIGN";
export const APP_DESC = "Secure signature requests";

export const CHAIN_OPTIONS = {
  3: {
    name: "Linea",
    url: "https://explorer.goerli.linea.build/",
    id: 3,
  },
 
};

export const CHAIN_IDS = Object.keys(CHAIN_OPTIONS)


export const ACTIVE_CHAIN = CHAIN_OPTIONS["3"];

export const EXAMPLE_FORM = {
  title: "Please Enter Document Title",
  description: "Please enter description on document",
  signerAddress: "Enter signer address",
  files: [],
};

export const IPFS_BASE_URL = "https://ipfs.io/ipfs"

console.log("config", COVALENT_KEY, NFT_PORT_KEY, ACTIVE_CHAIN);
