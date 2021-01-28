import tokenlist from '@balancer-labs/assets/generated/listed.tokenlist.json';

import config, { AssetMetadata } from '@/config';

const ETH_LOGO = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png';

export interface TokenList {
    name: string;
    logoURI?: string;
    tokens: Token[];
}

interface Token {
    address: string;
    chainId: number;
    name: string;
    symbol: string;
    decimals: number;
    logoURI?: string;
}

export const DEFAULT_LIST = 'balancer';

export const listMetadata: Record<string, string> = {
    [DEFAULT_LIST]: '',
    '1inch': 'http://tokens.1inch.eth.link',
    'coingecko': 'https://tokens.coingecko.com/uniswap/all.json',
    'compound': 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json',
    'zapper': 'https://zapper.fi/api/token-list',
    'zerion': 'http://tokenlist.zerion.eth.link',
};

export async function getTokenlist(id: string): Promise<TokenList> {
    if (id === DEFAULT_LIST) {
        // return tokenlist;
        return {
            name: "arbitrum",
            tokens: [
                {
                    "address": "0x57Ca11067892510E022D65b0483b31Cd49155389",
                    "chainId": 79377087078960,
                    "name": "AToken",
                    "symbol": "ATKN",
                    "decimals": 18,
                    "logoURI": "https://ropsten.etherscan.io/images/main/empty-token.png"
                },
                {
                    "address": "0xE41d965f6e7541139f8D9F331176867FB6972Baf",
                    "chainId": 79377087078960,
                    "name": "ARB Token",
                    "symbol": "ARB",
                    "decimals": 18,
                    "logoURI": "https://ropsten.etherscan.io/images/main/empty-token.png"
                },
                {
                    "address": "0xBfB0FF82993c07E92C3deb652711B66ffBe095A7",
                    "chainId": 79377087078960,
                    "name": "Wrapped Eth",
                    "symbol": "WETH",
                    "decimals": 18,
                    "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png"
                }
            ]
        }
    }
    const listUrl = listMetadata[id];
    const response = await fetch(listUrl);
    const json = await response.json();
    return json;
}

export function getAssetsFromTokenlist(chainId: number, list: TokenList): Record<string, AssetMetadata> {
    const assets: Record<string, AssetMetadata> = {};
    if (list.tokens.findIndex(token => token.address === config.addresses.weth) !== -1) {
        assets.ether = {
            address: 'ether',
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
            logoURI: ETH_LOGO,
        };
    }
    for (const token of list.tokens) {
        if (token.chainId !== chainId) {
            continue;
        }
        assets[token.address] = {
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
            logoURI: token.logoURI,
        };
    }
    return assets;
}
