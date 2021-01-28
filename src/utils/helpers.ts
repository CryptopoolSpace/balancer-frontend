import BigNumber from 'bignumber.js';
import { getAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { Wallet } from '@ethersproject/wallet';
import assets from '@balancer-labs/assets/assets/index.json';

import config from '@/config';
import { debugProvider } from '@/utils/provider';

export const ETH_KEY = 'ether';

export function formatAddress(address: string, length = 8): string {
    const ellipsizedAddress = `${address.substr(0, 2 + length / 2)}…${address.substr(42 - length / 2)}`;
    return ellipsizedAddress;
}

export function formatTxHash(txHash: string, length = 16): string {
    const ellipsizedHash = `${txHash.substr(0, 2 + length / 2)}…${txHash.substr(66 - length / 2)}`;
    return ellipsizedHash;
}

export function formatDate(timestamp: number): string {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', options);
}

export function isAddress(value: string): boolean {
    try {
        getAddress(value);
    } catch(e) {
        return false;
    }
    return true;
}

export function scale(input: BigNumber, decimalPlaces: number): BigNumber {
    const scalePow = new BigNumber(decimalPlaces.toString());
    const scaleMul = new BigNumber(10).pow(scalePow);
    return input.times(scaleMul);
}

export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
}

export function getEtherscanLink(txHash: string): string {
    return `https://explorer.arbitrum.io/#/tx/${txHash}`;
    // const chainId = config.chainId;
    // const prefixMap = {
    //     1: '',
    //     42: 'kovan.',
    // };
    // const prefix = prefixMap[chainId];
    // const link = `https://${prefix}etherscan.io/tx/${txHash}`;
    // return link;
}

export function getAccountLink(address: string): string {
    return `https://explorer.arbitrum.io/#/address/${address}`;
    // const chainId = config.chainId;
    // const prefixMap = {
    //     1: '',
    //     42: 'kovan.',
    // };
    // const prefix = prefixMap[chainId];
    // const link = `https://${prefix}etherscan.io/address/${address}`;
    // return link;
}

export function getPoolLink(pool: string): string {
    return `https://arb-balancer-pools.netlify.app/#/pool/${pool}`;
    const chainId = config.chainId;
    const prefixMap = {
        1: '',
        42: 'kovan.',
    };
    const prefix = prefixMap[chainId];
    const link = `https://${prefix}pools.balancer.exchange/#/pool/${pool}`;
    return link;
}

export function getAssetLogo(address: string): string {
    if (assets.includes(address.toLowerCase())) {
        return `https://raw.githubusercontent.com/balancer-labs/assets/master/assets/${address.toLowerCase()}.png`;
    }
    if (address.toLowerCase() === '0xffffffff2ba8f66d4e51811c5190992176930278') {
        return 'https://raw.githubusercontent.com/balancer-labs/assets/master/assets/0xffffffff2ba8f66d4e51811c5190992176930278.png';
    }
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
}

export function logRevertedTx(
    sender: string,
    contract: Contract,
    action: string,
    params: any,
    overrides: any,
): void {
    overrides.gasPrice = sender;
    const dummyPrivateKey = '0x651bd555534625dc2fd85e13369dc61547b2e3f2cfc8b98cee868b449c17a4d6';
    const dummyWallet = new Wallet(dummyPrivateKey).connect(debugProvider);
    const loggingContract = contract.connect(dummyWallet);
    loggingContract[action](...params, overrides);
}
